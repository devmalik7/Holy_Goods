import { Shield, Award, Users, Heart } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent } from '@/components/ui/card';

export default function About() {
  const values = [
    {
      icon: Shield,
      title: 'Quality First',
      description: 'Every product meets our rigorous quality standards before reaching you.',
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'We strive for excellence in every aspect of our service and products.',
    },
    {
      icon: Users,
      title: 'Customer Focus',
      description: 'Your satisfaction is our top priority. We listen and we deliver.',
    },
    {
      icon: Heart,
      title: 'Passion',
      description: 'We are passionate about bringing you the best products available.',
    },
  ];

  return (
    <Layout>
      <div className="container py-12 md:py-20">
        {/* Hero */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            About Us
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            We are a premium e-commerce destination committed to bringing you the finest quality products. 
            Our mission is to provide an exceptional shopping experience with products you can trust.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
            <span className="text-8xl">🏪</span>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-6">Our Story</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Founded with a simple vision: to make premium products accessible to everyone. 
                We believe that quality should never be compromised, and that every customer 
                deserves an exceptional shopping experience.
              </p>
              <p>
                What started as a small venture has grown into a trusted destination for 
                discerning customers who value quality and reliability. Our team works 
                tirelessly to curate the best products and ensure every order meets our 
                high standards.
              </p>
              <p>
                We're not just a store – we're your partner in finding products that 
                enhance your life. Thank you for being part of our journey.
              </p>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">Our Values</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={value.title} className="text-center animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <CardContent className="pt-6">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="bg-secondary rounded-2xl p-8 md:p-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">10K+</div>
              <div className="text-sm text-muted-foreground">Happy Customers</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">500+</div>
              <div className="text-sm text-muted-foreground">Products</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">99%</div>
              <div className="text-sm text-muted-foreground">Satisfaction Rate</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">24/7</div>
              <div className="text-sm text-muted-foreground">Support</div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
