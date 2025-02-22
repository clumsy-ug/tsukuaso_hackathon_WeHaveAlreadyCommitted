import * as THREE from 'three'

export class ThreeScene {
  scene: THREE.Scene
  camera: THREE.PerspectiveCamera
  renderer: THREE.WebGLRenderer

  constructor(containerElement: HTMLElement) {
    // シーンの作成
    this.scene = new THREE.Scene()
    this.scene.background = new THREE.Color(0xe3e3e3)
    // カメラの作成
    this.camera = new THREE.PerspectiveCamera(
      75, // 視野角
      containerElement.offsetWidth / containerElement.offsetHeight, // アスペクト比
      0.1, // near clipping plane
      1000 // far clipping plane
    )
    this.camera.position.set(0, 1.6, 6)
    this.camera.rotation.x = -0.26

    // レンダラーの作成
    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    this.renderer.setSize(containerElement.offsetWidth, containerElement.offsetHeight)

    containerElement.appendChild(this.renderer.domElement)
    this.renderer.localClippingEnabled = true
    this.renderer.domElement.style.width = '100%'
    this.renderer.domElement.style.height = '100%'

    // ライトの作成
    const light = new THREE.AmbientLight(0xffffff, 2)
    light.position.set(0, 10, 10).normalize()
    this.scene.add(light)

    const diretionLight = new THREE.DirectionalLight(0xffffff, 1.0)
    diretionLight.position.set(0, 10, 10).normalize()
    this.scene.add(diretionLight)
  }
  public onWindowResize() {
    const containerElement = this.renderer.domElement.parentElement
    if (containerElement) {
      const width = containerElement.offsetWidth
      const height = containerElement.offsetHeight
      this.camera.aspect = width / height
      this.camera.updateProjectionMatrix()
      this.renderer.setSize(width, height)
      this.renderer.domElement.style.width = '100%'
      this.renderer.domElement.style.height = '100%'
    }
  }

  cameraReset(): void {
    this.camera.position.set(0, 1.6, 6)
    this.camera.rotation.x = -0.26
    this.camera.updateProjectionMatrix()
  }
}
