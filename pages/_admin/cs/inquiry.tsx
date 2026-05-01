import React, { useEffect, useState } from "react";
import type { NextPage } from "next";
import withAdminLayout from "../../../libs/components/layout/LayoutAdmin";
import { Box, List, ListItem } from "@mui/material";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import TablePagination from "@mui/material/TablePagination";
import { TabContext } from "@mui/lab";
import { AdminInquiryList } from "../../../libs/components/admin/cs/AdminInquiryList";
import { InquiriesInquiry } from "../../../libs/types/inquiry/inquiry.input";
import { Inquiry } from "../../../libs/types/inquiry/inquiry";
import { InquiryStatus } from "../../../libs/enums/inquiry.enum";
import {
  sweetMixinErrorAlert,
  sweetTopSmallSuccessAlert,
} from "../../../libs/sweetAlert";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ALL_INQUIRIES_BY_ADMIN } from "../../../apollo/admin/query";
import { RESPOND_TO_INQUIRY } from "../../../apollo/admin/mutation";
import { T } from "../../../libs/types/common";
import { Direction } from "../../../libs/enums/common.enum";

const DEFAULT_INQUIRY: InquiriesInquiry = {
  page: 1,
  limit: 10,
  sort: "createdAt",
  direction: Direction.DESC,
  search: {},
};

const AdminInquiry: NextPage = ({
  initialInquiry = DEFAULT_INQUIRY,
  ...props
}: any) => {
  const [inquiriesInquiry, setInquiriesInquiry] = useState<InquiriesInquiry>(
    initialInquiry ?? DEFAULT_INQUIRY,
  );
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [inquiriesTotal, setInquiriesTotal] = useState<number>(0);
  const [value, setValue] = useState(
    inquiriesInquiry?.search?.inquiryStatus ?? "ALL",
  );

  /** APOLLO REQUESTS **/
  const [respondToInquiry] = useMutation(RESPOND_TO_INQUIRY);
  const { loading: getAllInquiriesLoading, refetch: getAllInquiriesRefetch } =
    useQuery(GET_ALL_INQUIRIES_BY_ADMIN, {
      fetchPolicy: "network-only",
      variables: { input: inquiriesInquiry },
      skip: !inquiriesInquiry,
      notifyOnNetworkStatusChange: true,
      onCompleted: (data: T) => {
        setInquiries(data?.getAllInquiriesByAdmin?.list ?? []);
        setInquiriesTotal(
          data?.getAllInquiriesByAdmin?.metaCounter[0]?.total ?? 0,
        );
      },
      onError: () => {},
    });

  /** LIFECYCLES **/
  useEffect(() => {
    getAllInquiriesRefetch({ input: inquiriesInquiry })
      .then()
      .catch(() => {});
  }, [inquiriesInquiry]);

  /** HANDLERS **/
  const changePageHandler = async (event: unknown, newPage: number) => {
    inquiriesInquiry.page = newPage + 1;
    await getAllInquiriesRefetch({ input: inquiriesInquiry });
    setInquiriesInquiry({ ...inquiriesInquiry });
  };

  const changeRowsPerPageHandler = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    inquiriesInquiry.limit = parseInt(event.target.value, 10);
    inquiriesInquiry.page = 1;
    setInquiriesInquiry({ ...inquiriesInquiry });
  };

  const tabChangeHandler = async (event: any, newValue: string) => {
    setValue(newValue);
    setInquiriesInquiry({ ...inquiriesInquiry, page: 1, sort: "createdAt" });
    switch (newValue) {
      case "PENDING":
        setInquiriesInquiry({
          ...inquiriesInquiry,
          search: { inquiryStatus: InquiryStatus.PENDING },
        });
        break;
      case "ANSWERED":
        setInquiriesInquiry({
          ...inquiriesInquiry,
          search: { inquiryStatus: InquiryStatus.ANSWERED },
        });
        break;
      case "CLOSED":
        setInquiriesInquiry({
          ...inquiriesInquiry,
          search: { inquiryStatus: InquiryStatus.CLOSED },
        });
        break;
      default:
        setInquiriesInquiry({ ...inquiriesInquiry, search: {} });
    }
  };

  const respondHandler = async (inquiryId: string, inquiryResponse: string) => {
    try {
      await respondToInquiry({
        variables: { input: { inquiryId, inquiryResponse } },
      });
      await sweetTopSmallSuccessAlert("Response sent!", 800);
      await getAllInquiriesRefetch({ input: inquiriesInquiry });
    } catch (err: any) {
      await sweetMixinErrorAlert(err?.message ?? "Something went wrong");
    }
  };

  return (
    <Box component={"div"} className={"content"}>
      <Box component={"div"} className={"title flex_space"}>
        <Typography variant={"h2"}>1:1 Inqury</Typography>
      </Box>
      <Box component={"div"} className={"table-wrap"}>
        <Box component={"div"} sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box component={"div"}>
              <List className={"tab-menu"}>
                <ListItem
                  onClick={(e: any) => tabChangeHandler(e, "ALL")}
                  value="ALL"
                  className={value === "ALL" ? "li on" : "li"}
                >
                  All
                </ListItem>
                <ListItem
                  onClick={(e: any) => tabChangeHandler(e, "PENDING")}
                  value="PENDING"
                  className={value === "PENDING" ? "li on" : "li"}
                >
                  Pending
                </ListItem>
                <ListItem
                  onClick={(e: any) => tabChangeHandler(e, "ANSWERED")}
                  value="ANSWERED"
                  className={value === "ANSWERED" ? "li on" : "li"}
                >
                  Answered
                </ListItem>
                <ListItem
                  onClick={(e: any) => tabChangeHandler(e, "CLOSED")}
                  value="CLOSED"
                  className={value === "CLOSED" ? "li on" : "li"}
                >
                  Closed
                </ListItem>
              </List>
              <Divider />
            </Box>
            <AdminInquiryList
              inquiries={inquiries}
              loading={getAllInquiriesLoading}
              respondHandler={respondHandler}
            />
            <TablePagination
              rowsPerPageOptions={[10, 20, 40, 60]}
              component="div"
              count={inquiriesTotal}
              rowsPerPage={inquiriesInquiry?.limit}
              page={inquiriesInquiry?.page - 1}
              onPageChange={changePageHandler}
              onRowsPerPageChange={changeRowsPerPageHandler}
            />
          </TabContext>
        </Box>
      </Box>
    </Box>
  );
};

export default withAdminLayout(AdminInquiry);
