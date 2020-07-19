import { makeStyles, createStyles } from "@material-ui/core"
import React from "react"
import Typography from "@material-ui/core/Typography"

interface TagHeaderProps {
  title?: React.ReactNode | string
  subtitle?: string
}

const useTagHeaderStyles = makeStyles(theme =>
  createStyles({
    root: {
      backgroundColor: theme.palette.primary.main,
      padding: theme.spacing(1, 2),
    },
    title: {
      color: theme.palette.primary.contrastText,
    },
    subtitle: {
      color: theme.palette.primary.contrastText,
    },
  })
)

const TagHeader: React.FC<TagHeaderProps> = props => {
  const classes = useTagHeaderStyles()
  return (
    <div className={classes.root}>
      <Typography className={classes.title} variant="h4">
        {props.title}
      </Typography>
      <Typography className={classes.subtitle} variant="subtitle2">
        {props.subtitle}
      </Typography>
    </div>
  )
}

export default TagHeader
