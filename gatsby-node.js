/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

exports.createPages = async function ({ actions, graphql }) {
  const { data } = await graphql(`
    query {
      allStrapiArticle {
        edges {
          node {
            strapiId
            title
          }
        }
      }
    }
  `)
  data.allStrapiArticle.edges.forEach(edge => {
    const strapiId = edge.node.strapiId
    actions.createPage({
      path: `article/${strapiId}`,
      component: require.resolve(`./src/templates/article-template.tsx`),
      context: { strapiId },
    })
  })
}
