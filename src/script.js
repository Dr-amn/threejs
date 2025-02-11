import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Sky } from 'three/examples/jsm/objects/Sky.js'
import { Timer } from 'three/examples/jsm/misc/Timer.js'
// import GUI from 'lil-gui'


/**
 * Base
 */
// Debug
// const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.vite')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
    /**
     * FLOOR
     */
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
     * WALLS
     */
    const wallColorTexture = textureLoader.load('./wall/castle_brick_broken_06_1k/castle_brick_broken_06_diff_1k.webp')
    const wallARMTexture = textureLoader.load('./wall/castle_brick_broken_06_1k/castle_brick_broken_06_arm_1k.webp')
    const wallNormalTexture = textureLoader.load('./wall/castle_brick_broken_06_1k/castle_brick_broken_06_nor_gl_1k.webp')
            // Wall Color
            wallColorTexture.colorSpace = THREE.SRGBColorSpace
    /**
     * ROOF
     */
    const roofColorTexture = textureLoader.load('./roof/roof_slates_02_1k/roof_slates_02_diff_1k.webp')
    const roofARMTexture = textureLoader.load('./roof/roof_slates_02_1k/roof_slates_02_arm_1k.webp')
    const roofNormalTexture = textureLoader.load('./roof/roof_slates_02_1k/roof_slates_02_nor_gl_1k.webp')
    // Roof ColorSpace
    roofColorTexture.colorSpace = THREE.SRGBColorSpace
        // Roof Repeats
        roofColorTexture.colorSpace = THREE.SRGBColorSpace
        roofColorTexture.repeat.set(2, 1)
        roofColorTexture.wrapS = THREE.RepeatWrapping
        // Roof ARM
        roofARMTexture.repeat.set(2, 1)
        roofARMTexture.wrapS = THREE.RepeatWrapping
        // Roof Normal
        roofNormalTexture.repeat.set(2, 1)
        roofNormalTexture.wrapS = THREE.RepeatWrapping
    /**
     * BUSHES
     */
    const bushColorTexture = textureLoader.load('./bush/leaves_forest_ground_1k/leaves_forest_ground_diff_1k.webp')
    const bushARMTexture = textureLoader.load('./bush/leaves_forest_ground_1k/leaves_forest_ground_arm_1k.webp')
    const bushNormalTexture = textureLoader.load('./bush/leaves_forest_ground_1k/leaves_forest_ground_nor_gl_1k.webp')
    // Bushes ColorSpace
    bushColorTexture.colorSpace = THREE.SRGBColorSpace
        // Bushes Repeats
        bushColorTexture.colorSpace = THREE.SRGBColorSpace
        bushColorTexture.repeat.set(3, 1)
        bushColorTexture.wrapS = THREE.RepeatWrapping
        // Bushes ARM
        bushARMTexture.repeat.set(3, 1)
        bushARMTexture.wrapS = THREE.RepeatWrapping
        // Bushes Normal
        bushNormalTexture.repeat.set(3, 1)
        bushNormalTexture.wrapS = THREE.RepeatWrapping
    /**
     * GRAVES
     */
    const gravesColorTexture = textureLoader.load('./grave/plastered_stone_wall_1k/plastered_stone_wall_diff_1k.jpg')
    const gravesARMTexture = textureLoader.load('./grave/plastered_stone_wall_1k/plastered_stone_wall_arm_1k.webp')
    const gravesNormalTexture = textureLoader.load('./grave/plastered_stone_wall_1k/plastered_stone_wall_nor_gl_1k.webp')
    // Wall ColorSpace
    gravesColorTexture.colorSpace = THREE.SRGBColorSpace
        // Wall Repeats
        gravesColorTexture.colorSpace = THREE.SRGBColorSpace
        gravesColorTexture.repeat.set(0.3, 0.4)
        // Floor ARM
        gravesARMTexture.repeat.set(0.3, 0.4)
        // Floor Normal
        gravesNormalTexture.repeat.set(0.3, 0.4)
    /**
     * Door
     */
    const doorColorTexture = textureLoader. load('./door/color.webp')
    const doorAlphaTexture = textureLoader. load('./door/alpha.webp')
    const doorAmbientOcclusionTexture = textureLoader. load('./door/ambientOcclusion.webp')
    const doorHeightTexture = textureLoader. load('./door/height.webp')
    const doorNormalTexture = textureLoader. load('./door/normal.webp')
    const doorMetalnessTexture = textureLoader. load('./door/metalness.webp')
    const doorRoughnessTexture = textureLoader. load ('./door/ roughness.webp')
        // Door color space
        doorColorTexture.colorSpace = THREE.SRGBColorSpace

