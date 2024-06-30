'use strict';

///////////////////////////////////////
// Modal window

const nav = document.querySelector('.nav');
const navLinks = document.querySelector('.nav__links');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const header = document.querySelector('.header');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};
const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// Open login form
btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

// Close login form
overlay.addEventListener('click', closeModal);
btnCloseModal.addEventListener('click', closeModal);
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// Page navigation
// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

navLinks.addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// Nav links hover effect
const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('.nav__logo');

    siblings.forEach(el => {
      if (el !== link) {
        el.style.opacity = this;
        logo.style.opacity = this;
      }
    });
  }
};
// Passing argument into a handler function
nav.addEventListener('mouseover', handleHover.bind(0.5));

nav.addEventListener('mouseout', handleHover.bind(1));

// Sticky nav bar
// const initialCoords = section1.getBoundingClientRect();
// window.addEventListener('scroll', function () {
//   if (window.scrollY > initialCoords.top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });

// Sticky navbar using Intersection observer
const navHeight = nav.getBoundingClientRect().height;
const stickyNav = function (entries) {
  const [entry] = entries;
  if (entry.isIntersecting) nav.classList.remove('sticky');
  else nav.classList.add('sticky');
};
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

// observer.observe(section1);

// Cookies
const message = document.createElement('div');
message.innerHTML =
  'This website uses cookies for improvement. <button class="btn btn--close-cookie">Got it!</button>';
header.prepend(message);
message.classList.add('cookie-message');
// const html = `<button class="btn btn--close-cookie">Got it!</button>`;
// header.insertAdjacentElement('afterbegin', html);
// header.append(message.cloneNode(true));
// header.before(message);
// header.after(message);

const btnCloseCookies = document.querySelector('.btn--close-cookie');
btnCloseCookies.addEventListener('click', function () {
  // Newer way of deleting an element
  message.remove();
  // the old way
  // message.parentElement.removeChild(message);
});

// Styles
message.style.backgroundColor = '#37383d';
message.style.width = '120%';

message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

// Tabbed component
tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');

  // Guard clause
  if (!clicked) return;

  // Remove active class
  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  tabsContent.forEach(tCon =>
    tCon.classList.remove('operations__content--active')
  );

  // Active button clicked
  clicked.classList.add('operations__tab--active');

  // Active content aera
  [...tabsContent]
    .find(con =>
      con.classList.contains(`operations__content--${clicked.dataset.tab}`)
    )
    .classList.add('operations__content--active');
});

// document.documentElement.style.setProperty('--color-primary', 'blue');
// document.documentElement.style.setProperty('--color-secondary', 'aliceblue');

// Atrubutes
// const logo = document.querySelector('.nav__logo');
// console.log(logo.alt);

// logo.setAttribute('designer', 'Jonas');
// console.log(logo.getAttribute('designer'));
// console.log(logo.src);
// console.log(logo.getAttribute('src'));
// console.log(logo.dataset.versionNumber);

btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  // console.log(s1coords);

  // console.log(e.target.getBoundingClientRect());
  // console.log('(x, y) = ', pageXOffset, pageYOffset);
  // console.log(
  //   document.documentElement.clientHeight,
  //   document.documentElement.clientWidth
  // );
  // scrolling
  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // );

  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  section1.scrollIntoView({ behavior: 'smooth' });
});

// Reveal sections
const allSections = document.querySelectorAll('.section');
const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');

  observer.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});
allSections.forEach(function (section) {
  section.classList.add('section--hidden');
  sectionObserver.observe(section);
});

// Lazy loading img
const featureImages = document.querySelectorAll('img[data-src]');
const loadImg = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});
featureImages.forEach(function (img) {
  img.classList.add('lazy-img');
  imgObserver.observe(img);
});

// Slider
const sliderContainer = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const btnSlideR = document.querySelector('.slider__btn--right');
const btnSlideL = document.querySelector('.slider__btn--left');
const dotsContainer = document.querySelector('.dots');
let curSlide = 0;
const maxSlides = slides.length;

const createDots = function () {
  slides.forEach(function (_, i) {
    dotsContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${i}">
      </button>`
    );
  });
};
createDots();

const activateDot = function (slide) {
  const dots = document.querySelectorAll('.dots__dot');
  // Removing active class
  dots.forEach(dot => dot.classList.remove('dots__dot--active'));

  // Adding active class
  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add('dots__dot--active');
};

const goToSlide = function (slide) {
  slides.forEach((s, i) => {
    s.style.transform = `translateX(${100 * (i - slide)}%)`;
  });
  curSlide = slide;
  activateDot(curSlide);
};

goToSlide(0);

const nextSlide = function () {
  if (curSlide === maxSlides - 1) {
    goToSlide(0);
    curSlide = 0;
  } else {
    curSlide++;
    goToSlide(curSlide);
  }
};

const prevSlide = function () {
  if (curSlide !== 0) {
    curSlide--;
    goToSlide(curSlide);
  }
};

// Event handlers
btnSlideR.addEventListener('click', nextSlide);

btnSlideL.addEventListener('click', prevSlide);

document.addEventListener('keydown', function (e) {
  e.preventDefault();
  if (e.key === 'ArrowLeft') prevSlide();
  e.key === 'ArrowRight' && nextSlide();
});

// Dots event handler
dotsContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    const { slide } = e.target.dataset;
    goToSlide(slide);
  }
});

// const h1 = document.querySelector('h1');

// const alertH1 = function () {
//   alert('Great! you are reading the header :)');

//   h1.removeEventListener('mouseenter', alertH1);
// };
// h1.addEventListener('mouseenter', alertH1);

// Random color
// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min);
// const randomColor = () =>
//   `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)},${randomInt(0, 255)})`;
// console.log(randomColor());

// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
// });

// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
// });

// document.querySelector('.nav').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
// });

// const h1 = document.querySelector('h1');

// h1.closest('.header').style.background = 'var(--gradient-secondary)';
// h1.closest('div').previousElementSibling.style.backgroundColor = 'violet';

// [...h1.parentElement.children].find(
//   el => el === h1.parentElement.querySelector('h4')
// ).style.backgroundColor = 'magenta';

// Intersection observer in practice
// const obsCallback = function (entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry);
//   });
// };
// const obsOptions = {
//   root: null,
//   threshold: [0, 0.3],
// };
// const observer = new IntersectionObserver(obsCallback, obsOptions);
