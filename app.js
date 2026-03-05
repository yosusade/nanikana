import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { VRMLoaderPlugin } from '@pixiv/three-vrm';

// 1. 初始化场景
const scene = new THREE.Scene();

// 2. 初始化相机
const camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 20);
camera.position.set(0, 1.3, 3); // 镜头对准上半身

// 3. 初始化渲染器
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

// 4. 添加灯光
const light = new THREE.DirectionalLight(0xffffff, Math.PI);
light.position.set(1, 1, 1).normalize();
scene.add(light);
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// 5. 加载 VRM 模型
let currentVrm = null;
const loader = new GLTFLoader();

loader.register((parser) => {
  return new VRMLoaderPlugin(parser);
});

loader.load(
  './model.vrm',
  (gltf) => {
    const vrm = gltf.userData.vrm;
    scene.add(vrm.scene);
    currentVrm = vrm;
    
    // 🌟 完美修复：直接让模型旋转 180 度正对着你
    vrm.scene.rotation.y = 0;
    
   // 👇 ==== 新加的代码：给模型“正骨”，让双臂自然下垂 ==== 👇
    // 1. 获取左右大臂的骨骼节点
    const leftArm = vrm.humanoid.getNormalizedBoneNode('leftUpperArm');
    const rightArm = vrm.humanoid.getNormalizedBoneNode('rightUpperArm');

    // 2. 旋转 Z 轴 (1.2 弧度大约是 68 度，非常自然的下垂角度)
    if (leftArm) {
      leftArm.rotation.z = -1.2;   // 左手往下放
    }
    if (rightArm) {
      rightArm.rotation.z = 1.2; // 右手往下放
    }
    // 👆 ================================================= 👆

    console.log('模型加载成功!');
  },
  (progress) => console.log('Loading model...', 100.0 * (progress.loaded / progress.total), '%'),
  (error) => console.error(error)
);

// 6. 动画循环 (让物理骨骼生效)
const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);
  const deltaTime = clock.getDelta();
  
  if (currentVrm) {
    currentVrm.update(deltaTime);
  }
  
  renderer.render(scene, camera);
}

animate();