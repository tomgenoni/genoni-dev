// Usage: yarn screenshot_local path/to/file.png

const sharp = require("sharp");

const image = sharp(process.argv[3]);
const tabBarHeight = 222;

image.metadata().then(function(metadata) {
  return image
    .extract({
      width: metadata.width,
      height: metadata.height - tabBarHeight,
      left: 0,
      top: tabBarHeight
    })
    .extend({
      top: 62,
      bottom: 0,
      left: 0,
      right: 0,
      background: {
        r: 230,
        g: 230,
        b: 230,
        alpha: 1
      }
    })
    .composite([
      {
        input: "./tools/asset/screenshot/chrome-controls.svg",
        gravity: "northeast",
        top: 22,
        left: 22
      }
    ])
    .jpeg({
      quality: 100
    })
    .toFile("./tmp/post-chrome.jpg", (err, info) => {
      console.log(err);
    });
});
