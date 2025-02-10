import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Timer } from 'three/addons/misc/Timer.js'
import GUI from 'lil-gui'

/**
 * Base
 */
// Debug
const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.vite')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
    // Floor
    const floorAlphaTexture = textureLoader.load('./floor/alpha.jpg')
    const floorColorTexture = textureLoader.load('./floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_diff_1k.webp')
    const floorARMTexture = textureLoader.load('./floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_arm_1k.webp')
    const floorNormalTexture = textureLoader.load('./floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_nor_gl_1k.webp')
    const floorDisplacementTexture = textureLoader.load('./floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_disp_1k.webp')
    // Floor Repeats
        // Floor Color
        floorColorTexture.colorSpace = THREE.SRGBColorSpace
        floorColorTexture.repeat.set(8, 8)
        floorColorTexture.wrapS = THREE.RepeatWrapping
        floorColorTexture.wrapT = THREE.RepeatWrapping
        // Floor ARM
        floorARMTexture.repeat.set(8, 8)
        floorARMTexture.wrapS = THREE.RepeatWrapping
        floorARMTexture.wrapT = THREE.RepeatWrapping
        // Floor Normal
        floorNormalTexture.repeat.set(8, 8)
        floorNormalTexture.wrapS = THREE.RepeatWrapping
        floorNormalTexture.wrapT = THREE.RepeatWrapping
        // Floor Displacement
        floorDisplacementTexture.repeat.set(8, 8)
        floorDisplacementTexture.wrapS = THREE.RepeatWrapping
        floorDisplacementTexture.wrapT = THREE.RepeatWrapping
/**
 * House
 */
// Floor
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20,20, 64, 64),
    new THREE.MeshStandardMaterial({
        alphaMap: floorAlphaTexture,
        transparent: true,
        map: floorColorTexture,
        aoMap: floorARMTexture,
        roughnessMap: floorARMTexture,
        metalnessMap: floorARMTexture,
        normalMap: floorNormalTexture,
        displacementMap: floorDisplacementTexture,
        displacementScale: 0.688,
        displacementBias:-0.392
    })
)
floor.rotation.x = - Math.PI * 0.5
scene.add(floor)

/**
 * GUI
 */
gui.add(floor.material, 'displacementScale', -1, 1, 0.001).name('floorDisplacementScale')
gui.add(floor.material, 'displacementBias', -1, 1, 0.001).name('floorDisplacementBias')

// HOUSE GROUP
const houseGroup = new THREE.Group()
scene.add(houseGroup)

    // Walls
    const walls = new THREE.Mesh(
        new THREE.BoxGeometry(4, 2.5, 4),
        new THREE.MeshStandardMaterial()
    )
    walls.position.y = 1.25
    houseGroup.add(walls)
    // Roof
    const roof = new THREE.Mesh(
        new THREE.ConeGeometry(3.5, 1.5, 4),
        new THREE.MeshStandardMaterial()
    )
    roof.position.y = 1.5 / 2 + 2.5
    roof.rotation.y = Math.PI * 0.25
    houseGroup.add(roof)
    // Door
    const door = new THREE.Mesh(
        new THREE.PlaneGeometry(2.2, 2.2),
        new THREE.MeshStandardMaterial({color: 0xff0000})
    )
    door.position.z = 2.001
    door.position.y = 1.1
    houseGroup.add(door)
    // Bushes
    const bushGeometry = new THREE.SphereGeometry(1, 16, 16)
    const bushMaterial = new THREE.MeshStandardMaterial()
        // Bush One
        const bushOne = new THREE.Mesh(bushGeometry, bushMaterial)
        bushOne.scale.set(0.5, 0.5, 0.5)
        bushOne.position.set(0.8, 0.2, 2.2)
        // Bush Two
        const bushTwo = new THREE.Mesh(bushGeometry, bushMaterial)
        bushTwo.scale.set(0.25, 0.25, 0.25)
        bushTwo.position.set(1.4, 0.1, 2.1)
        // Bush Three
        const bushThree = new THREE.Mesh(bushGeometry, bushMaterial)
        bushThree.scale.set(0.4, 0.4, 0.4)
        bushThree.position.set(-0.8, 0.1, 2.2)
        // Bush Four
        const bushFour = new THREE.Mesh(bushGeometry, bushMaterial)
        bushFour.scale.set(0.15, 0.15, 0.15)
        bushFour.position.set(-1, 0.05, 2.6)

        houseGroup.add(bushOne, bushTwo, bushThree, bushFour)

//Graves
const gravesGroup = new THREE.Group()
scene.add(gravesGroup)

const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2)
const graveMaterial = new THREE.MeshStandardMaterial()
    // Graves loop
    for(let i = 0; i < 30; i++){
        const graveCircle = Math.random() * Math.PI * 2
        const radius = 3 + Math.random() * 5
        const x = Math.sin(graveCircle) * radius
        const z = Math.cos(graveCircle) * radius

        // Mesh
        const grave = new THREE.Mesh(graveGeometry, graveMaterial)
        grave.position.x = x
        grave.position.z = z
        grave.position.y = Math.random() * 0.4

        grave.rotation.x = (Math.random() - 0.5) * 0.4
        grave.rotation.y = (Math.random() - 0.5) * 0.4
        grave.rotation.z = (Math.random() - 0.5) * 0.4
        
        gravesGroup.add(grave)
    }

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#ffffff', 0.5)
scene.add(ambientLight)

// Directional light
const directionalLight = new THREE.DirectionalLight('#ffffff', 1.5)
directionalLight.position.set(3, 2, -8)
scene.add(directionalLight)

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
camera.position.x = 4
camera.position.y = 2
camera.position.z = 5
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
const timer = new Timer()

const tick = () =>
{
    // Timer
    timer.update()
    const elapsedTime = timer.getElapsed()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()