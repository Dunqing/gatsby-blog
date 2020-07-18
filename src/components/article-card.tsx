import React from "react"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardActionArea from "@material-ui/core/CardActionArea"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import CardMedia from "@material-ui/core/CardMedia"
import CardHeader from "@material-ui/core/CardHeader"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import Chip from "@material-ui/core/Chip"
import Paper from "@material-ui/core/Paper"
import Icon from "@material-ui/core/Icon"
import { graphql, Link } from "gatsby"
import {
  StrapiArticle,
  StrapiArticles,
  StrapiTags,
} from "../interfaces/article.interface"
import Img from "gatsby-image"

interface ChipData {
  key: number
  label: string
}

const useStyles = makeStyles(theme =>
  createStyles({
    cardRoot: {
      maxWidth: "100%",
      margin: theme.spacing(0, 0, 3, 0),
    },
    content: {
      overflow: "hidden",
      "text-overflow": "ellipsis",
      display: "-webkit-box",
      "-webkit-line-clamp": 2,
      "-webkit-box-orient": "vertical",
    },
  })
)

const useTagsStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      // justifyContent: "center",
      flexWrap: "wrap",
      listStyle: "none",
      width: "100%",
      padding: theme.spacing(0.5),
      margin: 0,
    },
    chip: {
      margin: theme.spacing(0.5),
    },
  })
)

interface ArticleTagsProps {
  tags: StrapiTags[]
}

const ArticleTags: React.FC<ArticleTagsProps> = props => {
  const { tags } = props
  const classes = useTagsStyles()

  return (
    <Paper component="ul" className={classes.root}>
      {tags.map(data => {
        let icon

        icon = <Icon>face</Icon>

        return (
          <li key={data.id}>
            <Chip icon={icon} label={data.name} className={classes.chip} />
          </li>
        )
      })}
    </Paper>
  )
}

// interface ArticleProps {
//   article
// }

interface ArticleCardProps {
  article: StrapiArticles
}

const ArticleCard: React.FC<ArticleCardProps> = props => {
  const { article } = props
  const { tags } = article.node
  const classes = useStyles()

  return (
    <Card className={classes.cardRoot}>
      <Link to={`/article/${article.node.strapiId}`}>
        <CardHeader
          title={article.node.title}
          subheader={`Release ${article.node.createdAt}`}
        />
        <CardActionArea>
          {article.node.banner && (
            <Img fluid={article.node.banner.childImageSharp.fluid}></Img>
          )}
          <CardContent>
            <Typography
              className={classes.content}
              variant="body2"
              color="textSecondary"
              component="p"
            >
              {article.node.content}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
      <CardActions>
        <ArticleTags tags={tags}></ArticleTags>
      </CardActions>
    </Card>
  )
}

export default ArticleCard
