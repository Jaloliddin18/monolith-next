import { gql } from "@apollo/client";

/**************************
 *         MEMBER         *
 *************************/
export const GET_DESIGNERS = gql`
  query GetDesigners($input: DesignersInquiry!) {
    getDesigners(input: $input) {
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
        likedByMe {
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

export const GET_MEMBER = gql`
  query GetMember($input: String!) {
    getMember(memberId: $input) {
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
      likedByMe {
        memberId
        likeRefId
        myFavorite
      }
      followedByMe {
        followingId
        followerId
        myFollowing
      }
    }
  }
`;

/**************************
 *        FURNITURE        *
 *************************/
export const GET_FURNITURE = gql`
  query GetFurniture($input: String!) {
    getFurniture(furnitureId: $input) {
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
      likedByMe {
        memberId
        likeRefId
        myFavorite
      }
    }
  }
`;

export const GET_FURNITURES = gql`
  query GetFurnitures($input: FurnituresInquiry!) {
    getFurnitures(input: $input) {
      list {
        _id
        furnitureTitle
        furnitureRoom
        furnitureCategory
        furnitureStyle
        furnitureStatus
        furnitureMaterial
  
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
        furnitureTrending
        furnitureEngagement
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
        likedByMe {
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

export const GET_DESIGNER_FURNITURES = gql`
  query GetDesignerFurnitures($input: DesignerFurnituresInquiry!) {
    getDesignerFurnitures(input: $input) {
      list {
        _id
        furnitureTitle
        furnitureRoom
        furnitureCategory
        furnitureStyle
        furnitureStatus
        furnitureMaterial
  
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

export const GET_FAVORITES = gql`
  query GetFavorites($input: OrdinaryInquiry!) {
    getFavorites(input: $input) {
      list {
        _id
        furnitureTitle
        furnitureRoom
        furnitureCategory
        furnitureStyle
        furnitureStatus
        furnitureMaterial
  
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

export const GET_VISITED = gql`
  query GetVisited($input: OrdinaryInquiry!) {
    getVisited(input: $input) {
      list {
        _id
        furnitureTitle
        furnitureRoom
        furnitureCategory
        furnitureStyle
        furnitureStatus
        furnitureMaterial
  
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
 *      BOARD-ARTICLE     *
 *************************/
export const GET_BOARD_ARTICLE = gql`
  query GetBoardArticle($input: String!) {
    getBoardArticle(articleId: $input) {
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
      likedByMe {
        memberId
        likeRefId
        myFavorite
      }
    }
  }
`;

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
        likedByMe {
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

/**************************
 *         COMMENT        *
 *************************/
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

/**************************
 *         FOLLOW        *
 *************************/
export const GET_MEMBER_FOLLOWERS = gql`
  query GetMemberFollowers($input: FollowInquiry!) {
    getMemberFollowers(input: $input) {
      list {
        _id
        followingId
        followerId
        createdAt
        updatedAt
        followerData {
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
        likedByMe {
          memberId
          likeRefId
          myFavorite
        }
        followedByMe {
          followingId
          followerId
          myFollowing
        }
      }
      metaCounter {
        total
      }
    }
  }
`;

export const GET_MEMBER_FOLLOWINGS = gql`
  query GetMemberFollowings($input: FollowInquiry!) {
    getMemberFollowings(input: $input) {
      list {
        _id
        followingId
        followerId
        createdAt
        updatedAt
        followingData {
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
        likedByMe {
          memberId
          likeRefId
          myFavorite
        }
        followedByMe {
          followingId
          followerId
          myFollowing
        }
      }
      metaCounter {
        total
      }
    }
  }
`;
