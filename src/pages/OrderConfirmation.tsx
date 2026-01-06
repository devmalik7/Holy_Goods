import { Link, useParams } from 'react-router-dom';
import { CheckCircle, Package, ArrowRight, Mail, Truck, Building2, Copy } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { useOrder } from '@/hooks/useOrders';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

export default function OrderConfirmation() {
  const { id } = useParams<{ id: string }>();
  const { data: order, isLoading } = useOrder(id || '');
  const { toast } = useToast();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(price);
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: `${label} copied to clipboard` });
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="container py-16 max-w-2xl mx-auto">
          <Skeleton className="h-12 w-12 rounded-full mx-auto mb-6" />
          <Skeleton className="h-8 w-64 mx-auto mb-4" />
          <Skeleton className="h-4 w-48 mx-auto" />
        </div>
      </Layout>
    );
  }

  if (!order) {
    return (
      <Layout>
        <div className="container py-16 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Order not found</h1>
          <Link to="/shop">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const isBankTransfer = order.payment_method === 'bank_transfer';

  return (
    <Layout>
      <div className="container py-12 md:py-16 max-w-2xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6 animate-fade-in">
            <CheckCircle className="h-10 w-10 text-success" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2 animate-fade-in" style={{ animationDelay: '100ms' }}>
            Order Confirmed!
          </h1>
          <p className="text-muted-foreground animate-fade-in" style={{ animationDelay: '200ms' }}>
            Thank you for your purchase. Your order has been received.
          </p>
        </div>

        {/* Bank Transfer Instructions */}
        {isBankTransfer && (
          <Card className="mb-8 border-primary/50 bg-primary/5 animate-fade-in" style={{ animationDelay: '250ms' }}>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Building2 className="h-6 w-6 text-primary" />
                <h3 className="font-semibold text-lg text-foreground">Bank Transfer Details</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Please transfer {formatPrice(order.total)} to the following account to confirm your order:
              </p>
              <div className="space-y-3 bg-background rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Bank Name</span>
                  <span className="font-medium">State Bank of India</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Account Name</span>
                  <span className="font-medium">Your Store Name</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Account Number</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-medium">1234567890123</span>
                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => copyToClipboard('1234567890123', 'Account number')}>
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">IFSC Code</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-medium">SBIN0001234</span>
                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => copyToClipboard('SBIN0001234', 'IFSC code')}>
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">UPI ID</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-medium">store@upi</span>
                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => copyToClipboard('store@upi', 'UPI ID')}>
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                Please include order #{order.id.slice(0, 8).toUpperCase()} in the payment reference.
              </p>
            </CardContent>
          </Card>
        )}

        {/* COD Instructions */}
        {!isBankTransfer && (
          <Card className="mb-8 border-primary/50 bg-primary/5 animate-fade-in" style={{ animationDelay: '250ms' }}>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <Truck className="h-6 w-6 text-primary" />
                <h3 className="font-semibold text-lg text-foreground">Cash on Delivery</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Please keep {formatPrice(order.total)} ready when your order is delivered. We accept cash and UPI at the door.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Order Details Card */}
        <Card className="mb-8 animate-fade-in" style={{ animationDelay: '300ms' }}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-sm text-muted-foreground">Order Number</p>
                <p className="font-mono font-semibold text-foreground">
                  #{order.id.slice(0, 8).toUpperCase()}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Date</p>
                <p className="font-medium text-foreground">
                  {new Date(order.created_at).toLocaleDateString('en-IN')}
                </p>
              </div>
            </div>

            <Separator className="mb-6" />

            {/* Order Items */}
            <div className="space-y-4 mb-6">
              <h3 className="font-semibold text-foreground">Order Items</h3>
              {order.order_items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    {item.product_name} × {item.quantity}
                  </span>
                  <span className="text-foreground">{formatPrice(item.subtotal)}</span>
                </div>
              ))}
            </div>

            <Separator className="mb-6" />

            {/* Order Totals */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{formatPrice(order.subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span>{order.shipping_cost === 0 ? 'Free' : formatPrice(order.shipping_cost)}</span>
              </div>
              <div className="flex justify-between font-semibold text-lg pt-2">
                <span>Total</span>
                <span>{formatPrice(order.total)}</span>
              </div>
            </div>

            <Separator className="my-6" />

            {/* Shipping Address */}
            <div>
              <h3 className="font-semibold text-foreground mb-2">Shipping Address</h3>
              <p className="text-sm text-muted-foreground">
                {order.customer_name}<br />
                {order.shipping_address}<br />
                {order.city}, {order.postal_code}<br />
                {order.country}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Info Cards */}
        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          <Card className="animate-fade-in" style={{ animationDelay: '400ms' }}>
            <CardContent className="p-4 flex items-start space-x-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="font-medium text-foreground">Confirmation Email</h4>
                <p className="text-sm text-muted-foreground">
                  Order details have been sent to {order.customer_email}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-fade-in" style={{ animationDelay: '500ms' }}>
            <CardContent className="p-4 flex items-start space-x-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Package className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="font-medium text-foreground">Order Status</h4>
                <p className="text-sm text-muted-foreground capitalize">
                  {order.status}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Continue Shopping */}
        <div className="text-center animate-fade-in" style={{ animationDelay: '600ms' }}>
          <Link to="/shop">
            <Button className="gradient-primary border-0">
              Continue Shopping
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
}
