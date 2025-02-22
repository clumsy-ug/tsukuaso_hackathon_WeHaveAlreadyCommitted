import * as THREE from 'three'
import { ThreeScene } from './scene/threeScene'
import { RandomParticlesObj } from './object/randomParticlesObj'
import { SantaImageObj } from './object/santaImageObj'

export class ThreeMain {
  private threeScene: ThreeScene
  private animationFrameId: number | null = null
  private randomParticlesObj: RandomParticlesObj
  private santaImageObj: SantaImageObj

  constructor(containerElement: HTMLElement) {
    this.threeScene = new ThreeScene(containerElement)

    this.setupEventListeners()
    this.randomParticlesObj = new RandomParticlesObj(this.threeScene.scene)
    this.randomParticlesObj.createParticlesObj()

    this.santaImageObj = new SantaImageObj(
      this.threeScene.scene,
      '/images/christmas_santa.png',
      10,
      10
    )

    this.myAnimate = this.myAnimate.bind(this)
    this.myAnimate()

    //キューブを作りたい大きな
    const geometry = new THREE.BoxGeometry(10, 10, 10)
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
    const cube = new THREE.Mesh(geometry, material)

    this.threeScene.scene.add(cube)
  }

  private setupEventListeners(): void {
    window.addEventListener('resize', () => {
      this.threeScene.onWindowResize()
    })
  }

  myAnimate(): void {
    this.animationFrameId = requestAnimationFrame(this.myAnimate)
    this.threeScene.renderer.render(this.threeScene.scene, this.threeScene.camera)

    this.randomParticlesObj.animateParticle()
  }

  public resetCamera(): void {
    this.threeScene.cameraReset()
  }

  public dispose(): void {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId)
    }

    window.removeEventListener('resize', () => {
      this.threeScene.onWindowResize()
    })

    if (this.threeScene.renderer) {
      const canvas = this.threeScene.renderer.domElement
      canvas.parentElement?.removeChild(canvas)
      this.threeScene.renderer.dispose()
    }
    // シーン内のメッシュやマテリアルの解放
    this.threeScene.scene.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        if (object.geometry) {
          object.geometry.dispose()
        }
        if (object.material instanceof THREE.Material) {
          object.material.dispose()
        } else if (Array.isArray(object.material)) {
          object.material.forEach((material) => material.dispose())
        }
      }
    })
  }
}
