"use client"

import React, { useEffect, useState } from "react"
import ReactDOM from "react-dom/client"

const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("darkMode") === "true")

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark")
    } else {
      document.body.classList.remove("dark")
    }
    localStorage.setItem("darkMode", darkMode)
  }, [darkMode])

  return (
    <div className="mode-toggle">
      <input
        type="checkbox"
        id="dark-mode-toggle"
        checked={darkMode}
        onChange={() => setDarkMode(!darkMode)}
      />
      <label htmlFor="dark-mode-toggle" className="toggle-label">
        <i className="fas fa-moon"></i>
        <i className="fas fa-sun"></i>
      </label>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById("dark-mode-toggle-root"))
root.render(<DarkModeToggle />)


document.addEventListener("DOMContentLoaded", function () {
  const toggle = document.getElementById("dark-mode-toggle");
  const darkModeEnabled = localStorage.getItem("darkMode") === "true";

  if (darkModeEnabled) {
      document.body.classList.add("dark");
      toggle.checked = true;
  }

  toggle.addEventListener("change", function () {
      document.body.classList.toggle("dark");
      localStorage.setItem("darkMode", toggle.checked);
  });
});
