const SitemapGenerator = require('sitemap-generator');
const vars = require('./variables');

// create generator
const generator = SitemapGenerator(vars.urls.site, {
  stripQuerystring: false,
  filepath: './dist/sitemap.xml',
});

// register event listeners
generator.on('done', () => {
  console.log('  ✔ created');
});

// start the crawler
generator.start();
