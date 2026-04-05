import React from 'react';
import Link from 'next/link';
import {
	Box,
	Button,
	Fade,
	Menu,
	MenuItem,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Tooltip,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import OpenInBrowserRoundedIcon from '@mui/icons-material/OpenInBrowserRounded';
import { BoardArticle } from '../../../types/board-article/board-article';
import { REACT_APP_API_URL } from '../../../config';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';
import { BoardArticleStatus } from '../../../enums/board-article.enum';

interface Data {
	category: string;
	title: string;
	writer: string;
	register: string;
	view: number;
	like: number;
	status: string;
	article_id: string;
}

interface HeadCell {
	disablePadding: boolean;
	id: keyof Data;
	label: string;
	numeric: boolean;
}

const headCells: readonly HeadCell[] = [
	{
		id: 'article_id',
		numeric: true,
		disablePadding: false,
		label: 'ARTICLE ID',
	},
	{
		id: 'title',
		numeric: true,
		disablePadding: false,
		label: 'TITLE',
	},
	{
		id: 'category',
		numeric: true,
		disablePadding: false,
		label: 'CATEGORY',
	},
	{
		id: 'writer',
		numeric: true,
		disablePadding: false,
		label: 'WRITER',
	},
	{
		id: 'view',
		numeric: false,
		disablePadding: false,
		label: 'VIEW',
	},
	{
		id: 'like',
		numeric: false,
		disablePadding: false,
		label: 'LIKE',
	},
	{
		id: 'register',
		numeric: true,
		disablePadding: false,
		label: 'REGISTER DATE',
	},
	{
		id: 'status',
		numeric: false,
		disablePadding: false,
		label: 'STATUS',
	},
];

interface EnhancedTableProps {
	numSelected: number;
	onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
	onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
	rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
	return (
		<TableHead>
			<TableRow>
				{headCells.map((headCell) => (
					<TableCell
						key={headCell.id}
						align={headCell.numeric ? 'left' : 'center'}
						padding={headCell.disablePadding ? 'none' : 'normal'}
					>
						{headCell.label}
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	);
}

const HARDCODED_ARTICLES = [
	{ _id: '66089ea21669073834aa0001', articleTitle: 'Top 5 Scandinavian Furniture Trends for 2026', articleCategory: 'DESIGN', articleViews: 312, articleLikes: 47, articleStatus: 'ACTIVE', createdAt: '2026-01-10T11:05:00Z', memberData: { _id: 'u1', memberNick: 'Oueen', memberImage: null } },
	{ _id: '66089ea21669073834aa0002', articleTitle: 'How to Style a Small Living Room', articleCategory: 'INTERIOR', articleViews: 198, articleLikes: 31, articleStatus: 'ACTIVE', createdAt: '2026-01-09T07:46:00Z', memberData: { _id: 'u2', memberNick: 'Oscar', memberImage: null } },
	{ _id: '66089ea21669073834aa0003', articleTitle: 'The Best Wood Types for Long-Lasting Furniture', articleCategory: 'MATERIAL', articleViews: 87, articleLikes: 14, articleStatus: 'DELETE', createdAt: '2026-01-08T07:34:00Z', memberData: { _id: 'u3', memberNick: 'Justin', memberImage: null } },
	{ _id: '66089ea21669073834aa0004', articleTitle: 'Minimalism in Modern Home Decor', articleCategory: 'DESIGN', articleViews: 421, articleLikes: 68, articleStatus: 'ACTIVE', createdAt: '2026-01-07T07:32:00Z', memberData: { _id: 'u4', memberNick: 'bayram', memberImage: null } },
];

interface CommunityArticleListProps {
	articles: BoardArticle[];
	anchorEl: any;
	menuIconClickHandler: any;
	menuIconCloseHandler: any;
	updateArticleHandler: any;
	removeArticleHandler: any;
}

const CommunityArticleList = (props: CommunityArticleListProps) => {
	const { articles, anchorEl, menuIconClickHandler, menuIconCloseHandler, updateArticleHandler, removeArticleHandler } =
		props;
	const displayArticles: any[] = articles.length > 0 ? articles : HARDCODED_ARTICLES;

	return (
		<Stack>
			<TableContainer>
				<Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={'medium'}>
					{/*@ts-ignore*/}
					<EnhancedTableHead />
					<TableBody>
						{displayArticles.map((article: any, index: number) => (
								<TableRow hover key={article._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
									<TableCell align="left">{article._id}</TableCell>
									<TableCell align="left">
										<Box component={'div'}>
											{article.articleTitle}
											{article.articleStatus === BoardArticleStatus.ACTIVE && (
												<Link
													href={`/community/detail?articleCategory=${article.articleCategory}&id=${article._id}`}
													className={'img_box'}
												>
													<IconButton className="btn_window">
														<Tooltip title={'Open window'}>
															<OpenInBrowserRoundedIcon />
														</Tooltip>
													</IconButton>
												</Link>
											)}
										</Box>
									</TableCell>
									<TableCell align="left">{article.articleCategory}</TableCell>
									<TableCell align="left" className={'name'}>
										<Link href={`/member?memberId=${article?.memberData?._id}`}>
											<Avatar
												alt="Remy Sharp"
												src={
													article?.memberData?.memberImage
														? `${REACT_APP_API_URL}/${article?.memberData?.memberImage}`
														: `/img/profile/defaultUser.svg`
												}
												sx={{ ml: '2px', mr: '10px' }}
											/>
											{article?.memberData?.memberNick}
										</Link>
									</TableCell>
									<TableCell align="center">{article?.articleViews}</TableCell>
									<TableCell align="center">{article?.articleLikes}</TableCell>
									<TableCell align="left">
										{new Date(article?.createdAt).toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' })}
									</TableCell>
									<TableCell align="center">
										{article.articleStatus === BoardArticleStatus.DELETE ? (
											<Button
												variant="outlined"
												sx={{ p: '3px', border: 'none', ':hover': { border: '1px solid #000000' } }}
												onClick={() => removeArticleHandler(article._id)}
											>
												<DeleteIcon fontSize="small" />
											</Button>
										) : (
											<>
												<Button onClick={(e: any) => menuIconClickHandler(e, index)} className={'badge success'}>
													{article.articleStatus}
												</Button>

												<Menu
													className={'menu-modal'}
													MenuListProps={{
														'aria-labelledby': 'fade-button',
													}}
													anchorEl={anchorEl[index]}
													open={Boolean(anchorEl[index])}
													onClose={menuIconCloseHandler}
													TransitionComponent={Fade}
													sx={{ p: 1 }}
												>
													{Object.values(BoardArticleStatus)
														.filter((ele) => ele !== article.articleStatus)
														.map((status: string) => (
															<MenuItem
																onClick={() => updateArticleHandler({ _id: article._id, articleStatus: status })}
																key={status}
															>
																<Typography variant={'subtitle1'} component={'span'}>
																	{status}
																</Typography>
															</MenuItem>
														))}
												</Menu>
											</>
										)}
									</TableCell>
								</TableRow>
							))}
					</TableBody>
				</Table>
			</TableContainer>
		</Stack>
	);
};

export default CommunityArticleList;
