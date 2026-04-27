import React, { useRef } from "react";
import { Stack, Typography, Skeleton } from "@mui/material";
import { Furniture } from "../../types/furniture/furniture";
import ProductCard from "../common/ProductCard";
import useDeviceDetect from "../../hooks/useDeviceDetect";

interface HardcodedProduct {
  _id: string;
  furnitureTitle: string;
  furniturePrice: number;
  furnitureImages: string[];
  furnitureBestseller: boolean;
  furnitureDiscount: number;
  furnitureLikes: number;
  isOutOfStock: boolean;
  rating: number;
  reviewCount: number;
  originalPrice?: number;
}

const hardcodedProducts: HardcodedProduct[] = [
  {
    _id: "trending-1",
    furnitureTitle: "Upholstered Armchair",
    furniturePrice: 279.2,
    furnitureImages: [],
    furnitureBestseller: true,
    furnitureDiscount: 0,
    furnitureLikes: 215,
    isOutOfStock: false,
    rating: 4.5,
    reviewCount: 215,
    originalPrice: 349,
  },
  {
    _id: "trending-2",
    furnitureTitle: "Wooden Showpiece Table",
    furniturePrice: 32.1,
    furnitureImages: [],
    furnitureBestseller: false,
    furnitureDiscount: 0,
    furnitureLikes: 12125,
    isOutOfStock: false,
    rating: 4.4,
    reviewCount: 12125,
    originalPrice: 68.35,
  },
  {
    _id: "trending-3",
    furnitureTitle: "Leather Reclining",
    furniturePrice: 799.2,
    furnitureImages: [],
    furnitureBestseller: false,
    furnitureDiscount: 0,
    furnitureLikes: 1587,
    isOutOfStock: true,
    rating: 4.6,
    reviewCount: 1587,
    originalPrice: 999,
  },
  {
    _id: "trending-4",
    furnitureTitle: "Rustic Wooden Chair",
    furniturePrice: 89.99,
    furnitureImages: [],
    furnitureBestseller: false,
    furnitureDiscount: 0,
    furnitureLikes: 12125,
    isOutOfStock: false,
    rating: 4.2,
    reviewCount: 12125,
  },
  {
    _id: "trending-5",
    furnitureTitle: "Wooden Ceiling Lamp",
    furniturePrice: 47.2,
    furnitureImages: [],
    furnitureBestseller: false,
    furnitureDiscount: 20,
    furnitureLikes: 165,
    isOutOfStock: false,
    rating: 4.3,
    reviewCount: 165,
    originalPrice: 59,
  },
  {
    _id: "trending-6",
    furnitureTitle: "Adjustable Standing Desk",
    furniturePrice: 159.99,
    furnitureImages: [],
    furnitureBestseller: false,
    furnitureDiscount: 0,
    furnitureLikes: 8068,
    isOutOfStock: false,
    rating: 4.8,
    reviewCount: 8068,
  },
];

interface TrendingNowProps {
  trendFurnitures?: Furniture[];
  onLike?: (id: string) => void;
  loading?: boolean;
}

const TrendingNow = ({ trendFurnitures, onLike, loading }: TrendingNowProps) => {
  const device = useDeviceDetect();
  const scrollRef = useRef<HTMLDivElement>(null);
  const mobileScrollRef = useRef<HTMLDivElement>(null);
  const products =
    trendFurnitures && trendFurnitures.length > 0 ? trendFurnitures : null;

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -320, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 320, behavior: "smooth" });
  };

  const scrollMobileLeft = () => {
    mobileScrollRef.current?.scrollBy({ left: -(window.innerWidth - 32), behavior: "smooth" });
  };

  const scrollMobileRight = () => {
    mobileScrollRef.current?.scrollBy({ left: window.innerWidth - 32, behavior: "smooth" });
  };

  if (device === 'mobile') {
    const displayItems = products ? products.slice(0, 6) : hardcodedProducts;
    return (
      <Stack className="trending-mobile">
        <Stack className="section-header-mobile">
          <Typography className="section-title-mobile">Trending Now</Typography>
          <Stack direction="row" gap={1} className="mobile-arrows-row">
            <button className="mobile-arrow" onClick={scrollMobileLeft} aria-label="Previous">←</button>
            <button className="mobile-arrow" onClick={scrollMobileRight} aria-label="Next">→</button>
          </Stack>
        </Stack>
        {loading ? (
          <div className="mobile-scroll-container">
            {[...Array(2)].map((_, i) => (
              <div className="mobile-card-item" key={i}>
                <Skeleton variant="rectangular" width="100%" height={280} sx={{ borderRadius: '8px' }} />
              </div>
            ))}
          </div>
        ) : (
          <div ref={mobileScrollRef} className="mobile-scroll-container">
            {displayItems.map((item) => (
              <div className="mobile-card-item" key={item._id}>
                <ProductCard
                  furniture={item as unknown as Furniture}
                  size="small"
                  onLike={onLike}
                  isOutOfStock={(item as any).isOutOfStock}
                  rating={(item as any).rating}
                  reviewCount={(item as any).reviewCount}
                  originalPrice={(item as any).originalPrice}
                />
              </div>
            ))}
          </div>
        )}
      </Stack>
    );
  }

  return (
    <Stack className="trending-section" gap="50px">
      <Stack
        className="trending-header"
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography className="section-title-text">Trending Now</Typography>
        <div className="section-nav-arrows">
          <button
            className="section-arrow section-arrow--prev"
            onClick={scrollLeft}
            aria-label="Previous trending products"
          >
            ←
          </button>
          <button
            className="section-arrow section-arrow--next"
            onClick={scrollRight}
            aria-label="Next trending products"
          >
            →
          </button>
        </div>
      </Stack>

      {loading ? (
        <div style={{ display: "flex", gap: "24px" }}>
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} variant="rectangular" width="25%" height={380} sx={{ borderRadius: "8px" }} />
          ))}
        </div>
      ) : (
        <div className="section-swiper-wrap">
          <div ref={scrollRef} className="section-scroll-container">
            {products
              ? products.slice(0, 6).map((furniture) => (
                  <div className="section-scroll-item" key={furniture._id}>
                    <ProductCard furniture={furniture} size="small" onLike={onLike} />
                  </div>
                ))
              : hardcodedProducts.map((item) => (
                  <div className="section-scroll-item" key={item._id}>
                    <ProductCard
                      furniture={item as unknown as Furniture}
                      size="small"
                      isOutOfStock={item.isOutOfStock}
                      rating={item.rating}
                      reviewCount={item.reviewCount}
                      originalPrice={item.originalPrice}
                      onLike={onLike}
                    />
                  </div>
                ))}
          </div>
        </div>
      )}
    </Stack>
  );
};

export default TrendingNow;
