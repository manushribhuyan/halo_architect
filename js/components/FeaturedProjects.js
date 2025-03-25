import React from "react"
// Featured Projects React Component
const FeaturedProjects = () => {
  const projects = [
    {
      id: 1,
      title: "Eco Residence",
      description: "Sustainable Family Home",
      image: "images/project1.jpg",
    },
    {
      id: 2,
      title: "Urban Office",
      description: "Modern Workspace Design",
      image: "images/project2.jpg",
    },
    {
      id: 3,
      title: "Luxury Villa",
      description: "Coastal Retreat",
      image: "images/project3.jpg",
    },
    {
      id: 4,
      title: "Cultural Center",
      description: "Community Space",
      image: "images/project4.jpg",
    },
  ]

  return (
    <section className="projects-section">
      <div className="container">
        <div className="section-header">
          <h2>Featured Projects</h2>
          <div className="underline"></div>
        </div>
        <div className="projects-grid">
          {projects.map((project) => (
            <div className="project-card" key={project.id}>
              <div className="project-img">
                <img src={project.image || "/placeholder.svg"} alt={project.title} />
                <div className="project-overlay">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <a href="portfolio.html" className="btn small-btn">
                    View Project
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="center-btn">
          <a href="portfolio.html" className="btn primary-btn">
            View All Projects
          </a>
        </div>
      </div>
    </section>
  )
}

// Render the component
ReactDOM.render(React.createElement(FeaturedProjects), document.getElementById("featured-projects-root"))

