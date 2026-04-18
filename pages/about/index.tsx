import React from "react";
import Head from "next/head";
import { Box, Stack, Typography, Button } from "@mui/material";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import NewsletterBanner from "../../libs/components/furniture/NewsletterBanner";
import InstagramSection from "../../libs/components/common/InstagramSection";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ArrowUpwardIcon from "@mui/icons-material/NorthEast";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import withLayoutBasic from "../../libs/components/layout/LayoutBasic";
const customerProfileImages = [
  "albert.jpg",
  "charles.jpg",
  "christian.jpg",
  "christina.jpg",
  "christina_won.jpg",
  "diego.jpg",
  "ian.jpg",
  "jordi.jpg",
  "joseph.jpg",
  "kirill.jpg",
  "nicolas.jpg",
  "toa.jpg",
];

const aboutReviews = [
  {
    name: "Joan B. Wolfe",
    role: "Manager",
    text: "I wanted to furnish my new office with stylish and functional furniture, and MONOLITH exceeded my expectations.",
    stars: 4,
  },
  {
    name: "Mira Dias",
    role: "Manager",
    text: "I am a satisfied customer and will continue to choose MONOLITH for all my furniture needs.",
    stars: 4,
  },
  {
    name: "Lois K. Chase",
    role: "Manager",
    text: "Style casa furniture never fails to impress me. The durability and longevity of their products are unmatched.",
    stars: 4,
  },
  {
    name: "Lois K. Chase",
    role: "Manager",
    text: "I highly recommend MONOLITH for anyone seeking high-quality and long-lasting furniture.",
    stars: 4,
  },
];

