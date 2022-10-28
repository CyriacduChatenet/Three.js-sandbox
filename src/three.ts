import * as THREE from "three";

const setupThree = (HTMLElement: HTMLDivElement) => {
  // Config
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  HTMLElement.appendChild(renderer.domElement);

  const light = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
  scene.add(light);

  const torusKnotGeometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);
  const torusKnotTexture = new THREE.TextureLoader().load(
    "https://images.unsplash.com/photo-1479030160180-b1860951d696?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80"
  );
  const torusKnotMaterial = new THREE.MeshBasicMaterial({
    map: torusKnotTexture,
    side: THREE.DoubleSide,
  });
  const torusKnot = new THREE.Mesh(torusKnotGeometry, torusKnotMaterial);
  torusKnot.position.setX(30);
  scene.add(torusKnot);

  const torusKnotAnimate = () => {
    requestAnimationFrame(torusKnotAnimate );

    torusKnot.rotation.x += 0.01;
    torusKnot.rotation.y += 0.01;
    torusKnot.rotation.z += 0.01;
    renderer.render(scene, camera);
  };

  torusKnotAnimate ();

  const EarthGeometry = new THREE.SphereGeometry(15, 32, 16);
  const earthTexture = new THREE.TextureLoader().load(
    "https://live.staticflickr.com/2521/3884071286_edb50f8137_b.jpg"
  );
  const EarthMaterial = new THREE.MeshBasicMaterial({
    map: earthTexture,
    side: THREE.DoubleSide,
  });
  const sphere = new THREE.Mesh(EarthGeometry, EarthMaterial);
  sphere.position.setX(-30);
  scene.add(sphere);

  const earthRotateAnimation = () => {
    requestAnimationFrame(earthRotateAnimation);

    sphere.rotation.y += 0.01;
    renderer.render(scene, camera);
  };

  earthRotateAnimation ();

  camera.position.z = 50;
};

export default setupThree;
