import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/AdminSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Loader2, Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface Product {
  id: string;
  name: string;
  price: number;
  original_price: number | null;
  category: string;
  brand: string | null;
  description: string | null;
  stock_quantity: number;
  image_url: string | null;
  discount_percentage: number;
}

const categories = [
  { value: 'phones' as const, label: 'Phones' },
  { value: 'phone_spares' as const, label: 'Phone Spares' },
  { value: 'laptops' as const, label: 'Laptops' },
  { value: 'accessories' as const, label: 'Accessories' },
  { value: 'smart_devices' as const, label: 'Smart Devices' },
  { value: 'audio' as const, label: 'Audio' },
  { value: 'gaming' as const, label: 'Gaming' },
  { value: 'cameras' as const, label: 'Cameras' },
  { value: 'wearables' as const, label: 'Wearables' },
  { value: 'tvs' as const, label: 'TVs' },
  { value: 'fridges' as const, label: 'Fridges' }
] as const;

type CategoryValue = typeof categories[number]['value'];

const AdminProducts = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<{
    name: string;
    price: string;
    original_price: string;
    category: CategoryValue;
    brand: string;
    description: string;
    stock_quantity: string;
    image_url: string;
    discount_percentage: string;
  }>({
    name: '',
    price: '',
    original_price: '',
    category: 'phones',
    brand: '',
    description: '',
    stock_quantity: '0',
    image_url: '',
    discount_percentage: '0'
  });

  useEffect(() => {
    if (!user) {
      navigate('/admin/auth');
      return;
    }
    loadProducts();
  }, [user, navigate]);

  const loadProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      toast.error('Failed to load products');
      console.error(error);
    } else {
      setProducts(data || []);
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const productData = {
      name: formData.name,
      price: parseFloat(formData.price),
      original_price: formData.original_price ? parseFloat(formData.original_price) : null,
      category: formData.category,
      brand: formData.brand || null,
      description: formData.description || null,
      stock_quantity: parseInt(formData.stock_quantity),
      image_url: formData.image_url || null,
      discount_percentage: parseInt(formData.discount_percentage)
    };

    if (editingProduct) {
      const { error } = await supabase
        .from('products')
        .update(productData)
        .eq('id', editingProduct.id);
      
      if (error) {
        toast.error('Failed to update product');
        console.error(error);
      } else {
        toast.success('Product updated successfully');
        setIsDialogOpen(false);
        loadProducts();
        resetForm();
      }
    } else {
      const { error } = await supabase
        .from('products')
        .insert([productData]);
      
      if (error) {
        toast.error('Failed to create product');
        console.error(error);
      } else {
        toast.success('Product created successfully');
        setIsDialogOpen(false);
        loadProducts();
        resetForm();
      }
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price.toString(),
      original_price: product.original_price?.toString() || '',
      category: product.category as CategoryValue,
      brand: product.brand || '',
      description: product.description || '',
      stock_quantity: product.stock_quantity.toString(),
      image_url: product.image_url || '',
      discount_percentage: product.discount_percentage.toString()
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);
    
    if (error) {
      toast.error('Failed to delete product');
      console.error(error);
    } else {
      toast.success('Product deleted successfully');
      loadProducts();
    }
  };

  const resetForm = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      price: '',
      original_price: '',
      category: 'phones',
      brand: '',
      description: '',
      stock_quantity: '0',
      image_url: '',
      discount_percentage: '0'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AdminSidebar />
        <main className="flex-1 p-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Products Management</CardTitle>
              <Dialog open={isDialogOpen} onOpenChange={(open) => {
                setIsDialogOpen(open);
                if (!open) resetForm();
              }}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Product
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>{editingProduct ? 'Edit Product' : 'Add New Product'}</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label>Name</Label>
                      <Input
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Price</Label>
                        <Input
                          required
                          type="number"
                          step="0.01"
                          value={formData.price}
                          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label>Original Price</Label>
                        <Input
                          type="number"
                          step="0.01"
                          value={formData.original_price}
                          onChange={(e) => setFormData({ ...formData, original_price: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Category</Label>
                        <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value as CategoryValue })}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((cat) => (
                              <SelectItem key={cat.value} value={cat.value}>
                                {cat.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Brand</Label>
                        <Input
                          value={formData.brand}
                          onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Stock Quantity</Label>
                        <Input
                          required
                          type="number"
                          value={formData.stock_quantity}
                          onChange={(e) => setFormData({ ...formData, stock_quantity: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label>Discount %</Label>
                        <Input
                          type="number"
                          value={formData.discount_percentage}
                          onChange={(e) => setFormData({ ...formData, discount_percentage: e.target.value })}
                        />
                      </div>
                    </div>
                    <div>
                      <Label>Image URL</Label>
                      <Input
                        value={formData.image_url}
                        onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label>Description</Label>
                      <Textarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        rows={4}
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      {editingProduct ? 'Update Product' : 'Create Product'}
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Brand</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>{product.name}</TableCell>
                      <TableCell className="capitalize">{product.category.replace('_', ' ')}</TableCell>
                      <TableCell>{product.brand || '-'}</TableCell>
                      <TableCell>${product.price}</TableCell>
                      <TableCell>{product.stock_quantity}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" onClick={() => handleEdit(product)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="destructive" onClick={() => handleDelete(product.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default AdminProducts;
