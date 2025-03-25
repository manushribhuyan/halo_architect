// Parallax effect for background images
document.addEventListener("DOMContentLoaded", () => {
  const parallaxElements = document.querySelectorAll(".parallax-bg")

  function updateParallax() {
    parallaxElements.forEach((element) => {
      const speed = element.getAttribute("data-speed") || 0.5
      const yPos = -(window.scrollY * speed)
      element.style.transform = `translateY(${yPos}px)`
    })
  }

  window.addEventListener("scroll", updateParallax)
  updateParallax() // Initial position
})

