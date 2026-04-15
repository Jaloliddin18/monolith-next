import React, { useState, useEffect } from "react";
import { Box, Stack, Typography, Button } from "@mui/material";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import NewsletterBanner from "../../libs/components/furniture/NewsletterBanner";
import InstagramSection from "../../libs/components/common/InstagramSection";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import withLayoutBasic from "../../libs/components/layout/LayoutBasic";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

const services = [
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
  {
    icon: "/icons/interior-design1.svg",
    title: "Interior Design Consultation",
    desc: "The design experts offer professional advice on furniture styles, color schemes, and layout options",
  },
  {
    icon: "/icons/assembly1.svg",
    title: "Delivery and Assembly",
    desc: "Offers white glove delivery service, ensuring that furniture is carefully delivered to the customer's doorstep",
  },
  {
    icon: "/icons/service1.svg",
    title: "Guidance and Support",
    desc: "Expert guidance and support throughout the furniture selection and purchasing process.",
  },
];

const progressSteps = [
  {
    number: 1,
    title: "Design and Conceptualisation",
    bullets: [
      "Style Casa starts its wooden furniture working progress by focusing on design and conceptualization.",
      "The team of skilled designers and craftsmen work together to create innovative and aesthetically pleasing furniture designs.",
    ],
    image: "/img/cs/cs3.jpg",
  },
  {
    number: 2,
    title: "Material Selection",
    bullets: [
      "Style Casa pays great attention to the selection of high-quality materials for their wooden furniture.",
      "The materials are carefully chosen for their durability, strength, and natural beauty.",
    ],
    image: "/img/cs/cs5.jpg",
  },
  {
    number: 3,
    title: "Craftsmanship and Manufacturing",
    bullets: [
      "The wooden furniture at Style Casa is crafted with meticulous attention to detail and precision.",
      "Skilled artisans and craftsmen use traditional and modern techniques to transform the selected materials into exquisite furniture pieces.",
    ],
    image: "/img/cs/cs1.jpg",
  },
  {
    number: 4,
    title: "Finishing and Surface Treatment",
    bullets: [
      "The furniture pieces go through various surface treatments, including staining, varnishing, and polishing.",
      "These treatments enhance the natural beauty of the wood, protect it from wear and tear, and ensure longevity.",
    ],
    image: "/img/cs/cs7.jpg",
  },
  {
    number: 5,
    title: "Packaging and Delivery",
    bullets: [
      "Once the furniture is completed, it is carefully packaged to ensure safe transportation and delivery.",
      "The furniture is delivered to customers in a timely manner, with utmost care taken to ensure customer satisfaction.",
    ],
    image: "/img/cs/cs9.jpg",
  },
];

const reviews = [
  {
    name: "Joan B. Wolfe",
    role: "Interior Designer",
    text: "I wanted to furnish my new office with stylish and functional furniture, and MONOLITH exceeded my expectations.",
    stars: 5,
  },
  {
    name: "Mira Dias",
    role: "Product Manager",
    text: "I am a satisfied customer and will continue to choose MONOLITH for all my furniture needs.",
    stars: 4,
  },
  {
    name: "Lois K. Chase",
    role: "Architect",
    text: "Style Casa furniture never fails to impress me. The durability and longevity of their products are unmatched.",
    stars: 5,
  },
  {
    name: "Thomas Harrington",
    role: "Business Owner",
    text: "I highly recommend MONOLITH for anyone seeking high-quality and long-lasting furniture.",
    stars: 4,
  },
  {
    name: "Sophia Reynolds",
    role: "Homeowner",
    text: "The delivery was seamless and the assembly instructions were crystal clear. Absolutely love my new sofa set!",
    stars: 5,
  },
  {
    name: "Daniel Park",
    role: "Freelancer",
    text: "MONOLITH helped me transform my home office into a productive and stylish workspace. Highly satisfied.",
    stars: 4,
  },
  {
    name: "Amelia Foster",
    role: "Real Estate Agent",
    text: "Every piece I've purchased has been a showstopper. Clients always ask where I got my furniture!",
    stars: 5,
  },
  {
    name: "Carlos Mendez",
    role: "Restaurant Owner",
    text: "We furnished our entire restaurant with MONOLITH pieces. The quality and style perfectly match our brand.",
    stars: 5,
  },
  {
    name: "Elena Ivanova",
    role: "Photographer",
    text: "The aesthetic of the furniture is just stunning. It adds so much character to my studio space.",
    stars: 4,
  },
  {
    name: "James Whitmore",
    role: "Engineer",
    text: "Solid build quality, fair pricing, and excellent customer support. What more could you ask for?",
    stars: 5,
  },
  {
    name: "Nadia Okonkwo",
    role: "Teacher",
    text: "Ordering was easy, the furniture arrived on time, and it looks even better in person than online.",
    stars: 4,
  },
  {
    name: "Lucas Bennett",
    role: "UX Designer",
    text: "Clean lines, premium materials, and a team that actually cares about your satisfaction. 10 out of 10.",
    stars: 5,
  },
];

