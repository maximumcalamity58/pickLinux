// Select all sections and initialize the current section index
const sections = document.querySelectorAll("section");
let currentSectionIndex = 0;
let isScrolling = false;

// Function to disable scroll temporarily
function disableScroll() {
    document.body.style.overflow = "hidden";
}

function enableScroll() {
    document.body.style.overflow = "auto";
    document.body.style.overflowY = "hidden";
}

// Listen for wheel scroll events
window.addEventListener("wheel", (event) => {
    if (isScrolling) return; // Ignore if currently in a scrolling transition

    // Determine the scroll direction
    if (event.deltaY > 0 && currentSectionIndex < sections.length - 1) {
        // Scroll down to the next section
        currentSectionIndex++;
    } else if (event.deltaY < 0 && currentSectionIndex > 0) {
        // Scroll up to the previous section
        currentSectionIndex--;
    }

    // Scroll to the target section and disable further scrolls
    isScrolling = true;
    disableScroll();
    sections[currentSectionIndex].scrollIntoView({ behavior: "smooth", block: "center" });

    // Set a timeout to re-enable scrolling after 200ms
    setTimeout(() => {
        enableScroll();
        isScrolling = false;
    }, 200);
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
