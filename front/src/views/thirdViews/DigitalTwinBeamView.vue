<!-- 梁场数字孪生 -->
<template>
  <div class="digital-twin-beam-wrapper">
    梁场数字孪生
    <div class="canvas" ref="sceneRef"></div>
  </div>
</template>

<script setup lang="js">
// 加载库
import * as THREE from 'three'
import { onMounted, ref } from 'vue'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
// 定义变量
const sceneRef = ref(null)
const raycaster = new THREE.Raycaster()
const mouse = new THREE.Vector2()
const axesHelper = new THREE.AxesHelper(30)

// 创建场景,摄像机,渲染器
const scene = new THREE.Scene()
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.set(0, 0, 5) // 设置摄像机位置
const renderer = new THREE.WebGLRenderer()
//给renderer设置阴影开关
renderer.shadowMap.enabled = true
renderer.setSize(window.innerWidth * 0.8, window.innerHeight * 0.8)
// const ambientLight = new THREE.AmbientLight(0x404040, 80);

// 添加内容到场景
// scene.add(ambientLight);
scene.add(axesHelper)

// 加载模型
const loader = new GLTFLoader()
loader.load(
  new URL('@/assets/3Dmodel/文本(1).glb', import.meta.url).href,
  function (gltf) {
    console.log(gltf, ' 模型文件对象')
    gltf.scene.castShadow = true
    scene.add(gltf.scenes[1])
    const model = gltf.scene.children[0]
    // 批量添加模型

    // 加载摄像机
    gltf.cameras.forEach((a) => {
      camera = a
    })
    // 加载灯光
    gltf.scene.traverse((child) => {
      if (child.isLight) {
        console.log(child, 'light')
        child.intensity = 70
        scene.add(child)
      }
      if (child.isMesh) {
        child.receiveShadow = true
      }
    })
  },
  function (xhr) {
    console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
  },
  function (error) {
    console.log('An error happened')
    console.log(error)
  }
)
// 创建控制器
const controls = new OrbitControls(camera, renderer.domElement)

controls.enableZoom = true // 允许缩放
controls.zoomSpeed = 1.0 // 设置缩放速度
controls.minDistance = 1 // 设置最小距离
controls.maxDistance = 200 // 设置最大距离

const addCloneModel = (model, nums) => {
  for (let i = 0; i < nums; i++) {
    const clone = model.clone()
    clone.rotation.y = Math.PI / 2
    // 设置模型的位置，旋转等属性
    clone.position.set(5, 0, (i - 7) * 2)
    // 将克隆的模型添加到场景中
    scene.add(clone)
  }
}

// 页面初始化
onMounted(() => {
  sceneRef.value.appendChild(renderer.domElement)
  // 动画
  function animate() {
    requestAnimationFrame(animate)
    controls.update()
    renderer.render(scene, camera)
  }
  animate()

  // 添加点击事件
  renderer.domElement.addEventListener('click', (event) => {
    // 将鼠标位置归一化为-1到1的范围
    mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1
    mouse.y = -(event.clientY / renderer.domElement.clientHeight) * 2 + 1

    // 更新射线的方向
    raycaster.setFromCamera(mouse, camera)

    // 计算物体和射线的交点
    const intersects = raycaster.intersectObjects(scene.children, true)

    if (intersects.length > 0) {
      // 如果有交点，那么第一个交点的物体就是用户点击的物体
      const object = intersects[0].object
      console.log('Clicked object', object)
    }
  })
})
</script>
<style scoped lang="less">
.canvas {
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
}
</style>
