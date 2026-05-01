import { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useQuery, useMutation, useReactiveVar } from '@apollo/client';
import { Box, CircularProgress, Divider, Skeleton, Stack, Typography } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import { GET_NOTICE_BY_ID, GET_NOTICES, GET_MY_NOTIFICATIONS } from '../../../apollo/user/query';
import { MARK_NOTIFICATION_READ } from '../../../apollo/user/mutation';
import { userVar, unreadCountVar } from '../../../apollo/store';
import { T } from '../../types/common';
import { Notice } from '../../types/notice/notice';
import { Notification } from '../../types/notification/notification';
import { NoticeCategory } from '../../enums/notice.enum';
import { NotificationStatus } from '../../enums/notification.enum';
import { Direction } from '../../enums/common.enum';


const AnnouncementsList = () => {
	const router = useRouter();

	const { data, loading } = useQuery(GET_NOTICES, {
		variables: {
			input: {
				page: 1,
				limit: 20,
				sort: 'createdAt',
				direction: Direction.DESC,
				search: { noticeCategory: NoticeCategory.ANNOUNCEMENT },
			},
		},
		fetchPolicy: 'cache-and-network',
	});

	const announcements: Notice[] = (data as T)?.getNotices?.list ?? [];

	return (
		<>
			<Head>
				<title>Announcements — Monolith</title>
				<meta name="description" content="Latest announcements and updates from Monolith." />
			</Head>

			<Stack className="announcements-page">
				{/* Header */}
				<Stack mb={5}>
					<Typography className="announcements-page-title">
						Announcements
					</Typography>
					<Typography className="announcements-page-subtitle">
						Updates and news from Monolith
					</Typography>
					<Divider sx={{ mt: 3, borderColor: '#E8E0D8' }} />
				</Stack>

				{/* Loading */}
				{loading && (
					<Stack>
						{[...Array(3)].map((_, i) => (
							<Stack
								key={i}
								direction="row"
								gap={4}
								sx={{ padding: '28px 0', borderBottom: '1px solid #F0EDE8' }}
							>
								<Stack width={100} flexShrink={0} gap={0.5}>
									<Skeleton variant="text" width={60} height={18} />
									<Skeleton variant="text" width={36} height={16} />
								</Stack>
								<Stack flex={1} gap={1}>
									<Skeleton variant="text" width={80} height={20} />
									<Skeleton variant="text" width="55%" height={26} />
									<Skeleton variant="text" width="88%" height={18} />
									<Skeleton variant="text" width="75%" height={18} />
								</Stack>
							</Stack>
						))}
					</Stack>
				)}

				{/* Empty */}
				{!loading && announcements.length === 0 && (
					<Stack alignItems="center" py={10} gap={2}>
						<NotificationsOutlinedIcon sx={{ fontSize: 48, color: '#E8E0D8' }} />
						<Typography
							sx={{
								fontFamily: "'DM Sans', sans-serif",
								color: '#787878',
								fontSize: 15,
							}}
						>
							No announcements at this time
						</Typography>
					</Stack>
				)}

				{/* List */}
				{!loading && announcements.map((notice) => (
					<Stack
						key={notice._id}
						className="announcement-row"
						direction="row"
						gap={4}
						onClick={() => router.push(`/cs/privacy?announcementId=${notice._id}`)}
					>
						{/* Date column */}
						<Stack width={100} flexShrink={0} alignItems="flex-start" pt={0.5}>
							<Typography className="announcement-row-month">
								{new Date(notice.createdAt).toLocaleDateString('en-US', {
									month: 'short',
									day: 'numeric',
								})}
							</Typography>
							<Typography className="announcement-row-year">
								{new Date(notice.createdAt).getFullYear()}
							</Typography>
						</Stack>

						{/* Content */}
						<Stack flex={1} gap={1}>
							<Typography className="announcement-row-title">
								{notice.noticeTitle}
							</Typography>

							<Typography className="announcement-row-excerpt">
								{notice.noticeContent}
							</Typography>

							<Typography className="announcement-row-readmore">
								Read more →
							</Typography>
						</Stack>

						{/* Arrow */}
						<Stack justifyContent="center" flexShrink={0}>
							<ChevronRightIcon sx={{ color: '#D4C9BC', fontSize: 20 }} />
						</Stack>
					</Stack>
				))}
			</Stack>
		</>
	);
};

