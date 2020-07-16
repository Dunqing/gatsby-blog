export interface StrapiArticle {
  node: {
    title: string
    strapiId: string
    content: string
    banner: {
      childImageSharp: {
        fluid: any
      }
    }
  }
}

export interface QueryPageData {
  allStrapiArticle: {
    edges: StrapiArticle[]
  }
}
