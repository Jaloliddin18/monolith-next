import {
	NotificationGroup,
	NotificationStatus,
	NotificationType,
} from '../../enums/notification.enum';
import { Member, TotalCounter } from '../member/member';

export interface Notification {
	_id: string;
	notificationType: NotificationType;
	notificationStatus: NotificationStatus;
	notificationGroup: NotificationGroup;
	notificationTitle: string;
	notificationDesc?: string;
	authorId: string;
	receiverId: string;
	furnitureId?: string;
	articleId?: string;
	createdAt: Date;
	updatedAt: Date;

	/** from aggregation **/
	authorData?: Member;
}

export interface Notifications {
	list: Notification[];
	metaCounter: TotalCounter[];
}
