/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const makeRequest = (graphql, request) => {
  return new Promise((resolve, reject) => {
    resolve(
      graphql(request).then(result => {
        if (result.errors) {
          reject(result.errors)
        }
        return result
      })
    )
  })
}

const getAllArticle = (graphql, actions) =>
  makeRequest(
    graphql,
    ` 
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
  `
  ).then(result => {
    result.data.allStrapiArticle.edges.forEach(edge => {
      const strapiId = edge.node.strapiId
      actions.createPage({
        path: `article/${strapiId}`,
        component: require.resolve(`./src/templates/article-template.tsx`),
        context: { strapiId },
      })
    })
  })

exports.createPages = async function ({ actions, graphql }) {
  return Promise.all([getAllArticle(graphql, actions)])
}
