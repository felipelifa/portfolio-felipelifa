const Carousel = (() => {
    const getActiveSlide = () =>
        document.querySelector(".carousel__slide.active");
    const getFirstSlide = () =>
        document.querySelector(".carousel__slider").firstElementChild;
    const getLastSlide = () =>
        document.querySelector(".carousel__slider").lastElementChild;

    const getSiblingSlide = (slide, direction) =>
        direction === "prev"
            ? slide.previousElementSibling
            : slide.nextElementSibling;

    const getNewActiveSlide = (key, activeSlide) => {
        const actions = {
            Home: getFirstSlide,
            End: getLastSlide,
            ArrowLeft: () => getSiblingSlide(activeSlide, "prev"),
            ArrowRight: () => getSiblingSlide(activeSlide, "next")
        };
        return actions[key]?.() || null;
    };

    const updateScreen = (activeSlide) => {
        const carouselScreen = document.querySelector(".image-display .screen");
        const img = activeSlide.querySelector("img").cloneNode(true);
        carouselScreen.innerHTML = "";
        carouselScreen.appendChild(img);
    };

    const scrollToActiveSlide = (activeSlide) => {
        const carouselSlider = document.querySelector(".carousel__slider");
        const { offsetLeft, offsetWidth } = activeSlide;
        const { clientWidth } = carouselSlider;

        carouselSlider.scrollTo({
            left: offsetLeft - clientWidth / 2 + offsetWidth / 2,
            behavior: "smooth"
        });
    };

    const updateActiveSlideClass = (activeSlide) => {
        document
            .querySelectorAll(".carousel__slide.active")
            .forEach((slide) => slide.classList.remove("active"));
        activeSlide.classList.add("active");
    };

    const updateCarousel = (activeSlide) => {
        updateActiveSlideClass(activeSlide);
        updateScreen(activeSlide);
        scrollToActiveSlide(activeSlide);
        updateButtonStates(activeSlide);
    };

    const updateButtonStates = (activeSlide) => {
        const prevButton = document.querySelector(".carousel__btn.prev");
        const nextButton = document.querySelector(".carousel__btn.next");

        prevButton.disabled = !getSiblingSlide(activeSlide, "prev");
        nextButton.disabled = !getSiblingSlide(activeSlide, "next");
    };

    const handleKeydown = (e) => {
        if (!e.target.closest(".carousel__slider")) return;
        const activeSlide = getActiveSlide();
        const newActiveSlide = getNewActiveSlide(e.key, activeSlide);

        if (newActiveSlide) {
            e.preventDefault();
            updateCarousel(newActiveSlide);
        }
    };

    const handleButtonClick = (e) => {
        const activeSlide = getActiveSlide();
        const newActiveSlide = getSiblingSlide(
            activeSlide,
            e.currentTarget.classList.contains("prev") ? "prev" : "next"
        );

        if (newActiveSlide) {
            updateCarousel(newActiveSlide);
        }
    };

    const handleCarouselClick = (e) => {
        const clickedSlide = e.target.closest(".carousel__slide");
        if (clickedSlide) {
            updateCarousel(clickedSlide);
        }
    };

    const initCarousel = () => {
        const carouselSlider = document.querySelector(".carousel__slider");
        const prevButton = document.querySelector(".carousel__btn.prev");
        const nextButton = document.querySelector(".carousel__btn.next");

        updateCarousel(getFirstSlide());

        document.addEventListener("keydown", handleKeydown);
        prevButton.addEventListener("click", handleButtonClick);
        nextButton.addEventListener("click", handleButtonClick);
        carouselSlider.addEventListener("click", handleCarouselClick);
    };

    initCarousel();
})();
// Animação ao aparecer na tela
const blocks = document.querySelectorAll('.block');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.1
});

blocks.forEach(block => {
  observer.observe(block);
});

  const toggleBtn = document.getElementById('menuToggle');
  const menu = document.querySelector('nav.menu');

  toggleBtn.addEventListener('click', () => {
    menu.classList.toggle('open');
  });
(function(){
  const slider = document.getElementById('slider');
  if (!slider) return;

  const slides = Array.from(slider.querySelectorAll('.carousel__slide'));
  const prevBtn = document.querySelector('.carousel__btn.prev');
  const nextBtn = document.querySelector('.carousel__btn.next');
  const dotsWrap = document.querySelector('.carousel-dots');
  const preview = document.getElementById('previewImage');

  // cria dots
  const dots = slides.map((_, i) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.setAttribute('aria-label', 'Ir para slide ' + (i+1));
    b.addEventListener('click', () => goTo(i, true));
    dotsWrap && dotsWrap.appendChild(b);
    return b;
  });

  let idx = 0, ticking = false;

  function setActive(i){
    idx = Math.max(0, Math.min(i, slides.length - 1));
    slides.forEach((li, j) => li.setAttribute('aria-selected', j === idx ? 'true' : 'false'));
    dots.forEach((d, j) => d.setAttribute('aria-current', j === idx ? 'true' : 'false'));
    // preview grande (desktop)
    const a = slides[idx].querySelector('.thumbnail');
    if (preview && a && a.dataset.cover) preview.src = a.dataset.cover;
  }

  function goTo(i, smooth){
    const el = slides[i];
    if (!el) return;
    el.scrollIntoView({ behavior: smooth ? 'smooth' : 'instant', inline: 'center', block: 'nearest' });
    setActive(i);
  }

  // botões
  prevBtn && prevBtn.addEventListener('click', () => goTo(idx - 1, true));
  nextBtn && nextBtn.addEventListener('click', () => goTo(idx + 1, true));

  // teclado
  slider.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') goTo(idx + 1, true);
    if (e.key === 'ArrowLeft') goTo(idx - 1, true);
  });

  // detectar slide ativo ao rolar
  slider.addEventListener('scroll', () => {
    if (ticking) return;
    window.requestAnimationFrame(() => {
      const rects = slides.map(s => {
        const r = s.getBoundingClientRect();
        return { el: s, center: Math.abs((r.left + r.right) / 2 - window.innerWidth / 2) };
      });
      const nearest = rects.reduce((a, b) => a.center < b.center ? a : b);
      const i = slides.indexOf(nearest.el);
      setActive(i);
      ticking = false;
    });
    ticking = true;
  }, { passive: true });

  // swipe (touch)
  let startX = 0;
  slider.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; }, { passive: true });
  slider.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 50) (dx < 0 ? goTo(idx + 1, true) : goTo(idx - 1, true));
  });

  // init
  setActive(0);
})();