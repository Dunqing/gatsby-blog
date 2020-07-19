import Layout from "../layouts/index"
import React, { useState } from "react"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import {
  Collapse,
  createStyles,
  ListItemText,
  makeStyles,
  Theme,
  ListItemSecondaryAction,
  Button,
  IconButton,
  Typography,
} from "@material-ui/core"
import { StaticQuery, graphql, Link, PageProps } from "gatsby"
import { TagArticle, TagQueryPageData } from "../interfaces/tags.interface"
import { ExpandLess, ExpandMore, StarBorder } from "@material-ui/icons"
import TagFacesIcon from "@material-ui/icons/TagFaces"
import NavigateNext from "@material-ui/icons/NavigateNext"
import LinkIcon from "@material-ui/icons/Link"
import TagHeader from "../components/tag-header"

const useTagStyles = makeStyles((theme: Theme) =>
  createStyles({
    tagArticleOpen: {
      display: "block",
    },
    tagArticleClose: {
      display: "hidden",
    },
    root: {
      width: "100%",
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
  })
)

interface TagArticleChildrenProps {
  articles: TagArticle[]
  open: boolean
}

const TagArticleChildren: React.FC<TagArticleChildrenProps> = ({
  articles,
  open,
}) => {
  const classes = useTagStyles()
  return (
    <Collapse in={open} timeout="auto" unmountOnExit>
      <List component="div" disablePadding>
        {articles.map(article => (
          <Link to={`/article/${article.id}`} key={article.id}>
            <ListItem key={article.id} button className={classes.nested}>
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText primary={article.title} />
              <ListItemSecondaryAction>
                <NavigateNext />
              </ListItemSecondaryAction>
            </ListItem>
          </Link>
        ))}
      </List>
    </Collapse>
  )
}

interface TagListProps {
  data: TagQueryPageData
}

const TagList: React.FC<TagListProps> = ({ data }) => {
  const classes = useTagStyles()
  const [key, setKey] = useState(null)
  const handleCollapse = (e: Event, openKey: string) => {
    e.preventDefault()
    if (key === openKey) {
      setKey(null)
      return
    }
    setKey(openKey)
  }
  return (
    <List>
      {data.allStrapiTag.edges.map(tag => (
        <React.Fragment key={tag.node.strapiId}>
          <Link to={`/tag/${tag.node.strapiId}`}>
            <ListItem button>
              <ListItemIcon>
                <TagFacesIcon />
              </ListItemIcon>

              <ListItemText>
                {tag.node.name}（{tag.node.articles.length}）
              </ListItemText>

              <ListItemSecondaryAction>
                {tag.node.articles.length && (
                  <IconButton
                    onClick={e => handleCollapse(e, tag.node.strapiId)}
                  >
                    {key === tag.node.strapiId ? (
                      <ExpandLess />
                    ) : (
                      <ExpandMore />
                    )}
                  </IconButton>
                )}
              </ListItemSecondaryAction>
            </ListItem>
          </Link>
          {tag.node.articles.length && (
            <TagArticleChildren
              open={key === tag.node.strapiId}
              articles={tag.node.articles}
            />
          )}
        </React.Fragment>
      ))}
    </List>
  )
}

const Tags: React.FC<PageProps<TagQueryPageData>> = ({ data }) => {
  const title = "全部标签"
  const subtitle = `标签总数量(${data.allStrapiTag.edges.length})`
  return (
    <Layout>
      <TagHeader title={title} subtitle={subtitle}></TagHeader>
      <TagList data={data}></TagList>
    </Layout>
  )
}

export default Tags

export const query = graphql`
  query strapiTag {
    allStrapiTag {
      edges {
        node {
          icon
          strapiId
          name
          articles {
            id
            title
          }
        }
      }
    }
  }
`
