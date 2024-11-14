// Select all sections and initialize the current section index
const sections = document.querySelectorAll("section");
let currentSectionIndex = 0;
let isScrolling = false;

// Function to disable scroll temporarily
function disableScroll() {
    document.documentElement.classList.add("no-scroll");
}

function enableScroll() {
    document.documentElement.classList.remove("no-scroll");
}

// Threshold for distinguishing small and large scroll gestures
const scrollSensitivity = 50; // Adjust as needed to balance small vs large scrolls

// Listen for wheel scroll events
window.addEventListener("wheel", (event) => {
    if (isScrolling) return; // Ignore if currently in a scrolling transition

    // Check if scroll intensity exceeds sensitivity threshold
    const scrollSteps = Math.round(event.deltaY / scrollSensitivity);
    let targetSectionIndex = currentSectionIndex + scrollSteps;

    // Clamp target section index within bounds
    targetSectionIndex = Math.max(0, Math.min(targetSectionIndex, sections.length - 1));

    // If target index is the same, skip the scroll to avoid redundancy
    if (targetSectionIndex === currentSectionIndex) return;

    // Scroll to the target section
    isScrolling = true;
    disableScroll();
    sections[targetSectionIndex].scrollIntoView({ behavior: "smooth", block: "center" });
    currentSectionIndex = targetSectionIndex;

    // Re-enable scrolling after a slight delay
    setTimeout(() => {
        enableScroll();
        isScrolling = false;
    }, 300); // Adjust delay as needed for responsiveness
});

// Header hide on scroll down, show on scroll up
let lastScrollY = window.scrollY;
const header = document.querySelector("header");

window.addEventListener("scroll", () => {
    if (window.scrollY > lastScrollY) {
        header.classList.remove("show");
    } else {
        header.classList.add("show");
    }
    lastScrollY = window.scrollY;
});

// Slideshow functionality
let slideIndex = 0;
const slides = document.querySelectorAll(".slide-image");
let autoSlideTimer;

// Function to display the next or previous slide with a swipe effect
function showSlide(newIndex, direction = 1) {
    // Hide all slides and reset classes
    slides.forEach((slide, i) => {
        slide.classList.remove("active-slide", "slide-out-left", "slide-out-right");
        slide.style.opacity = 0; // Hide all initially
        slide.style.transform = "translateX(0)"; // Reset position
    });

    // Apply sliding out effect to the previous slide
    if (direction === 1) {
        slides[slideIndex].classList.add("slide-out-left");
    } else {
        slides[slideIndex].classList.add("slide-out-right");
    }

    // Set the new slide as active
    slideIndex = newIndex;
    slides[slideIndex].style.opacity = 1; // Show the active slide
    slides[slideIndex].classList.add("active-slide");
}

// Change slide and reset auto-slide timer
function changeSlide(direction) {
    clearInterval(autoSlideTimer); // Reset the automatic slideshow timer
    const newIndex = (slideIndex + direction + slides.length) % slides.length;
    showSlide(newIndex, direction);
    startAutoSlide(); // Restart automatic slideshow
}

// Start automatic slideshow timer
function startAutoSlide() {
    autoSlideTimer = setInterval(() => changeSlide(1), 3000); // Change image every 3 seconds
}

// Open modal for larger view
function openModal(src) {
    const modal = document.getElementById("modal");
    const modalImage = document.getElementById("modalImage");
    modal.style.display = "block";
    modalImage.src = src;
}

// Close modal
function closeModal() {
    document.getElementById("modal").style.display = "none";
}

// Initialize first slide and start slideshow
showSlide(slideIndex);
startAutoSlide();
