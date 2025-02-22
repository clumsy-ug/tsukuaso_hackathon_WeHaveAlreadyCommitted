import * as THREE from 'three'
import santaImage from '../../assets/images/santa_claus_front.png'

export class ImageObj {
  private scene: THREE.Scene
  private mesh: THREE.Mesh | null = null

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
}
