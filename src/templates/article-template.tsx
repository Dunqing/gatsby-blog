import React from "react"
import { graphql, Link, PageProps } from "gatsby"
import Layout from "../layouts"
import SEO from "../components/seo"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"
import { StrapiArticle } from "../interfaces/article.interface"
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles"
import Img from "gatsby-image"
import ReactMarkdown from "react-markdown"

const useArticleContentStyles = makeStyles((theme: Theme) =>
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

const useArticleStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      textAlign: "center",
      padding: theme.spacing(2, 0, 0),
    },
    createdTime: {
      display: "flex",
      justifyContent: "center",
      padding: theme.spacing(1, 0),
    },
    updatedTime: {
      display: "flex",
      margin: theme.spacing(2, 0, 0),
      justifyContent: "flex-end",
    },
  })
)

const ArticleContent = ({ children, source }) => {
  const classes = useArticleContentStyles()
  return (
    <Paper className={classes.paper} elevation={2}>
      <Typography component="div">
        <ReactMarkdown source={source} escapeHtml={false} />
        {children}
      </Typography>
    </Paper>
  )
}

interface QueryPageData {
  strapiArticle: StrapiArticle
}

const IndexPage: React.FC<PageProps<QueryPageData>> = ({ data }) => {
  console.log(data)
  const classes = useArticleStyles()
  const { strapiArticle } = data
  return (
    <Layout>
      <SEO title={strapiArticle.title} />
      <>
        <Typography className={classes.title} variant="h4" component="h4">
          {strapiArticle.title}
        </Typography>
        <Typography className={classes.createdTime} variant="subtitle2">
          <span>发布于：{strapiArticle.createdAt}</span>
        </Typography>
        {strapiArticle.banner && (
          <Img fluid={strapiArticle.banner.childImageSharp.fluid}></Img>
        )}
        <ArticleContent source={strapiArticle.content}>
          <Typography className={classes.updatedTime} variant="subtitle2">
            <span>最后更新时间：{strapiArticle.updatedAt}</span>
          </Typography>
        </ArticleContent>
      </>
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  query MyQuery($strapiId: String!) {
    strapiArticle(strapiId: { eq: $strapiId }) {
      content
      title
      updatedAt(formatString: "Y/MM/DD")
      createdAt(formatString: "Y/MM/DD")
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
`
