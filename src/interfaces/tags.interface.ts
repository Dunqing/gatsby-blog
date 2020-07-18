export interface TagArticle {
  id: string
  title: string
}

export interface StrapiTag {
  icon: string
  name: string
  strapiId: string
  articles: TagArticle[]
}

export interface StrapiTags {
  node: StrapiTag
}
export interface TagQueryPageData {
  allStrapiTag: {
    edges: StrapiTags[]
  }
}
