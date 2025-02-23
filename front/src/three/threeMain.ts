import * as THREE from 'three'
import { ThreeScene } from './scene/threeScene'
import { RandomParticlesObj } from './object/randomParticlesObj'
import { SantaImageObj } from './object/SantaImageObj'
import { ImageObj } from './object/ImgaObj'

export class ThreeMain {
  private threeScene: ThreeScene
  private animationFrameId: number | null = null
  private randomParticlesObj: RandomParticlesObj
  private santaImgObj: SantaImageObj
  private imageObj: ImageObj

  constructor(containerElement: HTMLElement) {
    this.threeScene = new ThreeScene(containerElement)

    this.setupEventListeners()
    this.randomParticlesObj = new RandomParticlesObj(this.threeScene.scene)
    this.randomParticlesObj.createParticlesObj()

    this.santaImgObj = new SantaImageObj(this.threeScene.scene)
    this.santaImgObj.createImageObj()

    this.imageObj = new ImageObj(this.threeScene.scene)
    this.imageObj.createImageObj()

    this.myAnimate = this.myAnimate.bind(this)
    this.myAnimate()
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
    this.santaImgObj.update()
    this.imageObj.update()
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
