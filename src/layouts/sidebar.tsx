import React, { Dispatch } from "react"
import {
  createStyles,
  Theme,
  makeStyles,
  useTheme,
} from "@material-ui/core/styles"
import { graphql, Link, useStaticQuery } from "gatsby"
import Img from "gatsby-image"
import clsx from "clsx"
import Drawer from "@material-ui/core/Drawer"
import List from "@material-ui/core/List"
import Hidden from "@material-ui/core/Hidden"
import Divider from "@material-ui/core/Divider"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import InboxIcon from "@material-ui/icons/MoveToInbox"
import MailIcon from "@material-ui/icons/Mail"
import Face from "@material-ui/icons/Face"
import CategoryIcon from "@material-ui/icons/Category"
import MenuBookIcon from "@material-ui/icons/MenuBook"
import TagFacesIcon from "@material-ui/icons/TagFaces"
import GithubIcon from "@material-ui/icons/GitHub"
import { DispatchValue, DrawerState, DispatchType } from "./index"
import { useLayoutStyles } from "../hooks/layouts"

interface SidebarProps {
  drawerState: DrawerState
  drawerDispatch: Dispatch<DispatchValue>
}

const Profile = () => {
  const layoutClasses = useLayoutStyles()
  const data = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "sidebar.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 240) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)
  return (
    <>
      <div className={layoutClasses.toolbar}>
        <Img fluid={data.placeholderImage.childImageSharp.fluid}></Img>
      </div>
    </>
  )
}

const DrawerContent = () => {
  const githubUrl = "https://github.com/1247748612/gatsby-blog"
  const PageMenuList = [
    {
      path: "/articles",
      icon: <MenuBookIcon></MenuBookIcon>,
      text: "文章",
    },
    {
      path: "/categories",
      icon: <CategoryIcon></CategoryIcon>,
      text: "分类",
    },
    {
      path: "/tags",
      icon: <TagFacesIcon></TagFacesIcon>,
      text: "标签",
    },
  ]
  return (
    <>
      <List>
        {PageMenuList.map(menu => (
          <Link key={menu.path} to={menu.path}>
            <ListItem button>
              <ListItemIcon>{menu.icon}</ListItemIcon>
              <ListItemText primary={menu.text} />
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem button>
          <ListItemIcon>
            <GithubIcon></GithubIcon>
          </ListItemIcon>
          <ListItemText>
            <a target="_blank" href={githubUrl}>
              github地址
            </a>
          </ListItemText>
        </ListItem>
      </List>
    </>
  )
}

const Sidebar: React.FC<SidebarProps> = props => {
  const { drawerState, drawerDispatch } = props
  const theme = useTheme()
  const layoutClasses = useLayoutStyles()

  const toggleDrawer = (type: DispatchType) => (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    if (
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return
    }
    drawerDispatch({
      type,
      value: false,
    })
  }

  return (
    <>
      <Hidden smUp implementation="css">
        <Drawer
          open={drawerState.mobile}
          onClose={toggleDrawer("mobile")}
          className={clsx(layoutClasses.drawer, {
            // [layoutClasses.drawerOpen]: drawerState,
            // [layoutClasses.drawerClose]: !drawerState,
          })}
          classes={{
            paper: clsx({
              [layoutClasses.drawerMobile]: drawerState.mobile,
              // [layoutClasses.drawerClose]: !drawerState.mobile,
            }),
          }}
        >
          <Profile></Profile>
          <DrawerContent></DrawerContent>
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <Drawer
          variant="permanent"
          className={clsx(layoutClasses.drawer, {
            [layoutClasses.drawerOpen]: drawerState.pc,
            [layoutClasses.drawerClose]: !drawerState.pc,
          })}
          classes={{
            paper: clsx({
              [layoutClasses.drawerOpen]: drawerState.pc,
              [layoutClasses.drawerClose]: !drawerState.pc,
            }),
          }}
        >
          <Profile></Profile>
          <DrawerContent></DrawerContent>
        </Drawer>
      </Hidden>
    </>
  )
}

export default Sidebar
