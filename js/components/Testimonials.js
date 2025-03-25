"use client"

import React from "react"

// Testimonials React Component
const Testimonials = () => {
  const [activeSlide, setActiveSlide] = React.useState(0)
  const testimonials = [
    {
      id: 1,
      text: "HALO Architect transformed our vision into a stunning reality. Their attention to detail and commitment to sustainability aligned perfectly with our values.",
      name: "Sarah Johnson",
      title: "Residential Client",
      image: "images/client1.jpg",
    },
    {
      id: 2,
      text: "Working with HALO on our office redesign was a seamless experience. They created a space that has significantly improved our team's productivity and happiness.",
      name: "Michael Chen",
      title: "CEO, TechForward",
      image: "images/client2.jpg",
    },
    {
      id: 3,
      text: "The 3D visualization tools HALO used helped us understand exactly what we were getting. The final result matched perfectly with what they showed us in the design phase.",
      name: "Emma Rodriguez",
      title: "Commercial Developer",
      image: "images/client3.jpg",
    },
  ]

  const nextSlide = () => {
    setActiveSlide((activeSlide + 1) % testimonials.length)
  }

  const prevSlide = () => {
    setActiveSlide((activeSlide - 1 + testimonials.length) % testimonials.length)
  }

  const goToSlide = (index) => {
    setActiveSlide(index)
  }

  React.useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(interval)
  }, [activeSlide])

  return (
    <section className="testimonials-section">
      <div className="container">
        <div className="section-header">
          <h2>Client Testimonials</h2>
          <div className="underline"></div>
        </div>
        <div className="testimonials-slider">
          {testimonials.map((testimonial, index) => (
            <div key={testimonial.id} className={`testimonial-slide ${index === activeSlide ? "active" : ""}`}>
              <div className="testimonial-content">
                <div className="quote-icon">
                  <i className="fas fa-quote-left"></i>
                </div>
                <p>{testimonial.text}</p>
                <div className="client-info">
                  <h4>{testimonial.name}</h4>
                  <p>{testimonial.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="slider-controls">
          <button className="prev-btn" onClick={prevSlide}>
            <i className="fas fa-chevron-left"></i>
          </button>
          <div className="slider-dots">
            {testimonials.map((_, index) => (
              <span
                key={index}
                className={`dot ${index === activeSlide ? "active" : ""}`}
                onClick={() => goToSlide(index)}
              ></span>
            ))}
          </div>
          <button className="next-btn" onClick={nextSlide}>
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </section>
  )
}

// Render the component
const root = ReactDOM.createRoot(document.getElementById("testimonials-root"))
root.render(<Testimonials />)

