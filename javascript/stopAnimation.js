// Starts the animation on the target element
const startAnimation = (element) => {
    element.style.animationPlayState = 'running';
}

// Stops the animation on the target element
const stopAnimation = (element) => {
    element.style.animationPlayState = 'paused';
}

// Use this function to setup the observer (if in viewport, start animation)
const setupObserver = (target) => {
    let options = {
        root: null, // using viewport
        rootMargin: '0px',
        threshold: 0.1 // If in 10% of the target element => visible
    };

    let observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // if in viewport, start animation
                startAnimation(entry.target);
            } else {
                // if not in viewport, stop animation
                stopAnimation(entry.target);
            }
        });
    }, options);

    observer.observe(target);
}

// convert to Array and setup observer for each element
const animatedElementParent = document.getElementsByClassName("intro-text")[0];
Array.from(animatedElementParent.children).forEach(element => {
    setupObserver(element);
});