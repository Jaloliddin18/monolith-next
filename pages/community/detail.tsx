import React from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Stack } from "@mui/material";
import withLayoutBasic from "../../libs/components/layout/LayoutBasic";
import ArticleContent from "../../libs/components/blog/ArticleContent";
import ArticleComments from "../../libs/components/blog/ArticleComments";
import RelatedPostsSection from "../../libs/components/blog/RelatedPostsSection";
import { useRouter } from "next/router";
import Head from "next/head";
import { useQuery } from "@apollo/client";
import { GET_BOARD_ARTICLE } from "../../apollo/user/query";

const CommunityDetail = () => {
  const router = useRouter();
  const articleId = router.query?.articleId as string;
  const { data } = useQuery(GET_BOARD_ARTICLE, {
    variables: { input: articleId },
    skip: !articleId,
    fetchPolicy: "cache-and-network",
  });

  const article = data?.getBoardArticle;
  const articleTitle = `${article?.articleTitle ?? "Community Article"} — Monolith Blog`;
  const articleDescription =
    article?.articleContent?.slice(0, 160) ??
    "Read articles, tips and design inspiration from the Monolith furniture community.";
  const canonical = `https://monolith.com/community/detail?articleId=${articleId ?? ""}`;

  return (
    <>
      <Head>
        <title>{articleTitle}</title>
        <meta name="description" content={articleDescription} />
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
