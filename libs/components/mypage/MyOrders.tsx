import { useState } from "react";
import { Stack, Box, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import StarIcon from "@mui/icons-material/Star";
import OrdersSidebar from "./OrdersSidebar";

const PLACEHOLDER_IMG = "/img/furniture/luxury_chair.jpg";

interface OrderItem {
  id: string;
  title: string;
  price: number;
  status: "delivered" | "in_transit" | "cancelled" | "returned" | "refunded";
  statusLabel: string;
  date?: string;
  canReview: boolean;
}

const hardcodedOrders: OrderItem[] = [
  {
    id: "order-1",
    title: "Elegant Comfort Chair",
    price: 99.99,
    status: "delivered",
    statusLabel: "Delivered on Feb 15, 2023",
    date: "Feb 15, 2023",
    canReview: true,
  },
  {
    id: "order-2",
    title: "Elegant Comfort Chair",
    price: 179.99,
    status: "delivered",
    statusLabel: "Delivered on Jan 20, 2023",
    date: "Jan 20, 2023",
    canReview: true,
  },
  {
    id: "order-3",
    title: "Elegant Comfort Chair",
    price: 129.99,
    status: "delivered",
    statusLabel: "Delivered on Jan 01, 2023",
    date: "Jan 01, 2023",
    canReview: true,
  },
  {
    id: "order-4",
    title: "Elegant Comfort Chair",
    price: 129.99,
    status: "refunded",
    statusLabel: "Refund Completed",
    canReview: false,
  },
];

const MyOrders = () => {
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedTime, setSelectedTime] = useState("Anytime");

  return (
    <Stack className="orders-content" direction="row" gap="24px">
      <OrdersSidebar
        selectedStatus={selectedStatus}
        selectedTime={selectedTime}
        onStatusChange={setSelectedStatus}
        onTimeChange={setSelectedTime}
      />

      <Stack className="orders-list-section">
        <Typography className="orders-title">My Orders</Typography>

        <Stack className="orders-list">
          {hardcodedOrders.map((order) => (
            <Stack
              key={order.id}
              className="order-item"
              direction="row"
              alignItems="center"
              gap="40px"
            >
              <Box className="order-item-image">
                <img src={PLACEHOLDER_IMG} alt={order.title} />
              </Box>

              <Stack
                className="order-item-info"
                direction="row"
                justifyContent="space-between"
              >
                <Stack className="order-item-details" gap="12px">
                  <Typography className="order-item-title">
                    {order.title}
                  </Typography>
                  <Typography className="order-item-price">
                    ${order.price.toFixed(2)}
                  </Typography>
                </Stack>

                <Stack className="order-item-status" gap="8px">
                  <Stack direction="row" alignItems="center" gap="8px">
                    <CheckCircleIcon
                      sx={{
                        fontSize: 16,
                        color:
                          order.status === "refunded" ? "#0079FF" : "#379237",
                      }}
                    />
                    <Typography className="order-status-text">
                      {order.statusLabel}
                    </Typography>
                  </Stack>
                  {order.canReview && (
                    <Stack
                      direction="row"
                      alignItems="center"
                      gap="8px"
                      sx={{ cursor: "pointer" }}
                    >
                      <StarIcon sx={{ fontSize: 16, color: "#F89C01" }} />
                      <Typography className="order-review-text">
                        Rate & Review Product
                      </Typography>
                    </Stack>
                  )}
                </Stack>
              </Stack>
            </Stack>
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default MyOrders;
