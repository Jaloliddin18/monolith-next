import React, { useState, useEffect } from "react";
import { Box, Stack, Typography, Checkbox, CircularProgress, Button } from "@mui/material";
import PhoneInTalkOutlinedIcon from "@mui/icons-material/PhoneInTalkOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import SouthWestIcon from "@mui/icons-material/SouthWest";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import InstagramIcon from "@mui/icons-material/Instagram";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useMutation, useQuery, useReactiveVar } from "@apollo/client";
import { CREATE_INQUIRY, CLOSE_INQUIRY } from "../../../apollo/user/mutation";
import { GET_MY_INQUIRIES } from "../../../apollo/user/query";
import { userVar } from "../../../apollo/store";
import { sweetTopSmallSuccessAlert, sweetMixinErrorAlert, sweetConfirmAlert } from "../../sweetAlert";
import { T } from "../../types/common";
import { Direction } from "../../enums/common.enum";
import { Inquiry } from "../../types/inquiry/inquiry";
import { InquiryStatus } from "../../enums/inquiry.enum";
import { useRouter } from "next/router";
import { Member } from "../../types/member/member";

const faqData = [
  {
    question: "How can I place an order on MONOLITH?",
    answer: "Placing an order on MONOLITH is easy. Simply browse our website, select the desired products, and add them to your shopping cart. Proceed to the checkout page, provide the necessary information, and complete the payment process. Once your order is confirmed, we will process it and provide you with updates on shipping and delivery.",
  },
  {
    question: "How long will it take to receive my order?",
    answer: "Delivery times depend on your location and the availability of the product. Standard shipping typically takes 5-10 business days, while express shipping can deliver within 2-4 business days. You will receive a tracking number once your order has been shipped.",
  },
  {
    question: "What is your return policy?",
    answer: "We offer a 14-day return window for all products purchased on MONOLITH. Items must be returned in their original condition and packaging. Once we receive and inspect the returned item, a refund will be processed to your original payment method within 5-7 business days.",
  },
  {
    question: "How can I contact customer support?",
    answer: "You can reach our customer support team via phone, email, or through the contact form on this page. Our team is available Monday through Friday, 9 AM to 6 PM EST.",
  },
];

const storesData = [
  { image: "/img/furniture/luxury_chair.jpg", badge: "NewArrivals", address: "1061 Flynn Street, Montville", phone: "440-968-0465", email: "stylecasa@info.com" },
  { image: "/img/furniture/luxury_chair.jpg", badge: "NewArrivals", address: "2041 Callison Lane, Wilmington", phone: "302-442-2468", email: "stylecasa@info.com" },
  { image: "/img/furniture/luxury_chair.jpg", badge: null, address: "4525 Boone Crockett Lane, Seattle", phone: "360-481-7182", email: "stylecasa@info.com" },
];

const instagramImages = Array(6).fill("/img/furniture/luxury_chair.jpg");

const statusConfig = {
  [InquiryStatus.PENDING]: { label: "Pending", cls: "pending" },
  [InquiryStatus.ANSWERED]: { label: "Answered", cls: "answered" },
  [InquiryStatus.CLOSED]: { label: "Closed", cls: "closed" },
};

