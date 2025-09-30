import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface OrderItem {
  product: {
    name: string;
    price: number;
  };
  quantity: number;
  unit_price: number;
  total_price: number;
}

interface Order {
  id: string;
  created_at: string;
  total_amount: number;
  status: string;
  shipping_address: string;
  shipping_city: string;
  shipping_postal_code: string;
  phone_number: string;
  profiles: {
    full_name: string;
    email: string;
  };
  order_items: OrderItem[];
}

export const generateOrderReceipt = (order: Order) => {
  const doc = new jsPDF();
  
  // Header
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('ORDER RECEIPT', 105, 20, { align: 'center' });
  
  // Company Info
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('Volta Electronics', 105, 30, { align: 'center' });
  doc.text('123 Electronics Avenue, Tech City', 105, 35, { align: 'center' });
  doc.text('Phone: +254 700 123 456 | Email: support@volta.com', 105, 40, { align: 'center' });
  
  // Line separator
  doc.setDrawColor(200, 200, 200);
  doc.line(20, 45, 190, 45);
  
  // Order Details
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Order Information', 20, 55);
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`Order ID: ${order.id.slice(0, 8).toUpperCase()}`, 20, 62);
  doc.text(`Order Date: ${new Date(order.created_at).toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })}`, 20, 68);
  doc.text(`Status: ${order.status.toUpperCase()}`, 20, 74);
  
  // Customer Information
  doc.setFont('helvetica', 'bold');
  doc.text('Customer Information', 20, 85);
  
  doc.setFont('helvetica', 'normal');
  doc.text(`Name: ${order.profiles.full_name}`, 20, 92);
  doc.text(`Email: ${order.profiles.email}`, 20, 98);
  doc.text(`Phone: ${order.phone_number}`, 20, 104);
  
  // Shipping Address
  doc.setFont('helvetica', 'bold');
  doc.text('Shipping Address', 120, 85);
  
  doc.setFont('helvetica', 'normal');
  const addressLines = doc.splitTextToSize(order.shipping_address, 70);
  let yPos = 92;
  addressLines.forEach((line: string) => {
    doc.text(line, 120, yPos);
    yPos += 6;
  });
  doc.text(`${order.shipping_city}, ${order.shipping_postal_code}`, 120, yPos);
  
  // Items Table
  const tableStartY = Math.max(yPos + 10, 120);
  
  doc.setFont('helvetica', 'bold');
  doc.text('Order Items', 20, tableStartY);
  
  const tableData = order.order_items.map((item) => [
    item.product.name,
    item.quantity.toString(),
    `$${item.unit_price.toFixed(2)}`,
    `$${item.total_price.toFixed(2)}`
  ]);
  
  autoTable(doc, {
    startY: tableStartY + 5,
    head: [['Product', 'Quantity', 'Unit Price', 'Total']],
    body: tableData,
    theme: 'striped',
    headStyles: {
      fillColor: [59, 130, 246],
      textColor: 255,
      fontStyle: 'bold'
    },
    styles: {
      fontSize: 10,
      cellPadding: 5
    },
    columnStyles: {
      0: { cellWidth: 90 },
      1: { cellWidth: 30, halign: 'center' },
      2: { cellWidth: 35, halign: 'right' },
      3: { cellWidth: 35, halign: 'right' }
    }
  });
  
  // Total Section
  const finalY = (doc as any).lastAutoTable.finalY + 10;
  
  doc.setDrawColor(200, 200, 200);
  doc.line(120, finalY, 190, finalY);
  
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('Total Amount:', 120, finalY + 10);
  doc.text(`$${order.total_amount.toFixed(2)}`, 190, finalY + 10, { align: 'right' });
  
  // Footer
  const pageHeight = doc.internal.pageSize.height;
  doc.setFontSize(8);
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(128, 128, 128);
  doc.text('Thank you for shopping with us!', 105, pageHeight - 20, { align: 'center' });
  doc.text('For support, contact us at support@volta.com', 105, pageHeight - 15, { align: 'center' });
  
  // Save the PDF
  doc.save(`receipt-${order.id.slice(0, 8)}.pdf`);
};
