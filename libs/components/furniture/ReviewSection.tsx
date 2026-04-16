import { useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

interface Review {
  id: string;
  reviewerName: string;
  role: string;
  rating: number;
  title: string;
  date: string;
  body: string;
  images?: string[];
}

const allReviews: Review[] = [
  // ── Page 1 ──
  {
    id: "1",
    reviewerName: "Michele",
    role: "Interior Designer",
    rating: 5,
    title: "Stylish and Comfortable - The Perfect Sofa",
    date: "5 days ago",
    body: "I recently purchased the 'LuxeComfort' sofa from MONOLITH, and I couldn't be happier. The sleek design and luxurious upholstery instantly elevate the look of my living room.",
    images: [
      "/img/furniture/furniture1.jpg",
      "/img/furniture/furniture2.jpg",
      "/img/furniture/furniture3.jpg",
    ],
  },
  {
    id: "2",
    reviewerName: "Jordan",
    role: "Homeowner",
    rating: 4,
    title: "A Relaxing Retreat - The 'DreamScape' Bed",
    date: "1 week ago",
    body: "The 'DreamScape' bed from MONOLITH has transformed my bedroom into a peaceful oasis. The contemporary design with its upholstered headboard and sleek frame instantly caught my attention.",
  },
  {
    id: "3",
    reviewerName: "Claire",
    role: "Architect",
    rating: 5,
    title: "Functional and Elegant - The 'Moderno' Dining Table",
    date: "2 weeks ago",
    body: "I was searching for a dining table that could accommodate large family gatherings while adding elegance. The 'Moderno' table from MONOLITH exceeded every expectation.",
    images: ["/img/furniture/furniture5.jpg", "/img/furniture/furniture4.webp"],
  },
  {
    id: "4",
    reviewerName: "Thomas H.",
    role: "Business Owner",
    rating: 4,
    title: "Outstanding Build Quality",
    date: "3 weeks ago",
    body: "Every piece I have ordered has been built to last. The materials feel premium and the finish is flawless. Delivery was prompt and packaging was excellent.",
  },
  {
    id: "5",
    reviewerName: "Sophia R.",
    role: "Homeowner",
    rating: 5,
    title: "Transformed My Living Room",
    date: "1 month ago",
    body: "Assembly was straightforward and the instructions were crystal clear. The sofa set fits perfectly and looks even better in person than in the photos.",
  },
  // ── Page 2 ──
  {
    id: "6",
    reviewerName: "Daniel P.",
    role: "Freelancer",
    rating: 4,
    title: "Perfect Home Office Setup",
    date: "1 month ago",
    body: "MONOLITH helped me transform my home office into a productive and stylish workspace. The desk quality is exceptional for the price point — highly recommended.",
  },
  {
    id: "7",
    reviewerName: "Amelia F.",
    role: "Real Estate Agent",
    rating: 5,
    title: "Clients Always Ask Where I Got My Furniture",
    date: "5 weeks ago",
    body: "Every piece has been a showstopper. Clients always ask where I got my furniture — now I just hand them a MONOLITH card. The quality speaks for itself.",
  },
  {
    id: "8",
    reviewerName: "Carlos M.",
    role: "Restaurant Owner",
    rating: 5,
    title: "Furnished Our Entire Restaurant",
    date: "6 weeks ago",
    body: "We furnished our entire restaurant with MONOLITH pieces. The quality and style perfectly match our brand identity. Customers constantly compliment the atmosphere.",
  },
  {
    id: "9",
    reviewerName: "Elena I.",
    role: "Photographer",
    rating: 4,
    title: "Stunning Aesthetic for My Studio",
    date: "2 months ago",
    body: "The aesthetic of the furniture is just stunning. It adds character to my studio space and photographs beautifully for client shoots. Very happy with the purchase.",
  },
  {
    id: "10",
    reviewerName: "James W.",
    role: "Engineer",
    rating: 5,
    title: "Solid Build, Fair Price, Great Support",
    date: "2 months ago",
    body: "Solid build quality, fair pricing, and excellent customer support. What more could you ask for? I have already placed a second order without hesitation.",
  },
  // ── Page 3 ──
  {
    id: "11",
    reviewerName: "Nadia O.",
    role: "Teacher",
    rating: 4,
    title: "Exactly As Described",
    date: "2 months ago",
    body: "Ordering was easy, the furniture arrived on time, and it looks even better in person than online. The quality for the price is unbeatable. Very happy.",
  },
  {
    id: "12",
    reviewerName: "Lucas B.",
    role: "UX Designer",
    rating: 5,
    title: "Clean Lines, Premium Materials",
    date: "3 months ago",
    body: "Clean lines, premium materials, and a team that actually cares about customer satisfaction. 10 out of 10 — I have recommended MONOLITH to everyone I know.",
  },
  {
    id: "13",
    reviewerName: "Sarah K.",
    role: "Interior Stylist",
    rating: 4,
    title: "Great Range for Every Style",
    date: "3 months ago",
    body: "A great range of styles for both modern and classic tastes. I styled a full apartment with MONOLITH pieces and the client was absolutely thrilled with the result.",
  },
  {
    id: "14",
    reviewerName: "Marcus L.",
    role: "Architect",
    rating: 5,
    title: "Remarkable Attention to Detail",
    date: "3 months ago",
    body: "The attention to detail in every piece is remarkable. From joinery to finish, you can tell these are made by people who genuinely care about their craft.",
  },
  {
    id: "15",
    reviewerName: "Priya S.",
    role: "Homeowner",
    rating: 4,
    title: "Fantastic Value for Money",
    date: "4 months ago",
    body: "Fantastic value for money. I was hesitant to buy furniture online but the quality far exceeded my expectations. The living room set is absolutely gorgeous.",
  },
];

const REVIEWS_PER_PAGE = 3;
const TOTAL_PAGES = Math.ceil(allReviews.length / REVIEWS_PER_PAGE);

const StarRating = ({ rating }: { rating: number }) => (
  <Stack direction="row" gap="4px">
    {Array.from({ length: 5 }, (_, i) =>
      i < rating ? (
        <StarIcon key={i} sx={{ fontSize: 18, color: "#FFD700" }} />
      ) : (
        <StarBorderIcon key={i} sx={{ fontSize: 18, color: "#FFD700" }} />
      ),
    )}
  </Stack>
);

const ReviewSection = () => {
  const [page, setPage] = useState(1);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const start = (page - 1) * REVIEWS_PER_PAGE;
  const visibleReviews = allReviews.slice(start, start + REVIEWS_PER_PAGE);

  return (
    <Stack className="reviews-section" alignItems="center">
      {/* Header */}
      <Stack
        className="reviews-header"
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography className="section-title-text">
          Review for Popular furniture
        </Typography>
        <Stack
          direction="row"
          alignItems="center"
          gap="10px"
          sx={{ cursor: "pointer", py: "14px" }}
        >
          <Typography className="reviews-sort-link">Sort by</Typography>
          <Box
            component="img"
            src="/icons/CaretDown.svg"
            alt="▾"
            width={20}
            height={20}
          />
        </Stack>
      </Stack>

      {/* Reviews list */}
      <Stack className="reviews-list">
        {visibleReviews.map((review) => (
          <Stack
            key={review.id}
            className="review-item"
            direction="row"
            gap="24px"
          >
            {/* Left: name + stars */}
            <Stack className="review-left">
              <Typography className="reviewer-name">
                {review.reviewerName}
              </Typography>
              <Typography sx={{ fontSize: 12, color: "#999", mb: "4px" }}>
                {review.role}
              </Typography>
              <StarRating rating={review.rating} />
            </Stack>

            {/* Right: title, body, images */}
            <Stack className="review-right" gap="14px">
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography className="review-title">{review.title}</Typography>
                <Typography className="review-date">{review.date}</Typography>
              </Stack>
              <Typography className="review-body">{review.body}</Typography>
              {review.images && review.images.length > 0 && (
                <Stack direction="row" gap="12px">
                  {review.images.map((img, i) => (
                    <Box key={i} className="review-image">
                      <img src={img} alt={`Review image ${i + 1}`} />
                    </Box>
                  ))}
                </Stack>
              )}
            </Stack>
          </Stack>
        ))}
      </Stack>

      {/* Pagination */}
      <Stack
        className="reviews-pagination"
        direction="row"
        alignItems="center"
        justifyContent="center"
        gap="53px"
      >
        {/* Prev */}
        <Stack
          direction="row"
          alignItems="center"
          gap="12px"
          sx={{
            cursor: page > 1 ? "pointer" : "default",
            opacity: page > 1 ? 1 : 0.4,
          }}
          onClick={() => page > 1 && handlePageChange(page - 1)}
        >
          <ArrowBackIosNewIcon sx={{ fontSize: 16, color: "#999" }} />
          <Typography className="pagination-text" sx={{ color: "#999" }}>
            PREV
          </Typography>
        </Stack>

        {/* Page numbers */}
        <Stack direction="row" gap="8px">
          {Array.from({ length: TOTAL_PAGES }, (_, i) => i + 1).map((p) => (
            <Box
              key={p}
              onClick={() => handlePageChange(p)}
              sx={{
                width: 36,
                height: 36,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: `1px solid ${page === p ? "#C46A4A" : "#ddd"}`,
                borderRadius: "4px",
                background: page === p ? "#C46A4A" : "transparent",
                color: page === p ? "#fff" : "#333",
                cursor: "pointer",
                fontSize: 14,
                fontWeight: page === p ? 600 : 400,
                fontFamily: "inherit",
              }}
            >
              {p}
            </Box>
          ))}
        </Stack>

        {/* Next */}
        <Stack
          direction="row"
          alignItems="center"
          gap="12px"
          sx={{
            cursor: page < TOTAL_PAGES ? "pointer" : "default",
            opacity: page < TOTAL_PAGES ? 1 : 0.4,
          }}
          onClick={() => page < TOTAL_PAGES && handlePageChange(page + 1)}
        >
          <Typography className="pagination-text">NEXT</Typography>
          <ArrowForwardIosIcon sx={{ fontSize: 16 }} />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ReviewSection;
