import { Box, Typography, Select, MenuItem, FormControl, Card, CardContent } from '@mui/material'
import { ArrowDropDown, Inventory } from '@mui/icons-material';
import GetProduct from '../FetchProduct/GetProduct';
import React, { useState } from 'react'

const Product = ({ isProduct }: any) => {
    const [sortOption, setSortOption] = useState('mostRecent');
    const handleSortChange = (event: any) => {
        setSortOption(event.target.value);
    };
    return (
        <div>
            <Box >

                {/* Sort Header */}
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 3,
                    p: 2,
                    bgcolor: 'grey.50',
                    borderRadius: 1
                }}>
                    <Typography variant="body2" color="text.secondary">
                        Showing products
                    </Typography>
                    <FormControl size="small" sx={{ minWidth: 150 }}>
                        <Select
                            value={sortOption}
                            onChange={handleSortChange}
                            displayEmpty
                            inputProps={{ 'aria-label': 'Without label' }}
                            IconComponent={ArrowDropDown}
                            variant="standard"
                            disableUnderline
                            sx={{
                                fontSize: '0.875rem',
                                border: 'none',
                                '& .MuiSelect-select': { py: 1 }
                            }}
                        >
                            <MenuItem value="mostRecent">Most Recent</MenuItem>
                            <MenuItem value="highestPrice">Highest Price</MenuItem>
                            <MenuItem value="lowestPrice">Lowest Price</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                {/* Empty State */}
                <Card variant="outlined">
                    <CardContent sx={{
                        textAlign: 'center',
                        py: 8,
                        color: 'text.secondary'
                    }}>
                        {isProduct == true ? <GetProduct filter={sortOption} />
                            : <>
                                <Inventory sx={{ fontSize: 64, mb: 2, opacity: 0.5 }} />
                                <Typography variant="h6" gutterBottom>
                                    No items listed at this time
                                </Typography>
                                <Typography variant="body2">
                                    Check back later for new items from this shop.
                                </Typography>
                            </>}
                    </CardContent>
                </Card>
            </Box>
        </div>
    )
}

export default Product