const About = () => {
  const { t } = useTranslation("common");
  const router = useRouter();

  return (
    <>
      <Head>
        <title>About Us — Monolith</title>
        <meta name="description" content="Learn about Monolith, our mission, and our commitment to luxury furniture design." />
        <meta name="keywords" content="about Monolith, luxury furniture brand, furniture design, our story, mission" />
        <meta property="og:title" content="About Us — Monolith" />
        <meta property="og:description" content="Learn about Monolith, our mission, and our commitment to luxury furniture design." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://monolith.com/about" />
        <meta property="og:image" content="https://monolith.com/img/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Us — Monolith" />
        <meta name="twitter:description" content="Learn about Monolith, our mission, and our commitment to luxury furniture design." />
        <meta name="twitter:image" content="https://monolith.com/img/og-image.jpg" />
        <link rel="canonical" href="https://monolith.com/about" />
      </Head>
      <Stack className="about-page">
        {/* ===== HERO SECTION ===== */}
        <Stack className="about-hero">
          <Box className="about-hero-content">
            <Typography className="about-hero-title" variant="h1">
              {t("aboutHeroTitle")}
            </Typography>
            <Typography className="about-hero-subtitle">
              {t("aboutHeroSubtitle")}
            </Typography>
          </Box>
          <Box className="about-hero-video">
            <video autoPlay muted loop playsInline>
              <source src="/vod/about_page_video.mp4" type="video/mp4" />
            </video>
          </Box>
        </Stack>

        {/* ===== PARTNER LOGOS ===== */}
        <Stack
          className="about-partners"
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box className="partner-logo partner-logo--inline">
            <img src="/icons/about_logo1.svg" alt="Partner 1" />
            <img
              src="/icons/csIcon1.png"
              alt="partner 1"
              style={{ height: "40px", width: "auto" }}
            />
          </Box>
          <Box className="partner-logo">
            <img src="/icons/about_logo2.svg" alt="Rustic Roots" />
          </Box>
          <Box className="partner-logo">
            <img src="/icons/about_logo3.svg" alt="WoodCraft Furnishings" />
          </Box>
          <Box className="partner-logo partner-logo--labeled">
            <img src="/icons/about_logo4.svg" alt="Partner 4" />
            <img
              src="/icons/csIcon4.svg"
              alt="partner 4"
              style={{ height: "40px", width: "auto" }}
            />
          </Box>
          <Box className="partner-logo">
            <img
              src="/icons/csIcon5.svg"
              alt="partner 5"
              style={{ height: "100px", width: "auto" }}
            />
          </Box>
        </Stack>

        {/* ===== WHY CHOOSE US ===== */}
        <Stack className="about-why-choose">
          <Stack
            className="why-choose-container"
            direction="row"
            alignItems="center"
          >
            <Box className="why-choose-image">
              <img src="/img/about/about1.webp" alt="Why Choose Us" />
            </Box>
            <Stack className="why-choose-content">
              <Typography className="why-choose-title">
                Why Choose us?
              </Typography>
              <Typography className="why-choose-desc">
                MONOLITH is known for its exceptional craftsmanship and
                attention to detail. Each piece of furniture is meticulously
                crafted by skilled artisans, ensuring the highest quality and
                durability.
              </Typography>
              <Stack className="why-choose-features">
                <Stack
                  className="feature-item"
                  direction="row"
                  alignItems="center"
                >
                  <Box className="feature-icon">
                    <img src="/icons/reward_icon.svg" alt="Quality Materials" />
                  </Box>
                  <Typography className="feature-text">
                    Quality Materials
                  </Typography>
                </Stack>
                <Stack
                  className="feature-item"
                  direction="row"
                  alignItems="center"
                >
                  <Box className="feature-icon">
                    <img
                      src="/icons/reward_icon.svg"
                      alt="Satisfaction Guaranteed"
                    />
                  </Box>
                  <Typography className="feature-text">
                    Satisfaction Guaranteed
                  </Typography>
                </Stack>
                <Stack
                  className="feature-item"
                  direction="row"
                  alignItems="center"
                >
                  <Box className="feature-icon">
                    <img
                      src="/icons/Badge_Dollar.svg"
                      alt="Competitive Pricing"
                    />
                  </Box>
                  <Typography className="feature-text">
                    Competitive Pricing
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
          </Stack>

          {/* Stats Row */}
          <Stack
            className="about-stats"
            direction="row"
            justifyContent="space-between"
            sx={{ maxWidth: 1140, width: "100%", mt: "40px" }}
          >
            {[
              { value: "44+", label: "Years Experience" },
              { value: "100%", label: "Quality Products" },
              { value: "50+", label: "Worldwide Stores" },
              { value: "97%", label: "Satisfied Customers" },
            ].map((stat) => (
              <Box className="stat-item" key={stat.label}>
                <Typography className="stat-value">{stat.value}</Typography>
                <Typography className="stat-label">{stat.label}</Typography>
              </Box>
            ))}
          </Stack>
        </Stack>

        {/* ===== AWARDS SECTION ===== */}
        <Stack className="about-awards">
          <Stack
            className="awards-container"
            direction="row"
            alignItems="center"
          >
            <Box className="awards-image">
              <img src="/img/about/awards.webp" alt="Awards" />
            </Box>
            <Stack className="awards-content">
              <Typography className="awards-title">
                Awards we have gained
              </Typography>
              <Box className="awards-grid">
                <Stack className="awards-row" direction="row">
                  <Box className="award-item">
                    <Typography className="award-year">2023</Typography>
                    <Typography className="award-name">
                      Best Furniture Retailer of the Year
                    </Typography>
                  </Box>
                  <Box className="award-item">
                    <Typography className="award-year">2020</Typography>
                    <Typography className="award-name">
                      Sustainable Furniture Brand of the Year
                    </Typography>
                  </Box>
                </Stack>
                <Stack className="awards-row" direction="row">
                  <Box className="award-item">
                    <Typography className="award-year">2023</Typography>
                    <Typography className="award-name">
                      Best Furniture Retailer of the Year
                    </Typography>
                  </Box>
                  <Box className="award-item">
                    <Typography className="award-year">2020</Typography>
                    <Typography className="award-name">
                      Sustainable Furniture Brand of the Year
                    </Typography>
                  </Box>
                </Stack>
              </Box>
            </Stack>
          </Stack>
        </Stack>

        {/* ===== SHOP BY CATEGORY ===== */}
        <Stack className="about-category">
          <Stack className="about-category-container">
            <Stack
              className="category-header"
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography className="category-title">
                Shop by Category
              </Typography>
              <Box
                className="category-view-all"
                onClick={() => router.push("/furniture")}
                sx={{ cursor: "pointer" }}
              >
                <Typography
                  sx={{
                    fontFamily: "'Jost', sans-serif",
                    fontSize: 18,
                    fontWeight: 500,
                    color: "#a86464",
                  }}
                >
                  View All
                </Typography>
                <ArrowUpwardIcon sx={{ fontSize: 20, color: "#a86464" }} />
              </Box>
            </Stack>
            <Stack className="category-items" direction="row">
              {[
                { icon: "/icons/bed.svg", name: "Desk" },
                { icon: "/icons/Desk.svg", name: "Lamp" },
                { icon: "/icons/chair.svg", name: "Chair" },
                { icon: "/icons/Sofa.svg", name: "Sofas" },
                { icon: "/icons/bed.svg", name: "Bed" },
                { icon: "/icons/Table.svg", name: "Table" },
              ].map((cat) => (
                <Box className="category-item" key={cat.name}>
                  <Box className="category-icon">
                    <img src={cat.icon} alt={cat.name} />
                  </Box>
                  <Typography className="category-name">{cat.name}</Typography>
                </Box>
              ))}
            </Stack>
          </Stack>
        </Stack>

        {/* ===== FURNITURE SERVICES ===== */}
        <Stack className="about-services">
          <Stack className="about-services-container">
            <Stack
              className="services-header"
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography className="services-title">
                Furniture Services
              </Typography>
              <Stack className="services-nav" direction="row">
                <ArrowBackIcon className="nav-arrow" />
                <ArrowForwardIcon className="nav-arrow" />
              </Stack>
            </Stack>
            <Stack className="services-cards" direction="row">
              {[
                {
                  icon: "/icons/Package.svg",
                  title: "Extensive Product Selection",
                  desc: "The diverse product selection allows customers to find furniture pieces that align with their style.",
                },
                {
                  icon: "/icons/security.svg",
                  title: "Secure Payment Options",
                  desc: "Customer information and payment details are protected through secure encryption protocols.",
                },
                {
                  icon: "/icons/cube_icon.svg",
                  title: "Personalized Design Assistance",
                  desc: "To assist customers in creating their dream home, MONOLITH provides personalized design assistance.",
                },
              ].map((service) => (
                <Box className="service-card-item" key={service.title}>
                  <Box className="service-card-icon">
                    <img src={service.icon} alt={service.title} />
                  </Box>
                  <Box>
                    <Typography className="service-card-title">
                      {service.title}
                    </Typography>
                    <Typography className="service-card-desc">
                      {service.desc}
                    </Typography>
                    <Box className="service-card-link">
                      <Typography
                        sx={{
                          fontFamily: "'Jost', sans-serif",
                          fontSize: 18,
                          fontWeight: 500,
                          color: "#a86464",
                        }}
                      >
                        Learn more
                      </Typography>
                      <ArrowForwardIcon
                        sx={{ fontSize: 20, color: "#a86464" }}
                      />
                    </Box>
                  </Box>
                </Box>
              ))}
            </Stack>
          </Stack>
        </Stack>

        {/* ===== WIDE RANGE OF SELECTION ===== */}
        <Stack className="about-wide-range">
          <Stack className="wide-range-container" direction="row">
            <Stack className="wide-range-left">
              <Typography className="wide-range-title">
                Wide Range of Selection
              </Typography>
              <Typography className="wide-range-desc">
                MONOLITH offers a wide range of furniture options to suit
                various styles and preferences. From sleek and contemporary
                designs to timeless classics,
              </Typography>
              <Stack className="room-list">
                {[
                  "Living Room",
                  "Bedroom",
                  "Home Office",
                  "Professional Office",
                  "Kitchen Room",
                ].map((room, i) => (
                  <Stack
                    className={`room-item ${i === 0 ? "active" : ""}`}
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    key={room}
                    onClick={() => router.push("/furniture")}
                    sx={{ cursor: "pointer" }}
                  >
                    <Typography className="room-name">{room}</Typography>
                    <ArrowUpwardIcon />
                  </Stack>
                ))}
              </Stack>
              <Button
                variant="contained"
                className="btn-view-collection"
                onClick={() => router.push("/furniture")}
              >
                VIEW ALL COLLECTION
              </Button>
            </Stack>
            <Box className="wide-range-image">
              <img src="/img/furniture/wood_plant.png" alt="Wide Range" />
            </Box>
          </Stack>
        </Stack>

        {/* ===== FEEDBACK FROM CUSTOMER ===== */}
        <Stack className="about-feedback">
          <Typography className="feedback-title">
            Feedback from Customer
          </Typography>
          <Box className="feedback-wrapper">
            <Box className="feedback-track">
              {[...aboutReviews, ...aboutReviews].map((review, idx) => (
                <Box key={idx} className="feedback-card">
                  <Stack
                    className="feedback-user"
                    direction="row"
                    alignItems="center"
                  >
                    <Box className="feedback-avatar">
                      <img
                        src={`/img/customer_profile/${customerProfileImages[idx % customerProfileImages.length]}`}
                        alt={review.name}
                      />
                    </Box>
                    <Stack>
                      <Typography className="feedback-user-name">
                        {review.name}
                      </Typography>
                      <Typography className="feedback-user-role">
                        {review.role}
                      </Typography>
                    </Stack>
                  </Stack>
                  <Stack gap="8px">
                    <Stack className="feedback-stars" direction="row">
                      {[...Array(5)].map((_, i) =>
                        i < review.stars ? (
                          <StarIcon key={i} />
                        ) : (
                          <StarBorderIcon key={i} />
                        ),
                      )}
                    </Stack>
                    <Typography className="feedback-text">
                      {review.text}
                    </Typography>
                  </Stack>
                </Box>
              ))}
            </Box>
          </Box>
        </Stack>

        {/* ===== FEATURES ROW ===== */}
        <Stack className="about-features">
          <Stack
            className="features-container"
            direction="row"
            justifyContent="space-between"
          >
            {[
              {
                icon: "/icons/Delivery_Truck.svg",
                title: "Free Shipping",
                desc: "From all orders over $100",
              },
              {
                icon: "/icons/Badge_Dollar.svg",
                title: "Free Returns",
                desc: "Return money within 30 days",
              },
              {
                icon: "/icons/Package.svg",
                title: "Secure Shopping",
                desc: "You're in safe hands",
              },
              {
                icon: "/icons/reward_icon.svg",
                title: "Best Quality",
                desc: "We have everything you need",
              },
            ].map((feature) => (
              <Box className="feature-box" key={feature.title}>
                <Box className="feature-box-icon">
                  <img src={feature.icon} alt={feature.title} />
                </Box>
                <Typography className="feature-box-title">
                  {feature.title}
                </Typography>
                <Typography className="feature-box-desc">
                  {feature.desc}
                </Typography>
              </Box>
            ))}
          </Stack>
        </Stack>

        {/* ===== NEWSLETTER BANNER ===== */}
        <NewsletterBanner variant="about" />

        {/* ===== INSTAGRAM SECTION ===== */}
        <InstagramSection />
      </Stack>
    </>
  );
};

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});

export default withLayoutBasic(About);
