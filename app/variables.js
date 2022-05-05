module.exports = {
  postData: {
    work: [],
    write: [],
  },
  path: {
    postGlob: './src/post/**/*.md',
    dir: {
      rolls: './src/post/work/',
      layout: './src/layout/',
      partials: './src/layout/partials/',
    },
    dist: {
      root: './dist/',
      work: './dist/work/',
      write: './dist/write/',
    },
    template: {
      rootIndex: './src/layout/pages/index.njk',
      writePost: './src/layout/pages/post.njk',
    },
  },
  urls: {
    site: 'https://genoni.dev',
    imageKit: 'https://ik.imagekit.io',
    imageKitCode: 'kdzcwco6qw',
  },
};
