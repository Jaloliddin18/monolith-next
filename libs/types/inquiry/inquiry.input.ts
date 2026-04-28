import { InquiryStatus } from '../../enums/inquiry.enum';
import { Direction } from '../../enums/common.enum';

export interface InquiryInput {
  inquiryTitle: string;
  inquiryContent: string;
}

export interface InquiryResponse {
  inquiryId: string;
  inquiryResponse: string;
}

interface IISearch {
  inquiryStatus?: InquiryStatus;
}

export interface InquiriesInquiry {
  page: number;
  limit: number;
  sort?: string;
  direction?: Direction;
  search: IISearch;
}