const ContactPage = () => {
  const router = useRouter();
  const user = useReactiveVar(userVar) as Member;
  const [openFaq, setOpenFaq] = useState<number>(0);
  const [saveInfo, setSaveInfo] = useState<boolean>(false);
  const [expandedInquiry, setExpandedInquiry] = useState<string | null>(null);
  const [inquiryTitle, setInquiryTitle] = useState("");
  const [inquiryContent, setInquiryContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [myInquiries, setMyInquiries] = useState<Inquiry[]>([]);
  const [inquiriesTotal, setInquiriesTotal] = useState(0);

  const [createInquiry] = useMutation(CREATE_INQUIRY);
  const [closeInquiry] = useMutation(CLOSE_INQUIRY);

  const { refetch: refetchMyInquiries } = useQuery(GET_MY_INQUIRIES, {
    fetchPolicy: "network-only",
    skip: !user?._id,
    variables: {
      input: { page: 1, limit: 10, sort: "createdAt", direction: Direction.DESC, search: {} },
    },
    onCompleted: (data: T) => {
      setMyInquiries(data?.getMyInquiries?.list ?? []);
      setInquiriesTotal(data?.getMyInquiries?.metaCounter?.[0]?.total ?? 0);
    },
    onError: () => {},
  });

  const handleSubmitInquiry = async () => {
    if (!inquiryTitle.trim() || !inquiryContent.trim()) {
      await sweetMixinErrorAlert("Please fill in both title and content");
      return;
    }
    if (inquiryContent.trim().length < 20) {
      await sweetMixinErrorAlert("Content must be at least 20 characters");
      return;
    }
    setSubmitting(true);
    try {
      await createInquiry({ variables: { input: { inquiryTitle, inquiryContent } } });
      setInquiryTitle("");
      setInquiryContent("");
      await sweetTopSmallSuccessAlert("Inquiry submitted!", 800);
      await refetchMyInquiries();
    } catch (err: any) {
      await sweetMixinErrorAlert(err?.message ?? "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  const handleCloseInquiry = async (id: string) => {
    if (!(await sweetConfirmAlert("Close this inquiry?"))) return;
    try {
      await closeInquiry({ variables: { input: id } });
      await sweetTopSmallSuccessAlert("Inquiry closed", 800);
      await refetchMyInquiries();
    } catch (err: any) {
      await sweetMixinErrorAlert(err?.message ?? "Something went wrong");
    }
  };

  const toggleFaq = (index: number) => setOpenFaq(openFaq === index ? -1 : index);

  return (
    <Stack className="contact-page">
      {/* ===== CONTACT FORM + INFO ===== */}
      <Stack className="contact-main" direction="row">
        <Box className="contact-form-section">
          <Typography className="section-title" variant="h2">Leave Message</Typography>
          <Box className="form-group">
            <Typography className="form-label">Full Name</Typography>
            <Stack className="form-row" direction="row">
              <Box className="form-input"><input id="contact-first-name" name="firstName" type="text" placeholder="First name" /></Box>
              <Box className="form-input"><input id="contact-last-name" name="lastName" type="text" placeholder="Last name" /></Box>
            </Stack>
          </Box>
          <Stack className="form-row" direction="row">
            <Box className="form-group">
              <Typography className="form-label">Mobile Number</Typography>
              <Box className="form-input phone-input">
                <Box className="country-flag">
                  <img src="/icons/uk.svg" alt="UK" />
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M4 6L8 10L12 6" stroke="#999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Box>
              </Box>
            </Box>
            <Box className="form-group">
              <Typography className="form-label">Email Address</Typography>
              <Box className="form-input"><input id="contact-email" name="email" type="email" placeholder="example@gmail.com" /></Box>
            </Box>
          </Stack>
          <Box className="form-group">
            <Typography className="form-label">Your Message</Typography>
            <Box className="form-input message-input"><textarea id="contact-message" name="message" placeholder="Type here..." rows={4} /></Box>
          </Box>
          <Box className="form-checkbox">
            <Checkbox checked={saveInfo} onChange={(e) => setSaveInfo(e.target.checked)} sx={{ padding: 0, color: "#000", "&.Mui-checked": { color: "#000" }, "& .MuiSvgIcon-root": { fontSize: 18 } }} />
            <Typography className="checkbox-label">Save my name, email, and website in this browser for the next time I comment.</Typography>
          </Box>
          <button className="send-btn">SEND MESSAGE</button>
        </Box>

        <Box className="contact-info-section">
          <Typography className="section-title" variant="h2">Contact Info</Typography>
          <Box className="info-items">
            <Box className="info-item">
              <Stack className="info-header" direction="row" alignItems="center">
                <PhoneInTalkOutlinedIcon className="info-icon" />
                <Typography className="info-title">Call Us</Typography>
              </Stack>
              <Box className="info-details"><Typography>478-263-6029</Typography><Typography>989-252-2414</Typography></Box>
            </Box>
            <Box className="info-item">
              <Stack className="info-header" direction="row" alignItems="center">
                <EmailOutlinedIcon className="info-icon" />
                <Typography className="info-title">Mail Us</Typography>
              </Stack>
              <Box className="info-details"><Typography>stylecasa@gmail.com</Typography><Typography>stylecasa@help.com</Typography></Box>
            </Box>
            <Box className="info-item">
              <Stack className="info-header" direction="row" alignItems="center">
                <LocationOnOutlinedIcon className="info-icon" />
                <Typography className="info-title">Reach Out</Typography>
              </Stack>
              <Box className="info-details"><Typography>46 Gregory Lane</Typography><Typography>Louisville, KY 40202</Typography></Box>
            </Box>
          </Box>
        </Box>
      </Stack>

      {/* ===== INQUIRY SECTION ===== */}
      <Stack className="contact-inquiry-section">
        <Box className="inquiry-container">
          {/* Left: Inquiry Form */}
          <Box className="inquiry-form-wrap">
            <Typography className="inquiry-section-title">Submit a Question</Typography>
            <Typography className="inquiry-section-sub">Our team responds within 24 hours</Typography>

            {!user?._id ? (
              <Box className="inquiry-login-prompt">
                <Typography className="login-prompt-text">Please login to submit an inquiry</Typography>
                <Button className="login-prompt-btn" onClick={() => router.push("/account/join")}>
                  Login / Sign Up
                </Button>
              </Box>
            ) : (
              <Box className="inquiry-form">
                <Box className="inquiry-form-group">
                  <label>Title *</label>
                  <input
                    type="text"
                    placeholder="Brief description of your question"
                    value={inquiryTitle}
                    onChange={(e) => setInquiryTitle(e.target.value)}
                  />
                </Box>
                <Box className="inquiry-form-group">
                  <label>Content * <span>(min 20 characters)</span></label>
                  <textarea
                    placeholder="Describe your question in detail..."
                    value={inquiryContent}
                    onChange={(e) => setInquiryContent(e.target.value)}
                    rows={5}
                  />
                </Box>
                <button
                  className="inquiry-submit-btn"
                  onClick={handleSubmitInquiry}
                  disabled={submitting}
                >
                  {submitting ? <CircularProgress size={16} sx={{ color: "#fff" }} /> : "Submit Inquiry"}
                </button>
              </Box>
            )}
          </Box>

          {/* Right: My Inquiries */}
          {user?._id && (
            <Box className="my-inquiries-wrap">
              <Typography className="inquiry-section-title">My Inquiries</Typography>
              <Typography className="inquiry-section-sub">{inquiriesTotal} total inquiries</Typography>

              {myInquiries.length === 0 ? (
                <Typography className="no-inquiries">No inquiries yet. Submit your first question above.</Typography>
              ) : (
                <Box className="inquiries-list">
                  {myInquiries.map((inq) => {
                    const cfg = statusConfig[inq.inquiryStatus];
                    return (
                      <Box key={inq._id} className="inquiry-row">
                        <Box
                          className="inquiry-row-header"
                          onClick={() => setExpandedInquiry(expandedInquiry === inq._id ? null : inq._id)}
                        >
                          <Box className="inquiry-row-left">
                            <span className={`inquiry-badge ${cfg.cls}`}>{cfg.label}</span>
                            <Typography className="inquiry-row-title">{inq.inquiryTitle}</Typography>
                          </Box>
                          <Stack direction="row" alignItems="center" gap="8px">
                            <Typography className="inquiry-row-date">
                              {new Date(inq.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                            </Typography>
                            <KeyboardArrowDownIcon
                              sx={{ fontSize: 18, color: "#787878", transform: expandedInquiry === inq._id ? "rotate(180deg)" : "none", transition: "0.2s" }}
                            />
                          </Stack>
                        </Box>

                        {expandedInquiry === inq._id && (
                          <Box className="inquiry-row-detail">
                            <Typography className="inquiry-detail-label">Your question:</Typography>
                            <Typography className="inquiry-detail-content">{inq.inquiryContent}</Typography>

                            {inq.inquiryStatus === InquiryStatus.ANSWERED && inq.inquiryResponse && (
                              <Box className="inquiry-response-box">
                                <Typography className="inquiry-response-label">Response from team:</Typography>
                                <Typography className="inquiry-response-content">{inq.inquiryResponse}</Typography>
                                {inq.respondedAt && (
                                  <Typography className="inquiry-response-date">
                                    {new Date(inq.respondedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                                  </Typography>
                                )}
                              </Box>
                            )}

                            {inq.inquiryStatus !== InquiryStatus.CLOSED && (
                              <button className="inquiry-close-btn" onClick={() => handleCloseInquiry(inq._id)}>
                                Close Inquiry
                              </button>
                            )}
                          </Box>
                        )}
                      </Box>
                    );
                  })}
                </Box>
              )}
            </Box>
          )}
        </Box>
      </Stack>

      {/* ===== WE'RE HERE TO HELP ===== */}
      <Stack className="here-to-help">
        <Typography className="section-title" variant="h2">We're Here to Help</Typography>
        <Typography className="section-subtitle">Our team is well-equipped to address any queries, provide product information, and guide you towards making</Typography>
        <Box className="help-image"><img src="/img/furniture/luxury_chair.jpg" alt="Team workspace" /></Box>
      </Stack>

      {/* ===== OUR STORES ===== */}
      <Stack className="our-stores">
        <Typography className="section-title" variant="h2">Our Stores</Typography>
        <Stack className="stores-grid" direction="row">
          {storesData.map((store, index) => (
            <Box className="store-card" key={index}>
              <Box className="store-image">
                <img src={store.image} alt={`Store ${index + 1}`} />
                {store.badge && <span className="store-badge">{store.badge}</span>}
              </Box>
              <Box className="store-details">
                <Stack className="detail-row" direction="row" alignItems="center"><LocationOnOutlinedIcon className="detail-icon" /><Typography>{store.address}</Typography></Stack>
                <Stack className="detail-row" direction="row" alignItems="center"><PhoneInTalkOutlinedIcon className="detail-icon" /><Typography>{store.phone}</Typography></Stack>
                <Stack className="detail-row" direction="row" alignItems="center"><EmailOutlinedIcon className="detail-icon" /><Typography>{store.email}</Typography></Stack>
              </Box>
            </Box>
          ))}
        </Stack>
      </Stack>

      {/* ===== MAP SECTION ===== */}
      <Box className="contact-map">
        <Box className="map-overlay" />
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509374!2d144.95373531531672!3d-37.81627977975171!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d4c2b349649%3A0xb6899234e561db11!2sEnvato!5e0!3m2!1sen!2sau!4v1619591382116!5m2!1sen!2sau" width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Store Location" />
        <Box className="map-address-card">
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography className="address-text">4152 Park Boulevard Lynnville</Typography>
            <Box className="map-directions-icon">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 0L20 10L10 20L0 10L10 0Z" fill="#5794F4" /></svg>
            </Box>
          </Stack>
          <Typography className="view-map-link">View larger map</Typography>
        </Box>
        <Box className="map-zoom-controls">
          <button className="zoom-btn"><AddIcon sx={{ fontSize: 21 }} /></button>
          <button className="zoom-btn"><RemoveIcon sx={{ fontSize: 21 }} /></button>
        </Box>
      </Box>

      {/* ===== FAQ SECTION ===== */}
      <Stack className="contact-faq">
        <Typography className="section-title" variant="h2">Frequently asked questions</Typography>
        <Box className="faq-list">
          {faqData.map((faq, index) => (
            <Box className={`faq-item ${openFaq === index ? "active" : ""}`} key={index}>
              <Stack className="faq-question" direction="row" alignItems="center" justifyContent="space-between" onClick={() => toggleFaq(index)}>
                <Typography className="faq-q-text">{faq.question}</Typography>
                {openFaq === index ? <SouthWestIcon className="faq-icon" /> : <ArrowForwardIcon className="faq-icon" />}
              </Stack>
              {openFaq === index && <Typography className="faq-answer">{faq.answer}</Typography>}
            </Box>
          ))}
        </Box>
      </Stack>

      {/* ===== INSTAGRAM SECTION ===== */}
      <Stack className="contact-instagram">
        <Stack className="instagram-header" direction="row" alignItems="center" justifyContent="space-between">
          <Typography className="section-title" variant="h2">Follow on Instagram</Typography>
          <button className="instagram-handle-btn">@style_casa</button>
        </Stack>
        <Stack className="instagram-grid" direction="row">
          {instagramImages.map((img, index) => (
            <Box className={`insta-img ${index === 2 ? "with-overlay" : ""}`} key={index}>
              <img src={img} alt={`Instagram ${index + 1}`} />
              {index === 2 && <Box className="insta-overlay"><InstagramIcon sx={{ fontSize: 40, color: "#fff" }} /></Box>}
            </Box>
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ContactPage;
