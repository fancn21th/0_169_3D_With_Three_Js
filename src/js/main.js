let scene, camera, renderer;
const add = 0.01;

function getTriangle() {
  var geometry = new THREE.Geometry();

  // Student: some data below must be fixed
  // for both triangles to appear !
  geometry.vertices.push(new THREE.Vector3(3, 3, 0)); // 0
  geometry.vertices.push(new THREE.Vector3(7, 3, 0)); // 1
  geometry.vertices.push(new THREE.Vector3(7, 7, 0));
  geometry.vertices.push(new THREE.Vector3(3, 7, 0)); // 3

  // geometry.faces.push(new THREE.Face3(0, 1, 2)); // 此面为正面会显示
  geometry.faces.push(new THREE.Face3(2, 0, 3)); // 此面为背面 不会显示

  return geometry;
}

function getMaterial() {
  const material = new THREE.MeshBasicMaterial({
    color: 0xf6831e,
    side: THREE.FrontSide,
  });
  return material;
}

const render = function () {
  const triangle = new THREE.Mesh(getTriangle(), getMaterial());

  scene.add(triangle);
};

// set up the environment -
// initialize scene, camera, objects and renderer
const init = function () {
  // create the scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xffffff);

  // create an locate the camera
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.x = 1;
  camera.position.y = 1;
  camera.position.z = 10;

  // axes helper
  let axes = new THREE.AxesHelper(15);
  scene.add(axes);

  render();

  // create the renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);

  // resize
  window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  });

  // defining geometry

  // Observe a scene or a renderer
  if (typeof __THREE_DEVTOOLS__ !== "undefined") {
    __THREE_DEVTOOLS__.dispatchEvent(
      new CustomEvent("observe", { detail: scene })
    );
    __THREE_DEVTOOLS__.dispatchEvent(
      new CustomEvent("observe", { detail: renderer })
    );
  }
};

// main animation loop - calls 50-60 in a second.
let mainLoop = function () {
  renderer.render(scene, camera);
  requestAnimationFrame(mainLoop);
};

///////////////////////////////////////////////
init();
mainLoop();
