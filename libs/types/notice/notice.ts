import { NoticeCategory, NoticeStatus } from '../../enums/notice.enum';
import { Member, TotalCounter } from '../member/member';

export interface Notice {
	_id: string;
	noticeCategory: NoticeCategory;
	noticeStatus: NoticeStatus;
	noticeTitle: string;
	noticeContent: string;
	memberId: string;
	createdAt: Date;
	updatedAt: Date;

	/** from aggregation **/
	memberData?: Member;
}

export interface Notices {
	list: Notice[];
	metaCounter: TotalCounter[];
}
