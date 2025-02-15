import * as THREE from 'three'
import GUI from 'lil-gui'

/**
 * Debug
 */
const gui = new GUI()

const parameters = {
    materialColor: '#ffeded'
}

gui
    .addColor(parameters, 'materialColor')
    .onChange(() =>{
        material.color.set(parameters.materialColor)
    })


/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.vite')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const gradientTexture = textureLoader.load('textures/3.jpg')
gradientTexture.magFilter = THREE.NearestFilter

/**
 * Objects
 */
const material = new THREE.MeshToonMaterial({
    color: parameters.materialColor,
    gradientMap: gradientTexture
})
    // Meshes
    const objectsDistance = 4
    const meshOne = new THREE.Mesh(
        new THREE.TorusGeometry(1, 0.4, 16, 60),
        material
    )
    const meshTwo = new THREE.Mesh(
        new THREE.ConeGeometry(1, 2, 32),
        material
    )
    const meshThree = new THREE.Mesh(
        new THREE.TorusKnotGeometry(0.8, 0.35, 100, 16),
        material
    )
        //Meshes distances
        meshOne.position.y = - objectsDistance * 0
        meshTwo.position.y = - objectsDistance * 1
        meshThree.position.y = - objectsDistance * 2

        meshOne.position.x = 2
        meshTwo.position.x = - 2
        meshThree.position.x = 2
    

    scene.add(meshOne, meshTwo, meshThree)

    const sectionMeshes = [meshOne, meshTwo, meshThree]
/**
 * Light
 */
const directionalLight = new THREE.DirectionalLight('#ffffff', 3)
directionalLight.position.set(1, 1, 0)
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
const camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 6
scene.add(camera)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Scroll
 */
let scrollY = window.scrollY

window.addEventListener('scroll', () =>{
    scrollY = window.scrollY
    // console.log(scrollY)
})

/**
 * Cursor
 */
const cursor = {}
cursor.x = 0
cursor.y = 0

window.addEventListener('mousemove', (e) => {
    cursor.x = e.clientX / sizes.width - 0.5
    cursor.y = e.clientY / sizes.height - 0.5
})

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    
    // Animate camera
    camera.position.y = - scrollY / sizes.height * objectsDistance
    const parallaxX = cursor.x
    const parallaxY = cursor.y
    camera.position.x = parallaxX
    camera.position.y = parallaxY * -1

    // Animate meshes
    for (const mesh  of sectionMeshes){
        mesh.rotation.x = elapsedTime * 0.1
        mesh.rotation.y = elapsedTime * 0.12
    }

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()