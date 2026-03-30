import { useState } from "react";
import { Stack, Box, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const statusOptions = [
  "All",
  "In Transit",
  "Delivered",
  "Cancelled",
  "Returned",
];
const timeOptions = [
  "Anytime",
  "Last 30 Days",
  "Last Week",
  "Last 6 Months",
  "Last Year",
];

interface OrdersSidebarProps {
  selectedStatus: string;
  selectedTime: string;
  onStatusChange: (status: string) => void;
  onTimeChange: (time: string) => void;
}

const OrdersSidebar = ({
  selectedStatus,
  selectedTime,
  onStatusChange,
  onTimeChange,
}: OrdersSidebarProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <Stack className="orders-sidebar">
      {/* Search */}
      <Box className="orders-search">
        <SearchIcon sx={{ fontSize: 24, color: "#bfbfbf" }} />
        <input
          type="text"
          placeholder="Search your orders"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </Box>

      {/* Status Filter */}
      <Stack className="orders-filter-section">
        <Stack
          className="filter-header"
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography className="filter-title">Status</Typography>
          <KeyboardArrowDownIcon sx={{ fontSize: 24, color: "#000" }} />
        </Stack>
        <Stack className="filter-options">
          {statusOptions.map((option) => (
            <Stack
              key={option}
              className="filter-option"
              direction="row"
              alignItems="center"
              gap="14px"
              onClick={() => onStatusChange(option)}
            >
              <Box
                className={`filter-checkbox ${selectedStatus === option ? "checked" : ""}`}
              />
              <Typography className="filter-label">{option}</Typography>
            </Stack>
          ))}
        </Stack>
      </Stack>

      {/* Time Filter */}
      <Stack className="orders-filter-section">
        <Stack
          className="filter-header"
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography className="filter-title">Time</Typography>
          <KeyboardArrowDownIcon sx={{ fontSize: 24, color: "#000" }} />
        </Stack>
        <Stack className="filter-options">
          {timeOptions.map((option) => (
            <Stack
              key={option}
              className="filter-option"
              direction="row"
              alignItems="center"
              gap="14px"
              onClick={() => onTimeChange(option)}
            >
              <Box
                className={`filter-checkbox ${selectedTime === option ? "checked" : ""}`}
              />
              <Typography className="filter-label">{option}</Typography>
            </Stack>
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default OrdersSidebar;
