import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { useQuery, useMutation, useReactiveVar } from "@apollo/client";
import { Stack } from "@mui/material";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import withLayoutBasic from "../../libs/components/layout/LayoutBasic";
import FurnitureListPage from "../../libs/components/furniture/FurnitureListPage";
import { GET_FURNITURES } from "../../apollo/user/query";
import { LIKE_TARGET_FURNITURE } from "../../apollo/user/mutation";
import { userVar } from "../../apollo/store";
import {
  FurnituresInquiry,
  FIsearch,
} from "../../libs/types/furniture/furniture.input";
import { Furniture } from "../../libs/types/furniture/furniture";
import { Direction } from "../../libs/enums/common.enum";
import { T } from "../../libs/types/common";
import { sweetMixinErrorAlert } from "../../libs/sweetAlert";
import NewsletterBanner from "../../libs/components/furniture/NewsletterBanner";

const DEFAULT_INQUIRY: FurnituresInquiry = {
  page: 1,
  limit: 12,
  sort: "createdAt",
  direction: Direction.DESC,
  search: {},
};

const FurnitureList = ({ initialInput = DEFAULT_INQUIRY }: any) => {
  const router = useRouter();
  const user = useReactiveVar(userVar);

  const [sortValue, setSortValue] = useState("createdAt_desc");
  const [searchFilter, setSearchFilter] = useState<FIsearch>({});
  const [inquiry, setInquiry] = useState<FurnituresInquiry>(initialInput);
  const [furnitures, setFurnitures] = useState<Furniture[]>([]);
  const [total, setTotal] = useState<number>(0);

  /** APOLLO REQUESTS **/
  const [likeTargetFurniture] = useMutation(LIKE_TARGET_FURNITURE);
  const { loading, refetch: getFurnituresRefetch } = useQuery(GET_FURNITURES, {
    fetchPolicy: "cache-and-network",
    variables: { input: inquiry },
    notifyOnNetworkStatusChange: true,
    onCompleted: (data: T) => {
      setFurnitures(data?.getFurnitures?.list ?? []);
      setTotal(data?.getFurnitures?.metaCounter[0]?.total ?? 0);
    },
  });

  /** LIFECYCLES **/
  useEffect(() => {
    if (router.isReady && router.query.input) {
      const inputObj = JSON.parse(router.query.input as string);
      setInquiry(inputObj);
    }
  }, [router.isReady, router.query.input]);

  useEffect(() => {
    const handler = () => getFurnituresRefetch();
    window.addEventListener("wishlistUpdated", handler);
    return () => window.removeEventListener("wishlistUpdated", handler);
  }, [getFurnituresRefetch]);

  useEffect(() => {
    const productSection = document.querySelector('.main-content');
    if (productSection) {
      const top = productSection.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'instant' });
    }
  }, [inquiry.page]);

  /** HANDLERS **/
  const handlePageChange = useCallback(
    async (page: number) => {
      const updated = { ...inquiry, page };
      setInquiry(updated);
      await router.push(
        `/furniture?input=${JSON.stringify(updated)}`,
        `/furniture?input=${JSON.stringify(updated)}`,
        { scroll: false },
      );
    },
    [inquiry, router],
  );

  const handleSortChange = useCallback((sort: string) => {
    setSortValue(sort);
    let sortField = "createdAt";
    let direction = Direction.DESC;

    switch (sort) {
      case "recommended":
        sortField = "furnitureRank";
        direction = Direction.DESC;
        break;
      case "createdAt_desc":
        sortField = "createdAt";
        direction = Direction.DESC;
        break;
      case "furnitureViews_desc":
        sortField = "furnitureViews";
        direction = Direction.DESC;
        break;
      case "furnitureLikes_desc":
        sortField = "furnitureLikes";
        direction = Direction.DESC;
        break;
      case "furnitureDiscount_desc":
        sortField = "furnitureDiscount";
        direction = Direction.DESC;
        break;
      case "furniturePrice_desc":
        sortField = "furniturePrice";
        direction = Direction.DESC;
        break;
      case "furniturePrice_asc":
        sortField = "furniturePrice";
        direction = Direction.ASC;
        break;
      default:
        sortField = "createdAt";
        direction = Direction.DESC;
    }

    setInquiry((prev) => ({ ...prev, page: 1, sort: sortField, direction }));
  }, []);

  const handleFilterChange = useCallback((search: FIsearch) => {
    setSearchFilter(search);
    setInquiry((prev) => ({ ...prev, page: 1, search }));
  }, []);

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
        await getFurnituresRefetch({ input: inquiry });
        window.dispatchEvent(new Event("wishlistUpdated"));
      } catch (err: any) {
        sweetMixinErrorAlert(err.message);
      }
    },
    [user, router, likeTargetFurniture, getFurnituresRefetch, inquiry],
  );

  return (
    <>
      <Head>
        <title>Shop Furniture — Monolith</title>
        <meta name="description" content="Browse our full collection of luxury furniture. Filter by room, style, material and price." />
        <meta name="keywords" content="furniture shop, luxury furniture, sofas, chairs, tables, beds, home decor" />
        <meta property="og:title" content="Shop Furniture — Monolith" />
        <meta property="og:description" content="Browse our full collection of luxury furniture. Filter by room, style, material and price." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://monolith.com/furniture" />
        <meta property="og:image" content="https://monolith.com/img/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Shop Furniture — Monolith" />
        <meta name="twitter:description" content="Browse our full collection of luxury furniture. Filter by room, style, material and price." />
        <meta name="twitter:image" content="https://monolith.com/img/og-image.jpg" />
        <link rel="canonical" href="https://monolith.com/furniture" />
      </Head>
      <Stack>
        <FurnitureListPage
          furnitures={furnitures}
          total={total}
          page={inquiry.page}
          limit={inquiry.limit}
          loading={loading}
          sortValue={sortValue}
          searchFilter={searchFilter}
          onPageChange={handlePageChange}
          onSortChange={handleSortChange}
          onFilterChange={handleFilterChange}
          onLike={handleLike}
        />
        {/* ===== NEWSLETTER BANNER ===== */}
        <NewsletterBanner variant="furniture" />
      </Stack>
    </>
  );
};

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});

export default withLayoutBasic(FurnitureList);
