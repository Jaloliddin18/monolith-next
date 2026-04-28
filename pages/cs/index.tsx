import React, { useState, useEffect } from "react";
import Head from "next/head";
import { Box, Stack, Typography, Button, CircularProgress } from "@mui/material";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import NewsletterBanner from "../../libs/components/furniture/NewsletterBanner";
import InstagramSection from "../../libs/components/common/InstagramSection";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import SearchIcon from "@mui/icons-material/Search";
import withLayoutBasic from "../../libs/components/layout/LayoutBasic";
import useDeviceDetect from "../../libs/hooks/useDeviceDetect";
import { useQuery } from "@apollo/client";
import { GET_NOTICES } from "../../apollo/user/query";
import { T } from "../../libs/types/common";
import { Direction } from "../../libs/enums/common.enum";
import { NoticeCategory, NoticeStatus } from "../../libs/enums/notice.enum";
import { Notice } from "../../libs/types/notice/notice";

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

const customerProfileImages = [
  "albert.jpg","charles.jpg","christian.jpg","christina.jpg","christina_won.jpg","diego.jpg",
  "ian.jpg","jordi.jpg","joseph.jpg","kirill.jpg","nicolas.jpg","toa.jpg",
];

const reviews = [
  { name: "Joan B. Wolfe", role: "Interior Designer", text: "I wanted to furnish my new office with stylish and functional furniture, and MONOLITH exceeded my expectations.", stars: 5 },
  { name: "Mira Dias", role: "Product Manager", text: "I am a satisfied customer and will continue to choose MONOLITH for all my furniture needs.", stars: 4 },
  { name: "Lois K. Chase", role: "Architect", text: "Style Casa furniture never fails to impress me. The durability and longevity of their products are unmatched.", stars: 5 },
  { name: "Thomas Harrington", role: "Business Owner", text: "I highly recommend MONOLITH for anyone seeking high-quality and long-lasting furniture.", stars: 4 },
  { name: "Sophia Reynolds", role: "Homeowner", text: "The delivery was seamless and the assembly instructions were crystal clear. Absolutely love my new sofa set!", stars: 5 },
  { name: "Daniel Park", role: "Freelancer", text: "MONOLITH helped me transform my home office into a productive and stylish workspace. Highly satisfied.", stars: 4 },
  { name: "Amelia Foster", role: "Real Estate Agent", text: "Every piece I've purchased has been a showstopper. Clients always ask where I got my furniture!", stars: 5 },
  { name: "Carlos Mendez", role: "Restaurant Owner", text: "We furnished our entire restaurant with MONOLITH pieces. The quality and style perfectly match our brand.", stars: 5 },
  { name: "Elena Ivanova", role: "Photographer", text: "The aesthetic of the furniture is just stunning. It adds so much character to my studio space.", stars: 4 },
  { name: "James Whitmore", role: "Engineer", text: "Solid build quality, fair pricing, and excellent customer support. What more could you ask for?", stars: 5 },
  { name: "Nadia Okonkwo", role: "Teacher", text: "Ordering was easy, the furniture arrived on time, and it looks even better in person than online.", stars: 4 },
  { name: "Lucas Bennett", role: "UX Designer", text: "Clean lines, premium materials, and a team that actually cares about your satisfaction. 10 out of 10.", stars: 5 },
];

