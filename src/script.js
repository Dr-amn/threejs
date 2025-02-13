import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'

/**
 * Base
 */
// Debug
const gui = new GUI({
    width: 600
})

// Canvas
const canvas = document.querySelector('canvas.vite')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

/**
 * Galaxy
 */
const parameters = {
    count: 100000,
    size: 0.001,
    radius: 5,
    branches: 3,
    spin: 1,
    randomness: 0.02,
    randomnessPower: 3,
    insideColor: '#ff6030',
    outsideColor: '1b3984'
}

let galaxyGeometry = null
let galaxyMaterial = null
let points = null

const generateGalaxy = () =>{
    //Destroy
    if(points !== null){
        galaxyGeometry.dispose()
        galaxyMaterial.dispose()
        scene.remove(points)
    }

    //Geometry
    galaxyGeometry = new THREE.BufferGeometry()
    const positions = new Float32Array(parameters.count * 3)
    const colors = new Float32Array(parameters.count * 3)

    const colorInside = new THREE.Color(parameters.insideColor)
    const colorOutside = new THREE.Color(parameters.outsideColor)

        for(let i = 0; i < parameters.count; i++){
            const i3 = i * 3
            //POSITION
            const galaxyRadius = Math.random() * parameters.radius
            const spinAngle = galaxyRadius * parameters.spin
            const branchAngle = (i % parameters.branches) / parameters.branches * Math.PI * 2
                //Randomness
                const randomX = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1)
                const randomY = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1)
                const randomZ = Math.pow(Math.random(), parameters.randomnessPower)* (Math.random() < 0.5 ? 1 : -1)
                // X
                positions[i3 + 0] = Math.cos(branchAngle + spinAngle) * galaxyRadius + randomX
                // Y
                positions[i3 + 1] = randomY
                // Z
                positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * galaxyRadius + randomZ
            
            //COLORS
                // R
                colors[i3] = 1
                // G
                colors[i3 + 1] = 0
                // B
                colors[i3 + 2] = 0

        }

    galaxyGeometry.setAttribute(
        'position',
        new THREE.BufferAttribute(positions, 3)
    )

    galaxyGeometry.setAttribute(
        'color',
        new THREE.BufferAttribute(colors, 3)
    )

    //Material
    galaxyMaterial = new THREE.PointsMaterial({
        size: parameters.size,
        sizeAttenuation: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        color: '#ff5588',
        vertexColors: true
    })

    //Points
    points = new THREE.Points(galaxyGeometry, galaxyMaterial)
    scene.add(points)
}
generateGalaxy()

/**
 * Galaxy GUI
 */
gui.add(parameters, 'count', 100, 1000000, 100).onFinishChange(generateGalaxy)
gui.add(parameters, 'size', 0.001, 0.1, 0.001).onFinishChange(generateGalaxy)
gui.add(parameters, 'radius', 0.01, 200, 0.01).onFinishChange(generateGalaxy)
gui.add(parameters, 'branches', 2, 20, 1).onFinishChange(generateGalaxy)
gui.add(parameters, 'spin', -5, 5, 0.001).onFinishChange(generateGalaxy)
gui.add(parameters, 'randomness', 0, 2, 0.001).onFinishChange(generateGalaxy)
gui.add(parameters, 'randomnessPower', 1, 10, 0.001).onFinishChange(generateGalaxy)
gui.addColor(parameters, 'insideColor').onFinishChange(generateGalaxy)
gui.addColor(parameters, 'outsideColor').onFinishChange(generateGalaxy)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()