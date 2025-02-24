import * as THREE from 'three'

export class SantaImageObj {
  private scene: THREE.Scene
  private mesh: THREE.Mesh | null = null
  private time: number = 0
  private amplitude: number = 0.5
  private frequency: number = 0.01

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

    // テクスチャの読み込み
    const textureLoader = new THREE.TextureLoader()
    const santaImage = import.meta.env.VITE_S3_URL_SANTA!
    textureLoader.load(
      santaImage,
      (texture) => {
        const geometry = new THREE.PlaneGeometry(7, 7) // 画像のサイズを適当に調整
        const material = new THREE.MeshBasicMaterial({
          map: texture,
          transparent: true,
          side: THREE.DoubleSide
        })

        this.mesh = new THREE.Mesh(geometry, material)
        this.mesh.position.set(0, 0, -5) // カメラの正面に配置
        this.scene.add(this.mesh)
        console.log('画像がロードされ、シーンに追加されました')
      },
      undefined,
      (error) => {
        console.error('画像のロードに失敗しました', error)
      }
    )
  }

  update() {
    if (!this.mesh) return

    this.time += 0.05
    // 小さな回転で揺れる動き
    const rotationAmount = Math.sin(this.time) * 0.1
    this.mesh.rotation.z = rotationAmount
  }
}
