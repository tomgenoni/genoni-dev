function initFadeshow() {
    const fadeshows = document.querySelectorAll('.fadeshow');

    fadeshows.forEach((fadeshow) => {
        const images = fadeshow.querySelectorAll('img');
        images[0].classList.add('is-active');
        let counter = 0;

        function fadeImages(img1, img2) {
            images[img1].classList.remove('is-active');
            images[img2].classList.add('is-active');
        }

        const fadeshowInterval = setInterval(function () {
            if (counter === images.length - 1) {
                fadeImages(images.length - 1, 0);
                counter = 0;
            } else {
                fadeImages(counter, counter + 1);
                counter++;
            }
        }, 3000);
    });
}

initFadeshow();
