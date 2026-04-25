import { ChangeEvent, useEffect, useState } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import Head from "next/head";
import { Stack } from "@mui/material";
import withLayoutBasic from "../../libs/components/layout/LayoutBasic";
import DesignerHero from "../../libs/components/designer/DesignerHero";
import DesignerListSection from "../../libs/components/designer/DesignerListSection";
import { useQuery } from "@apollo/client";
import { GET_DESIGNERS } from "../../apollo/user/query";
import { Member } from "../../libs/types/member/member";
import { DesignersInquiry } from "../../libs/types/member/member.input";
import { Direction } from "../../libs/enums/common.enum";
import { T } from "../../libs/types/common";

const DEFAULT_INQUIRY: DesignersInquiry = {
  page: 1,
  limit: 8,
  sort: "createdAt",
  direction: Direction.ASC,
  search: {},
};

const Designers = ({ initialInput = DEFAULT_INQUIRY }: any) => {
  const router = useRouter();
  const [inquiry, setInquiry] = useState<DesignersInquiry>(initialInput);
  const [designers, setDesigners] = useState<Member[]>([]);
  const [total, setTotal] = useState<number>(0);

  /** APOLLO REQUESTS **/
  useQuery(GET_DESIGNERS, {
    fetchPolicy: "cache-and-network",
    variables: { input: inquiry },
    notifyOnNetworkStatusChange: true,
    onCompleted: (data: T) => {
      setDesigners(data?.getDesigners?.list ?? []);
      setTotal(data?.getDesigners?.metaCounter[0]?.total ?? 0);
    },
  });

  /** LIFECYCLES **/
  useEffect(() => {
    if (router.isReady && router.query.input) {
      const inputObj = JSON.parse(router.query.input as string);
      setInquiry(inputObj);
    }
  }, [router.isReady, router.query.input]);

  /** HANDLERS **/
  const handlePageChange = async (
    _event: ChangeEvent<unknown>,
    page: number,
  ) => {
    const updated = { ...inquiry, page };
    setInquiry(updated);
    await router.push(
      `/member?input=${JSON.stringify(updated)}`,
      `/member?input=${JSON.stringify(updated)}`,
      { scroll: false },
    );
  };

  return (
    <>
      <Head>
        <title>Our Designers — Monolith</title>
        <meta name="description" content="Meet our talented furniture designers and explore their collections." />
        <meta name="keywords" content="furniture designers, interior designers, designer collections, Monolith designers" />
        <meta property="og:title" content="Our Designers — Monolith" />
        <meta property="og:description" content="Meet our talented furniture designers and explore their collections." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://monolith.com/member" />
        <meta property="og:image" content="https://monolith.com/img/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Our Designers — Monolith" />
        <meta name="twitter:description" content="Meet our talented furniture designers and explore their collections." />
        <meta name="twitter:image" content="https://monolith.com/img/og-image.jpg" />
        <link rel="canonical" href="https://monolith.com/member" />
      </Head>
      <Stack className="designers-page">
        <DesignerHero />
        <DesignerListSection
          designers={designers}
          total={total}
          page={inquiry.page}
          limit={inquiry.limit}
          onPageChange={handlePageChange}
        />
      </Stack>
    </>
  );
};

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});

export default withLayoutBasic(Designers);
