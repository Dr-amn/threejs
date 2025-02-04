import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import gsap from 'gsap'

// DEBUG
const gui = new GUI({
    width: 300,
    title: 'GUI'
    // closeFolders: true
})
// gui.close()
// gui.hide()

window.addEventListener('keydown', (e) => {
    if(e.key == 'g'){
        gui.show(gui._hidden)
    }
})

const debugObject = {}





// TEXTURES
const loadingManager = new THREE.LoadingManager()

// loadingManager.onStart = () =>{
//     console.log('onStart')
// }
// loadingManager.onLoad = () =>{
//     console.log('onLoad')
// }
// loadingManager.onProgress = () =>{
//     console.log('onProgress')
// }
// loadingManager.onError = () =>{
//     console.log('onError')
// }

const textureLoader = new THREE.TextureLoader(loadingManager)

// COLOR
const doorColorTexture = textureLoader.load('/textures/door/basecolor.jpg')
    doorColorTexture.colorSpace = THREE.SRGBColorSpace
    doorColorTexture.rotation = Math.PI * 0.25
    doorColorTexture.center.x = 0.5
    doorColorTexture.center.y = 0.5


// // ALPHA
// const doorAlphaTexture = textureLoader.load('/textures/door/opacity.jpg')
//     doorAlphaTexture.colorSpace = THREE.SRGBColorSpace
// // HEIGHT
// const doorHeightTexture = textureLoader.load('/textures/door/height.png')
//     doorHeightTexture.colorSpace = THREE.SRGBColorSpace
// // NORMAL
// const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg')
//     doorNormalTexture.colorSpace = THREE.SRGBColorSpace
// // ROUGHNESS
// const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg')
//     doorRoughnessTexture.colorSpace = THREE.SRGBColorSpace
// // AMBIENT OCCLUSION
// const doorAmbientOcclusion = textureLoader.load('/textures/door/ambientOcclusion.jpg')
// doorAmbientOcclusion.colorSpace = THREE.SRGBColorSpace




/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.vite')
// Scene
const scene = new THREE.Scene()



//OBJECT
    /**COLOR**/debugObject.color = "#42c286"

const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2)
// console.log(geometry.attributes.uv)
// const material = new THREE.MeshBasicMaterial({color: debugObject.color, wireframe: true})
const material = new THREE.MeshBasicMaterial({map: doorColorTexture})
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)



const cubeGUI = gui.addFolder('Simple_cube')
// cubeGUI.close()

// DEBUG
cubeGUI.add(mesh.position, 'y', -3, 3, 0.01).name('elevation')
cubeGUI.add(mesh, 'visible')
cubeGUI.add(material, 'wireframe')
// cubeGUI.addColor(debugObject, 'color')
//     .onFinishChange(()=>
//     {
//         material.color.set(debugObject.color)
//     })

debugObject.spin = () =>{
 gsap.to(mesh.rotation, { y: mesh.rotation.y + Math.PI * 2 })
}
cubeGUI.add(debugObject, 'spin')

// debugObject.subdivision = 2
// cubeGUI.add(debugObject, 'subdivision', 1, 20, 1)
//     .onFinishChange(()=>{
//         mesh.geometry.dispose()
//         mesh.geometry = new THREE.BoxGeometry(1, 1, 1, debugObject.subdivision, debugObject.subdivision, debugObject.subdivision)
//     })


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
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
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