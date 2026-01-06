import { Package, ShoppingCart, DollarSign, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAdminProducts } from '@/hooks/useProducts';
import { useOrders } from '@/hooks/useOrders';

export default function DashboardHome() {
  const { data: products } = useAdminProducts();
  const { data: orders } = useOrders();

  const totalRevenue = orders?.reduce((sum, o) => sum + Number(o.total), 0) || 0;
  const pendingOrders = orders?.filter(o => o.status === 'pending').length || 0;

  const stats = [
    { label: 'Total Products', value: products?.length || 0, icon: Package, color: 'text-blue-500' },
    { label: 'Total Orders', value: orders?.length || 0, icon: ShoppingCart, color: 'text-green-500' },
    { label: 'Revenue', value: `$${totalRevenue.toFixed(2)}`, icon: DollarSign, color: 'text-yellow-500' },
    { label: 'Pending Orders', value: pendingOrders, icon: TrendingUp, color: 'text-red-500' },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-foreground mb-8">Dashboard</h1>
      
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.label}</CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          {orders && orders.length > 0 ? (
            <div className="space-y-4">
              {orders.slice(0, 5).map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                  <div>
                    <p className="font-medium">{order.customer_name}</p>
                    <p className="text-sm text-muted-foreground">{new Date(order.created_at).toLocaleDateString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${Number(order.total).toFixed(2)}</p>
                    <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary capitalize">{order.status}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-8">No orders yet</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
