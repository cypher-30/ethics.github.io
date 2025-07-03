// --- ALL ANIMATION LOGIC IS NOW INSIDE THIS FILE ---

// --- 1. Sun Cursor Follower (Ultra-Responsive Version) ---
const sunCursor = document.querySelector('.sun-cursor');

if (sunCursor) {
    let mouseX = -100;
    let mouseY = -100;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    const animateSun = () => {
        const a = sunCursor.offsetWidth / 2;
        sunCursor.style.transform = `translate(${mouseX - a}px, ${mouseY - a}px)`;
        requestAnimationFrame(animateSun);
    };
    animateSun();

    document.body.addEventListener('mouseenter', () => { sunCursor.style.opacity = '1'; });
    document.body.addEventListener('mouseleave', () => { sunCursor.style.opacity = '0'; });
}

// --- 2. Parallax Scroll for Decorative Shapes ---
const shapeLeft = document.querySelector('.shape-left');
const shapeRight = document.querySelector('.shape-right');

if (shapeLeft && shapeRight) {
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        shapeLeft.style.transform = `translateY(${scrollY * 0.2}px)`;
        shapeRight.style.transform = `translateY(-${scrollY * 0.3}px)`;
    });
}

// --- 3. Fade-in on Scroll for Content ---
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
        }
    });
}, {
    threshold: 0.1
});

const elementsToAnimate = document.querySelectorAll('.entry-content');
elementsToAnimate.forEach(element => {
    observer.observe(element);
});


// --- 4. Interactive 3D Headline Effect (NEW) ---
const headline = document.querySelector('#interactive-headline');

if (headline) {
    const headlineContainer = headline.parentElement; // Get the header element

    headlineContainer.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const { offsetWidth, offsetHeight, offsetLeft, offsetTop } = headlineContainer;

        // Calculate mouse position relative to the center of the container
        const xPos = (clientX - offsetLeft) - (offsetWidth / 2);
        const yPos = (clientY - offsetTop) - (offsetHeight / 2);

        // Define how far the shadow should move
        const shadowStrength = 10;
        const xOffset = -(xPos / offsetWidth) * shadowStrength;
        const yOffset = -(yPos / offsetHeight) * shadowStrength;
        
        // Build the shadow string
        let shadow = '';
        const depth = 5;
        for (let i = 1; i <= depth; i++) {
            shadow += `${xOffset * i}px ${yOffset * i}px 0px var(--text-secondary-dark)`;
            if (i < depth) {
                shadow += ', ';
            }
        }
        
        // Apply the style
        headline.style.textShadow = shadow;
    });
}