function makeSlideshow(selector) {
    const container = document.querySelector(selector);
    const listDivImg = container.querySelectorAll('.list-img div');
    const next = container.querySelector('.next');
    const prev = container.querySelector('.prev');
    const imgWrap = container.querySelector('.img-wrap img');
    const dotsContainer = container.querySelector('.dots');

    let currentIndex = 0;
    let interval;

    function createDots() {
        for (let i = 0; i < listDivImg.length; i++) {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            dotsContainer.appendChild(dot);
        }
    }
 
    function setCurrent(index) {
        currentIndex = index;
        imgWrap.src = listDivImg[currentIndex].querySelector('img').src;

        listDivImg.forEach(item => item.classList.remove('active'));
        dotsContainer.querySelectorAll('.dot').forEach(dot => dot.classList.remove('active'));

        listDivImg[currentIndex].classList.add('active');
        dotsContainer.querySelectorAll('.dot')[currentIndex].classList.add('active');
    }

    function startSlideshow() {
        interval = setInterval(() => {
            currentIndex = (currentIndex + 1) % listDivImg.length;
            setCurrent(currentIndex);
        }, 5000);
    }

    function stopSlideshow() {
        clearInterval(interval);
    }

    createDots();
    setCurrent(currentIndex);
    startSlideshow();

    listDivImg.forEach((img, index) => {
        img.addEventListener('click', () => {
            setCurrent(index);
            stopSlideshow();
            startSlideshow();
        });
    });

    dotsContainer.querySelectorAll('.dot').forEach((dot, index) => {
        dot.addEventListener('click', () => {
            setCurrent(index);
            stopSlideshow();
            startSlideshow();
        });
    });

    next.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % listDivImg.length;
        setCurrent(currentIndex);
        stopSlideshow();
        startSlideshow();
    });

    prev.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + listDivImg.length) % listDivImg.length;
        setCurrent(currentIndex);
        stopSlideshow();
        startSlideshow();
    });
}

document.addEventListener('DOMContentLoaded', () => {
    makeSlideshow('.slider1');
});
