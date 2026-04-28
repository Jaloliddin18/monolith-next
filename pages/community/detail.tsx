import React from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Stack, Typography } from "@mui/material";
import withLayoutBasic from "../../libs/components/layout/LayoutBasic";
import useDeviceDetect from "../../libs/hooks/useDeviceDetect";
import ArticleContent from "../../libs/components/blog/ArticleContent";
import ArticleComments from "../../libs/components/blog/ArticleComments";
import RelatedPostsSection from "../../libs/components/blog/RelatedPostsSection";
import { useRouter } from "next/router";
import Head from "next/head";

const CommunityDetail = () => {
  const device = useDeviceDetect();
  const router = useRouter();
  const articleId = router.query?.articleId as string;
  const articleTitle = "Community Article — Monolith Blog";
  const articleDescription = "Read articles, tips and design inspiration from the Monolith furniture community.";
  const articleImage = "https://monolith.com/img/og-image.jpg";
  const canonical = `https://monolith.com/community/detail?articleId=${articleId ?? ""}`;

  if (!device) return null;

  if (device === 'mobile') {
    return (
      <Stack className="mobile-page-placeholder">
        <Typography className="mobile-page-title">Article</Typography>
        <Typography className="mobile-page-subtitle">Mobile version coming soon</Typography>
      </Stack>
    );
  }

  return (
    <>
      <Head>
        <title>{articleTitle}</title>
        <meta name="description" content={articleDescription} />
        <meta name="keywords" content="article, furniture blog, design inspiration, Monolith community" />
        <meta property="og:title" content={articleTitle} />
        <meta property="og:description" content={articleDescription} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content={articleImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={articleTitle} />
        <meta name="twitter:description" content={articleDescription} />
        <meta name="twitter:image" content={articleImage} />
        <link rel="canonical" href={canonical} />
      </Head>
      <Stack className="blog-detail-page">
        <ArticleContent articleId={articleId} />
        <ArticleComments articleId={articleId} />
        <RelatedPostsSection articleId={articleId} />
      </Stack>
    </>
  );
};

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});

export default withLayoutBasic(CommunityDetail);
