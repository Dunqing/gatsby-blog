import React from "react"
import { graphql, Link, PageProps, navigate } from "gatsby"
import Layout from "../layouts"
import SEO from "../components/seo"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"
import {
  StrapiArticle,
  StrapiArticleTag,
} from "../interfaces/article.interface"
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles"
import Img from "gatsby-image"
import ReactMarkdown from "react-markdown"
import Grid from "@material-ui/core/Grid"
import Container from "@material-ui/core/Container"
import { Button, Chip, IconButton, withStyles } from "@material-ui/core"
import { TagArticle } from "../interfaces/tags.interface"
import {
  HomeRounded,
  NavigateBeforeRounded,
  SkipNext,
  SkipPrevious,
} from "@material-ui/icons"

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
    markdown: {
      width: "100%",
    },
  })
)

const useArticleStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    time: {
      display: "flex",
      padding: theme.spacing(2, 2, 0),
      justifyContent: "space-between",
    },
    button: {
      position: "absolute",
      left: "5px",
      top: "5px",
      colro: "#fff",
    },
    header: {
      position: "relative",
      backgroundColor: theme.palette.primary.main,
      padding: theme.spacing(4, 0, 2),
      color: theme.palette.primary.contrastText,
    },
    main: {
      margin: theme.spacing(1, 0, 0),
    },
    title: {},
    createdTime: {
      display: "flex",
      justifyContent: "center",
    },
    updatedTime: {
      display: "flex",
      justifyContent: "flex-end",
    },
  })
)

const ArticleContent = ({ source }) => {
  const classes = useArticleContentStyles()
  return (
    <Paper className={classes.paper} elevation={2}>
      <Typography component="article" color="textPrimary" display="block">
        <ReactMarkdown
          className={classes.markdown}
          transformImageUri={uri => `http://127.0.0.1:2337/${uri}`}
          source={source}
        />
      </Typography>
    </Paper>
  )
}

const ColorButton = withStyles((theme: Theme) => ({
  root: {
    color: "#fff",
  },
}))(IconButton)

const ArticleHeader: React.FC<{ article: StrapiArticle }> = ({ article }) => {
  const classes = useArticleStyles()
  return (
    <header className={classes.header}>
      <ColorButton
        onClick={() => {
          navigate("/")
        }}
        className={classes.button}
      >
        <HomeRounded></HomeRounded>
      </ColorButton>
      <Typography variant="h4" align="center">
        {article.title}
      </Typography>
      <div className={classes.time}>
        <Typography className={classes.createdTime} variant="subtitle2">
          <span>发布于：{article.createdAt}</span>
        </Typography>
        <Typography className={classes.updatedTime} variant="subtitle2">
          <span>最后更新时间：{article.updatedAt}</span>
        </Typography>
      </div>
      <div></div>
    </header>
  )
}

interface QueryPageData {
  strapiArticle: StrapiArticle
}

const ArticleTags: React.FC<{ tags: StrapiArticleTag[] }> = ({ tags }) => {
  return (
    <Grid container spacing={1}>
      {tags.map(tag => (
        <Grid key={tag.id} item md={6}>
          <Chip
            onClick={() => navigate(`/tag/${tag.id}`)}
            label={tag.name}
            clickable
            color="primary"
          />
        </Grid>
      ))}
    </Grid>
  )
}

const IndexPage: React.FC<PageProps<QueryPageData>> = ({ data }) => {
  console.log(data)
  const classes = useArticleStyles()
  const { strapiArticle } = data
  return (
    <>
      <SEO title={strapiArticle.title} />
      <ArticleHeader article={strapiArticle}></ArticleHeader>
      <main className={classes.main}>
        <Container>
          <Grid spacing={2} container>
            <Grid item xs={12} md={2} lg={3}>
              <ArticleTags tags={strapiArticle.tags}></ArticleTags>
            </Grid>
            <Grid item xs={12} md={10} lg={9}>
              {strapiArticle.banner && (
                <Img fluid={strapiArticle.banner.childImageSharp.fluid}></Img>
              )}
              <ArticleContent source={strapiArticle.content}></ArticleContent>
            </Grid>
          </Grid>
        </Container>
      </main>
    </>
  )
}

export default IndexPage

export const query = graphql`
  query($strapiId: String!) {
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