const AnnouncementDetail = ({ announcementId }: { announcementId: string }) => {
	const router = useRouter();
	const user = useReactiveVar(userVar);

	const { data, loading } = useQuery(GET_NOTICE_BY_ID, {
		variables: { noticeId: announcementId },
		fetchPolicy: 'cache-and-network',
	});

	const { data: notifData } = useQuery(GET_MY_NOTIFICATIONS, {
		skip: !user?._id,
		fetchPolicy: 'network-only',
	});

	const [markRead] = useMutation(MARK_NOTIFICATION_READ);
	const notice: Notice | null = (data as T)?.getNoticeById ?? null;

	useEffect(() => {
		if (!user?._id || !notifData) return;
		const all: Notification[] = (notifData as T)?.getMyNotifications?.list ?? [];
		const toMark = all.filter(
			(n) => n.noticeId === announcementId && n.notificationStatus === NotificationStatus.WAIT,
		);
		if (toMark.length === 0) return;
		Promise.all(toMark.map((n) => markRead({ variables: { input: { notificationId: n._id } } })))
			.then(() => { unreadCountVar(Math.max(0, unreadCountVar() - toMark.length)); })
			.catch(() => {});
	}, [notifData, user?._id, announcementId, markRead]);

	if (loading) {
		return (
			<>
				<Head><title>Announcements — Monolith</title></Head>
				<Stack alignItems="center" justifyContent="center" sx={{ minHeight: '60vh' }}>
					<CircularProgress size={28} sx={{ color: '#C46A4A' }} />
				</Stack>
			</>
		);
	}

	if (!notice) {
		return (
			<>
				<Head><title>Announcements — Monolith</title></Head>
				<Stack className="announcements-page" alignItems="center" justifyContent="center" sx={{ minHeight: '50vh', gap: 2 }}>
					<Typography sx={{ fontFamily: "'DM Sans', sans-serif", color: '#787878', fontSize: 15 }}>
						Announcement not found.
					</Typography>
					<Box
						className="announcement-back-link"
						onClick={() => router.push('/cs/privacy')}
					>
						<ArrowBackIcon sx={{ fontSize: 15 }} />
						Back to Announcements
					</Box>
				</Stack>
			</>
		);
	}

	return (
		<>
			<Head>
				<title>{notice.noticeTitle} — Monolith</title>
				<meta name="description" content={notice.noticeContent?.slice(0, 150)} />
			</Head>

			<Stack className="announcement-detail">
				{/* Back link */}
				<Box
					className="announcement-back-link"
					onClick={() => router.push('/cs/privacy')}
				>
					<ArrowBackIcon sx={{ fontSize: 14 }} />
					Back to Announcements
				</Box>

				{/* Date */}
				<Typography className="announcement-detail-date" sx={{ mt: 4, mb: 2 }}>
					{new Date(notice.createdAt).toLocaleDateString('en-US', {
						year: 'numeric',
						month: 'long',
						day: 'numeric',
					})}
				</Typography>

				{/* Title */}
				<Typography className="announcement-detail-title">
					{notice.noticeTitle}
				</Typography>

				<Divider sx={{ my: 4, borderColor: '#E8E0D8' }} />

				{/* Body */}
				<Typography className="announcement-detail-body">
					{notice.noticeContent}
				</Typography>
			</Stack>
		</>
	);
};

const PrivacyPage = () => {
	const router = useRouter();
	const { announcementId } = router.query;

	if (!router.isReady) return null;

	if (announcementId && typeof announcementId === 'string') {
		return <AnnouncementDetail announcementId={announcementId} />;
	}

	return <AnnouncementsList />;
};

export default PrivacyPage;
