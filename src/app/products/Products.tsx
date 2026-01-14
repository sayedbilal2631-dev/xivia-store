'use client';

import { Alert, Grid } from '@mui/material';
import GlobalCard from '../components/common/globalCard';
import { useProducts } from '../hooks/prodcuts/useProduct';


const Products = () => {
    // Use React Query instead of useEffect
    const { data: products = [], isLoading, isError } = useProducts();

    if (isLoading) return <Alert severity='info'>Loading products...</Alert>;
    if (isError) return <Alert severity='error'>Error loading products</Alert>;

    return (
        <Grid container spacing={2}>
            {products.map((product) => (
                <Grid key={product.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }} >
                    <GlobalCard data={product} />
                </Grid>
            ))}
        </Grid>
    );
};

export default Products;