/**
 * House
 */
    // Floor
    const floor = new THREE.Mesh(
        new THREE.PlaneGeometry(20,20, 48, 48),
        new THREE.MeshStandardMaterial({
            alphaMap: floorAlphaTexture,
            transparent: true,
            map: floorColorTexture,
            aoMap: floorARMTexture,
            roughnessMap: floorARMTexture,
            metalnessMap: floorARMTexture,
            normalMap: floorNormalTexture,
            displacementMap: floorDisplacementTexture,
            displacementScale: 0.68,
            displacementBias: -0.4
        })
    )
    floor.rotation.x = - Math.PI * 0.5
    scene.add(floor)

/**
 * GUI
 */
// gui.add(floor.material, 'displacementScale', -1, 1, 0.001).name('floorDisplacementScale')
// gui.add(floor.material, 'displacementBias', -1, 1, 0.001).name('floorDisplacementBias')

// HOUSE GROUP
const houseGroup = new THREE.Group()
scene.add(houseGroup)
    // Walls
    const walls = new THREE.Mesh(
        new THREE.BoxGeometry(4, 2.5, 4),
        new THREE.MeshStandardMaterial({
            map: wallColorTexture,
            aoMap: wallARMTexture,
            roughnessMap: wallARMTexture,
            metalnessMap: wallARMTexture,
            normalMap: wallNormalTexture
        })
    )
    walls.position.y = 1.25
    houseGroup.add(walls)
    // Roof
    const roof = new THREE.Mesh(
        new THREE.ConeGeometry(3.5, 1.5, 4),
        new THREE.MeshStandardMaterial({
            map: roofColorTexture,
            aoMap: roofARMTexture,
            roughnessMap: roofARMTexture,
            metalnessMap: roofARMTexture,
            normalMap: roofNormalTexture
        })
    )
    roof.position.y = 1.5 / 2 + 2.5
    roof.rotation.y = Math.PI * 0.25
    houseGroup.add(roof)
    // Door
    const door = new THREE.Mesh(
        new THREE.PlaneGeometry(2.2, 2.2, 28, 28),
        new THREE.MeshStandardMaterial({
            map: doorColorTexture,
            alphaMap: doorAlphaTexture,
            transparent: true,
            aoMap: doorAmbientOcclusionTexture,
            roughnessMap: doorRoughnessTexture,
            metalnessMap: doorMetalnessTexture,
            normalMap: doorNormalTexture,
            displacementMap: doorHeightTexture,
            displacementScale: 0.15,
            displacementBias: -0.04 
        })
    )
    door.position.z = 2.001
    door.position.y = 1.1
    houseGroup.add(door)
    // Bushes
    const bushGeometry = new THREE.SphereGeometry(1, 16, 16)
    const bushMaterial = new THREE.MeshStandardMaterial({
        map: bushColorTexture,
        aoMap: bushARMTexture,
        roughnessMap: bushARMTexture,
        metalnessMap: bushARMTexture,
        normalMap: bushNormalTexture,
        color: '#ccffcc'
    })
        // Bush One
        const bushOne = new THREE.Mesh(bushGeometry, bushMaterial)
        bushOne.scale.set(0.5, 0.5, 0.5)
        bushOne.position.set(0.8, 0.2, 2.2)
        bushOne.rotation.x = -0.75
        // Bush Two
        const bushTwo = new THREE.Mesh(bushGeometry, bushMaterial)
        bushTwo.scale.set(0.25, 0.25, 0.25)
        bushTwo.position.set(1.4, 0.1, 2.1)
        bushTwo.rotation.x = -0.75
        // Bush Three
        const bushThree = new THREE.Mesh(bushGeometry, bushMaterial)
        bushThree.scale.set(0.4, 0.4, 0.4)
        bushThree.position.set(-0.8, 0.1, 2.2)
        bushThree.rotation.x = -0.75
        // Bush Four
        const bushFour = new THREE.Mesh(bushGeometry, bushMaterial)
        bushFour.scale.set(0.15, 0.15, 0.15)
        bushFour.position.set(-1, 0.05, 2.6)
        bushFour.rotation.x = -0.75

        houseGroup.add(bushOne, bushTwo, bushThree, bushFour)

//Graves
const gravesGroup = new THREE.Group()
scene.add(gravesGroup)

const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2)
const graveMaterial = new THREE.MeshStandardMaterial({
    map: gravesColorTexture,
    aoMap: gravesARMTexture,
    roughnessMap: gravesARMTexture,
    metalnessMap: gravesARMTexture,
    normalMap: gravesNormalTexture
})
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
 * Ghosts
 */
