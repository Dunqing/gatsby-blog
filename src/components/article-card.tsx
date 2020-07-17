import React from "react"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardActionArea from "@material-ui/core/CardActionArea"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import CardMedia from "@material-ui/core/CardMedia"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import Chip from "@material-ui/core/Chip"
import Paper from "@material-ui/core/Paper"

import TagFacesIcon from "@material-ui/icons/TagFaces"
import { graphql, Link } from "gatsby"
import { StrapiArticle } from "../interfaces/article.interface"
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
      "-webkit-line-clamp": 3,
      "-webkit-box-orient": "vertical",
    },
  })
)

const useTagsStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      justifyContent: "center",
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

const Tags = () => {
  const classes = useTagsStyles()
  const [chipData, setChipData] = React.useState<ChipData[]>([
    { key: 0, label: "Angular" },
    { key: 1, label: "jQuery" },
    { key: 2, label: "Polymer" },
    { key: 3, label: "React" },
    { key: 4, label: "Vue.js" },
  ])

  return (
    <Paper component="ul" className={classes.root}>
      {chipData.map(data => {
        let icon

        if (data.label === "React") {
          icon = <TagFacesIcon />
        }

        return (
          <li key={data.key}>
            <Chip icon={icon} label={data.label} className={classes.chip} />
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
  article: StrapiArticle
}

const ArticleCard: React.FC<ArticleCardProps> = props => {
  const { article } = props
  const classes = useStyles()

  return (
    <Card className={classes.cardRoot}>
      <Link to="/using-typescript">
        <CardActionArea>
          {article.node.banner && (
            <Img fluid={article.node.banner.childImageSharp.fluid}></Img>
          )}
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {article.node.title}
            </Typography>
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
        <Tags></Tags>
      </CardActions>
    </Card>
  )
}

export default ArticleCard
