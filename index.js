const scene = new THREE.Scene();
/**
 * camera: (field of view, aspect ratio, near plane, far plane)
 */
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.z = 5

const renderer = new THREE.WebGLRenderer({antialias: true})
renderer.setClearColor("#e5e5e5")
renderer.setSize(window.innerWidth, window.innerHeight)

document.body.appendChild(renderer.domElement)

window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight)
  camera.aspect = window.innerWidth / window.innerHeight
  //console.dir(camera)
  camera.updateProjectionMatrix()
})

const raycaster = new THREE.Raycaster()
const mouse = new THREE.Vector2()


const geometry = new THREE.SphereGeometry(1, 10, 10)
const geometry2 = new THREE.BoxGeometry(1, 2, 4)
const material = new THREE.MeshLambertMaterial({color: 0xFFCC00})
//const mesh = new THREE.Mesh(geometry, material)
const mesh2 = new THREE.Mesh(geometry2, material)

for(let i = 0; i < 15; i++) {
  const mesh = new THREE.Mesh(geometry, material)
  mesh.position.x = (Math.random() - 0.5 )* 10
  mesh.position.y = (Math.random() - 0.5 )* 10
  mesh.position.z = (Math.random() - 0.5 )* 10
  scene.add(mesh)
}

mesh2.position.set(2,0.5,0)
mesh2.rotation.set(45,0,0)
mesh2.scale.set(1,2,1)
//scene.add(mesh)
scene.add(mesh2)

const light = new THREE.PointLight(0xFFFFFF, 1, 500)
light.position.set(10,0,25)
scene.add(light)

let up = true

function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera)

  // mesh.rotation.x += 0.05
  // mesh.rotation.z += 0.05
  // mesh2.rotation.x -= 0.05


  // if(up) {
  //   mesh.scale.x += 0.01
  // } else {
  //   mesh.scale.x -= 0.01
  // }
  // if(mesh.scale.x > 2) up = false
  // if(mesh.scale.x < 0) up = true
}

function onMouseMove(event) {
  event.preventDefault();
	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

  raycaster.setFromCamera( mouse, camera );
  const intersects = raycaster.intersectObjects( scene.children, true );
  for(var i = 0; i < intersects.length; i++) {
    //intersects[i].object.material.color.set(0xff0000)
    this.tl = new TimelineMax()
    this.tl.to(intersects[i].object.scale, 1, {x: 2, ease: Expo.easeOut})
    this.tl.to(intersects[i].object.scale, .5, {x: .5, ease: Expo.easeOut})
    this.tl.to(intersects[i].object.position,.5, {x: -2, ease: Expo.easeOut})
    this.tl.to(intersects[i].object.rotation, .5, {x: Math.PI * 5, ease: Expo.easeOut}, "=-1.5")
  }
}

render()



window.addEventListener('click', onMouseMove)
