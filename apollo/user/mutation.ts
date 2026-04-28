import { gql } from "@apollo/client";

/**************************
 *         MEMBER         *
 *************************/
export const SIGN_UP = gql`
  mutation Signup($input: MemberInput!) {
    signup(input: $input) {
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

export const LOGIN = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
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

export const UPDATE_MEMBER = gql`
  mutation UpdateMember($input: MemberUpdate!) {
    updateMember(input: $input) {
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

export const LIKE_TARGET_MEMBER = gql`
  mutation LikeTargetMember($input: String!) {
    likeTargetMember(memberId: $input) {
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
 *        FURNITURE       *
 *************************/
export const CREATE_FURNITURE = gql`
  mutation CreateFurniture($input: FurnitureInput!) {
    createFurniture(input: $input) {
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

export const UPDATE_FURNITURE = gql`
  mutation UpdateFurniture($input: FurnitureUpdate!) {
    updateFurniture(input: $input) {
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
      launchedAt
      discontinuedAt
      deletedAt
      createdAt
      updatedAt
      memberId
    }
  }
`;

export const LIKE_TARGET_FURNITURE = gql`
  mutation LikeTargetFurniture($input: String!) {
    likeTargetFurniture(furnitureId: $input) {
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

export const VIDEO_UPLOADER = gql`
  mutation VideoUploader($file: Upload!, $target: String!) {
    videoUploader(file: $file, target: $target)
  }
`;

/**************************
 *      BOARD-ARTICLE     *
 *************************/
export const CREATE_BOARD_ARTICLE = gql`
  mutation CreateBoardArticle($input: BoardArticleInput!) {
    createBoardArticle(input: $input) {
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

export const UPDATE_BOARD_ARTICLE = gql`
  mutation UpdateBoardArticle($input: BoardArticleUpdate!) {
    updateBoardArticle(input: $input) {
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

export const LIKE_TARGET_BOARD_ARTICLE = gql`
  mutation LikeTargetBoardArticle($input: String!) {
    likeTargetBoardArticle(articleId: $input) {
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
 *         COMMENT        *
 *************************/
export const CREATE_COMMENT = gql`
  mutation CreateComment($input: CommentInput!) {
    createComment(input: $input) {
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

export const UPDATE_COMMENT = gql`
  mutation UpdateComment($input: CommentUpdate!) {
    updateComment(input: $input) {
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

/**************************
 *         FOLLOW        *
 *************************/
export const SUBSCRIBE = gql`
  mutation Subscribe($input: String!) {
    subscribe(input: $input) {
      _id
      followingId
      followerId
      createdAt
      updatedAt
      followedByMe {
        followingId
        followerId
        myFollowing
      }
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
      updatedAt
      followedByMe {
        followingId
        followerId
        myFollowing
      }
    }
  }
`;

/**************************
 *        INQUIRY         *
 *************************/
export const CREATE_INQUIRY = gql`
  mutation CreateInquiry($input: InquiryInput!) {
    createInquiry(input: $input) {
      _id
      memberId
      inquiryTitle
      inquiryContent
      inquiryStatus
      createdAt
      updatedAt
    }
  }
`;

export const CLOSE_INQUIRY = gql`
  mutation CloseInquiry($input: String!) {
    closeInquiry(inquiryId: $input) {
      _id
      memberId
      inquiryTitle
      inquiryContent
      inquiryStatus
      createdAt
      updatedAt
    }
  }
`;

/**************************
 *      NOTIFICATION      *
 *************************/
export const SUBSCRIBE_NEWSLETTER = gql`
  mutation SubscribeNewsletter($input: SubscribeInput!) {
    subscribeNewsletter(input: $input) {
      _id
      subscriberEmail
      isActive
    }
  }
`;

export const UNSUBSCRIBE_NEWSLETTER = gql`
  mutation UnsubscribeNewsletter($input: UnsubscribeInput!) {
    unsubscribeNewsletter(input: $input) {
      _id
      subscriberEmail
      isActive
    }
  }
`;
