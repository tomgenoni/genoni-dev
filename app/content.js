const fs = require('fs-extra'),
    nunjucks = require('nunjucks'),
    glob = require('glob'),
    Prism = require('prismjs'),
    marked = require('marked'),
    fm = require('front-matter');

// Vars
// ----------------------

const vars = require('./variables');

// Options
// -----------------------

// Use Prism highlighting for the markdown
const loadLanguages = require('prismjs/components/');
loadLanguages(['bash']);

marked.setOptions({
    highlight: function (code, lang) {
        return Prism.highlight(code, Prism.languages[lang || 'markup']);
    },
});

var env = new nunjucks.Environment(new nunjucks.FileSystemLoader('./src/layout'));

// Nunjucks root template/partials path with global vars
env.addGlobal('urls', {
    site: vars.urls.site,
    imageKit: vars.urls.imageKit,
    imageKitCode: vars.urls.imageKitCode,
})

env.addFilter('md', function (val, cb) {
    console.log("safd")
    return marked(val.val)
}, false);

// Functions
// -----------------------

function buildPages() {
    var rootTemplate = env.render('pages/index.njk', vars.postData);
    writeFile(rootTemplate, './dist/index.html');

    vars.postData.write.forEach((post) => {
        var postTemplate = env.render('pages/post.njk', post);
        writeFile(postTemplate, vars.path.dist.write + post.basename + '.html');
    });
}

function writeFile(inputFile, distFile) {
    fs.outputFile(distFile, inputFile);
}

// Get data from markdown files
function getContent(files) {
    files.forEach((file) => {
        const filename = file.split('/').reverse()[0]; // get filename with extension
        const basename = filename.split('.')[1]; // remove the .md, leaving just filename w/out extension
        const category = file.split('/').reverse()[1]; // get category: 'work' or 'write'
        const content = fs.readFileSync(file, 'utf8').toString(); // all content of file
        const filedata = fm(content); // convert file to object with front-matter
        const markdown = marked(filedata.body); // convert body to markdown
        const body = env.renderString(markdown); // convert any Nunjuck macros

        var o = {
            basename: basename,
            fm: filedata.attributes,
            body: body,
        };

        vars.postData[category].push(o);
    });
}

// Get all markdown files
function init() {
    glob(vars.path.postGlob, function (er, files) {
        getContent(files);
        buildPages();
    });
}

// Remove directories & recreate
fs.removeSync(vars.path.dist.write);

// Get posts
init();
