import { InquiryStatus } from '../../enums/inquiry.enum';
import { Member, TotalCounter } from '../member/member';

export interface Inquiry {
  _id: string;
  memberId: string;
  inquiryTitle: string;
  inquiryContent: string;
  inquiryStatus: InquiryStatus;
  inquiryResponse?: string;
  respondedAt?: Date;
  createdAt: Date;
  updatedAt: Date;

  /** from aggregation **/
  memberData?: Member;
}

export interface Inquiries {
  list: Inquiry[];
  metaCounter: TotalCounter[];
}
