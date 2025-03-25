document.addEventListener("DOMContentLoaded", () => {
  // Portfolio Filter
  const filterButtons = document.querySelectorAll(".filter-btn")
  const galleryItems = document.querySelectorAll(".gallery-item")

  if (filterButtons.length && galleryItems.length) {
    filterButtons.forEach((button) => {
      button.addEventListener("click", function () {
        // Update active button
        filterButtons.forEach((btn) => btn.classList.remove("active"))
        this.classList.add("active")

        const filterValue = this.getAttribute("data-filter")

        // Filter gallery items
        galleryItems.forEach((item) => {
          if (filterValue === "all" || item.classList.contains(filterValue)) {
            item.style.display = "block"
          } else {
            item.style.display = "none"
          }
        })
      })
    })
  }

  // Project Modal
  const modal = document.getElementById("project-modal")
  const modalBody = modal ? modal.querySelector(".modal-body") : null
  const closeModal = modal ? modal.querySelector(".close-modal") : null
  const viewProjectLinks = document.querySelectorAll(".view-project")

  if (modal && modalBody && closeModal && viewProjectLinks.length) {
    // Project data (in a real project, this would come from a database or API)
    const projectData = {
      "eco-residence": {
        title: "Eco Residence",
        subtitle: "Sustainable Family Home",
        description:
          "This eco-friendly residence combines modern design with sustainable building practices. Features include solar panels, rainwater harvesting, and passive cooling systems.",
        details: [
          "Location: Hillside Valley",
          "Area: 3,200 sq ft",
          "Year: 2022",
          "Sustainability: LEED Platinum Certified",
        ],
        images: ["images/project1.jpg", "images/project1-detail1.jpg", "images/project1-detail2.jpg"],
      },
      "urban-office": {
        title: "Urban Office",
        subtitle: "Modern Workspace Design",
        description:
          "A contemporary office space designed to foster collaboration and creativity. The open floor plan is complemented by private meeting areas and relaxation zones.",
        details: [
          "Location: Downtown Metro",
          "Area: 15,000 sq ft",
          "Year: 2021",
          "Features: Smart building technology, flexible workspaces",
        ],
        images: ["images/project2.jpg", "images/project2-detail1.jpg", "images/project2-detail2.jpg"],
      },
      // Add more project data as needed
    }

    // Open modal with project details
    viewProjectLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault()

        const projectId = this.getAttribute("data-project")
        const project = projectData[projectId]

        if (project) {
          // Build modal content
          const modalContent = `
            <div class="project-details">
              <h2>${project.title}</h2>
              <p class="project-subtitle">${project.subtitle}</p>
              <div class="project-gallery">
                ${project.images.map((img) => `<img src="${img}" alt="${project.title}">`).join("")}
              </div>
              <div class="project-info">
                <div class="project-description">
                  <h3>About the Project</h3>
                  <p>${project.description}</p>
                </div>
                <div class="project-specs">
                  <h3>Project Details</h3>
                  <ul>
                    ${project.details.map((detail) => `<li>${detail}</li>`).join("")}
                  </ul>
                </div>
              </div>
            </div>
          `

          modalBody.innerHTML = modalContent
          modal.style.display = "block"
          document.body.style.overflow = "hidden" // Prevent scrolling
        }
      })
    })

    // Close modal
    closeModal.addEventListener("click", () => {
      modal.style.display = "none"
      document.body.style.overflow = "auto" // Re-enable scrolling
    })

    // Close modal when clicking outside
    window.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none"
        document.body.style.overflow = "auto"
      }
    })
  }
})

