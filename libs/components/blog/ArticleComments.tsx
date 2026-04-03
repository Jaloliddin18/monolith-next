import React, { useState } from "react";
import { Stack, Pagination } from "@mui/material";

const commentsData = [
  {
    id: "1",
    name: "Luis M. Manley",
    rating: 4,
    title: "Stylish and Comfortable - The Perfect Sofa",
    date: "5 days ago",
    content:
      "I recently purchased the 'LuxeComfort' sofa from MONOLITH, and I couldn't be happier. The sleek design and luxurious upholstery instantly elevate the look of my living room.",
  },
  {
    id: "2",
    name: "Paul B. Malloy",
    rating: 4,
    title: "A Relaxing Retreat - The 'DreamScape' Bed",
    date: "5 days ago",
    content:
      "The 'DreamScape' bed from MONOLITH has transformed my bedroom into a peaceful oasis. The contemporary design with its upholstered headboard and sleek frame instantly caught my attention.",
  },
  {
    id: "3",
    name: "Alice R. Herrera",
    rating: 4,
    title: "Functional and Elegant - The 'Moderno' Dining Table",
    date: "5 days ago",
    content:
      "I was in search of a dining table that could accommodate my large family gatherings and also add a touch of elegance to my dining area. The 'Moderno' dining table from MONOLITH exceeded my expectations.",
  },
];

const StarIcon = ({ filled }: { filled: boolean }) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill={filled ? "#F89C01" : "#E6E6E6"}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M9 1.5L11.3175 6.195L16.5 6.9525L12.75 10.605L13.635 15.7725L9 13.3275L4.365 15.7725L5.25 10.605L1.5 6.9525L6.6825 6.195L9 1.5Z" />
  </svg>
);

const ArticleComments = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [commentText, setCommentText] = useState("");
  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    page: number,
  ) => {
    setCurrentPage(page);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    setCommentText("");
  };

  return (
    <Stack className="article-comments-section">
      {/* Comment Form (always open) */}
      <div className="comment-form-wrapper">
        <h2 className="section-title">Add your opinion</h2>
        <form className="comment-form" onSubmit={handleSubmit}>
          <div className="comment-form-group">
            <textarea
              className="comment-textarea"
              placeholder="Type here..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              rows={6}
            />
          </div>
          <button className="post-comment-btn" type="submit">
            POST COMMENT
          </button>
        </form>
      </div>

      {/* Comments List */}
      <div className="comments-list">
        {commentsData.map((comment) => (
          <div key={comment.id} className="comment-item">
            <div className="comment-author">
              <p className="comment-author-name">{comment.name}</p>
              <div className="comment-stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <StarIcon key={star} filled={star <= comment.rating} />
                ))}
              </div>
            </div>
            <div className="comment-body">
              <div className="comment-title-row">
                <h4 className="comment-title">{comment.title}</h4>
                <span className="comment-date">{comment.date}</span>
              </div>
              <p className="comment-text">{comment.content}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="comments-pagination">
        <Pagination
          count={4}
          page={currentPage}
          onChange={handlePageChange}
          shape="rounded"
          siblingCount={0}
          boundaryCount={1}
        />
      </div>
    </Stack>
  );
};

export default ArticleComments;
