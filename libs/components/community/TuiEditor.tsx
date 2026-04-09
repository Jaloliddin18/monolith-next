import React, { useMemo, useRef, useState } from 'react';
import { Box, Button, FormControl, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import { Editor } from '@toast-ui/react-editor';
import { BoardArticleCategory } from '../../enums/board-article.enum';
import { getJwtToken } from '../../auth';
import { REACT_APP_API_URL } from '../../config';
import { useRouter } from 'next/router';
import { T } from '../../types/common';
import { useMutation } from '@apollo/client';
import { CREATE_BOARD_ARTICLE } from '../../../apollo/user/mutation';
import { sweetMixinErrorAlert, sweetTopSmallSuccessAlert } from '../../sweetAlert';
import '@toast-ui/editor/dist/toastui-editor.css';

const TuiEditor = () => {
	const editorRef = useRef<Editor>(null);
	const token = getJwtToken();
	const router = useRouter();
	const [articleCategory, setArticleCategory] = useState<BoardArticleCategory>(BoardArticleCategory.FREE);

	const [createBoardArticle] = useMutation(CREATE_BOARD_ARTICLE);

	const memoizedValues = useMemo(
		() => ({
			articleTitle: '',
			articleContent: '',
			articleImage: '',
		}),
		[],
	);

	const uploadImage = async (image: any) => {
		try {
			const formData = new FormData();
			formData.append(
				'operations',
				JSON.stringify({
					query: `mutation ImageUploader($file: Upload!, $target: String!) {
						imageUploader(file: $file, target: $target)
					}`,
					variables: { file: null, target: 'article' },
				}),
			);
			formData.append('map', JSON.stringify({ '0': ['variables.file'] }));
			formData.append('0', image);

			const response = await fetch(`${process.env.REACT_APP_API_GRAPHQL_URL}`, {
				method: 'POST',
				headers: {
					'apollo-require-preflight': 'true',
					Authorization: `Bearer ${token}`,
				},
				body: formData,
			});

			const json = await response.json();
			const responseImage = json.data.imageUploader;
			memoizedValues.articleImage = responseImage;
			return `${REACT_APP_API_URL}/${responseImage}`;
		} catch (err) {
			console.log('Error, uploadImage:', err);
		}
	};

	const handleRegister = async () => {
		try {
			const editor = editorRef.current;
			const articleContent = editor?.getInstance().getHTML() ?? '';
			memoizedValues.articleContent = articleContent;

			if (!memoizedValues.articleTitle.trim() || !memoizedValues.articleContent.trim()) {
				throw new Error('Please fill in all required fields');
			}

			await createBoardArticle({
				variables: {
					input: { ...memoizedValues, articleCategory },
				},
			});

			await sweetTopSmallSuccessAlert('Article created successfully!', 700);
			await router.push('/mypage/articles');
		} catch (err: any) {
			sweetMixinErrorAlert(err?.message ?? 'Something went wrong');
		}
	};

	return (
		<Stack className="write-article-form">
			<div className="write-article-fields">
				<Box className="write-article-field">
					<Typography className="write-article-label">Category</Typography>
					<FormControl fullWidth>
						<Select
							value={articleCategory}
							onChange={(e: T) => setArticleCategory(e.target.value)}
							className="write-article-select"
						>
							<MenuItem value={BoardArticleCategory.FREE}>Free</MenuItem>
							<MenuItem value={BoardArticleCategory.RECOMMEND}>Recommend</MenuItem>
							<MenuItem value={BoardArticleCategory.NEWS}>News</MenuItem>
							<MenuItem value={BoardArticleCategory.HUMOR}>Humor</MenuItem>
						</Select>
					</FormControl>
				</Box>

				<Box className="write-article-field">
					<Typography className="write-article-label">Title</Typography>
					<TextField
						fullWidth
						placeholder="Type title"
						label=""
						InputLabelProps={{ shrink: false }}
						onChange={(e: T) => {
							memoizedValues.articleTitle = e.target.value;
						}}
						className="write-article-input"
					/>
				</Box>
			</div>

			<Editor
				initialValue=" "
				placeholder="Type here"
				previewStyle="vertical"
				height="420px"
				// @ts-ignore
				initialEditType="wysiwyg"
				toolbarItems={[
					['heading', 'bold', 'italic', 'strike'],
					['image', 'table', 'link'],
					['ul', 'ol', 'task'],
				]}
				ref={editorRef}
				hooks={{
					addImageBlobHook: async (image: any, callback: any) => {
						const uploadedImageURL = await uploadImage(image);
						callback(uploadedImageURL);
						return false;
					},
				}}
			/>

			<Button className="write-article-register-btn" onClick={handleRegister}>
				Register
			</Button>
		</Stack>
	);
};

export default TuiEditor;
