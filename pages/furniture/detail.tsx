import React, { useState, useEffect, useCallback, useRef } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { useQuery, useMutation, useReactiveVar } from "@apollo/client";
import { IconButton } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import ReplayIcon from "@mui/icons-material/Replay";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import CheckIcon from "@mui/icons-material/Check";
import AspectRatioOutlinedIcon from "@mui/icons-material/AspectRatioOutlined";
import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import withLayoutBasic from "../../libs/components/layout/LayoutBasic";
import InstagramSection from "../../libs/components/common/InstagramSection";
import { addToCart } from "../../libs/utils/cartStorage";
import ProductReviews from "../../libs/components/furniture/ProductReviews";
import { GET_FURNITURE, GET_FURNITURES } from "../../apollo/user/query";
import { LIKE_TARGET_FURNITURE } from "../../apollo/user/mutation";
import { Furniture } from "../../libs/types/furniture/furniture";
import { FurnituresInquiry } from "../../libs/types/furniture/furniture.input";
import { userVar } from "../../apollo/store";
import {
  sweetMixinErrorAlert,
  sweetTopSmallSuccessAlert,
} from "../../libs/sweetAlert";
import { REACT_APP_API_URL } from "../../libs/config";
import { Direction } from "../../libs/enums/common.enum";
import { T } from "../../libs/types/common";

// ─── Static data ────────────────────────────────────────────────
const colorCssMap: Record<string, string> = {
  WHITE: "#F5F5F0",
  BLACK: "#111111",
  GREY: "#8C8C8C",
  BEIGE: "#C4A882",
  BROWN: "#8B7355",
  BLUE: "#3B6EA3",
  GREEN: "#4A7C59",
  RED: "#C0392B",
  PINK: "#E8A0BF",
  YELLOW: "#E8C84A",
  ORANGE: "#E87F3A",
  PURPLE: "#7B52A3",
  NATURAL_WOOD: "#C8A87A",
  MULTICOLOR: "linear-gradient(135deg,#e74c3c,#f39c12,#27ae60,#2980b9)",
};

const categoryLabel: Record<string, string> = {
  SOFAS_ARMCHAIRS: "Sofas & Armchairs",
  CHAIRS: "Chairs",
  TABLES: "Tables",
  DESKS: "Desks",
  BEDS_MATTRESSES: "Beds & Mattresses",
  STORAGE_ORGANIZATION: "Storage",
  WARDROBES: "Wardrobes",
  BOOKCASES_SHELVING: "Shelving",
  KITCHEN_FURNITURE: "Kitchen",
  LIGHTING: "Lighting",
  TEXTILES: "Textiles",
  RUGS: "Rugs",
  CURTAINS: "Curtains",
  DECORATION: "Decoration",
  OUTDOOR_FURNITURE: "Outdoor",
};

const materialLabel: Record<string, string> = {
  SOLID_WOOD: "Solid wood",
  PARTICLE_BOARD: "Particle board",
  MDF: "MDF",
  METAL: "Metal",
  GLASS: "Glass",
  PLASTIC: "Plastic",
  BAMBOO: "Bamboo",
  RATTAN: "Rattan",
  FABRIC: "Fabric",
  LEATHER: "Leather",
  RECYCLED: "Recycled",
};

const accordionSections = [
  { id: "dimensions", label: "Dimensions", Icon: AspectRatioOutlinedIcon },
  { id: "details", label: "Details", Icon: TuneOutlinedIcon },
  { id: "description", label: "Description", Icon: ArticleOutlinedIcon },
  { id: "packages", label: "Packages", Icon: Inventory2OutlinedIcon },
];

