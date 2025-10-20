import React from 'react';
import { Grid, Card, CardContent, Typography, Box, alpha } from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  ShoppingCart,
  AttachMoney,
  People,
  Inventory,
} from '@mui/icons-material';
import { StatsCardProps } from '@/app/collections/types';

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon, trend, color }) => {
  const isPositive = trend >= 0;

  return (
    <Card sx={{ height: '100%', background: `linear-gradient(135deg, ${alpha(color, 0.1)} 0%, ${alpha(color, 0.05)} 100%)` }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box>
            <Typography color="textSecondary" gutterBottom variant="overline">
              {title}
            </Typography>
            <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
              {value}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
              {isPositive ? (
                <TrendingUp sx={{ color: 'success.main', fontSize: 16, mr: 0.5 }} />
              ) : (
                <TrendingDown sx={{ color: 'error.main', fontSize: 16, mr: 0.5 }} />
              )}
              <Typography
                variant="body2"
                sx={{ color: isPositive ? 'success.main' : 'error.main' }}
              >
                {isPositive ? '+' : ''}{trend}% from last month
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              p: 1,
              borderRadius: 2,
              backgroundColor: alpha(color, 0.1),
              color: color,
            }}
          >
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

const StatsCards: React.FC = () => {
  const statsData: StatsCardProps[] = [
    {
      title: 'TOTAL REVENUE',
      value: '$24,580',
      icon: <AttachMoney />,
      trend: 12.5,
      color: '#10b981',
    },
    {
      title: 'TOTAL ORDERS',
      value: '1,248',
      icon: <ShoppingCart />,
      trend: 8.2,
      color: '#3b82f6',
    },
    {
      title: 'TOTAL CUSTOMERS',
      value: '5,642',
      icon: <People />,
      trend: -2.1,
      color: '#8b5cf6',
    },
    {
      title: 'PRODUCTS SOLD',
      value: '8,452',
      icon: <Inventory />,
      trend: 15.3,
      color: '#f59e0b',
    },
  ];

  return (
    <Grid container spacing={3}>
      {statsData.map((stat, index) => (
        <Grid size={{xs:12, sm:6, md:3}} key={index}>
          <StatsCard {...stat} />
        </Grid>
      ))}
    </Grid>
  );
};

export default StatsCards;