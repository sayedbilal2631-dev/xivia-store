import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Chip,
  Box,
  Rating,
} from '@mui/material';
import { Product } from '@/app/collections/types';


const ProductPerformance: React.FC = () => {
  const products: Product[] = [
    {
      id: '1',
      name: 'Wireless Earbuds Pro',
      category: 'Electronics',
      price: 89.99,
      stock: 45,
      sales: 234,
      rating: 4.5,
    },
    {
      id: '2',
      name: 'Smart Fitness Watch',
      category: 'Wearables',
      price: 199.99,
      stock: 12,
      sales: 189,
      rating: 4.2,
    },
    {
      id: '3',
      name: 'USB-C Charging Cable',
      category: 'Accessories',
      price: 19.99,
      stock: 156,
      sales: 542,
      rating: 4.7,
    },
    {
      id: '4',
      name: 'Laptop Stand Aluminum',
      category: 'Accessories',
      price: 45.5,
      stock: 23,
      sales: 87,
      rating: 4.3,
    },
  ];

  const getStockColor = (stock: number) => {
    if (stock > 50) return 'success';
    if (stock > 20) return 'warning';
    return 'error';
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold', mb: 3 }}>
          Top Products
        </Typography>
        
        <List>
          {products.map((product) => (
            <ListItem key={product.id} divider>
              <ListItemText
                primary={
                  <Typography component={'span'} sx={{ fontWeight: 'medium' }}>
                    {product.name}
                  </Typography>
                }
                secondary={
                  <Box component={'span'} sx={{ mt: 0.5 }}>
                    <Rating value={product.rating} size="small" readOnly />
                    <Typography component={'span'} color="textSecondary">
                      ${product.price} • {product.sales} sold
                    </Typography>
                  </Box>
                }
              />
              <ListItemSecondaryAction>
                <Chip
                  label={`${product.stock} in stock`}
                  color={getStockColor(product.stock)}
                  size="small"
                  variant="outlined"
                />
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default ProductPerformance;