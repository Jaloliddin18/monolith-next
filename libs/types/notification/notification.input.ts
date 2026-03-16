import { NotificationGroup, NotificationStatus, NotificationType } from '../../enums/notification.enum';
import { Direction } from '../../enums/common.enum';

export interface NotificationInput {
	notificationType: NotificationType;
	notificationGroup: NotificationGroup;
	notificationTitle: string;
	notificationDesc?: string;
	authorId: string;
	receiverId: string;
	furnitureId?: string;
	articleId?: string;
}

interface NTSearch {
	notificationStatus?: NotificationStatus;
}

export interface NotificationsInquiry {
	page: number;
	limit: number;
	sort?: string;
	direction?: Direction;
	search?: NTSearch;
}
