const root = document.documentElement;
const reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
const isFileProtocol = window.location.protocol === 'file:';

const sliderInstances = new Set();

const buildEmbedUrl = (src, { autoplay = false } = {}) => {
    try {
        const url = new URL(src);
        if (autoplay) {
            url.searchParams.set('autoplay', '1');
        }
        url.searchParams.set('rel', '0');
        url.searchParams.set('modestbranding', '1');
        url.searchParams.set('playsinline', '1');
        if (window.location && window.location.origin && window.location.origin.startsWith('http')) {
            url.searchParams.set('origin', window.location.origin);
        }
        if (isFileProtocol) {
            return '';
        }
        return url.toString();
    } catch (error) {
        const connector = src.includes('?') ? '&' : '?';
        const autoplayParam = autoplay ? 'autoplay=1&' : '';
        return `${src}${connector}${autoplayParam}rel=0&modestbranding=1&playsinline=1`;
    }
};

const hydrateIframes = (scope = document) => {
    if (isFileProtocol) return;
    const frames = scope.querySelectorAll('.video-frame iframe');
    frames.forEach((frame) => {
        const dataSrc = frame.dataset.src;
        if (!dataSrc) return;
        const src = buildEmbedUrl(dataSrc);
        if (frame.src !== src) {
            frame.src = src;
        }
    });
};

const applyFileProtocolFallback = (scope = document) => {
    if (!isFileProtocol) return;
    const frames = scope.querySelectorAll('.video-frame iframe');
    frames.forEach((frame) => {
        if (!frame.dataset.src) {
            frame.dataset.src = frame.src;
        }
        frame.src = '';
    });
};

const lightbox = document.getElementById('lightbox');
const lightboxFrame = document.getElementById('lightbox-frame');
const lightboxContent = document.querySelector('.lightbox-content');
const lightboxBackdrop = document.querySelector('.lightbox-backdrop');
const closeButton = document.querySelector('.close-button');

const stopAllAutoplay = () => {
    sliderInstances.forEach((instance) => {
        if (instance.autoplay) {
            instance.autoplay.stop();
        }
    });
};

const startAllAutoplay = () => {
    sliderInstances.forEach((instance) => {
        if (instance.autoplay) {
            instance.autoplay.start();
        }
    });
};

const openLightbox = (src) => {
    if (!src || !lightbox || !lightboxFrame) return;
    if (isFileProtocol) {
        lightboxFrame.src = '';
        lightbox.classList.add('is-file-protocol');
    } else {
        lightboxFrame.src = buildEmbedUrl(src, { autoplay: true });
        lightbox.classList.remove('is-file-protocol');
    }
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    stopAllAutoplay();

    if (closeButton) {
        closeButton.focus({ preventScroll: true });
    } else if (lightboxContent) {
        if (!lightboxContent.hasAttribute('tabindex')) {
            lightboxContent.setAttribute('tabindex', '-1');
        }
        lightboxContent.focus({ preventScroll: true });
    }
};

const closeLightbox = () => {
    if (!lightbox || !lightboxFrame) return;
    lightbox.classList.remove('is-open');
    lightbox.classList.remove('is-file-protocol');
    lightbox.setAttribute('aria-hidden', 'true');
    lightboxFrame.src = '';
    startAllAutoplay();
};

if (closeButton) {
    closeButton.addEventListener('click', closeLightbox);
}

if (lightboxBackdrop) {
    lightboxBackdrop.addEventListener('click', closeLightbox);
}

if (lightbox) {
    lightbox.addEventListener('click', (event) => {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });
}

document.addEventListener(
    'keydown',
    (event) => {
        if ((event.key === 'Escape' || event.key === 'Esc') && lightbox && lightbox.classList.contains('is-open')) {
            closeLightbox();
        }
    },
    true
);

const createSwiper = (section) => {
    const container = section.querySelector('.slider');
    if (!container) return null;

    const instance = new Swiper(container, {
        loop: true,
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        speed: 900,
        effect: 'coverflow',
        coverflowEffect: {
            rotate: 28,
            stretch: 0,
            depth: 220,
            modifier: 1.1,
            slideShadows: true,
        },
        autoplay: {
            delay: 2600,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
        },
        a11y: {
            enabled: true,
            scrollOnFocus: false,
        },
        navigation: {
            nextEl: section.querySelector('.swiper-button-next'),
            prevEl: section.querySelector('.swiper-button-prev'),
        },
        pagination: {
            el: section.querySelector('.swiper-pagination'),
            clickable: true,
        },
        on: {
            init() {
                if (this.autoplay) {
                    this.autoplay.start();
                }
            },
        },
    });

    instance.on('click', () => {
        if (!instance.allowClick) return;
        const slide = instance.clickedSlide;
        if (!slide) return;
        const src = slide.getAttribute('data-video-src');
        openLightbox(src);
    });

    sliderInstances.add(instance);
    return instance;
};

const updateGradient = (point) => {
    const x = Math.min(Math.max(point.clientX / window.innerWidth, 0), 1);
    const y = Math.min(Math.max(point.clientY / window.innerHeight, 0), 1);
    root.style.setProperty('--mx', `${(x * 100).toFixed(2)}%`);
    root.style.setProperty('--my', `${(y * 100).toFixed(2)}%`);
};

if (!reduceMotionQuery.matches) {
    window.addEventListener('pointermove', updateGradient);
    window.addEventListener(
        'touchmove',
        (event) => {
            if (!event.touches.length) return;
            updateGradient(event.touches[0]);
        },
        { passive: true }
    );
}

const baseSection = document.querySelector('.slider-section');
if (baseSection) {
    createSwiper(baseSection);
    hydrateIframes(baseSection);
    applyFileProtocolFallback(baseSection);
}

if (isFileProtocol) {
    document.body.classList.add('is-file-protocol');
    applyFileProtocolFallback();
}
