import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreditCard, MapPin, Phone, User, Mail, AlertCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Checkout = () => {
  const navigate = useNavigate();
  const { items, totalAmount, clearCart } = useCart();
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [showValidation, setShowValidation] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    email: user?.email || '',
    phoneNumber: '',
    address: '',
    city: '',
    postalCode: '',
    mpesaTransactionId: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    // Show validation if form is not complete
    if (!isFormValid) {
      setShowValidation(true);
      toast({
        title: "Incomplete Form",
        description: "Please fill in all required fields including your M-Pesa Transaction ID",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      // Create order
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert([{
          user_id: user.id,
          total_amount: totalAmount,
          phone_number: formData.phoneNumber,
          shipping_address: formData.address,
          shipping_city: formData.city,
          shipping_postal_code: formData.postalCode,
          mpesa_transaction_id: formData.mpesaTransactionId || null,
          status: formData.mpesaTransactionId ? 'payment_confirmed' : 'pending'
        }])
        .select()
        .single();

      if (orderError) throw orderError;

      // Create order items
      const orderItems = items.map(item => ({
        order_id: order.id,
        product_id: item.product_id,
        quantity: item.quantity,
        unit_price: item.product.price,
        total_price: item.product.price * item.quantity
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      // Clear cart
      await clearCart();

      toast({
        title: "Order Placed Successfully!",
        description: `Order #${order.id.slice(0, 8)} has been created. You will receive a confirmation email shortly.`,
      });

      navigate('/orders');
    } catch (error: any) {
      console.error('Error placing order:', error);
      toast({
        title: "Error",
        description: "Failed to place order. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Please Sign In</h1>
          <p className="text-muted-foreground mb-6">You need to sign in to proceed with checkout</p>
          <Button onClick={() => navigate('/auth')}>Sign In</Button>
        </div>
        <Footer />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Your Cart is Empty</h1>
          <p className="text-muted-foreground mb-6">Add some items to your cart before checkout</p>
          <Button onClick={() => navigate('/')}>Continue Shopping</Button>
        </div>
        <Footer />
      </div>
    );
  }

  const subtotal = totalAmount;
  const shipping = subtotal > 50 ? 0 : 5.99;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  // Check if all required fields are filled
  const isFormValid = 
    formData.fullName.trim() !== '' &&
    formData.email.trim() !== '' &&
    formData.phoneNumber.trim() !== '' &&
    formData.address.trim() !== '' &&
    formData.city.trim() !== '' &&
    formData.postalCode.trim() !== '' &&
    formData.mpesaTransactionId.trim() !== '';

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-foreground mb-8">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Shipping Information */}
          <div className="space-y-6">
            <div className="bg-card rounded-lg border border-border p-6">
              <h2 className="text-xl font-semibold text-card-foreground mb-4 flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Shipping Information
              </h2>
              
              {!isFormValid && showValidation && (
                <Alert variant="destructive" className="mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Please complete all required fields below to proceed with your order.
                  </AlertDescription>
                </Alert>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName" className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Full Name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      className={showValidation && !formData.fullName.trim() ? 'border-destructive' : ''}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Email <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className={showValidation && !formData.email.trim() ? 'border-destructive' : ''}
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="phoneNumber" className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Phone Number <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    required
                    className={showValidation && !formData.phoneNumber.trim() ? 'border-destructive' : ''}
                  />
                </div>

                <div>
                  <Label htmlFor="address">Address <span className="text-destructive">*</span></Label>
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    className={showValidation && !formData.address.trim() ? 'border-destructive' : ''}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">City <span className="text-destructive">*</span></Label>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className={showValidation && !formData.city.trim() ? 'border-destructive' : ''}
                    />
                  </div>
                  <div>
                    <Label htmlFor="postalCode">Postal Code <span className="text-destructive">*</span></Label>
                    <Input
                      id="postalCode"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      required
                      className={showValidation && !formData.postalCode.trim() ? 'border-destructive' : ''}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="mpesaTransactionId" className="flex items-center gap-2">
                    M-Pesa Transaction ID <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="mpesaTransactionId"
                    name="mpesaTransactionId"
                    placeholder="e.g., QA12BC3456"
                    value={formData.mpesaTransactionId}
                    onChange={handleInputChange}
                    required
                    className={showValidation && !formData.mpesaTransactionId.trim() ? 'border-destructive' : ''}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    ⚠️ Required: Enter your M-Pesa transaction code after making payment to Till 242435
                  </p>
                </div>
              </form>
            </div>

            <div className="bg-card rounded-lg border border-border p-6">
              <h2 className="text-xl font-semibold text-card-foreground mb-4 flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Payment Method
              </h2>
              <div className="space-y-4">
                <div className="bg-primary/10 border border-primary rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-card-foreground">M-Pesa Payment</span>
                    <span className="text-sm text-primary">Recommended</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Pay securely via M-Pesa Buy Goods
                  </p>
                  <div className="bg-background rounded p-3 text-center">
                    <p className="text-xs text-muted-foreground mb-1">Till Number</p>
                    <p className="text-2xl font-bold text-card-foreground tracking-wider">242435</p>
                  </div>
                  <p className="text-xs text-muted-foreground mt-3">
                    1. Go to M-Pesa on your phone<br/>
                    2. Select Lipa na M-Pesa → Buy Goods<br/>
                    3. Enter till number: <strong>242435</strong><br/>
                    4. Enter amount and confirm
                  </p>
                </div>
                <div className="bg-muted/20 rounded-lg p-4">
                  <p className="text-muted-foreground text-center">
                    Cash on Delivery (COD) Also Available
                  </p>
                  <p className="text-sm text-muted-foreground text-center mt-2">
                    Pay when your order arrives at your doorstep
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <div className="bg-card rounded-lg border border-border p-6">
              <h2 className="text-xl font-semibold text-card-foreground mb-4">Order Summary</h2>
              
              {/* Order Items */}
              <div className="space-y-3 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <img 
                      src={item.product.image_url} 
                      alt={item.product.name}
                      className="w-12 h-12 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-card-foreground line-clamp-2">
                        {item.product.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Qty: {item.quantity} × KES {item.product.price.toFixed(2)}
                      </p>
                    </div>
                    <div className="text-sm font-medium text-card-foreground">
                      KES {(item.product.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2 border-t border-border pt-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="text-card-foreground">KES {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-card-foreground">
                    {shipping === 0 ? 'Free' : `KES ${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span className="text-card-foreground">KES {tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-semibold border-t border-border pt-2">
                  <span className="text-card-foreground">Total</span>
                  <span className="text-card-foreground">KES {total.toFixed(2)}</span>
                </div>
              </div>

              {shipping > 0 && (
                <div className="mt-4 p-3 bg-muted/20 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    💡 Add KES {(50 - subtotal).toFixed(2)} more for free shipping!
                  </p>
                </div>
              )}

              
              {!isFormValid && (
                <Alert className="mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Before placing your order:</strong>
                    <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                      <li>Complete all shipping information fields</li>
                      <li>Make payment via M-Pesa to Till: <strong>242435</strong></li>
                      <li>Enter your M-Pesa Transaction ID</li>
                    </ul>
                  </AlertDescription>
                </Alert>
              )}

              <Button 
                onClick={handleSubmit}
                disabled={loading || !isFormValid}
                className="w-full mt-6 bg-primary hover:bg-primary/90 text-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Placing Order...' : `Place Order - KES ${total.toFixed(2)}`}
              </Button>
              {!isFormValid && (
                <p className="text-xs text-destructive text-center mt-2 font-medium">
                  ⚠️ Please complete all required fields to proceed
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;