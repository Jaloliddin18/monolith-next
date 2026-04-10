import { ChangeEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Stack } from '@mui/material';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import withLayoutBasic from '../../libs/components/layout/LayoutBasic';
import DesignerHero from '../../libs/components/designer/DesignerHero';
import FeaturedDesigners from '../../libs/components/designer/FeaturedDesigners';
import DesignerListSection from '../../libs/components/designer/DesignerListSection';
import DesignerCTA from '../../libs/components/designer/DesignerCTA';
import { useQuery } from '@apollo/client';
import { GET_DESIGNERS } from '../../apollo/user/query';
import { Member } from '../../libs/types/member/member';
import { DesignersInquiry } from '../../libs/types/member/member.input';
import { Direction } from '../../libs/enums/common.enum';
import { T } from '../../libs/types/common';

const DEFAULT_INQUIRY: DesignersInquiry = {
	page: 1,
	limit: 8,
	sort: 'createdAt',
	search: {},
};

const Designers = ({ initialInput = DEFAULT_INQUIRY }: any) => {
	const router = useRouter();
	const [inquiry, setInquiry] = useState<DesignersInquiry>(initialInput);
	const [designers, setDesigners] = useState<Member[]>([]);
	const [total, setTotal] = useState<number>(0);
	const [featured, setFeatured] = useState<Member[]>([]);
	const [featuredLoading, setFeaturedLoading] = useState<boolean>(true);

	/** APOLLO REQUESTS **/
	useQuery(GET_DESIGNERS, {
		fetchPolicy: 'cache-and-network',
		variables: { input: inquiry },
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			setDesigners(data?.getDesigners?.list ?? []);
			setTotal(data?.getDesigners?.metaCounter[0]?.total ?? 0);
		},
	});

	useQuery(GET_DESIGNERS, {
		fetchPolicy: 'cache-and-network',
		variables: {
			input: {
				page: 1,
				limit: 3,
				sort: 'memberRank',
				direction: Direction.DESC,
				search: {},
			},
		},
		onCompleted: (data: T) => {
			setFeatured(data?.getDesigners?.list ?? []);
			setFeaturedLoading(false);
		},
	});

	/** LIFECYCLES **/
	useEffect(() => {
		if (router.isReady && router.query.input) {
			const inputObj = JSON.parse(router.query.input as string);
			setInquiry(inputObj);
		}
	}, [router.isReady, router.query.input]);

	/** HANDLERS **/
	const handlePageChange = async (_event: ChangeEvent<unknown>, page: number) => {
		const updated = { ...inquiry, page };
		setInquiry(updated);
		await router.push(
			`/designers?input=${JSON.stringify(updated)}`,
			`/designers?input=${JSON.stringify(updated)}`,
			{ scroll: false },
		);
	};

	return (
		<Stack className="designers-page">
			<DesignerHero />
			<FeaturedDesigners designers={featured} loading={featuredLoading} />
			<DesignerListSection
				designers={designers}
				total={total}
				page={inquiry.page}
				limit={inquiry.limit}
				onPageChange={handlePageChange}
			/>
			<DesignerCTA />
		</Stack>
	);
};


export const getStaticProps = async ({ locale }: any) => ({
	props: {
		...(await serverSideTranslations(locale, ['common'])),
	},
});

export default withLayoutBasic(Designers);
