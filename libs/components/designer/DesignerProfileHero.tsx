import React from "react";
import { Stack } from "@mui/material";

const DEFAULT_IMAGE = "/general_images/hello_guy.jpg";

const statTabs = [
  { key: "designs", value: "47", label: "Designs" },
  { key: "blog", value: "12", label: "Blog Posts" },
  { key: "followers", value: "1,240", label: "Followers" },
  { key: "followings", value: "86", label: "Followings" },
  { key: "reviews", value: "124", label: "Reviews" },
];

interface DesignerProfileHeroProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const DesignerProfileHero = ({
  activeTab,
  onTabChange,
}: DesignerProfileHeroProps) => {
  return (
    <Stack className="designer-profile-hero">
      <div className="designer-profile-cover" />
      <div className="designer-profile-hero-content">
        <div className="designer-profile-avatar">
          <img src={DEFAULT_IMAGE} alt="Emily Nakamura" />
        </div>
        <div className="designer-profile-info">
          <span className="designer-profile-badge">Furniture Architect</span>
          <h1 className="designer-profile-name">Emily Nakamura</h1>
          <p className="designer-profile-location">San Francisco, California</p>
        </div>
        <div className="designer-profile-stats-row">
          {statTabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              className={`designer-profile-stat-tab ${activeTab === tab.key ? "active" : ""}`}
              onClick={() => onTabChange(tab.key)}
            >
              <span className="designer-profile-stat-value">{tab.value}</span>
              <span className="designer-profile-stat-label">{tab.label}</span>
            </button>
          ))}
        </div>
        <div className="designer-profile-actions">
          <button className="designer-follow-btn" type="button">
            Follow
          </button>
          <button className="designer-contact-btn" type="button">
            Contact
          </button>
        </div>
      </div>
    </Stack>
  );
};

export default DesignerProfileHero;