const Service = () => {
  const device = useDeviceDetect();
  const router = useRouter();
  const [countdown, setCountdown] = useState({ days: 10, hours: 18, mins: 23, secs: 0 });
  const [expandedNotice, setExpandedNotice] = useState<string | null>(null);
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");
  const [announcements, setAnnouncements] = useState<Notice[]>([]);
  const [faqs, setFaqs] = useState<Notice[]>([]);

  const { loading: announcementsLoading } = useQuery(GET_NOTICES, {
    fetchPolicy: "cache-and-network",
    variables: {
      input: {
        page: 1, limit: 10, sort: "createdAt", direction: Direction.DESC,
        search: { noticeStatus: NoticeStatus.ACTIVE, noticeCategory: NoticeCategory.INQUIRY },
      },
    },
    onCompleted: (data: T) => setAnnouncements(data?.getNotices?.list ?? []),
    onError: () => {},
  });

  const { loading: faqsLoading } = useQuery(GET_NOTICES, {
    fetchPolicy: "cache-and-network",
    variables: {
      input: {
        page: 1, limit: 20, sort: "createdAt", direction: Direction.DESC,
        search: { noticeStatus: NoticeStatus.ACTIVE, noticeCategory: NoticeCategory.FAQ },
      },
    },
    onCompleted: (data: T) => setFaqs(data?.getNotices?.list ?? []),
    onError: () => {},
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        let { days, hours, mins, secs } = prev;
        if (secs > 0) secs--;
        else if (mins > 0) { mins--; secs = 59; }
        else if (hours > 0) { hours--; mins = 59; secs = 59; }
        else if (days > 0) { days--; hours = 23; mins = 59; secs = 59; }
        return { days, hours, mins, secs };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const categoryLabel = (cat: string) => {
    if (cat === "FAQ") return "faq";
    if (cat === "INQUIRY") return "inquiry";
    if (cat === "TERMS") return "terms";
    return "notice";
  };

  const filteredFaqs = faqs.filter((f) =>
    !searchText || f.noticeTitle.toLowerCase().includes(searchText.toLowerCase()) ||
    f.noticeContent.toLowerCase().includes(searchText.toLowerCase())
  );

  const filteredAnnouncements = announcements.filter((a) =>
    !searchText || a.noticeTitle.toLowerCase().includes(searchText.toLowerCase())
  );

  if (!device) return null;

  if (device === "mobile") {
    return (
      <Stack className="mobile-page-placeholder">
        <Typography className="mobile-page-title">Customer Service</Typography>
        <Typography className="mobile-page-subtitle">Mobile version coming soon</Typography>
      </Stack>
    );
  }

  return (
    <>
      <Head>
        <title>Customer Service — Monolith</title>
        <meta name="description" content="Get help with your orders, deliveries and furniture questions at Monolith." />
        <meta name="keywords" content="customer service, furniture support, order help, delivery, returns, Monolith" />
        <meta property="og:title" content="Customer Service — Monolith" />
        <meta property="og:description" content="Get help with your orders, deliveries and furniture questions at Monolith." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://monolith.com/cs" />
      </Head>
      <Stack className="service-page">
        {/* ===== CS HERO ===== */}
        <Box className="cs-hero">
          <Typography className="cs-hero-title">How can we help you?</Typography>
          <Typography className="cs-hero-subtitle">
            Find answers, submit questions, or browse our notices
          </Typography>
          <Box className="cs-hero-search">
            <SearchIcon className="cs-search-icon" />
            <input
              type="text"
              placeholder="Search FAQs and announcements..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </Box>
        </Box>

        {/* ===== ANNOUNCEMENTS SECTION ===== */}
        <Stack className="cs-section cs-announcements">
          <Typography className="cs-section-title">Announcements</Typography>
          {announcementsLoading ? (
            <Box className="cs-loading"><CircularProgress size={32} sx={{ color: "#C46A4A" }} /></Box>
          ) : filteredAnnouncements.length === 0 ? (
            <Typography className="cs-empty">No announcements at this time</Typography>
          ) : (
            <Box className="notice-grid">
              {filteredAnnouncements.map((notice) => (
                <Box
                  key={notice._id}
                  className="notice-card"
                  onClick={() => setExpandedNotice(expandedNotice === notice._id ? null : notice._id)}
                >
                  <span className={`notice-category ${categoryLabel(notice.noticeCategory)}`}>
                    {notice.noticeCategory}
                  </span>
                  <Typography className="notice-title">{notice.noticeTitle}</Typography>
                  <Typography className="notice-content">{notice.noticeContent}</Typography>
                  <Stack className="notice-footer" direction="row" justifyContent="space-between" alignItems="center">
                    <Typography className="notice-date">
                      {new Date(notice.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </Typography>
                    <KeyboardArrowDownIcon
                      className="notice-chevron"
                      sx={{ transform: expandedNotice === notice._id ? "rotate(180deg)" : "rotate(0deg)", transition: "0.2s" }}
                    />
                  </Stack>
                  {expandedNotice === notice._id && (
                    <Box className="notice-expanded">
                      <Typography className="notice-expanded-content">{notice.noticeContent}</Typography>
                    </Box>
                  )}
                </Box>
              ))}
            </Box>
          )}
        </Stack>

        {/* ===== FAQ SECTION ===== */}
        <Stack className="cs-section cs-faq">
          <Typography className="cs-section-title">Frequently Asked Questions</Typography>
          {faqsLoading ? (
            <Box className="cs-loading"><CircularProgress size={32} sx={{ color: "#C46A4A" }} /></Box>
          ) : filteredFaqs.length === 0 ? (
            <Typography className="cs-empty">No FAQs found</Typography>
          ) : (
            <Box className="faq-accordion">
              {filteredFaqs.map((faq) => (
                <Box key={faq._id} className={`faq-item ${expandedFaq === faq._id ? "open" : ""}`}>
                  <Box
                    className="faq-question"
                    onClick={() => setExpandedFaq(expandedFaq === faq._id ? null : faq._id)}
                  >
                    <span>{faq.noticeTitle}</span>
                    {expandedFaq === faq._id
                      ? <KeyboardArrowUpIcon sx={{ fontSize: 20 }} />
                      : <KeyboardArrowDownIcon sx={{ fontSize: 20 }} />
                    }
                  </Box>
                  {expandedFaq === faq._id && (
                    <Box className="faq-answer">{faq.noticeContent}</Box>
                  )}
                </Box>
              ))}
            </Box>
          )}
        </Stack>

        {/* ===== CONTACT PROMPT ===== */}
        <Box className="cs-contact-prompt">
          <Typography className="cs-contact-prompt-title">Didn&apos;t find what you were looking for?</Typography>
          <Typography className="cs-contact-prompt-sub">Submit a question and our team will get back to you within 24 hours.</Typography>
          <Stack direction="row" gap="12px" justifyContent="center">
            <Button className="cs-contact-btn primary" onClick={() => router.push("/cs/contact")}>
              Submit a Question
            </Button>
            <Button className="cs-contact-btn secondary" onClick={() => router.push("/cs/faq")}>
              View All FAQs
            </Button>
          </Stack>
        </Box>

        {/* ===== OUR AWESOME SERVICES (6 cards) ===== */}
        <Stack className="svc-awesome" alignItems="center">
          <Typography className="svc-awesome-title">Our Awesome Services</Typography>
          <Box className="svc-awesome-grid">
            {services.map((svc) => (
              <Box className="svc-card" key={svc.title}>
                <Box className="svc-card-icon"><img src={svc.icon} alt={svc.title} /></Box>
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
          <Typography className="svc-progress-title">Our working Progress</Typography>
          <Box className="svc-progress-container">
            {progressSteps.map((step, idx) => (
              <Box className={`progress-step ${idx % 2 !== 0 ? "reverse" : ""}`} key={step.number}>
                <Box className="progress-image"><img src={step.image} alt={step.title} /></Box>
                <Box className="progress-content">
                  <Typography className="progress-step-title">{step.number}. {step.title}</Typography>
                  <ul className="progress-bullets">
                    {step.bullets.map((bullet, i) => <li key={i}>{bullet}</li>)}
                  </ul>
                </Box>
              </Box>
            ))}
          </Box>
        </Stack>

        {/* ===== FEEDBACK FROM CUSTOMER ===== */}
        <Stack className="about-feedback">
          <Typography className="feedback-title">Feedback from Customer</Typography>
          <Box className="feedback-wrapper">
            <Box className="feedback-track">
              {[...reviews, ...reviews].map((review, idx) => (
                <Box key={idx} className="feedback-card">
                  <Stack className="feedback-user" direction="row" alignItems="center">
                    <Box className="feedback-avatar">
                      <img src={`/img/customer_profile/${customerProfileImages[idx % customerProfileImages.length]}`} alt={review.name} />
                    </Box>
                    <Stack>
                      <Typography className="feedback-user-name">{review.name}</Typography>
                      <Typography className="feedback-user-role">{review.role}</Typography>
                    </Stack>
                  </Stack>
                  <Stack gap="8px">
                    <Stack className="feedback-stars" direction="row">
                      {[...Array(5)].map((_, i) => i < review.stars ? <StarIcon key={i} /> : <StarBorderIcon key={i} />)}
                    </Stack>
                    <Typography className="feedback-text">{review.text}</Typography>
                  </Stack>
                </Box>
              ))}
            </Box>
          </Box>
        </Stack>

        {/* ===== SALE BANNER WITH COUNTDOWN ===== */}
        <Box className="svc-sale-banner">
          <Box className="sale-bg" />
          <Box className="sale-content-wrap">
            <Box className="sale-image"><img src="/img/cs/cs12.jpg" alt="Sale" /></Box>
            <Stack className="sale-info">
              <Stack className="sale-top">
                <Typography className="sale-title">30% Off All Furniture<br />Don&apos;t Miss Out!</Typography>
                <Box>
                  <Stack className="countdown-row" direction="row" alignItems="center">
                    <Box className="countdown-circle"><span>{String(countdown.days).padStart(2, "0")}</span></Box>
                    <Typography className="countdown-colon">:</Typography>
                    <Box className="countdown-circle"><span>{String(countdown.hours).padStart(2, "0")}</span></Box>
                    <Typography className="countdown-colon">:</Typography>
                    <Box className="countdown-circle"><span>{String(countdown.mins).padStart(2, "0")}</span></Box>
                    <Typography className="countdown-colon">:</Typography>
                    <Box className="countdown-circle"><span>{String(countdown.secs).padStart(2, "0")}</span></Box>
                  </Stack>
                  <Stack className="countdown-labels" direction="row">
                    <span>Days</span><span>Hours</span><span>Mins</span><span>Secs</span>
                  </Stack>
                </Box>
                <Button variant="contained" className="btn-shop-now" onClick={() => router.push("/furniture")}>
                  SHOP NOW
                </Button>
              </Stack>
              <Stack className="sale-thumbnails" direction="row">
                <Box className="sale-thumb"><img src="/img/cs/cs6.webp" alt="Product 1" /></Box>
                <Box className="sale-thumb"><img src="/img/cs/cs8.webp" alt="Product 2" /></Box>
              </Stack>
            </Stack>
          </Box>
        </Box>

        {/* ===== FEATURES ROW ===== */}
        <Stack className="about-features">
          <Stack className="features-container" direction="row" justifyContent="space-between">
            {[
              { icon: "/icons/Delivery_Truck.svg", title: "Free Shipping", desc: "From all orders over $100" },
              { icon: "/icons/Badge_Dollar.svg", title: "Free Returns", desc: "Return money within 30 days" },
              { icon: "/icons/Package.svg", title: "Secure Shopping", desc: "You're in safe hands" },
              { icon: "/icons/reward_icon.svg", title: "Best Quality", desc: "We have everything you need" },
            ].map((feature) => (
              <Box className="feature-box" key={feature.title}>
                <Box className="feature-box-icon"><img src={feature.icon} alt={feature.title} /></Box>
                <Typography className="feature-box-title">{feature.title}</Typography>
                <Typography className="feature-box-desc">{feature.desc}</Typography>
              </Box>
            ))}
          </Stack>
        </Stack>

        <NewsletterBanner variant="cs" />
        <InstagramSection />
      </Stack>
    </>
  );
};

export const getStaticProps = async ({ locale }: any) => ({
  props: { ...(await serverSideTranslations(locale, ["common"])) },
});

export default withLayoutBasic(Service);
