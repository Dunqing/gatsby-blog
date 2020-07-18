export interface StrapiArticle {
  title: string
  strapiId: string
  content: string
  tags: StrapiTags[]
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

export interface StrapiTags {
  name: string
  id: string
  icon: string
}

export interface QueryPageData {
  allStrapiArticle: {
    edges: StrapiArticles[]
  }
}
