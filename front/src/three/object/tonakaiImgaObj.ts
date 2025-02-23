import * as THREE from 'three'
import santaImage from '../../assets/images/animal_moose.png'

export class TonakaiImageObj {
  private scene: THREE.Scene
  private mesh: THREE.Mesh | null = null
  private time: number = 0
  private amplitude: number = 0.5
  private frequency: number = 0.01
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
        const z = -5 - Math.random() * this.RANGE_Z

        this.mesh.position.set(startX, -5, z)
        this.scene.add(this.mesh)
        this.movements = {
          speed: 0.05 + Math.random() * 0.05, // ランダムな速度
          directionX: startX < 0 ? 1 : -1, // 左から右、または右から左
          targetZ: z // 目標のz位置
        }
      },
      undefined,
      (error) => {
        console.error('画像のロードに失敗しました', error)
      }
    )
  }

  update() {
    if (!this.mesh) return

    const movement = this.movements

    // x方向の移動
    this.mesh.position.x += movement.speed * movement.directionX

    // 範囲外に出たら反対側から再度開始
    if (movement.directionX > 0 && this.mesh.position.x > this.RANGE_X) {
      this.mesh.position.x = -this.RANGE_X
      // 新しいz位置をランダムに設定
      movement.targetZ = -5 - Math.random() * this.RANGE_Z
    } else if (movement.directionX < 0 && this.mesh.position.x < -this.RANGE_X) {
      this.mesh.position.x = this.RANGE_X
      movement.targetZ = -5 - Math.random() * this.RANGE_Z
    }

    // z位置をなめらかに補間
    this.mesh.position.z += (movement.targetZ - this.mesh.position.z) * 0.05
  }
}
