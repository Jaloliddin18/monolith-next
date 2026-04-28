import { useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { Box, Stack, Typography } from "@mui/material";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useQuery, useMutation, useReactiveVar } from "@apollo/client";
import withLayoutHome from "../libs/components/layout/LayoutHome";
import { GET_FURNITURES } from "../apollo/user/query";
import { LIKE_TARGET_FURNITURE } from "../apollo/user/mutation";
import { userVar } from "../apollo/store";
import { Furniture } from "../libs/types/furniture/furniture";
import { Direction } from "../libs/enums/common.enum";
import { sweetMixinErrorAlert } from "../libs/sweetAlert";
import useDeviceDetect from "../libs/hooks/useDeviceDetect";
import NewsletterBanner from "../libs/components/furniture/NewsletterBanner";

import HeroSection from "../libs/components/homepage/HeroSection";
import IntroSection from "../libs/components/homepage/IntroSection";
import ServicesSection from "../libs/components/homepage/ServicesSection";
import AwesomeServices from "../libs/components/homepage/AwesomeServices";
import NewestChair from "../libs/components/homepage/NewestChair";
import TrendingNow from "../libs/components/homepage/TrendingNow";
import ShopByCategory from "../libs/components/homepage/ShopByCategory";
import SuggestedSection from "../libs/components/homepage/SuggestedSection";
import SaleBanner from "../libs/components/homepage/SaleBanner";
import TopRated from "../libs/components/homepage/TopRated";
import LivingRoom from "../libs/components/homepage/LivingRoom";
import TopSelection from "../libs/components/homepage/TopSelection";
import FaqSection from "../libs/components/homepage/FaqSection";
import InstagramSection from "../libs/components/common/InstagramSection";
import BlogSection from "../libs/components/homepage/BlogSection";
import StoreFinder from "../libs/components/homepage/StoreFinder";

