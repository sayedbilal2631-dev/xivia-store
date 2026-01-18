"use client";

import { useState } from "react";
import { Box, Card, Stack } from "@mui/material";
import Image from "next/image";

interface Props {
    images: string[];
    thumbnail: string;
}

const ProductGallery = ({ images, thumbnail }: Props) => {
    const imgs = images?.length ? images : [thumbnail];
    const [selected, setSelected] = useState(0);

    return (
        <Box flex={1}>
            <Card sx={{ p: 2 }}>
                <Box
                    sx={{
                        height: 400,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Image
                        src={imgs[selected]}
                        alt="product"
                        width={400}
                        height={400}
                        style={{ objectFit: "contain" }}
                    />
                </Box>

                <Stack direction="row" spacing={1} mt={2}>
                    {imgs.map((img, i) => (
                        <Box
                            key={i}
                            sx={{
                                width: 80,
                                height: 80,
                                border: selected === i ? "2px solid #1976d2" : "1px solid #ccc",
                                cursor: "pointer",
                            }}
                            onClick={() => setSelected(i)}
                        >
                            <Image src={img} alt="" width={80} height={80} />
                        </Box>
                    ))}
                </Stack>
            </Card>
        </Box>
    );
};

export default ProductGallery;
