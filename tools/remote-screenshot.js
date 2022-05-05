// Usage: yarn screenshot_remote 'https://thumbtack.com'
// Use with quotes to prevent special character recognition, like &

const Pageres = require('pageres');
const sharp = require('sharp');

const url = process.argv[3];

(async () => {
  await new Pageres()
    .src(url, ['1300x1231'], {
      crop: true,
      scale: 2,
      filename: 'pre-chrome',
    })
    .dest('./tmp')
    .run();

  sharp('./tmp/pre-chrome.png')
    .extend({
      top: 62,
      bottom: 0,
      left: 0,
      right: 0,
      background: {
        r: 230,
        g: 230,
        b: 230,
        alpha: 1,
      },
    })
    .composite([
      {
        input: './tools/asset/screenshot/chrome-controls.svg',
        gravity: 'northeast',
        top: 22,
        left: 22,
      },
    ])
    .jpeg({
      quality: 100,
    })
    .toFile('./tmp/post-chrome.jpg', (err, info) => {});
})();