const Home = () => {
  const device = useDeviceDetect();
  const router = useRouter();
  const user = useReactiveVar(userVar);
  const refetchDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [likeTargetFurniture] = useMutation(LIKE_TARGET_FURNITURE);

  const { data: trendingData, loading: trendingLoading, refetch: refetchTrending } = useQuery(
    GET_FURNITURES,
    {
      fetchPolicy: "cache-and-network",
      variables: {
        input: {
          page: 1,
          limit: 6,
          sort: "furnitureTrending",
          direction: Direction.DESC,
          search: {},
        },
      },
      notifyOnNetworkStatusChange: false,
    },
  );

  const { data: topRatedData, loading: topRatedLoading, refetch: refetchTopRated } = useQuery(
    GET_FURNITURES,
    {
      fetchPolicy: "cache-and-network",
      variables: {
        input: {
          page: 1,
          limit: 10,
          sort: "furnitureRank",
          direction: Direction.DESC,
          search: {},
        },
      },
      notifyOnNetworkStatusChange: false,
    },
  );

  const { data: topSelectionData, loading: topSelectionLoading, refetch: refetchTopSelection } = useQuery(
    GET_FURNITURES,
    {
      fetchPolicy: "cache-and-network",
      variables: {
        input: {
          page: 1,
          limit: 6,
          sort: "furnitureRank",
          direction: Direction.DESC,
          search: {},
        },
      },
      notifyOnNetworkStatusChange: false,
    },
  );

  const { data: suggestedData, loading: suggestedLoading, refetch: refetchSuggested } = useQuery(
    GET_FURNITURES,
    {
      fetchPolicy: "cache-and-network",
      variables: {
        input: {
          page: 1,
          limit: 3,
          sort: "furnitureEngagement",
          direction: Direction.DESC,
          search: {},
        },
      },
      notifyOnNetworkStatusChange: false,
    },
  );

  const { data: saleData, loading: saleLoading, refetch: refetchSale } = useQuery(GET_FURNITURES, {
    fetchPolicy: "cache-and-network",
    variables: {
      input: {
        page: 1,
        limit: 10,
        sort: "createdAt",
        direction: Direction.DESC,
        search: { options: ["furnitureOnSale"] },
      },
    },
    notifyOnNetworkStatusChange: false,
  });

  const trendingFurnitures: Furniture[] =
    trendingData?.getFurnitures?.list ?? [];
  const topRatedFurnitures: Furniture[] =
    topRatedData?.getFurnitures?.list ?? [];
  const topSelectionFurnitures: Furniture[] =
    topSelectionData?.getFurnitures?.list ?? [];
  const suggestedFurnitures: Furniture[] =
    suggestedData?.getFurnitures?.list ?? [];
  const saleFurnitures: Furniture[] = saleData?.getFurnitures?.list ?? [];

  useEffect(() => {
    const handler = () => {
      if (refetchDebounceRef.current) clearTimeout(refetchDebounceRef.current);
      refetchDebounceRef.current = setTimeout(() => {
        refetchTrending();
        refetchTopRated();
        refetchTopSelection();
        refetchSuggested();
        refetchSale();
      }, 300);
    };
    window.addEventListener("wishlistUpdated", handler);
    return () => {
      window.removeEventListener("wishlistUpdated", handler);
      if (refetchDebounceRef.current) clearTimeout(refetchDebounceRef.current);
    };
  }, [
    refetchTrending,
    refetchTopRated,
    refetchTopSelection,
    refetchSuggested,
    refetchSale,
  ]);

  const handleLike = useCallback(
    async (id: string) => {
      try {
        if (!user?._id) {
          router.push("/account/join");
          return;
        }
        await likeTargetFurniture({
          variables: { input: id },
          fetchPolicy: "network-only",
        });
        window.dispatchEvent(new Event("wishlistUpdated"));
      } catch (err: any) {
        sweetMixinErrorAlert(err.message);
      }
    },
    [user, router, likeTargetFurniture],
  );

  if (!device) return null;

  if (device === 'mobile') {
    return (
      <>
        <Head>
          <title>Monolith — Luxury Furniture & Designer Marketplace</title>
          <meta name="description" content="Discover premium furniture and designer pieces at Monolith. Shop luxury sofas, chairs, tables and more from top designers." />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <Stack className="home-page-mobile">
          {/* Task 1 — Mobile Hero */}
          <Box className="mobile-hero">
            <img src="/img/homepage/home_hero.webp" alt="Luxury Furniture" className="mobile-hero-img" />
            <Box className="mobile-hero-overlay" />
            <Stack className="mobile-hero-content">
              <Typography className="mobile-hero-title">Luxury Furniture</Typography>
              <Typography className="mobile-hero-subtitle">Premium designs for your home</Typography>
              <button className="mobile-hero-btn" onClick={() => router.push('/furniture')}>
                Shop Now
              </button>
            </Stack>
          </Box>

          {/* Task 2 — Trending Now */}
          <TrendingNow trendFurnitures={trendingFurnitures} loading={trendingLoading} onLike={handleLike} />

          {/* Task 3 — Top Rated */}
          <TopRated furnitures={topRatedFurnitures} loading={topRatedLoading} onLike={handleLike} />

          {/* Task 4 — Sale Banner */}
          <SaleBanner furnitures={saleFurnitures} loading={saleLoading} onLike={handleLike} />

          {/* Task 5 — Blog Section */}
          <BlogSection />

          <NewsletterBanner variant="furniture" />
        </Stack>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Monolith — Luxury Furniture & Designer Marketplace</title>
        <meta
          name="description"
          content="Discover premium furniture and designer pieces at Monolith. Shop luxury sofas, chairs, tables and more from top designers."
        />
        <meta
          name="keywords"
          content="luxury furniture, designer furniture, sofa, chair, table, home decor, interior design"
        />
        <meta
          property="og:title"
          content="Monolith — Luxury Furniture & Designer Marketplace"
        />
        <meta
          property="og:description"
          content="Discover premium furniture and designer pieces at Monolith."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://monolith.com" />
        <meta property="og:image" content="/img/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Monolith — Luxury Furniture & Designer Marketplace"
        />
        <meta
          name="twitter:description"
          content="Discover premium furniture and designer pieces at Monolith."
        />
        <meta name="twitter:image" content="https://monolith.com/img/og-image.jpg" />
        <link rel="canonical" href="https://monolith.com" />
      </Head>
      <Stack id="home-page">
        <HeroSection />
        <TopRated furnitures={topRatedFurnitures} loading={topRatedLoading} onLike={handleLike} />
        <ServicesSection />
        <AwesomeServices />
        <NewestChair />
        <TrendingNow trendFurnitures={trendingFurnitures} loading={trendingLoading} onLike={handleLike} />
        <ShopByCategory />
        <SuggestedSection
          furnitures={suggestedFurnitures}
          loading={suggestedLoading}
          onLike={handleLike}
        />
        <SaleBanner furnitures={saleFurnitures} loading={saleLoading} onLike={handleLike} />
        <IntroSection />
        <LivingRoom />
        <TopSelection furnitures={topSelectionFurnitures} loading={topSelectionLoading} onLike={handleLike} />
        <StoreFinder />
        <FaqSection />
        <InstagramSection />
        <BlogSection />
      </Stack>
    </>
  );
};

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});

export default withLayoutHome(Home);
