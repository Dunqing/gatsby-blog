import React from "react"
import { graphql, Link, PageProps } from "gatsby"
import Layout from "../layouts"
import Image from "../components/image"
import SEO from "../components/seo"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles"
import ArticleCard from "../components/article-card"
import { QueryPageData } from "../interfaces/article.interface"

const useArticleStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      height: "auto",
      width: "100%",
      padding: theme.spacing(2),
    },
    control: {
      padding: theme.spacing(2),
    },
  })
)

const IndexPage: React.FC<PageProps<QueryPageData>> = ({ data }) => {
  const { allStrapiArticle } = data
  console.log(allStrapiArticle)
  return (
    <Layout>
      <SEO title="Home" />
      {allStrapiArticle.edges.map(articleData => (
        <ArticleCard
          key={articleData.node.strapiId}
          article={articleData}
        ></ArticleCard>
      ))}
      <p>Welcome to your new Gatsby site.</p>
      <p>Now go build something great.</p>
      <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
        <Image />
      </div>
      <Link to="/page-2/">Go to page 2</Link> <br />
      <Link to="/using-typescript/">Go to "Using TypeScript"</Link>
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  query {
    allStrapiArticle(limit: 10) {
      edges {
        node {
          strapiId
          title
          content
          tags {
            name
            id
            icon
          }
          createdAt(formatString: "Y/MM/DD")
          banner {
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`
