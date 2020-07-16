import React from "react"
import { Link, PageProps } from "gatsby"
import Layout from "../layouts"
import Image from "../components/image"
import SEO from "../components/seo"
import Typography from '@material-ui/core/Typography';

const IndexPage: React.FC<PageProps<{}>> = ({ data }) => (
  <Layout>
    <SEO title="Home" />
    <h1>Hi people</h1>

    <Typography paragraph>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
      ut labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent elementum
      facilisis leo vel. Risus at ultrices mi tempus imperdiet. Semper risus in hendrerit
      gravida rutrum quisque non tellus. Convallis convallis tellus id interdum velit laoreet id
      donec ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
      adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra nibh cras.
      Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo quis
      imperdiet massa tincidunt. Cras tincidunt lobortis feugiat vivamus at augue. At augue eget
      arcu dictum varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem
      donec massa sapien faucibus et molestie ac.
    </Typography>
    <Typography paragraph>
      Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper eget nulla
      facilisi etiam dignissim diam. Pulvinar elementum integer enim neque volutpat ac
      tincidunt. Ornare suspendisse sed nisi lacus sed viverra tellus. Purus sit amet volutpat
      consequat mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis risus sed
      vulputate odio. Morbi tincidunt ornare massa eget egestas purus viverra accumsan in. In
      hendrerit gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem et
      tortor. Habitant morbi tristique senectus et. Adipiscing elit duis tristique sollicitudin
      nibh sit. Ornare aenean euismod elementum nisi quis eleifend. Commodo viverra maecenas
      accumsan lacus vel facilisis. Nulla posuere sollicitudin aliquam ultrices sagittis orci a.
    </Typography>

    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>
    <Link to="/page-2/">Go to page 2</Link> <br />
    <Link to="/using-typescript/">Go to "Using TypeScript"</Link>
  </Layout>
)

export default IndexPage
