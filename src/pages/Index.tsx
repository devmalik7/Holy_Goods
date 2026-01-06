import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Truck, CreditCard, Headphones } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Layout } from '@/components/layout/Layout';
import { ProductGrid } from '@/components/products/ProductGrid';
import { useProducts } from '@/hooks/useProducts';

export default function Index() {
  const { data: featuredProducts, isLoading } = useProducts({ featured: true });

  const features = [
    {
      icon: Shield,
      title: 'Quality Assured',
      description: 'All products meet strict quality standards',
    },
    {
      icon: Truck,
      title: 'Fast Shipping',
      description: 'Free delivery on orders over $50',
    },
    {
      icon: CreditCard,
      title: 'Secure Payment',
      description: 'Your transactions are always protected',
    },
    {
      icon: Headphones,
      title: '24/7 Support',
      description: 'Dedicated customer service team',
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-secondary via-background to-secondary">
        <div className="container py-20 md:py-32">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium rounded-full bg-primary/10 text-primary">
              Premium Quality Products
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Discover Excellence in Every Product
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Shop our curated collection of premium products. Quality you can trust, service you can rely on.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/shop">
                <Button size="lg" className="gradient-primary border-0 text-primary-foreground px-8">
                  Shop Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" variant="outline" className="px-8">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </section>

      {/* Features Section */}
      <section className="py-16 bg-card border-y border-border">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="flex items-start space-x-4 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-foreground">Featured Products</h2>
              <p className="text-muted-foreground mt-2">Handpicked selections just for you</p>
            </div>
            <Link to="/shop">
              <Button variant="outline">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <ProductGrid products={featuredProducts || []} loading={isLoading} />
          
          {!isLoading && (!featuredProducts || featuredProducts.length === 0) && (
            <div className="text-center py-16 bg-secondary/50 rounded-xl">
              <div className="text-6xl mb-4">🛍️</div>
              <h3 className="text-xl font-semibold text-foreground mb-2">No products yet</h3>
              <p className="text-muted-foreground mb-6">
                Products will appear here once added by the admin.
              </p>
              <Link to="/auth">
                <Button variant="outline">Sign in as Admin</Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Shop?
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers. Start your shopping journey today.
          </p>
          <Link to="/shop">
            <Button size="lg" variant="secondary" className="px-8">
              Browse Products
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
