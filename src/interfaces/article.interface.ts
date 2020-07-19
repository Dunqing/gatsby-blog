export interface StrapiArticle {
  title: string
  strapiId: string
  content: string
  tags: StrapiArticleTag[]
  createdAt: string
  updatedAt: string
  banner: {
    childImageSharp: {
      fluid: any
    }
  }
}

export interface StrapiArticles {
  node: StrapiArticle
}

export interface StrapiArticleTag {
  name: string
  id: string
  icon: string
}

export interface QueryPageData {
  allStrapiArticle: {
    edges: StrapiArticles[]
  }
}