const Service = () => {
  const router = useRouter();
  const [countdown, setCountdown] = useState({
    days: 10,
    hours: 18,
    mins: 23,
    secs: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        let { days, hours, mins, secs } = prev;
        if (secs > 0) {
          secs--;
        } else if (mins > 0) {
          mins--;
          secs = 59;
        } else if (hours > 0) {
          hours--;
          mins = 59;
          secs = 59;
        } else if (days > 0) {
          days--;
          hours = 23;
          mins = 59;
          secs = 59;
        }
        return { days, hours, mins, secs };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <Stack className="service-page">
      {/* ===== OUR AWESOME SERVICES (6 cards) ===== */}
      <Stack className="svc-awesome" alignItems="center">
        <Typography className="svc-awesome-title">
          Our Awesome Services
        </Typography>
        <Box className="svc-awesome-grid">
          {services.map((svc) => (
            <Box className="svc-card" key={svc.title}>
              <Box className="svc-card-icon">
                <img src={svc.icon} alt={svc.title} />
              </Box>
              <Box>
                <Typography className="svc-card-title">{svc.title}</Typography>
                <Typography className="svc-card-desc">{svc.desc}</Typography>
                <Box className="svc-card-link">
                  <span>Learn more</span>
                  <ArrowForwardIcon />
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Stack>

      {/* ===== OUR WORKING PROGRESS ===== */}
      <Stack className="svc-progress">
        <Typography className="svc-progress-title">
          Our working Progress
        </Typography>
        <Box className="svc-progress-container">
          {progressSteps.map((step, idx) => (
            <Box
              className={`progress-step ${idx % 2 !== 0 ? "reverse" : ""}`}
              key={step.number}
            >
              <Box className="progress-image">
                <img src={step.image} alt={step.title} />
              </Box>
              <Box className="progress-content">
                <Typography className="progress-step-title">
                  {step.number}. {step.title}
                </Typography>
                <ul className="progress-bullets">
                  {step.bullets.map((bullet, i) => (
                    <li key={i}>{bullet}</li>
                  ))}
                </ul>
              </Box>
            </Box>
          ))}
        </Box>
      </Stack>

      {/* ===== FEEDBACK FROM CUSTOMER ===== */}
      <Stack className="about-feedback">
        <Stack
          className="feedback-header"
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography className="feedback-title">
            Feedback from Customer
          </Typography>
          <Stack className="feedback-nav" direction="row">
            <ArrowBackIcon className="nav-arrow feedback-prev" />
            <ArrowForwardIcon className="nav-arrow feedback-next" />
          </Stack>
        </Stack>
        <Swiper
          modules={[Navigation]}
          slidesPerView={4}
          spaceBetween={20}
          navigation={{
            nextEl: ".feedback-next",
            prevEl: ".feedback-prev",
          }}
        >
          {reviews.map((review, idx) => (
            <SwiperSlide key={idx}>
              <Box className="feedback-card">
                <Stack
                  className="feedback-user"
                  direction="row"
                  alignItems="center"
                >
                  <Box className="feedback-avatar">
                    <img
                      src="/img/furniture/brown_chair.png"
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
            </SwiperSlide>
          ))}
        </Swiper>
      </Stack>

      {/* ===== SALE BANNER WITH COUNTDOWN ===== */}
      <Box className="svc-sale-banner">
        <Box className="sale-bg" />
        <Box className="sale-content-wrap">
          <Box className="sale-image">
            <img src="/img/cs/cs12.jpg" alt="Sale" />
          </Box>
          <Stack className="sale-info">
            <Stack className="sale-top">
              <Typography className="sale-title">
                30% Off All Furniture
                <br />
                Don&apos;t Miss Out!
              </Typography>
              <Box>
                <Stack
                  className="countdown-row"
                  direction="row"
                  alignItems="center"
                >
                  <Box className="countdown-circle">
                    <span>{String(countdown.days).padStart(2, "0")}</span>
                  </Box>
                  <Typography className="countdown-colon">:</Typography>
                  <Box className="countdown-circle">
                    <span>{String(countdown.hours).padStart(2, "0")}</span>
                  </Box>
                  <Typography className="countdown-colon">:</Typography>
                  <Box className="countdown-circle">
                    <span>{String(countdown.mins).padStart(2, "0")}</span>
                  </Box>
                  <Typography className="countdown-colon">:</Typography>
                  <Box className="countdown-circle">
                    <span>{String(countdown.secs).padStart(2, "0")}</span>
                  </Box>
                </Stack>
                <Stack className="countdown-labels" direction="row">
                  <span>Days</span>
                  <span>Hours</span>
                  <span>Mins</span>
                  <span>Secs</span>
                </Stack>
              </Box>
              <Button
                variant="contained"
                className="btn-shop-now"
                onClick={() => router.push("/furniture")}
              >
                SHOP NOW
              </Button>
            </Stack>
            <Stack className="sale-thumbnails" direction="row">
              <Box className="sale-thumb">
                <img src="/img/cs/cs6.webp" alt="Product 1" />
              </Box>
              <Box className="sale-thumb">
                <img src="/img/cs/cs8.webp" alt="Product 2" />
              </Box>
            </Stack>
          </Stack>
        </Box>
      </Box>

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
      <NewsletterBanner variant="cs" />

      {/* ===== INSTAGRAM SECTION ===== */}
      <InstagramSection />
    </Stack>
  );
};

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});

export default withLayoutBasic(Service);
