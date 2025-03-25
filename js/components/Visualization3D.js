"use client"

import React from "react"

// 3D Visualization React Component using Three.js
const Visualization3D = () => {
  const canvasRef = React.useRef(null)
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    // Import Three.js dynamically
    const loadThreeJS = async () => {
      try {
        const THREE = await import("https://cdn.skypack.dev/three@0.136.0")
        const { OrbitControls } = await import(
          "https://cdn.skypack.dev/three@0.136.0/examples/jsm/controls/OrbitControls.js"
        )

        if (!canvasRef.current) return

        // Scene setup
        const scene = new THREE.Scene()
        scene.background = new THREE.Color(0xf5f5f5)

        // Camera setup
        const camera = new THREE.PerspectiveCamera(
          75,
          canvasRef.current.clientWidth / canvasRef.current.clientHeight,
          0.1,
          1000,
        )
        camera.position.z = 5

        // Renderer setup
        const renderer = new THREE.WebGLRenderer({
          canvas: canvasRef.current,
          antialias: true,
        })
        renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight)
        renderer.setPixelRatio(window.devicePixelRatio)

        // Controls
        const controls = new OrbitControls(camera, renderer.domElement)
        controls.enableDamping = true
        controls.dampingFactor = 0.05

        // Lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
        scene.add(ambientLight)

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
        directionalLight.position.set(1, 1, 1)
        scene.add(directionalLight)

        // Create a simple house model
        const createHouse = () => {
          const house = new THREE.Group()

          // Base
          const baseGeometry = new THREE.BoxGeometry(3, 0.1, 3)
          const baseMaterial = new THREE.MeshStandardMaterial({ color: 0x8c8c8c })
          const base = new THREE.Mesh(baseGeometry, baseMaterial)
          base.position.y = -0.5
          house.add(base)

          // Walls
          const wallGeometry = new THREE.BoxGeometry(2, 1, 2)
          const wallMaterial = new THREE.MeshStandardMaterial({ color: 0xf0f0f0 })
          const walls = new THREE.Mesh(wallGeometry, wallMaterial)
          house.add(walls)

          // Roof
          const roofGeometry = new THREE.ConeGeometry(1.5, 1, 4)
          const roofMaterial = new THREE.MeshStandardMaterial({ color: 0xe67e22 })
          const roof = new THREE.Mesh(roofGeometry, roofMaterial)
          roof.position.y = 1
          roof.rotation.y = Math.PI / 4
          house.add(roof)

          // Door
          const doorGeometry = new THREE.PlaneGeometry(0.4, 0.7)
          const doorMaterial = new THREE.MeshStandardMaterial({ color: 0x5c3a21 })
          const door = new THREE.Mesh(doorGeometry, doorMaterial)
          door.position.set(0, -0.15, 1.01)
          house.add(door)

          // Windows
          const windowGeometry = new THREE.PlaneGeometry(0.3, 0.3)
          const windowMaterial = new THREE.MeshStandardMaterial({ color: 0x87ceeb })

          const window1 = new THREE.Mesh(windowGeometry, windowMaterial)
          window1.position.set(-0.5, 0.1, 1.01)
          house.add(window1)

          const window2 = new THREE.Mesh(windowGeometry, windowMaterial)
          window2.position.set(0.5, 0.1, 1.01)
          house.add(window2)

          return house
        }

        const house = createHouse()
        scene.add(house)

        // Add trees
        const createTree = (x, z) => {
          const tree = new THREE.Group()

          // Trunk
          const trunkGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.5)
          const trunkMaterial = new THREE.MeshStandardMaterial({ color: 0x8b4513 })
          const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial)
          trunk.position.y = -0.25
          tree.add(trunk)

          // Leaves
          const leavesGeometry = new THREE.ConeGeometry(0.3, 0.7, 8)
          const leavesMaterial = new THREE.MeshStandardMaterial({ color: 0x2ecc71 })
          const leaves = new THREE.Mesh(leavesGeometry, leavesMaterial)
          leaves.position.y = 0.2
          tree.add(leaves)

          tree.position.set(x, 0, z)
          return tree
        }

        scene.add(createTree(-1.5, -1.5))
        scene.add(createTree(1.5, -1.5))
        scene.add(createTree(1.5, 1.5))
        scene.add(createTree(-1.5, 1.5))

        // Ground
        const groundGeometry = new THREE.PlaneGeometry(10, 10)
        const groundMaterial = new THREE.MeshStandardMaterial({
          color: 0x7ccc7c,
          side: THREE.DoubleSide,
        })
        const ground = new THREE.Mesh(groundGeometry, groundMaterial)
        ground.rotation.x = Math.PI / 2
        ground.position.y = -0.5
        scene.add(ground)

        // Animation loop
        const animate = () => {
          requestAnimationFrame(animate)

          // Rotate the house slightly
          house.rotation.y += 0.002

          controls.update()
          renderer.render(scene, camera)
        }

        // Handle window resize
        const handleResize = () => {
          if (!canvasRef.current) return

          camera.aspect = canvasRef.current.clientWidth / canvasRef.current.clientHeight
          camera.updateProjectionMatrix()
          renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight)
        }

        window.addEventListener("resize", handleResize)

        setIsLoading(false)
        animate()

        return () => {
          window.removeEventListener("resize", handleResize)
          if (canvasRef.current) {
            canvasRef.current.remove()
          }
        }
      } catch (error) {
        console.error("Error loading Three.js:", error)
        setIsLoading(false)
      }
    }

    loadThreeJS()
  }, [])

  return (
    <section className="visualization-section">
      <div className="container">
        <div className="section-header">
          <h2>3D Visualization</h2>
          <div className="underline"></div>
        </div>
        <p className="text-center">Experience your architectural vision in 3D before construction begins.</p>
        <div className="visualization-container">
          {isLoading && (
            <div className="loading-indicator">
              <p>Loading 3D Visualization...</p>
            </div>
          )}
          <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }}></canvas>
        </div>
        <div className="center-btn" style={{ marginTop: "2rem" }}>
          <a href="services.html#visualization" className="btn primary-btn">
            Learn More About 3D Services
          </a>
        </div>
      </div>
    </section>
  )
}

// Render the component
const root = ReactDOM.createRoot(document.getElementById("visualization-root"))
root.render(<Visualization3D />)

