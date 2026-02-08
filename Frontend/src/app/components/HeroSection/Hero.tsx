"use client"
import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { 
  Box, 
  IconButton, 
  Card
} from "@mui/material";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

export default function SimpleSlider() {
  const sliderRef = useRef<Slider>(null);

  // React Slick settings
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    fade: true,
    cssEase: 'linear'
  };

  const carouselItems = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      alt: "Luxury Villa with Ocean View"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      alt: "Modern Downtown Apartment"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      alt: "Mountain Retreat Cabin"
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      alt: "Beachfront Paradise"
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      alt: "Historic City Loft"
    }
  ];

  const next = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  const previous = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  return (
    <Box 
      sx={{ 
        width: '100%',
        mx: 'auto',  
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Navigation Buttons */}
      <IconButton
        onClick={previous}
        sx={{
          position: 'absolute',
          left: 16,
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 20,
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            transform: 'translateY(-50%) scale(1.1)',
          },
          width: 56,
          height: 56,
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          transition: 'all 0.3s ease',
        }}
      >
        <ChevronLeft sx={{ fontSize: 28 }} />
      </IconButton>

      <IconButton
        onClick={next}
        sx={{
          position: 'absolute',
          right: 16,
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 20,
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            transform: 'translateY(-50%) scale(1.1)',
          },
          width: 56,
          height: 56,
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          transition: 'all 0.3s ease',
        }}
      >
        <ChevronRight sx={{ fontSize: 28 }} />
      </IconButton>

      <Slider ref={sliderRef} {...settings}>
        {carouselItems.map((item, index) => (
          <Box key={item.id} sx={{ position: 'relative' }}>
            <Card 
              sx={{ 
                position: 'relative', 
                height: { xs: '400px', md: '500px' },
                borderRadius: 0,
                boxShadow: 'none',
              }}
            >
              <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  style={{
                    objectFit: 'cover',
                    objectPosition: 'center',
                  }}
                  priority={index === 0}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                />
              </Box>
            </Card>
          </Box>
        ))}
      </Slider>
    </Box>
  );
}