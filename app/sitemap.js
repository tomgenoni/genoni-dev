const SitemapGenerator = require('sitemap-generator');
const vars = require('./variables');

// create generator
const generator = SitemapGenerator(vars.urls.site, {
    stripQuerystring: false,
    filepath: './src/sitemap.xml',
});

// register event listeners
generator.on('done', () => {
    console.log('✔ sitemap');
});

// start the crawler
generator.start();
