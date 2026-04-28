import { gql } from "@apollo/client";

/**************************
 *      ADMIN STATS       *
 *************************/

export const GET_ADMIN_STATS = gql`
  query GetAdminStats {
    getAdminStats {
      totalMembers
      totalDesigners
      totalFurnitures
      totalArticles
      totalSubscribers
      totalViews
      totalLikes
      topViewedFurnitures {
        _id
        furnitureTitle
        furnitureImages
        furnitureViews
      }
      topLikedFurnitures {
        _id
        furnitureTitle
        furnitureImages
        furnitureLikes
      }
      topDesigners {
        _id
        memberNick
        memberImage
        memberRank
        memberDesigns
      }
      recentMembers {
        _id
        memberNick
        memberImage
        memberType
        memberStatus
        createdAt
      }
      furnitureByCategory {
        category
        count
      }
      furnitureByRoom {
        room
        count
      }
      memberGrowth {
        month
        count
      }
    }
  }
`;

/**************************
 *         MEMBER         *
 *************************/

export const GET_ALL_MEMBERS_BY_ADMIN = gql`
  query GetAllMembersByAdmin($input: MembersInquiry!) {
    getAllMembersByAdmin(input: $input) {
      list {
        _id
        memberType
        memberStatus
        memberAuthType
        memberPhone
        memberNick
        memberFullName
        memberImage
        memberAddress
        memberDesc
        memberDesigns
        memberArticles
        memberFollowers
        memberFollowings
        memberPoints
        memberLikes
        memberViews
        memberComments
        memberRank
        memberWarnings
        memberBlocks
        deletedAt
        createdAt
        updatedAt
        accessToken
      }
      metaCounter {
        total
      }
    }
  }
`;

/**************************
 *        FURNITURE        *
 *************************/

export const GET_ALL_FURNITURES_BY_ADMIN = gql`
  query GetAllFurnituresByAdmin($input: AllFurnituresInquiry!) {
    getAllFurnituresByAdmin(input: $input) {
      list {
        _id
        furnitureTitle
        furnitureRoom
        furnitureCategory
        furnitureStyle
        furnitureStatus
        furnitureMaterial
        sustainabilityLabel
        assemblyType
        assemblyDifficulty
        deliveryMethod
        furniturePrice
        furnitureLastChancePrice
        furnitureWeight
        furnitureColor
        assemblyTime
        furnitureImages
        furnitureVideo
        furniture3DModel
        furnitureDesc
        assemblyInstructions
        furnitureViews
        furnitureLikes
        furnitureComments
        furnitureRank
        furnitureRent
        furnitureDiscount
        discountStart
        discountEnd
        furnitureOnSale
        furnitureBestseller
        launchedAt
        discontinuedAt
        deletedAt
        createdAt
        updatedAt
        memberId
      }
      metaCounter {
        total
      }
    }
  }
`;

/**************************
 *      BOARD-ARTICLE     *
 *************************/

export const GET_ALL_BOARD_ARTICLES_BY_ADMIN = gql`
  query GetAllBoardArticlesByAdmin($input: AllBoardArticlesInquiry!) {
    getAllBoardArticlesByAdmin(input: $input) {
      list {
        _id
        articleCategory
        articleStatus
        articleTitle
        articleContent
        articleImage
        articleViews
        articleLikes
        articleComments
        memberId
        createdAt
        updatedAt
        memberData {
          _id
          memberType
          memberStatus
          memberAuthType
          memberPhone
          memberNick
          memberFullName
          memberImage
          memberAddress
          memberDesc
          memberDesigns
          memberArticles
          memberFollowers
          memberFollowings
          memberPoints
          memberLikes
          memberViews
          memberComments
          memberRank
          memberWarnings
          memberBlocks
          deletedAt
          createdAt
          updatedAt
          accessToken
        }
      }
      metaCounter {
        total
      }
    }
  }
`;

/**************************
 *         COMMENT        *
 *************************/

/**************************
 *         NOTICE         *
 *************************/

export const GET_ALL_NOTICES_BY_ADMIN = gql`
  query GetAllNoticesByAdmin($input: NoticesInquiry!) {
    getAllNoticesByAdmin(input: $input) {
      list {
        _id
        noticeCategory
        noticeStatus
        noticeTitle
        noticeContent
        memberId
        createdAt
        updatedAt
        memberData {
          _id
          memberNick
          memberImage
          memberType
          memberStatus
        }
      }
      metaCounter {
        total
      }
    }
  }
`;

export const GET_COMMENTS = gql`
  query GetComments($input: CommentsInquiry!) {
    getComments(input: $input) {
      list {
        _id
        commentStatus
        commentGroup
        commentContent
        commentRefId
        memberId
        createdAt
        updatedAt
        memberData {
          _id
          memberType
          memberStatus
          memberAuthType
          memberPhone
          memberNick
          memberFullName
          memberImage
          memberAddress
          memberDesc
          memberDesigns
          memberArticles
          memberFollowers
          memberFollowings
          memberPoints
          memberLikes
          memberViews
          memberComments
          memberRank
          memberWarnings
          memberBlocks
          deletedAt
          createdAt
          updatedAt
          accessToken
        }
      }
      metaCounter {
        total
      }
    }
  }
`;
