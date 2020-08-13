const siteTitle = 'MitchellCash.com';
const siteDescription = "I'm Mitchell Cash: sort of geeky, sort of not.";

export default {
  mode: 'universal',

  target: 'static',

  srcDir: 'src/',

  head: {
    title: siteTitle,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: siteDescription
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Global CSS
   */
  css: ['bootstrap/scss/bootstrap.scss', '@/assets/scss/main.scss'],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [{ src: '../node_modules/bootstrap/js/src/index.js', mode: 'client' }],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [],
  /*
   ** Nuxt.js modules
   */
  modules: ['@nuxt/content', '@nuxtjs/feed', '@nuxtjs/pwa', '@nuxtjs/sitemap'],
  /*
   ** Feed configuration
   */
  feed: [
    {
      path: '/feed.xml',

      async create(feed) {
        const baseUrl = 'https://mitchellcash.com';

        feed.options = {
          title: siteTitle,
          link: baseUrl,
          description: siteDescription
        };

        const { $content } = require('@nuxt/content');
        const articles = await $content('blog').fetch();

        articles.forEach((article) => {
          const url = `${baseUrl}/blog/${article.slug}`;

          feed.addItem({
            title: article.title,
            id: article.slug,
            link: url,
            date: new Date(article.createdAt),
            description: article.summary
          });
        });
      },

      cacheTime: 1000 * 60 * 15, // How long should the feed be cached
      type: 'rss2' // Can be: rss2, atom1, json1
    }
  ],
  /*
   ** Sitemap configuration
   */
  sitemap: {
    hostname: 'https://mitchellcash.com',

    routes: async () => {
      const fs = require('fs');
      const path = require('path');
      const blogPaths = [];

      blogPaths.push('/blog');

      fs.readdirSync('./src/content/blog').forEach((file) => {
        blogPaths.push(`/blog/${path.parse(file).name}`); // Return the slug
      });

      return blogPaths;
    }
  },
  /*
   ** Content module configuration
   ** See https://content.nuxtjs.org/configuration
   */
  content: {},
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {}
};