// ─── Component ──────────────────────────────────────────────────
const FurnitureDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const user = useReactiveVar(userVar);
  const videoRef = useRef<HTMLVideoElement>(null);
  const dimensionsRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);

  const [quantity, setQuantity] = useState(1);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [videoPlaying, setVideoPlaying] = useState(true);
  const [stickyVisible, setStickyVisible] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>(
    "dimensions",
  );
  const [similarFurnitures, setSimilarFurnitures] = useState<Furniture[]>([]);

  // ─── Queries ────────────────────────────────────────────────
  const { data: furnitureData, refetch: refetchFurniture } = useQuery(
    GET_FURNITURE,
    {
      variables: { input: id as string },
      skip: !id,
      fetchPolicy: "cache-and-network",
    },
  );
  const [likeTargetFurniture] = useMutation(LIKE_TARGET_FURNITURE);

  const furniture: Furniture | undefined = furnitureData?.getFurniture;

  const similarInquiry: FurnituresInquiry = {
    page: 1,
    limit: 4,
    sort: "furnitureRank",
    direction: Direction.DESC,
    search: furniture?.furnitureCategory
      ? { categoryList: [furniture.furnitureCategory] }
      : {},
  };

  useQuery(GET_FURNITURES, {
    fetchPolicy: "cache-and-network",
    variables: { input: similarInquiry },
    skip: !furniture?.furnitureCategory,
    onCompleted: (data: T) => {
      const list: Furniture[] = data?.getFurnitures?.list ?? [];
      setSimilarFurnitures(
        list.filter((f) => f._id !== furniture?._id).slice(0, 3),
      );
    },
  });

  // ─── Derived values ─────────────────────────────────────────
  // Image slot map (raw paths from furnitureImages array)
  const mainImage = furniture?.furnitureImages?.[0] ?? "";
  const galleryImages = furniture?.furnitureImages?.slice(1, 6) ?? [];
  const zoomedImage = furniture?.furnitureImages?.[6] ?? "";
  const dimensionImages = furniture?.furnitureImages?.slice(7, 9) ?? [];
  // videoUrl = furniture?.furnitureVideo (defined below with full URL prefix)

  const currentPrice =
    furniture?.furnitureLastChancePrice &&
    furniture.furnitureLastChancePrice < furniture.furniturePrice
      ? furniture.furnitureLastChancePrice
      : (furniture?.furniturePrice ?? 0);

  const isLiked = furniture?.likedByMe?.[0]?.myFavorite ?? false;

  const imagePath = useCallback(
    (idx: number) => {
      const images = furniture?.furnitureImages;
      if (images && images[idx]) return `${REACT_APP_API_URL}/${images[idx]}`;
      return "/img/furniture/luxury_chair.jpg";
    },
    [furniture],
  );

  const heroImage = mainImage
    ? `${REACT_APP_API_URL}/${mainImage}`
    : "/img/furniture/luxury_chair.jpg";

  const galleryImageUrls = galleryImages.map(
    (img) => `${REACT_APP_API_URL}/${img}`,
  );

  const zoomedImageUrl = zoomedImage
    ? `${REACT_APP_API_URL}/${zoomedImage}`
    : "/img/furniture/luxury_chair.jpg";

  const dimensionImageUrls = dimensionImages.map(
    (img) => `${REACT_APP_API_URL}/${img}`,
  );

  // Flat ordered list used only by the lightbox
  const allImages = [
    heroImage,
    ...galleryImageUrls,
    zoomedImageUrl,
    ...dimensionImageUrls,
  ];

  const videoUrl = furniture?.furnitureVideo
    ? `${REACT_APP_API_URL}/${furniture.furnitureVideo}`
    : null;

  const catLabel = furniture?.furnitureCategory
    ? (categoryLabel[furniture.furnitureCategory] ?? "")
    : "";
  const matLabel = furniture?.furnitureMaterial
    ? (materialLabel[furniture.furnitureMaterial] ?? "")
    : "";
  const subtitle = [catLabel, matLabel].filter(Boolean).join(", ");
  const dims = furniture?.furnitureDimensions;

  // ─── Handlers ───────────────────────────────────────────────
  const openLightbox = (idx: number) => {
    setLightboxIndex(idx);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);

  const toggleAccordion = (id: string) =>
    setOpenAccordion((prev) => (prev === id ? null : id));

  const toggleVideo = () => {
    if (!videoRef.current) return;
    if (videoPlaying) videoRef.current.pause();
    else videoRef.current.play();
    setVideoPlaying((v) => !v);
  };

  const handleLike = async () => {
    if (!user?._id) return router.push("/account/join");
    try {
      await likeTargetFurniture({
        variables: { input: furniture?._id },
        fetchPolicy: "network-only",
      });
      await refetchFurniture();
      window.dispatchEvent(new Event("wishlistUpdated"));
      sweetTopSmallSuccessAlert("success", 800);
    } catch (err: any) {
      sweetMixinErrorAlert(err.message);
    }
  };

  const scrollToSection = (id: string) => {
    setOpenAccordion(id);
    setTimeout(() => {
      const ref =
        id === "dimensions"
          ? dimensionsRef
          : id === "description"
            ? descriptionRef
            : null;
      ref?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  const handleAddToCart = () => {
    if (!furniture) return;
    addToCart(furniture, quantity);
    sweetTopSmallSuccessAlert("Added to cart", 800);
  };

  // ─── Effects ────────────────────────────────────────────────
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, []);

  useEffect(() => {
    const handler = () => refetchFurniture();
    window.addEventListener("wishlistUpdated", handler);
    return () => window.removeEventListener("wishlistUpdated", handler);
  }, [refetchFurniture]);

  useEffect(() => {
    const handleScroll = () => setStickyVisible(window.scrollY > 500);
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("keydown", handleKey);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", handleKey);
    };
  }, []);

  // ─── Render ─────────────────────────────────────────────────
  return (
    <div className="nvg-detail">
      {/* ─── Sticky Top Bar ─── */}
      <div
        className={`nvg-sticky-bar${stickyVisible ? " nvg-sticky-bar--visible" : ""}`}
      >
        <div className="nvg-sticky-inner">
          <div className="nvg-sticky-left">
            <img src={heroImage} alt="" className="nvg-sticky-thumb" />
            <div>
              <p className="nvg-sticky-name">
                {furniture?.furnitureTitle ?? "Product"}
              </p>
              <p className="nvg-sticky-sub">{subtitle}</p>
            </div>
          </div>
          <div className="nvg-sticky-right">
            <div className="nvg-qty nvg-qty--sm">
              <button onClick={() => setQuantity((q) => Math.max(1, q - 1))}>
                −
              </button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity((q) => q + 1)}>+</button>
            </div>
            <button className="nvg-btn-basket" onClick={handleAddToCart}>
              ADD TO BASKET — ${currentPrice.toFixed(0)}
            </button>
          </div>
        </div>
      </div>

      {/* ─── Main 60 / 40 Layout ─── */}
      <div className="nvg-layout">
        {/* ════ LEFT PANEL ════ */}
        <div className="nvg-left">
          {/* § 1 — Hero lifestyle shot */}
          <div className="nvg-hero" onClick={() => openLightbox(0)}>
            <img src={heroImage} alt={furniture?.furnitureTitle} />
          </div>

          {/* § 2 — Gallery row (white bg, all angles) */}
          <div className="nvg-gallery-row">
            {galleryImageUrls.map((img, idx) => (
              <div
                key={idx}
                className="nvg-gallery-item"
                onClick={() => openLightbox(idx + 1)}
              >
                <img src={img} alt={`View ${idx + 1}`} />
              </div>
            ))}
          </div>

          {/* § 3 — Close-up + video side by side */}
          <div className="nvg-media-row">
            <div
              className="nvg-media-item"
              onClick={() => openLightbox(1 + galleryImageUrls.length)}
            >
              <img src={zoomedImageUrl} alt="Close-up" />
            </div>
            <div className="nvg-media-item nvg-media-item--video">
              {videoUrl ? (
                <>
                  <video
                    ref={videoRef}
                    src={videoUrl}
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                  <button className="nvg-video-btn" onClick={toggleVideo}>
                    {videoPlaying ? (
                      <PauseIcon sx={{ fontSize: 18 }} />
                    ) : (
                      <PlayArrowIcon sx={{ fontSize: 18 }} />
                    )}
                  </button>
                </>
              ) : (
                <img
                  src={galleryImageUrls[0] ?? heroImage}
                  alt="Detail view"
                  onClick={() => openLightbox(1)}
                />
              )}
            </div>
          </div>
        </div>

        {/* ════ RIGHT PANEL (sticky) ════ */}
        <div className="nvg-right">
          <div className="nvg-sidebar">
            {/* Breadcrumb */}
            <nav className="nvg-breadcrumb">
              <span onClick={() => router.push("/")}>Home</span>
              <span className="nvg-bc-sep"> / </span>
              <span onClick={() => router.push("/furniture")}>Furniture</span>
              {catLabel && (
                <>
                  <span className="nvg-bc-sep"> / </span>
                  <span>{catLabel}</span>
                </>
              )}
              {furniture?.furnitureTitle && (
                <>
                  <span className="nvg-bc-sep"> / </span>
                  <span className="nvg-bc-current">
                    {furniture.furnitureTitle}
                  </span>
                </>
              )}
            </nav>

            {/* Product name */}
            <h1 className="nvg-prod-name">
              {furniture?.furnitureTitle ?? "Loading…"}
            </h1>

            {/* Subtitle */}
            {subtitle && <p className="nvg-prod-sub">{subtitle}</p>}

            {/* Price */}
            <p className="nvg-price">${currentPrice.toFixed(2)}</p>

            {/* Color swatch — single from backend */}
            {furniture?.furnitureColor && (
              <div className="nvg-swatches-group">
                <p className="nvg-swatch-label">
                  Color:{" "}
                  <span>
                    {furniture.furnitureColor
                      .replace(/_/g, " ")
                      .toLowerCase()
                      .replace(/\b\w/g, (c) => c.toUpperCase())}
                  </span>
                </p>
                <div className="nvg-swatches">
                  <button
                    className="nvg-swatch nvg-swatch--active"
                    style={{
                      background:
                        colorCssMap[furniture.furnitureColor] ?? "#ccc",
                    }}
                    aria-label={furniture.furnitureColor}
                  >
                    <CheckIcon
                      sx={{
                        fontSize: 14,
                        color:
                          furniture.furnitureColor === "WHITE"
                            ? "#111"
                            : "#fff",
                      }}
                    />
                  </button>
                </div>
              </div>
            )}

            {/* Variant selector */}
            <div className="nvg-variant-row">
              <img src={heroImage} alt="" className="nvg-variant-thumb" />
              <div className="nvg-variant-info">
                <p className="nvg-variant-name">
                  {furniture?.furnitureTitle ?? "—"}
                </p>
                <p className="nvg-variant-mat">{matLabel}</p>
              </div>
              <span className="nvg-variant-opts">1 option ›</span>
            </div>

            {/* Quantity + CTA + Heart */}
            <div className="nvg-cta-row">
              <div className="nvg-qty">
                <button onClick={() => setQuantity((q) => Math.max(1, q - 1))}>
                  −
                </button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity((q) => q + 1)}>+</button>
              </div>
              <button
                className="nvg-btn-basket nvg-btn-basket--full"
                onClick={handleAddToCart}
              >
                ADD TO BASKET
              </button>
              <IconButton
                className="nvg-heart-btn"
                onClick={handleLike}
                sx={{
                  p: "12px",
                  border: "1px solid #e8e8e8",
                  borderRadius: 0,
                  height: 48,
                  width: 48,
                }}
              >
                {isLiked ? (
                  <FavoriteIcon sx={{ fontSize: 18, color: "#111" }} />
                ) : (
                  <FavoriteBorderIcon sx={{ fontSize: 18 }} />
                )}
              </IconButton>
            </div>

            {/* Delivery */}
            <div className="nvg-info-row">
              <LocalShippingOutlinedIcon sx={{ fontSize: 17, color: "#555" }} />
              <span className="nvg-info-label">Fast delivery</span>
              <span className="nvg-info-right">Within 3–8 working days</span>
            </div>

            {/* Returns */}
            <div className="nvg-info-row">
              <ReplayIcon sx={{ fontSize: 17, color: "#555" }} />
              <span className="nvg-info-label">Back</span>
              <span className="nvg-info-right">14-day return policy</span>
            </div>

            {/* Scroll-to link */}
            <button
              className="nvg-right-acc-header"
              onClick={() => scrollToSection("dimensions")}
            >
              <span>Dimensions & Description</span>
              <span>›</span>
            </button>
          </div>
        </div>
      </div>

      {/* ─── Editorial headline — full-width ─── */}
      <div className="nvg-editorial">
        <p className="nvg-editorial-text">
          {furniture?.furnitureDesc ?? furniture?.furnitureTitle ?? ""}
        </p>
        <div className="nvg-divider" />
      </div>

      {/* ─── Accordion sections — 2-column ─── */}
      <div className="nvg-accordions">
        {/* Left: accordion list */}
        <div className="nvg-acc-list">
          {accordionSections.map(({ id, label, Icon }) => (
            <div
              key={id}
              ref={
                id === "dimensions"
                  ? dimensionsRef
                  : id === "description"
                    ? descriptionRef
                    : undefined
              }
              className={`nvg-acc${openAccordion === id ? " nvg-acc--open" : ""}`}
            >
              <button
                className="nvg-acc-header"
                onClick={() => toggleAccordion(id)}
              >
                <span className="nvg-acc-label-group">
                  <Icon sx={{ fontSize: 15, color: "#888", flexShrink: 0 }} />
                  <span className="nvg-acc-label">{label}</span>
                </span>
                <span className="nvg-acc-toggle">
                  {openAccordion === id ? "−" : "+"}
                </span>
              </button>
              <div className="nvg-acc-body">
                {id === "dimensions" && (
                  <div className="nvg-dim-body">
                    <table className="nvg-dim-table">
                      <tbody>
                        {furniture?.furnitureDimensions?.width != null && (
                          <tr>
                            <td>Width</td>
                            <td>{furniture.furnitureDimensions.width} cm</td>
                          </tr>
                        )}
                        {furniture?.furnitureDimensions?.height != null && (
                          <tr>
                            <td>Height</td>
                            <td>{furniture.furnitureDimensions.height} cm</td>
                          </tr>
                        )}
                        {furniture?.furnitureDimensions?.depth != null && (
                          <tr>
                            <td>Depth</td>
                            <td>{furniture.furnitureDimensions.depth} cm</td>
                          </tr>
                        )}
                        {furniture?.furnitureWeight != null && (
                          <tr>
                            <td>Weight</td>
                            <td>{furniture.furnitureWeight} kg</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                )}
                {id === "details" && (
                  <div className="nvg-acc-content">
                    <p>Material: {matLabel || "—"}</p>
                    <p>
                      Assembly:{" "}
                      {furniture?.assemblyType
                        ?.replace(/_/g, " ")
                        .toLowerCase() ?? "—"}
                    </p>
                    <p>
                      Style:{" "}
                      {furniture?.furnitureStyle
                        ?.replace(/_/g, " ")
                        .toLowerCase() ?? "—"}
                    </p>
                  </div>
                )}
                {id === "description" && (
                  <div className="nvg-acc-content">
                    <p>
                      {furniture?.furnitureDesc ?? "No description available."}
                    </p>
                  </div>
                )}
                {id === "packages" && (
                  <div className="nvg-acc-content">
                    <p>
                      1 package — Assembly:{" "}
                      {furniture?.assemblyDifficulty
                        ?.replace(/_/g, " ")
                        .toLowerCase() ?? "—"}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        {/* end nvg-acc-list */}

        {/* Right: dimension images side by side */}
        <div className="nvg-dim-panel">
          <div className="nvg-dim-images-row">
            {dimensionImageUrls.map((img, idx) => (
              <div key={idx} className="nvg-dim-image-item">
                <img src={img} alt={`Dimension ${idx + 1}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* end nvg-accordions */}

      {/* ─── You'll Also Like (full-width) ─── */}
      {similarFurnitures.length > 0 && (
        <div className="nvg-also-like">
          <p className="nvg-also-like-title">You'll also like</p>
          <div className="nvg-also-like-grid">
            {similarFurnitures.map((item) => {
              const img = item.furnitureImages?.[0]
                ? `${REACT_APP_API_URL}/${item.furnitureImages[0]}`
                : "/img/furniture/luxury_chair.jpg";
              return (
                <div
                  key={item._id}
                  className="nvg-like-card"
                  onClick={() =>
                    router.push(`/furniture/detail?id=${item._id}`)
                  }
                >
                  <div className="nvg-like-img">
                    <img src={img} alt={item.furnitureTitle} />
                  </div>
                  <p className="nvg-like-price">
                    ${item.furniturePrice.toFixed(0)}
                  </p>
                  <p className="nvg-like-name">{item.furnitureTitle}</p>
                  <p className="nvg-like-sub">
                    {categoryLabel[item.furnitureCategory] ?? ""}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Reviews */}
      <ProductReviews furnitureId={furniture?._id} />

      {/* Instagram */}
      <InstagramSection />

      {/* ─── Lightbox ─── */}
      {lightboxOpen && (
        <div className="nvg-lightbox" onClick={closeLightbox}>
          <button className="nvg-lb-close" onClick={closeLightbox}>
            ✕
          </button>
          <div className="nvg-lb-content" onClick={(e) => e.stopPropagation()}>
            <img src={allImages[lightboxIndex]} alt="" />
          </div>
          {allImages.length > 1 && (
            <>
              <button
                className="nvg-lb-prev"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex((i) => Math.max(0, i - 1));
                }}
              >
                <ArrowBackIcon />
              </button>
              <button
                className="nvg-lb-next"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex((i) =>
                    Math.min(allImages.length - 1, i + 1),
                  );
                }}
              >
                <ArrowForwardIcon />
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});

export default withLayoutBasic(FurnitureDetail);
