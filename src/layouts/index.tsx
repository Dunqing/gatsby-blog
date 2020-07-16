import React, { useReducer } from "react"
import CssBaseline from "@material-ui/core/CssBaseline"
import Container from "@material-ui/core/Container"
import PropTypes from "prop-types"
import Navbar from "./navbar"
import { useLayoutStyles } from "../hooks/layouts"
import Sidebar from "./sidebar"
import { useTheme } from "@material-ui/styles"
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles"
import { useMediaQuery } from "@material-ui/core"
import { graphql } from "gatsby"

export type DispatchType = "mobile" | "pc" | "reset"

export interface DispatchValue {
  type: DispatchType
  value?: boolean
}

export interface DrawerState {
  pc: boolean
  mobile: boolean
}

const initialDrawerState = {
  pc: true,
  mobile: false,
}

export const drawerReducer = (state: DrawerState, action: DispatchValue) => {
  const { type, value } = action
  switch (type) {
    case "mobile":
      return {
        ...state,
        mobile: value,
      }
    case "pc":
      return {
        ...state,
        pc: value,
      }
    case "reset":
      return initialDrawerState
    default:
      throw new Error("No such action type")
  }
}

const Layout: React.FC<{}> = ({ children }) => {
  const layoutClasses = useLayoutStyles()
  const [state, dispatch] = useReducer(drawerReducer, initialDrawerState)
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)")
  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  )
  return (
    <ThemeProvider theme={theme}>
      <div className={layoutClasses.root}>
        <CssBaseline />
        <Navbar drawerState={state} drawerDispatch={dispatch}></Navbar>
        <Sidebar drawerState={state} drawerDispatch={dispatch}></Sidebar>
        <main className={layoutClasses.content}>
          <div className={layoutClasses.toolbar}></div>
          <Container maxWidth="lg">{children}</Container>
        </main>
      </div>
    </ThemeProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout

// export const query = graphql`
//   query {

//   }
// `
