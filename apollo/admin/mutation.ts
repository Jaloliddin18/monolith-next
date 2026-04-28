import { gql } from "@apollo/client";

/**************************
 *         MEMBER         *
 *************************/

export const UPDATE_MEMBER_BY_ADMIN = gql`
  mutation UpdateMemberByAdmin($input: MemberUpdate!) {
    updateMemberByAdmin(input: $input) {
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
`;

/**************************
 *        FURNITURE        *
 *************************/

export const UPDATE_FURNITURE_BY_ADMIN = gql`
  mutation UpdateFurnitureByAdmin($input: FurnitureUpdate!) {
    updateFurnitureByAdmin(input: $input) {
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
  }
`;

export const REMOVE_FURNITURE_BY_ADMIN = gql`
  mutation RemoveFurnitureByAdmin($input: String!) {
    removeFurnitureByAdmin(furnitureId: $input) {
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
  }
`;

/**************************
 *      BOARD-ARTICLE     *
 *************************/

export const UPDATE_BOARD_ARTICLE_BY_ADMIN = gql`
  mutation UpdateBoardArticleByAdmin($input: BoardArticleUpdate!) {
    updateBoardArticleByAdmin(input: $input) {
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
    }
  }
`;

export const REMOVE_BOARD_ARTICLE_BY_ADMIN = gql`
  mutation RemoveBoardArticleByAdmin($input: String!) {
    removeBoardArticleByAdmin(articleId: $input) {
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
    }
  }
`;

/**************************
 *         NOTICE         *
 *************************/

export const CREATE_NOTICE_BY_ADMIN = gql`
  mutation CreateNoticeByAdmin($input: NoticeInput!) {
    createNoticeByAdmin(input: $input) {
      _id
      noticeCategory
      noticeStatus
      noticeTitle
      noticeContent
      memberId
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_NOTICE_BY_ADMIN = gql`
  mutation UpdateNoticeByAdmin($input: NoticeUpdate!) {
    updateNoticeByAdmin(input: $input) {
      _id
      noticeCategory
      noticeStatus
      noticeTitle
      noticeContent
      memberId
      createdAt
      updatedAt
    }
  }
`;

export const REMOVE_NOTICE_BY_ADMIN = gql`
  mutation RemoveNoticeByAdmin($input: String!) {
    removeNoticeByAdmin(noticeId: $input) {
      _id
      noticeCategory
      noticeStatus
      noticeTitle
      noticeContent
      memberId
      createdAt
      updatedAt
    }
  }
`;

/**************************
 *        INQUIRY         *
 *************************/

export const RESPOND_TO_INQUIRY = gql`
  mutation RespondToInquiry($input: InquiryResponse!) {
    respondToInquiry(input: $input) {
      _id
      memberId
      inquiryTitle
      inquiryContent
      inquiryStatus
      inquiryResponse
      respondedAt
      createdAt
      updatedAt
    }
  }
`;

/**************************
 *         COMMENT        *
 *************************/

export const REMOVE_COMMENT_BY_ADMIN = gql`
  mutation RemoveCommentByAdmin($input: String!) {
    removeCommentByAdmin(commentId: $input) {
      _id
      commentStatus
      commentGroup
      commentContent
      commentRefId
      memberId
      createdAt
      updatedAt
    }
  }
`;
