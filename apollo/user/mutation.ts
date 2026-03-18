import { gql } from '@apollo/client';

/** AUTH */
export const SIGN_UP = gql`
	mutation Signup($input: MemberInput!) {
		signup(input: $input) {
			_id
			memberType
			memberNick
			accessToken
		}
	}
`;

export const LOGIN = gql`
	mutation Login($input: LoginInput!) {
		login(input: $input) {
			_id
			memberType
			memberNick
			accessToken
		}
	}
`;

/** FURNITURE */
export const LIKE_TARGET_FURNITURE = gql`
	mutation LikeTargetFurniture($input: String!) {
		likeTargetFurniture(furnitureId: $input) {
			_id
			furnitureLikes
		}
	}
`;

/** BOARD ARTICLE */
export const LIKE_TARGET_BOARD_ARTICLE = gql`
	mutation LikeTargetBoardArticle($input: String!) {
		likeTargetBoardArticle(articleId: $input) {
			_id
			articleLikes
		}
	}
`;

/** MEMBER */
export const LIKE_TARGET_MEMBER = gql`
	mutation LikeTargetMember($input: String!) {
		likeTargetMember(memberId: $input) {
			_id
			memberLikes
		}
	}
`;

/** MEMBER */
export const UPDATE_MEMBER = gql`
	mutation UpdateMember($input: MemberUpdate!) {
		updateMember(input: $input) {
			_id
			memberType
			memberStatus
			memberNick
			memberFullName
			memberPhone
			memberImage
			memberAddress
			memberDesc
			accessToken
		}
	}
`;

/** FOLLOW */
export const SUBSCRIBE = gql`
	mutation Subscribe($input: String!) {
		subscribe(input: $input) {
			_id
			followingId
			followerId
			createdAt
		}
	}
`;

export const UNSUBSCRIBE = gql`
	mutation Unsubscribe($input: String!) {
		unsubscribe(input: $input) {
			_id
			followingId
			followerId
			createdAt
		}
	}
`;
