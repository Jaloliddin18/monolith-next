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
        <meta
          name="description"
          content="Read articles, tips and design inspiration from the Monolith furniture community."
        />
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
