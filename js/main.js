document.addEventListener("DOMContentLoaded", () => {
  // Mobile Menu Toggle
  const menuToggle = document.querySelector(".menu-toggle")
  const navLinks = document.querySelector(".nav-links")

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active")
      menuToggle.classList.toggle("active")
    })
  }

  // Testimonial Slider
  const slides = document.querySelectorAll(".testimonial-slide")
  const dots = document.querySelectorAll(".dot")
  const prevBtn = document.querySelector(".prev-btn")
  const nextBtn = document.querySelector(".next-btn")

  if (slides.length && dots.length) {
    let currentSlide = 0

    function showSlide(n) {
      slides.forEach((slide) => slide.classList.remove("active"))
      dots.forEach((dot) => dot.classList.remove("active"))

      currentSlide = (n + slides.length) % slides.length

      slides[currentSlide].classList.add("active")
      dots[currentSlide].classList.add("active")
    }

    if (prevBtn && nextBtn) {
      prevBtn.addEventListener("click", () => showSlide(currentSlide - 1))
      nextBtn.addEventListener("click", () => showSlide(currentSlide + 1))
    }

    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => showSlide(index))
    })
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href")

      if (href !== "#") {
        e.preventDefault()

        const targetElement = document.querySelector(href)
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: "smooth",
          })
        }
      }
    })
  })
})

