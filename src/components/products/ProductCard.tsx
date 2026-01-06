import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(price);
  };

  return (
    <Card className="group overflow-hidden hover-lift border-border/50 bg-card">
      <Link to={`/product/${product.id}`}>
        <div className="aspect-square overflow-hidden bg-secondary">
          {product.image_url ? (
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              <span className="text-4xl">📦</span>
            </div>
          )}
        </div>
      </Link>
      <CardContent className="p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-medium text-foreground truncate hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        {product.category && (
          <p className="text-xs text-muted-foreground mt-1">{product.category}</p>
        )}
        <div className="flex items-center justify-between mt-3">
          <span className="text-lg font-semibold text-foreground">
            {formatPrice(product.price)}
          </span>
          <Button
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              addToCart(product);
            }}
            disabled={product.stock === 0}
            className="gradient-primary border-0"
          >
            <ShoppingCart className="h-4 w-4 mr-1" />
            {product.stock === 0 ? 'Out of Stock' : 'Add'}
          </Button>
        </div>
        {product.stock > 0 && product.stock <= 5 && (
          <p className="text-xs text-warning mt-2">Only {product.stock} left!</p>
        )}
      </CardContent>
    </Card>
  );
}
