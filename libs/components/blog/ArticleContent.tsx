import React, { useState } from "react";
import { Stack } from "@mui/material";
import { useQuery, useMutation, useReactiveVar } from "@apollo/client";
import { GET_BOARD_ARTICLE } from "../../../apollo/user/query";
import { LIKE_TARGET_BOARD_ARTICLE } from "../../../apollo/user/mutation";
import { BoardArticle } from "../../types/board-article/board-article";
import { REACT_APP_API_URL } from "../../config";
import { T } from "../../types/common";
import { userVar } from "../../../apollo/store";
import {
  sweetMixinErrorAlert,
  sweetTopSmallSuccessAlert,
} from "../../sweetAlert";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";


interface ArticleContentProps {
  articleId?: string;
}

const ArticleContent = ({ articleId }: ArticleContentProps) => {
  const user = useReactiveVar(userVar);
  const [article, setArticle] = useState<BoardArticle | null>(null);

  const { refetch } = useQuery(GET_BOARD_ARTICLE, {
    fetchPolicy: "cache-and-network",
    variables: { input: articleId },
    skip: !articleId,
    notifyOnNetworkStatusChange: true,
    onCompleted: (data: T) => {
      setArticle(data?.getBoardArticle ?? null);
    },
  });

  const [likeTargetBoardArticle] = useMutation(LIKE_TARGET_BOARD_ARTICLE);

  const handleLike = async () => {
    if (!user?._id) {
      sweetMixinErrorAlert("Please login first!");
      return;
    }
    if (!article) return;
    try {
      await likeTargetBoardArticle({ variables: { input: article._id } });
      await refetch({ input: articleId });
      await sweetTopSmallSuccessAlert("success", 800);
    } catch (err: any) {
      sweetMixinErrorAlert(err?.message ?? "Something went wrong");
    }
  };

  if (!article)
    return (
      <Stack className="article-content-section">
        <div className="article-skeleton">
          <div className="article-skeleton-badge" />
          <div className="article-skeleton-title" />
          <div className="article-skeleton-title short" />
          <div className="article-skeleton-author" />
          <div className="article-skeleton-image" />
          <div className="article-skeleton-line" />
          <div className="article-skeleton-line" />
          <div className="article-skeleton-line short" />
        </div>
      </Stack>
    );

  const isLiked = article.likedByMe?.[0]?.myFavorite ?? false;
  const author = article.memberData;
  const authorName =
    author?.memberFullName || author?.memberNick || "Anonymous";
  const authorImage = author?.memberImage
    ? `${REACT_APP_API_URL}/${author.memberImage}`
    : "/general_images/default_profile.png";
  const date = new Date(article.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Stack className="article-content-section">
      {/* Article Header */}
      <div className="article-header">
        <div className="article-meta">
          <span className="article-badge">{article.articleCategory}</span>
          <span className="article-date">
            Published on <strong>{date}</strong>
          </span>
        </div>
        <div className="article-share">
          <img
            src="/icons/FacebookLogo.svg"
            alt="Facebook"
            width={24}
            height={24}
          />
          <img
            src="/icons/InstagramLogo2.svg"
            alt="Instagram"
            width={24}
            height={24}
          />
          <img
            src="/icons/YoutubeLogo.svg"
            alt="Youtube"
            width={24}
            height={24}
          />
          <img
            src="/icons/TwitterLogo.svg"
            alt="Twitter"
            width={24}
            height={24}
          />
        </div>
      </div>

      {/* Article Title */}
      <h1 className="article-title">{article.articleTitle}</h1>

      {/* Author row */}
      <div className="article-author-row">
        <img
          className="article-author-avatar"
          src={authorImage}
          alt={authorName}
        />
        <span className="article-author-name">{authorName}</span>
      </div>

      {/* Hero Image */}
      {article.articleImage && (
        <div className="article-hero-image">
          <img
            src={`${REACT_APP_API_URL}/${article.articleImage}`}
            alt={article.articleTitle}
          />
        </div>
      )}

      {/* Article Content */}
      <div
        className="article-block"
        dangerouslySetInnerHTML={{ __html: article.articleContent.replace(/<img[^>]*>/gi, '') }}
      />

      {/* Stats + Like */}
      <div className="article-stats-row">
        <span className="article-stat">
          <VisibilityOutlinedIcon sx={{ fontSize: 17 }} />{" "}
          {article.articleViews} views
        </span>
        <span className="article-stat">
          <ChatBubbleOutlineIcon sx={{ fontSize: 17 }} />{" "}
          {article.articleComments} comments
        </span>
        <button
          type="button"
          className={`article-like-btn ${isLiked ? "liked" : ""}`}
          onClick={handleLike}
        >
          {isLiked ? (
            <FavoriteIcon sx={{ fontSize: 17, color: "#e57373" }} />
          ) : (
            <FavoriteBorderIcon sx={{ fontSize: 17 }} />
          )}
          {article.articleLikes} {isLiked ? "Liked" : "Like"}
        </button>
      </div>
    </Stack>
  );
};

export default ArticleContent;
