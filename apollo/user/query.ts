import { gql } from '@apollo/client';

/** FURNITURE */
export const GET_FURNITURES = gql`
	query GetFurnitures($input: FurnituresInquiry!) {
		getFurnitures(input: $input) {
			list {
				_id
				furnitureType
				furnitureStatus
				furnitureCategory
				furnitureTitle
				furniturePrice
				furnitureClearancePrice
				furnitureImages
				furnitureDesc
				furnitureViews
				furnitureLikes
				furnitureComments
				furnitureRank
				memberId
				createdAt
				updatedAt
				memberData {
					_id
					memberNick
					memberImage
				}
				meLiked {
					memberId
					likeRefId
					myFavorite
				}
			}
			metaCounter {
				total
			}
		}
	}
`;

export const GET_FURNITURE = gql`
	query GetFurniture($input: String!) {
		getFurniture(furnitureId: $input) {
			_id
			furnitureType
			furnitureStatus
			furnitureCategory
			furnitureTitle
			furniturePrice
			furnitureClearancePrice
			furnitureImages
			furnitureDesc
			furnitureViews
			furnitureLikes
			furnitureComments
			furnitureRank
			memberId
			createdAt
			updatedAt
			memberData {
				_id
				memberNick
				memberImage
			}
			meLiked {
				memberId
				likeRefId
				myFavorite
			}
		}
	}
`;

/** MEMBER */
export const GET_MEMBER = gql`
	query GetMember($input: String!) {
		getMember(memberId: $input) {
			_id
			memberType
			memberStatus
			memberNick
			memberImage
			memberAddress
			memberDesc
			memberFurnitures
			memberArticles
			memberFollowers
			memberFollowings
			memberPoints
			memberLikes
			memberViews
			memberRank
			createdAt
			meLiked {
				memberId
				likeRefId
				myFavorite
			}
			meFollowed {
				followingId
				followerId
				myFollowing
			}
		}
	}
`;

/** BOARD ARTICLE */
export const GET_BOARD_ARTICLES = gql`
	query GetBoardArticles($input: BoardArticlesInquiry!) {
		getBoardArticles(input: $input) {
			list {
				_id
				articleCategory
				articleStatus
				articleTitle
				articleContent
				articleImage
				articleLikes
				articleViews
				articleComments
				memberId
				createdAt
				memberData {
					_id
					memberNick
					memberImage
				}
			}
			metaCounter {
				total
			}
		}
	}
`;
