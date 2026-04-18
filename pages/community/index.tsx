import React from "react";
import Head from "next/head";
import { Stack } from "@mui/material";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import withLayoutBasic from "../../libs/components/layout/LayoutBasic";
import BlogListSection from "../../libs/components/blog/BlogListSection";
import TrendingArticlesSection from "../../libs/components/blog/TrendingArticlesSection";
import InstagramSection from "../../libs/components/common/InstagramSection";
import NewsletterBanner from "../../libs/components/furniture/NewsletterBanner";

const Community = () => {
  return (
    <>
      <Head>
        <title>Community & Blog — Monolith</title>
        <meta name="description" content="Read articles, tips and design inspiration from the Monolith furniture community." />
        <meta name="keywords" content="furniture blog, interior design tips, home decor articles, design inspiration, Monolith community" />
        <meta property="og:title" content="Community & Blog — Monolith" />
        <meta property="og:description" content="Read articles, tips and design inspiration from the Monolith furniture community." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://monolith.com/community" />
        <meta property="og:image" content="https://monolith.com/img/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Community & Blog — Monolith" />
        <meta name="twitter:description" content="Read articles, tips and design inspiration from the Monolith furniture community." />
        <meta name="twitter:image" content="https://monolith.com/img/og-image.jpg" />
        <link rel="canonical" href="https://monolith.com/community" />
      </Head>
      <Stack className="community-page">
        <BlogListSection />
        <TrendingArticlesSection />
        <InstagramSection />
        {/* ===== NEWSLETTER BANNER ===== */}
        <NewsletterBanner variant="community" />
      </Stack>
    </>
  );
};

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});

export default withLayoutBasic(Community);
