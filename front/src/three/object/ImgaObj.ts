import * as THREE from 'three'
import santaImage from '../../assets/images/animal_moose.png'

export class ImageObj {
  private scene: THREE.Scene
  private mesh: THREE.Mesh | null = null
  private delayTimer: number | null = null
  private readonly RANGE_X = 20
  private readonly RANGE_Z = 10

  private movements: {
    speed: number
    directionX: number // 1 or -1
    targetZ: number
  } = {
    speed: 0,
    directionX: 1,
    targetZ: 0
  }

  constructor(scene: THREE.Scene) {
    this.scene = scene
  }

  createImageObj() {
    if (this.mesh) {
      this.scene.remove(this.mesh)
      this.mesh.geometry.dispose()
      if (this.mesh.material instanceof THREE.Material) {
        this.mesh.material.dispose()
      }
      this.mesh = null
    }

    const textureLoader = new THREE.TextureLoader()
    textureLoader.load(
      santaImage,
      (texture) => {
        const geometry = new THREE.PlaneGeometry(2, 2)
        const material = new THREE.MeshBasicMaterial({
          map: texture,
          transparent: true,
          side: THREE.DoubleSide
        })

        this.mesh = new THREE.Mesh(geometry, material)
        const startX = Math.random() < 0.5 ? -this.RANGE_X : this.RANGE_X
        const z = -2

        this.mesh.position.set(startX, -1, -2)
        this.scene.add(this.mesh)
        this.movements = {
          speed: 0.05 + Math.random() * 0.05,
          directionX: -1,
          targetZ: z
        }
      },
      undefined,
      (error) => {
        console.error('画像のロードに失敗しました', error)
      }
    )
  }

  update() {
    if (!this.mesh || this.delayTimer !== null) return
    const movement = this.movements

    this.mesh.position.x += movement.speed * movement.directionX

    if (this.mesh.position.x > this.RANGE_X || this.mesh.position.x < -this.RANGE_X) {
      const delay = 1000 + Math.random() * 5000
      this.delayTimer = window.setTimeout(() => {
        if (this.mesh) {
          this.mesh.position.x = this.mesh.position.x > 0 ? -this.RANGE_X : this.RANGE_X
        }

        if (Math.random() < 0.5) {
          this.movements.directionX *= -1
        }

        if (this.mesh) {
          this.mesh.scale.x = Math.abs(this.mesh.scale.x) * -this.movements.directionX
        }

        this.delayTimer = null
      }, delay)
    }

    this.mesh.position.z += (movement.targetZ - this.mesh.position.z) * 0.05
  }
}
