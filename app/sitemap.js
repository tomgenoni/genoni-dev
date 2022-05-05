const SitemapGenerator = require('sitemap-generator');
const vars = require('./variables');

// create generator
const generator = SitemapGenerator(vars.urls.site, {
  stripQuerystring: false,
  filepath: './src/sitemap.xml',
});

// start the crawler
generator.start();
