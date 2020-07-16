import React, { Dispatch } from "react"
import {
  createStyles,
  Theme,
  makeStyles,
  useTheme,
} from "@material-ui/core/styles"
import clsx from 'clsx'
import Drawer from "@material-ui/core/Drawer"
import CssBaseline from "@material-ui/core/CssBaseline"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import List from "@material-ui/core/List"
import Hidden from '@material-ui/core/Hidden';
import Divider from "@material-ui/core/Divider"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import InboxIcon from "@material-ui/icons/MoveToInbox"
import MailIcon from "@material-ui/icons/Mail"
import { DispatchValue, DrawerState, DispatchType } from "./index"
import { useLayoutStyles } from "../hooks/layouts"

interface SidebarProps {
  drawerState: DrawerState,
  drawerDispatch: Dispatch<DispatchValue>
}

const Profile = () => (
  <div className={layoutClasses.toolbar}>
  </div>
)

const DrawerContent = () => (
  <>
    <List>
      {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
        <ListItem button key={text}>
          <ListItemIcon>
            {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
          </ListItemIcon>
          <ListItemText primary={text} />
        </ListItem>
      ))}
    </List>
    <Divider />
    <List>
      {["All mail", "Trash", "Spam"].map((text, index) => (
        <ListItem button key={text}>
          <ListItemIcon>
            {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
          </ListItemIcon>
          <ListItemText primary={text} />
        </ListItem>
      ))}
    </List>
  </>
)


const Sidebar: React.FC<SidebarProps> = (props) => {
  const { drawerState, drawerDispatch } = props
  const theme = useTheme()
  const layoutClasses = useLayoutStyles()

  console.log(theme.palette)

  const toggleDrawer = (type: DispatchType) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return
    }
    drawerDispatch({
      type,
      value: false
    })
  }

  return (
    <>
      <Hidden smUp implementation="css">
        <Drawer
          open={drawerState.mobile}
          onClose={toggleDrawer('mobile')}
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
          <Profile layoutClasses={layoutClasses}></Profile>
          <DrawerContent ></DrawerContent>
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
          <Profile layoutClasses={layoutClasses}></Profile>
          <DrawerContent></DrawerContent>
        </Drawer>
      </Hidden>
    </>
  )
}

export default Sidebar