const ghostOne = new THREE.PointLight('#9900ff', 6) 
const ghostTwo = new THREE.PointLight('#ff0088', 6) 
const ghostThree = new THREE.PointLight('#ff0000', 6)
scene.add(ghostOne, ghostTwo, ghostThree) 

/**
 * Lights
 */
    // Ambient light
    const ambientLight = new THREE.AmbientLight('#86cdff', 0.275)
    scene.add(ambientLight)
    // Directional light
    const directionalLight = new THREE.DirectionalLight('#86cdff', 1)
    directionalLight.position.set(3, 2, -8)
    scene.add(directionalLight)
    // Door Light (point)
    const doorLight = new THREE.PointLight('#ff7d46')
    doorLight.position.set(0, 2.2, 2.5)
    houseGroup.add(doorLight)


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
 * Shadows
 */
    // Renderer
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    //Cast and recieve
        // Mix
        directionalLight.castShadow = true
        floor.receiveShadow = true
        // Ghosts
        directionalLight.castShadow = true
        ghostOne.castShadow = true
        ghostTwo.castShadow = true
        ghostThree.castShadow = true
        // Walls
        walls.castShadow = true
        walls.receiveShadow = true
        ghostThree.castShadow = true
        // Roof
        roof.castShadow = true
        // Graves
        for(const grave of gravesGroup.children){
            grave.castShadow = true
            grave.recieveShadow = true
        }
    // Mapping
        // Lights
        directionalLight.shadow.mapSize.width = 256
        directionalLight.shadow.mapSize.height = 256
        directionalLight.shadow.camera.top = 8
        directionalLight.shadow.camera.right = 8
        directionalLight.shadow.camera.bottom = -8
        directionalLight.shadow.camera.left = -8
        directionalLight.shadow.camera.near = 1
        directionalLight.shadow.camera.far = 20
        // Ghosts
            // GhostOne
            ghostOne.shadow.mapSize.width = 256
            ghostOne.shadow.mapSize.height = 256
            ghostOne.shadow.mapSize.fat = 10
            // GhostTwo
            ghostOne.shadow.mapSize.width = 256
            ghostOne.shadow.mapSize.height = 256
            ghostOne.shadow.mapSize.fat = 10
            // GhostThree
            ghostOne.shadow.mapSize.width = 256
            ghostOne.shadow.mapSize.height = 256
            ghostOne.shadow.mapSize.fat = 10

/**
 * Sky
 */
const sky = new Sky()
sky.scale.setScalar(100)
scene.add(sky)
    //Parameters
    sky.material.uniforms.turbidity.value = 10
    sky.material.uniforms.rayleigh.value = 3
    sky.material.uniforms.mieCoefficient.value = 0.1
    sky.material.uniforms.mieDirectionalG.value = 0.95
    sky.material.uniforms.sunPosition.value.set(0.3, - 0.038, - 0.95)

/**
 * Fog
 */
scene.fog = new THREE.FogExp2('#04343f', 0.1)

/**
 * Animate
 */
const timer = new Timer()

const tick = () =>
{
    // Timer
    timer.update()
    const elapsedTime = timer.getElapsed()

    /**
     * GHOSTS
     */
        // GhostOne
        const ghostOneAngle = elapsedTime * 0.5
        ghostOne.position.x = Math.cos(ghostOneAngle) * 4
        ghostOne.position.z = Math.sin(ghostOneAngle) * 4
        ghostOne.position.y = Math.sin(ghostOneAngle) * Math.sin(ghostOneAngle * 2.34) * Math.sin(ghostOneAngle * 3.45)
        // GhosTwo
        const ghostTwoAngle = - elapsedTime * 0.38
        ghostTwo.position.x = Math.cos(ghostTwoAngle) * 5
        ghostTwo.position.z = Math.sin(ghostTwoAngle) * 5
        ghostTwo.position.y = Math.sin(ghostTwoAngle) * Math.sin(ghostTwoAngle * 2.34) * Math.sin(ghostTwoAngle * 3.45)
        // GhosThree
        const ghostThreeAngle = - elapsedTime * 0.23
        ghostThree.position.x = Math.cos(ghostThreeAngle) * 6
        ghostThree.position.z = Math.sin(ghostThreeAngle) * 6
        ghostThree.position.y = Math.sin(ghostThreeAngle) * Math.sin(ghostThreeAngle * 2.34) * Math.sin(ghostThreeAngle * 3.45)

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()