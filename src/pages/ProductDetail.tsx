import { useState } from "react";
import { useParams } from "react-router-dom";
import { Star, Heart, ShoppingCart, Minus, Plus, Shield, Truck, RotateCcw } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";

// Mock product data - in real app this would come from API
const mockProducts = {
  // Phone Products
  "phone-1": {
    id: "phone-1",
    name: "iPhone 15 Pro Max 256GB - Natural Titanium",
    images: [
      "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=600&h=600&fit=crop"
    ],
    price: 899.99,
    originalPrice: 1199.99,
    rating: 4.8,
    reviewCount: 2341,
    discount: 25,
    isNew: true,
    description: "Experience the power of Apple's most advanced iPhone with the A17 Pro chip, titanium design, and revolutionary camera system.",
    specs: [
      "6.7-inch Super Retina XDR display",
      "A17 Pro chip with 6-core GPU",
      "256GB storage capacity",
      "Triple-camera system with 48MP main",
      "Natural Titanium finish",
      "Face ID for secure authentication"
    ],
    inStock: true,
    stockCount: 15
  },
  "phone-2": {
    id: "phone-2",
    name: "Samsung Galaxy S24 Ultra 512GB - Phantom Black",
    images: [
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=600&h=600&fit=crop"
    ],
    price: 799.99,
    originalPrice: 999.99,
    rating: 4.7,
    reviewCount: 1892,
    discount: 20,
    description: "Samsung's flagship smartphone with S Pen, powerful cameras, and stunning display.",
    specs: [
      "6.8-inch Dynamic AMOLED 2X display",
      "Snapdragon 8 Gen 3 processor",
      "512GB storage capacity",
      "200MP main camera with AI zoom",
      "S Pen included",
      "5000mAh battery"
    ],
    inStock: true,
    stockCount: 22
  },
  "phone-3": {
    id: "phone-3",
    name: "Google Pixel 8 Pro 128GB - Bay Blue",
    images: ["https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=600&h=600&fit=crop"],
    price: 649.99,
    originalPrice: 799.99,
    rating: 4.6,
    reviewCount: 1456,
    discount: 19,
    description: "Google's AI-powered smartphone with exceptional photography capabilities.",
    specs: [
      "6.7-inch LTPO OLED display",
      "Google Tensor G3 chip",
      "128GB storage capacity",
      "50MP triple camera system",
      "Magic Eraser and Best Take",
      "All-day battery life"
    ],
    inStock: true,
    stockCount: 18
  },
  "phone-4": {
    id: "phone-4",
    name: "OnePlus 12 256GB - Flowy Emerald",
    images: ["https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=600&h=600&fit=crop"],
    price: 549.99,
    originalPrice: 699.99,
    rating: 4.5,
    reviewCount: 987,
    discount: 21,
    description: "OnePlus flagship with fast charging, smooth performance, and premium design.",
    specs: [
      "6.82-inch LTPO AMOLED display",
      "Snapdragon 8 Gen 3",
      "256GB storage",
      "50MP triple camera",
      "100W SuperVOOC charging",
      "OxygenOS 14"
    ],
    inStock: true,
    stockCount: 12
  },
  "phone-5": {
    id: "phone-5",
    name: "Xiaomi 14 Ultra 512GB - Black",
    images: ["https://images.unsplash.com/photo-1512499617640-c2f999c82a52?w=600&h=600&fit=crop"],
    price: 459.99,
    originalPrice: 599.99,
    rating: 4.4,
    reviewCount: 756,
    discount: 23,
    description: "Premium Xiaomi smartphone with Leica cameras and flagship performance.",
    specs: [
      "6.73-inch LTPO AMOLED display",
      "Snapdragon 8 Gen 3",
      "512GB storage",
      "Leica quad camera system",
      "120W HyperCharge",
      "MIUI 15"
    ],
    inStock: true,
    stockCount: 8
  },
  "phone-6": {
    id: "phone-6",
    name: "Nothing Phone (2) 256GB - Dark Grey",
    images: ["https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600&h=600&fit=crop"],
    price: 399.99,
    rating: 4.3,
    reviewCount: 542,
    isNew: true,
    description: "Unique transparent design with Glyph Interface and clean Android experience.",
    specs: [
      "6.7-inch LTPO OLED display",
      "Snapdragon 8+ Gen 1",
      "256GB storage",
      "50MP dual camera",
      "Glyph Interface",
      "Nothing OS 2.0"
    ],
    inStock: true,
    stockCount: 25
  },
  // Laptop Products
  "laptop1": {
    id: "laptop1",
    name: "MacBook Pro 16-inch M3 Max",
    images: ["https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&h=600&fit=crop"],
    price: 2499,
    originalPrice: 2799,
    rating: 4.9,
    reviewCount: 1250,
    discount: 11,
    description: "Apple's most powerful laptop with M3 Max chip for professional workflows.",
    specs: [
      "16-inch Liquid Retina XDR display",
      "Apple M3 Max chip",
      "36GB unified memory",
      "1TB SSD storage",
      "140W fast charging",
      "22-hour battery life"
    ],
    inStock: true,
    stockCount: 5
  },
  "laptop2": {
    id: "laptop2",
    name: "Dell XPS 13 Plus Intel i7",
    images: ["https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600&h=600&fit=crop"],
    price: 1299,
    originalPrice: 1599,
    rating: 4.7,
    reviewCount: 892,
    discount: 19,
    description: "Premium ultrabook with stunning display and powerful Intel performance.",
    specs: [
      "13.4-inch 4K+ OLED display",
      "Intel Core i7-13th Gen",
      "16GB LPDDR5 RAM",
      "512GB NVMe SSD",
      "Windows 11 Pro",
      "All-day battery"
    ],
    inStock: true,
    stockCount: 12
  },
  "laptop3": {
    id: "laptop3",
    name: "ASUS ROG Strix Gaming Laptop",
    images: ["https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=600&h=600&fit=crop"],
    price: 1899,
    originalPrice: 2199,
    rating: 4.8,
    reviewCount: 654,
    discount: 14,
    description: "High-performance gaming laptop with RTX graphics and RGB lighting.",
    specs: [
      "17.3-inch 144Hz display",
      "AMD Ryzen 9 processor",
      "32GB DDR5 RAM",
      "NVIDIA RTX 4070",
      "1TB NVMe SSD",
      "RGB keyboard"
    ],
    inStock: true,
    stockCount: 7
  },
  "laptop4": {
    id: "laptop4",
    name: "HP Spectre x360 2-in-1",
    images: ["https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&h=600&fit=crop"],
    price: 1199,
    originalPrice: 1399,
    rating: 4.6,
    reviewCount: 743,
    discount: 14,
    description: "Convertible laptop with 360-degree hinge and premium build quality.",
    specs: [
      "13.5-inch 3K2K touchscreen",
      "Intel Core i7-13th Gen",
      "16GB LPDDR5 RAM",
      "512GB PCIe SSD",
      "360-degree hinge",
      "HP Pen included"
    ],
    inStock: true,
    stockCount: 15
  },
  "laptop5": {
    id: "laptop5",
    name: "Lenovo ThinkPad X1 Carbon",
    images: ["https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=600&h=600&fit=crop"],
    price: 1799,
    originalPrice: 1999,
    rating: 4.7,
    reviewCount: 521,
    discount: 10,
    description: "Business laptop with enterprise-grade security and durability.",
    specs: [
      "14-inch 2.8K OLED display",
      "Intel Core i7 vPro",
      "32GB LPDDR5 RAM",
      "1TB PCIe SSD",
      "MIL-STD-810H tested",
      "24-hour battery"
    ],
    inStock: true,
    stockCount: 9
  },
  "laptop6": {
    id: "laptop6",
    name: "Surface Laptop Studio",
    images: ["https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=600&h=600&fit=crop"],
    price: 1599,
    originalPrice: 1799,
    rating: 4.5,
    reviewCount: 389,
    discount: 11,
    description: "Microsoft's creative powerhouse with unique hinge design.",
    specs: [
      "14.4-inch PixelSense touchscreen",
      "Intel Core i7-11th Gen",
      "16GB LPDDR4x RAM",
      "512GB SSD",
      "NVIDIA RTX A2000",
      "Surface Pen support"
    ],
    inStock: true,
    stockCount: 6
  },
  // Phone Spares
  "spare-1": {
    id: "spare-1",
    name: "iPhone 15 Pro Max Tempered Glass Screen Protector",
    images: ["https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?w=600&h=600&fit=crop"],
    price: 12.99,
    originalPrice: 19.99,
    rating: 4.6,
    reviewCount: 834,
    discount: 35,
    description: "Premium tempered glass screen protector with 9H hardness for ultimate protection against scratches and impacts.",
    specs: [
      "9H hardness tempered glass",
      "99% transparency",
      "Oleophobic coating",
      "Easy bubble-free installation",
      "Perfect fit for iPhone 15 Pro Max",
      "Case-friendly design"
    ],
    inStock: true,
    stockCount: 50
  },
  "spare-2": {
    id: "spare-2",
    name: "Samsung Galaxy S24 Ultra Silicone Case - Black",
    images: ["https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=600&fit=crop"],
    price: 24.99,
    originalPrice: 39.99,
    rating: 4.5,
    reviewCount: 567,
    discount: 38,
    description: "Premium silicone case with precise cutouts and enhanced grip.",
    specs: [
      "High-quality silicone material",
      "Precise port cutouts",
      "Enhanced grip texture",
      "Drop protection",
      "Wireless charging compatible",
      "Easy to clean"
    ],
    inStock: true,
    stockCount: 35
  },
  "spare-3": {
    id: "spare-3",
    name: "USB-C Fast Charging Cable 2M - White",
    images: ["https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&h=600&fit=crop"],
    price: 8.99,
    originalPrice: 14.99,
    rating: 4.7,
    reviewCount: 1234,
    discount: 40,
    description: "High-speed USB-C cable with durable braided construction.",
    specs: [
      "USB-C to USB-C",
      "100W power delivery",
      "480Mbps data transfer",
      "Braided nylon construction",
      "2 meter length",
      "Universal compatibility"
    ],
    inStock: true,
    stockCount: 75
  },
  "spare-4": {
    id: "spare-4",
    name: "Wireless Charger Pad 15W - Black",
    images: ["https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=600&h=600&fit=crop"],
    price: 19.99,
    originalPrice: 29.99,
    rating: 4.4,
    reviewCount: 423,
    discount: 33,
    description: "Fast wireless charging pad with LED indicator and case-friendly design.",
    specs: [
      "15W fast wireless charging",
      "Qi-certified",
      "LED charging indicator",
      "Case-friendly (up to 5mm)",
      "Over-current protection",
      "Non-slip base"
    ],
    inStock: true,
    stockCount: 40
  },
  "spare-5": {
    id: "spare-5",
    name: "Phone Ring Holder Stand - Rose Gold",
    images: ["https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=600&h=600&fit=crop"],
    price: 5.99,
    originalPrice: 9.99,
    rating: 4.3,
    reviewCount: 789,
    discount: 40,
    description: "Elegant ring holder with 360-degree rotation and kickstand function.",
    specs: [
      "360-degree rotation",
      "Kickstand function",
      "Strong 3M adhesive",
      "Rose gold finish",
      "Ultra-thin design",
      "Universal compatibility"
    ],
    inStock: true,
    stockCount: 60
  },
  "spare-6": {
    id: "spare-6",
    name: "Car Phone Mount Magnetic Dashboard",
    images: ["https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=600&h=600&fit=crop"],
    price: 15.99,
    originalPrice: 24.99,
    rating: 4.5,
    reviewCount: 345,
    discount: 36,
    isNew: true,
    description: "Magnetic car mount for hands-free driving with strong adhesive base.",
    specs: [
      "Strong magnetic hold",
      "360-degree rotation",
      "Dashboard adhesive mount",
      "One-hand operation",
      "Universal phone compatibility",
      "Cable management"
    ],
    inStock: true,
    stockCount: 28
  },
  "spare-7": {
    id: "spare-7",
    name: "Bluetooth Earbuds Case Protective Cover",
    images: ["https://images.unsplash.com/photo-1590658165737-15a047b7de01?w=600&h=600&fit=crop"],
    price: 7.99,
    originalPrice: 12.99,
    rating: 4.2,
    reviewCount: 234,
    discount: 38,
    description: "Protective silicone case for AirPods and compatible earbuds.",
    specs: [
      "Soft silicone material",
      "Precise cutouts",
      "Carabiner included",
      "Shock absorption",
      "Easy access to ports",
      "Multiple color options"
    ],
    inStock: true,
    stockCount: 45
  },
  "spare-8": {
    id: "spare-8",
    name: "Phone Camera Lens Protector Set",
    images: ["https://images.unsplash.com/photo-1616410011236-7a42121dd981?w=600&h=600&fit=crop"],
    price: 9.99,
    originalPrice: 16.99,
    rating: 4.6,
    reviewCount: 456,
    discount: 41,
    description: "Complete camera lens protection with tempered glass and precise fit.",
    specs: [
      "Tempered glass lenses",
      "HD clarity",
      "Scratch resistant",
      "Easy installation",
      "Set of 3 protectors",
      "Camera-specific design"
    ],
    inStock: true,
    stockCount: 55
  },
  // Accessories
  "acc1": {
    id: "acc1",
    name: "Wireless Charging Pad 15W",
    images: ["https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=600&h=600&fit=crop"],
    price: 29,
    originalPrice: 39,
    rating: 4.4,
    reviewCount: 892,
    discount: 26,
    description: "Fast wireless charging with LED indicators and case-friendly design.",
    specs: [
      "15W fast wireless charging",
      "Qi-certified safety",
      "LED charging status",
      "Works with cases up to 5mm",
      "Over-current protection",
      "Anti-slip rubber base"
    ],
    inStock: true,
    stockCount: 32
  },
  "acc2": {
    id: "acc2",
    name: "USB-C Hub 7-in-1",
    images: ["https://images.unsplash.com/photo-1625842268584-8f3296236761?w=600&h=600&fit=crop"],
    price: 49,
    originalPrice: 69,
    rating: 4.6,
    reviewCount: 1205,
    discount: 29,
    description: "Complete connectivity solution with multiple ports and 4K HDMI output.",
    specs: [
      "7 ports in 1 hub",
      "4K HDMI output",
      "USB 3.0 ports",
      "SD/microSD slots",
      "USB-C PD charging",
      "Aluminum construction"
    ],
    inStock: true,
    stockCount: 18
  },
  "acc3": {
    id: "acc3",
    name: "Bluetooth Mouse RGB",
    images: ["https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&h=600&fit=crop"],
    price: 25,
    originalPrice: 35,
    rating: 4.3,
    reviewCount: 645,
    discount: 29,
    description: "Ergonomic wireless mouse with customizable RGB lighting and precision tracking.",
    specs: [
      "2400 DPI precision sensor",
      "Bluetooth 5.0 connectivity",
      "RGB backlighting",
      "Ergonomic design",
      "60-hour battery life",
      "Silent click technology"
    ],
    inStock: true,
    stockCount: 24
  },
  "acc4": {
    id: "acc4",
    name: "Mechanical Keyboard RGB",
    images: ["https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=600&h=600&fit=crop"],
    price: 89,
    originalPrice: 129,
    rating: 4.8,
    reviewCount: 743,
    discount: 31,
    description: "Premium mechanical keyboard with tactile switches and customizable RGB.",
    specs: [
      "Blue mechanical switches",
      "Per-key RGB lighting",
      "Aluminum frame",
      "Hot-swappable switches",
      "USB-C connectivity",
      "Gaming mode"
    ],
    inStock: true,
    stockCount: 12
  },
  "acc5": {
    id: "acc5",
    name: "Phone Stand Adjustable",
    images: ["https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600&h=600&fit=crop"],
    price: 15,
    originalPrice: 25,
    rating: 4.2,
    reviewCount: 521,
    discount: 40,
    description: "Adjustable aluminum phone stand with multiple viewing angles.",
    specs: [
      "Adjustable height and angle",
      "Aluminum construction",
      "Non-slip base",
      "Foldable design",
      "Universal compatibility",
      "Cable management"
    ],
    inStock: true,
    stockCount: 38
  },
  "acc6": {
    id: "acc6",
    name: "Cable Organizer Set",
    images: ["https://images.unsplash.com/photo-1572894549-b7b2d2ada9b4?w=600&h=600&fit=crop"],
    price: 12,
    originalPrice: 19,
    rating: 4.1,
    reviewCount: 389,
    discount: 37,
    description: "Complete cable management solution with various organizers and ties.",
    specs: [
      "10-piece organizer set",
      "Silicone cable ties",
      "Adhesive cable clips",
      "Cable sleeves",
      "Desk grommets",
      "Multiple sizes included"
    ],
    inStock: true,
    stockCount: 65
  },
  // Audio Products
  "audio1": {
    id: "audio1",
    name: "AirPods Pro 2nd Gen",
    images: ["https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?w=600&h=600&fit=crop"],
    price: 199,
    originalPrice: 249,
    rating: 4.8,
    reviewCount: 2340,
    discount: 20,
    description: "Apple's premium wireless earbuds with active noise cancellation and spatial audio.",
    specs: [
      "Active Noise Cancellation",
      "Spatial Audio with head tracking",
      "H2 chip for enhanced performance",
      "Up to 6 hours listening time",
      "MagSafe charging case",
      "IPX4 sweat and water resistant"
    ],
    inStock: true,
    stockCount: 25
  },
  "audio2": {
    id: "audio2",
    name: "Sony WH-1000XM5 Headphones",
    images: ["https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&h=600&fit=crop"],
    price: 299,
    originalPrice: 399,
    rating: 4.9,
    reviewCount: 1876,
    discount: 25,
    description: "Industry-leading noise canceling with premium sound quality and comfort.",
    specs: [
      "Industry-leading noise canceling",
      "30-hour battery life",
      "Multipoint Bluetooth connection",
      "Speak-to-chat technology",
      "Quick attention mode",
      "Premium comfort design"
    ],
    inStock: true,
    stockCount: 15
  },
  "audio3": {
    id: "audio3",
    name: "JBL Portable Speaker",
    images: ["https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&h=600&fit=crop"],
    price: 89,
    originalPrice: 129,
    rating: 4.6,
    reviewCount: 1234,
    discount: 31,
    description: "Powerful portable speaker with deep bass and waterproof design.",
    specs: [
      "JBL Pro Sound",
      "12-hour playtime",
      "IP67 waterproof",
      "Wireless Bluetooth streaming",
      "PartyBoost feature",
      "Built-in powerbank"
    ],
    inStock: true,
    stockCount: 28
  },
  "audio4": {
    id: "audio4",
    name: "Gaming Headset RGB 7.1",
    images: ["https://images.unsplash.com/photo-1599669454699-248893623440?w=600&h=600&fit=crop"],
    price: 79,
    originalPrice: 119,
    rating: 4.5,
    reviewCount: 892,
    discount: 34,
    description: "Professional gaming headset with surround sound and RGB lighting.",
    specs: [
      "7.1 surround sound",
      "RGB lighting effects",
      "Noise-canceling microphone",
      "Memory foam ear cushions",
      "50mm drivers",
      "Multi-platform compatibility"
    ],
    inStock: true,
    stockCount: 22
  },
  "audio5": {
    id: "audio5",
    name: "Wireless Earbuds Sport",
    images: ["https://images.unsplash.com/photo-1590658165737-15a047b67cd5?w=600&h=600&fit=crop"],
    price: 59,
    originalPrice: 89,
    rating: 4.4,
    reviewCount: 756,
    discount: 34,
    description: "Sport-focused wireless earbuds with secure fit and sweat resistance.",
    specs: [
      "Secure sport fit",
      "IPX7 waterproof",
      "8-hour battery + case",
      "Quick charge 15 min = 2 hours",
      "Touch controls",
      "Voice assistant ready"
    ],
    inStock: true,
    stockCount: 35
  },
  "audio6": {
    id: "audio6",
    name: "Studio Monitor Speakers",
    images: ["https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600&h=600&fit=crop"],
    price: 299,
    originalPrice: 399,
    rating: 4.7,
    reviewCount: 432,
    discount: 25,
    description: "Professional studio monitors for accurate sound reproduction.",
    specs: [
      "5-inch woofer",
      "1-inch silk dome tweeter",
      "50W RMS power",
      "Frequency response 45Hz-35kHz",
      "Multiple input options",
      "Acoustic tuning switches"
    ],
    inStock: true,
    stockCount: 8
  },
  // Gaming Products
  "gaming1": {
    id: "gaming1",
    name: "PlayStation 5 Console",
    images: ["https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=600&h=600&fit=crop"],
    price: 499,
    originalPrice: 599,
    rating: 4.9,
    reviewCount: 3240,
    discount: 17,
    description: "Next-generation gaming console with lightning-fast loading and stunning graphics.",
    specs: [
      "Custom AMD Zen 2 CPU",
      "10.28 TFLOPS GPU",
      "16GB GDDR6 RAM",
      "825GB SSD storage",
      "4K gaming up to 120fps",
      "DualSense controller included"
    ],
    inStock: true,
    stockCount: 3
  },
  "gaming2": {
    id: "gaming2",
    name: "Xbox Series X Controller",
    images: ["https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=600&h=600&fit=crop"],
    price: 59,
    originalPrice: 79,
    rating: 4.8,
    reviewCount: 1876,
    discount: 25,
    description: "Enhanced wireless controller with improved ergonomics and precision.",
    specs: [
      "Hybrid D-pad",
      "Textured triggers",
      "Bluetooth connectivity",
      "40-hour battery life",
      "3.5mm headset jack",
      "Compatible with Xbox and PC"
    ],
    inStock: true,
    stockCount: 42
  },
  "gaming3": {
    id: "gaming3",
    name: "Gaming Mechanical Keyboard",
    images: ["https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=600&h=600&fit=crop"],
    price: 129,
    originalPrice: 179,
    rating: 4.7,
    reviewCount: 1234,
    discount: 28,
    description: "Professional gaming keyboard with mechanical switches and RGB backlighting.",
    specs: [
      "Cherry MX Red switches",
      "Per-key RGB lighting",
      "Aluminum top plate",
      "Programmable keys",
      "Gaming mode",
      "USB passthrough"
    ],
    inStock: true,
    stockCount: 18
  },
  "gaming4": {
    id: "gaming4",
    name: "Gaming Mouse 16000 DPI",
    images: ["https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&h=600&fit=crop"],
    price: 69,
    originalPrice: 99,
    rating: 4.6,
    reviewCount: 892,
    discount: 30,
    description: "High-precision gaming mouse with customizable DPI and RGB lighting.",
    specs: [
      "16000 DPI sensor",
      "11 programmable buttons",
      "RGB lighting zones",
      "On-board memory",
      "1000Hz polling rate",
      "Ergonomic design"
    ],
    inStock: true,
    stockCount: 26
  },
  "gaming5": {
    id: "gaming5",
    name: "Gaming Chair RGB Pro",
    images: ["https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=600&h=600&fit=crop"],
    price: 299,
    originalPrice: 399,
    rating: 4.5,
    reviewCount: 756,
    discount: 25,
    description: "Professional gaming chair with RGB lighting and ergonomic support.",
    specs: [
      "Ergonomic lumbar support",
      "RGB LED lighting",
      "PU leather construction",
      "360-degree swivel",
      "Height adjustment",
      "4D armrests"
    ],
    inStock: true,
    stockCount: 11
  },
  "gaming6": {
    id: "gaming6",
    name: "VR Headset Meta Quest 3",
    images: ["https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=600&h=600&fit=crop"],
    price: 399,
    originalPrice: 499,
    rating: 4.8,
    reviewCount: 1032,
    discount: 20,
    description: "Advanced VR headset with mixed reality capabilities and wireless freedom.",
    specs: [
      "Mixed reality passthrough",
      "Snapdragon XR2 Gen 2",
      "Fast-switch LCD displays",
      "Touch Plus controllers",
      "Hand tracking",
      "128GB storage"
    ],
    inStock: true,
    stockCount: 7
  }
};

