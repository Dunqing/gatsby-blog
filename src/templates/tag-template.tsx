import React from "react"
import { graphql, Link, PageProps } from "gatsby"
import Layout from "../layouts"
import SEO from "../components/seo"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"
import { QueryPageData, StrapiArticle } from "../interfaces/article.interface"
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles"
import Img from "gatsby-image"
import ReactMarkdown from "react-markdown"
import ArticleCard from "../components/article-card"
import Grid from "@material-ui/core/Grid"
import TagHeader from "../components/tag-header"
import LoyaltyRoundedIcon from "@material-ui/icons/LoyaltyRounded"
import Chip from "@material-ui/core/Chip"

interface PageContextType {
  strapiId: string
  name: string
}

const useTagTemplateStyles = makeStyles(theme =>
  createStyles({
    title: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      padding: theme.spacing(1, 2),
    },
  })
)

const IndexPage: React.FC<PageProps<QueryPageData, PageContextType>> = ({
  data,
  pageContext,
}) => {
  const classes = useTagTemplateStyles()
  const { allStrapiArticle } = data
  const title = pageContext.name
  const subtitle = `文章数量(${allStrapiArticle.edges.length})`
  return (
    <Layout>
      <SEO title="Home" />
      <TagHeader title={title} subtitle={subtitle}></TagHeader>
      <Grid spacing={2} alignItems="center" container>
        {allStrapiArticle.edges.map(article => (
          <Grid
            key={article.node.strapiId}
            item
            xl={3}
            lg={4}
            md={6}
            sm={12}
            xs={12}
          >
            <ArticleCard article={article}></ArticleCard>
          </Grid>
        ))}
      </Grid>
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  query($strapiId: String!) {
    allStrapiArticle(
      filter: { tags: { elemMatch: { id: { eq: $strapiId } } } }
    ) {
      edges {
        node {
          strapiId
          title
          createdAt(formatString: "Y/MM/DD")
          updatedAt(formatString: "Y/MM/DD")
          content
          banner {
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid
              }
            }
          }
          tags {
            id
            name
            icon
          }
        }
      }
    }
  }
`
