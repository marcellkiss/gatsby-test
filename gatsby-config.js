module.exports = {
  siteMetadata: {
    title: `SI - Planning Poker (beta)`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: "gatsby-plugin-firebase",
      options: {
        features: {
          firestore: true,
        },
        credentials: {
          apiKey: "AIzaSyByYt8ki2Q3LWd75NFojxqQpZ-tnV_8z5w",
          authDomain: "planning-poker-b8f66.firebaseapp.com",
          projectId: "planning-poker-b8f66",
          storageBucket: "planning-poker-b8f66.appspot.com",
          messagingSenderId: "1013370510327",
          appId: "1:1013370510327:web:b12b10d63bf377144eacf2",
        },
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