// Related products
const relatedProducts = [
  {
    id: "phone-2",
    name: "Samsung Galaxy S24 Ultra 512GB",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop",
    price: 799.99,
    originalPrice: 999.99,
    rating: 4.7,
    reviewCount: 1892,
    discount: 20
  },
  {
    id: "spare-2",
    name: "Samsung Galaxy Case - Black",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=400&fit=crop",
    price: 24.99,
    originalPrice: 39.99,
    rating: 4.5,
    reviewCount: 567,
    discount: 38
  },
  {
    id: "spare-3",
    name: "USB-C Fast Charging Cable",
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop",
    price: 8.99,
    originalPrice: 14.99,
    rating: 4.7,
    reviewCount: 1234,
    discount: 40
  },
  {
    id: "spare-4",
    name: "Wireless Charger Pad 15W",
    image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&h=400&fit=crop",
    price: 19.99,
    originalPrice: 29.99,
    rating: 4.4,
    reviewCount: 423,
    discount: 33
  }
];

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const { addToCart, loading } = useCart();
  const { user } = useAuth();

  const product = mockProducts[id as keyof typeof mockProducts];

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Product Not Found</h1>
          <p className="text-muted-foreground">The product you're looking for doesn't exist.</p>
        </div>
        <Footer />
      </div>
    );
  }

  const handleQuantityChange = (change: number) => {
    setQuantity(Math.max(1, Math.min(quantity + change, product.stockCount)));
  };

  const handleAddToCart = async () => {
    if (user) {
      await addToCart(id!, quantity);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-8">
        <div className="container mx-auto px-4">
          {/* Product Details Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="aspect-square bg-muted/20 rounded-lg overflow-hidden">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {product.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`aspect-square w-20 rounded-md overflow-hidden border-2 transition-smooth ${
                        selectedImage === index ? "border-primary" : "border-border"
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  {"isNew" in product && product.isNew && (
                    <Badge className="bg-success text-success-foreground">New</Badge>
                  )}
                  {"discount" in product && product.discount && (
                    <Badge className="bg-sale text-sale-foreground">-{product.discount}%</Badge>
                  )}
                </div>
                <h1 className="text-3xl font-bold text-foreground mb-4">{product.name}</h1>
                
                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating)
                            ? "text-yellow-400 fill-current"
                            : "text-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {product.rating} ({product.reviewCount} reviews)
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-3xl font-bold text-foreground">
                    ${product.price.toFixed(2)}
                  </span>
                  {"originalPrice" in product && product.originalPrice && (
                    <span className="text-lg text-muted-foreground line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="text-muted-foreground mb-6">{product.description}</p>

                {/* Quantity & Actions */}
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium">Quantity:</span>
                    <div className="flex items-center border border-border rounded-md">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleQuantityChange(-1)}
                        disabled={quantity <= 1}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="px-4 py-2 text-center min-w-12">{quantity}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleQuantityChange(1)}
                        disabled={quantity >= product.stockCount}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {product.stockCount} in stock
                    </span>
                  </div>

                  <div className="flex gap-3">
                    <Button 
                      className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                      onClick={handleAddToCart}
                      disabled={loading || !user}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      {!user ? 'Sign in to Add' : 'Add to Cart'}
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setIsFavorite(!isFavorite)}
                      className={isFavorite ? "text-red-500" : ""}
                    >
                      <Heart className="h-4 w-4" fill={isFavorite ? "currentColor" : "none"} />
                    </Button>
                  </div>

                  <Button variant="outline" className="w-full">
                    Buy Now
                  </Button>
                </div>

                {/* Benefits */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-border">
                  <div className="flex items-center gap-2">
                    <Truck className="h-4 w-4 text-success" />
                    <span className="text-xs">Free Shipping</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <RotateCcw className="h-4 w-4 text-success" />
                    <span className="text-xs">30-Day Returns</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-success" />
                    <span className="text-xs">1-Year Warranty</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Specifications */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">Key Specifications</h2>
            <div className="bg-card rounded-lg border border-border p-6">
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {product.specs.map((spec, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-card-foreground">{spec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Related Products */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">People Also Bought</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;