import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Box,
} from '@mui/material';
import { Visibility as ViewIcon } from '@mui/icons-material';
import { Order } from '@/app/collections/types';

const RecentOrders: React.FC = () => {
  const orders: Order[] = [
    {
      id: '#ORD-001',
      product: 'Wireless Earbuds',
      customer: 'John Smith',
      date: '2024-01-15',
      amount: 89.99,
      status: 'completed',
    },
    {
      id: '#ORD-002',
      product: 'Smart Watch',
      customer: 'Sarah Johnson',
      date: '2024-01-15',
      amount: 199.99,
      status: 'pending',
    },
    {
      id: '#ORD-003',
      product: 'Laptop Stand',
      customer: 'Mike Chen',
      date: '2024-01-14',
      amount: 45.5,
      status: 'completed',
    },
    {
      id: '#ORD-004',
      product: 'Phone Case',
      customer: 'Emily Davis',
      date: '2024-01-14',
      amount: 24.99,
      status: 'cancelled',
    },
    {
      id: '#ORD-005',
      product: 'Bluetooth Speaker',
      customer: 'Alex Thompson',
      date: '2024-01-13',
      amount: 129.99,
      status: 'completed',
    },
  ];

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'pending':
        return 'warning';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold' }}>
            Recent Orders
          </Typography>
          <Typography variant="body2" color="primary" sx={{ cursor: 'pointer' }}>
            View All
          </Typography>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell>Product</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id} hover>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                      {order.id}
                    </Typography>
                  </TableCell>
                  <TableCell>{order.product}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>${order.amount}</TableCell>
                  <TableCell>
                    <Chip
                      label={order.status}
                      color={getStatusColor(order.status)}
                      size="small"
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton size="small">
                      <ViewIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default RecentOrders;