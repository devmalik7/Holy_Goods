import { useState, useRef } from 'react';
import { Plus, Pencil, Trash2, Loader2, Upload, X } from 'lucide-react';
import { useAdminProducts, useCreateProduct, useUpdateProduct, useDeleteProduct } from '@/hooks/useProducts';
import { useImageUpload } from '@/hooks/useImageUpload';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Product } from '@/types';

export default function ProductsPage() {
  const { data: products, isLoading } = useAdminProducts();
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();
  const { uploadImage, isUploading } = useImageUpload();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: '', description: '', price: '', stock: '', category: '', image_url: '', featured: false, active: true
  });

  const resetForm = () => {
    setFormData({ name: '', description: '', price: '', stock: '', category: '', image_url: '', featured: false, active: true });
    setEditingProduct(null);
  };

  const openEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description || '',
      price: String(product.price),
      stock: String(product.stock),
      category: product.category || '',
      image_url: product.image_url || '',
      featured: product.featured,
      active: product.active,
    });
    setIsDialogOpen(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const url = await uploadImage(file);
    if (url) {
      setFormData({ ...formData, image_url: url });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      name: formData.name,
      description: formData.description || null,
      price: parseFloat(formData.price) || 0,
      stock: parseInt(formData.stock) || 0,
      category: formData.category || null,
      image_url: formData.image_url || null,
      featured: formData.featured,
      active: formData.active,
    };

    if (editingProduct) {
      await updateProduct.mutateAsync({ id: editingProduct.id, ...data });
    } else {
      await createProduct.mutateAsync(data);
    }
    setIsDialogOpen(false);
    resetForm();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-foreground">Products</h1>
        <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if (!open) resetForm(); }}>
          <DialogTrigger asChild>
            <Button className="gradient-primary border-0"><Plus className="h-4 w-4 mr-2" />Add Product</Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingProduct ? 'Edit Product' : 'Add Product'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Image Upload */}
              <div className="space-y-2">
                <Label>Product Image</Label>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  className="hidden"
                />
                {formData.image_url ? (
                  <div className="relative w-full h-40 rounded-lg overflow-hidden bg-secondary">
                    <img src={formData.image_url} alt="Product" className="w-full h-full object-cover" />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2"
                      onClick={() => setFormData({ ...formData, image_url: '' })}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full h-40 border-dashed"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                  >
                    {isUploading ? (
                      <Loader2 className="h-6 w-6 animate-spin" />
                    ) : (
                      <div className="flex flex-col items-center gap-2">
                        <Upload className="h-8 w-8 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Click to upload image</span>
                      </div>
                    )}
                  </Button>
                )}
              </div>

              <div><Label>Name *</Label><Input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required /></div>
              <div><Label>Description</Label><Textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} rows={4} /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><Label>Price *</Label><Input type="number" step="0.01" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} required /></div>
                <div><Label>Stock *</Label><Input type="number" value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})} required /></div>
              </div>
              <div><Label>Category</Label><Input value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} placeholder="e.g., Electronics, Clothing" /></div>
              <div className="flex items-center justify-between">
                <Label>Featured Product</Label><Switch checked={formData.featured} onCheckedChange={v => setFormData({...formData, featured: v})} />
              </div>
              <div className="flex items-center justify-between">
                <Label>Active (Visible in shop)</Label><Switch checked={formData.active} onCheckedChange={v => setFormData({...formData, active: v})} />
              </div>
              <Button type="submit" className="w-full gradient-primary border-0" disabled={createProduct.isPending || updateProduct.isPending || isUploading}>
                {(createProduct.isPending || updateProduct.isPending) && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                {editingProduct ? 'Update' : 'Create'} Product
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="flex items-center justify-center py-12"><Loader2 className="h-8 w-8 animate-spin" /></div>
          ) : products && products.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center overflow-hidden">
                          {product.image_url ? <img src={product.image_url} className="w-full h-full object-cover" alt={product.name} /> : '📦'}
                        </div>
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-xs text-muted-foreground">{product.category || 'Uncategorized'}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">${Number(product.price).toFixed(2)}</TableCell>
                    <TableCell>
                      <span className={product.stock < 10 ? 'text-destructive font-medium' : ''}>{product.stock}</span>
                    </TableCell>
                    <TableCell>
                      <span className={`text-xs px-2 py-1 rounded-full ${product.active ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-muted text-muted-foreground'}`}>
                        {product.active ? 'Active' : 'Inactive'}
                      </span>
                      {product.featured && (
                        <span className="ml-2 text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">Featured</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" onClick={() => openEdit(product)}><Pencil className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="icon" className="text-destructive" onClick={() => deleteProduct.mutate(product.id)}><Trash2 className="h-4 w-4" /></Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-center py-12 text-muted-foreground">No products yet. Add your first product!</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
