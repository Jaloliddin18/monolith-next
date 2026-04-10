import { Stack } from '@mui/material';
import { useMutation, useReactiveVar } from '@apollo/client';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import withLayoutBasic from '../../../libs/components/layout/LayoutBasic';
import MyPageLayout from '../../../libs/components/mypage/MyPageLayout';
import MyFollowings from '../../../libs/components/mypage/MyFollowings';
import { SUBSCRIBE, UNSUBSCRIBE, LIKE_TARGET_MEMBER } from '../../../apollo/user/mutation';
import { userVar } from '../../../apollo/store';
import { sweetMixinErrorAlert, sweetTopSmallSuccessAlert } from '../../../libs/sweetAlert';

const FollowingsPage = () => {
	const user = useReactiveVar(userVar);
	const [subscribe] = useMutation(SUBSCRIBE);
	const [unsubscribe] = useMutation(UNSUBSCRIBE);
	const [likeTargetMember] = useMutation(LIKE_TARGET_MEMBER);

	const subscribeHandler = async (id: string, refetch: any, query: any) => {
		try {
			if (!id || !user?._id) return;
			await subscribe({ variables: { input: id } });
			await refetch({ input: query });
			await sweetTopSmallSuccessAlert('Subscribed!', 800);
		} catch (err: any) {
			sweetMixinErrorAlert(err?.message ?? 'Failed');
		}
	};

	const unsubscribeHandler = async (id: string, refetch: any, query: any) => {
		try {
			if (!id || !user?._id) return;
			await unsubscribe({ variables: { input: id } });
			await refetch({ input: query });
			await sweetTopSmallSuccessAlert('Unsubscribed!', 800);
		} catch (err: any) {
			sweetMixinErrorAlert(err?.message ?? 'Failed');
		}
	};

	const likeMemberHandler = async (id: string, refetch: any, query: any) => {
		try {
			if (!id || !user?._id) return;
			await likeTargetMember({ variables: { input: id } });
			await refetch({ input: query });
		} catch (err: any) {
			sweetMixinErrorAlert(err?.message ?? 'Failed');
		}
	};

	return (
		<Stack>
			<MyPageLayout>
				<MyFollowings
					subscribeHandler={subscribeHandler}
					unsubscribeHandler={unsubscribeHandler}
					likeMemberHandler={likeMemberHandler}
				/>
			</MyPageLayout>
		</Stack>
	);
};

export const getStaticProps = async ({ locale }: any) => ({
	props: {
		...(await serverSideTranslations(locale, ['common'])),
	},
});

export default withLayoutBasic(FollowingsPage);
