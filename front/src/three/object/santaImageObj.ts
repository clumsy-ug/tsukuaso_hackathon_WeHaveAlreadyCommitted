import * as THREE from 'three'

export class SantaImageObj {
  private mesh: THREE.Mesh
  private texture: THREE.Texture
  private material: THREE.MeshBasicMaterial
  private geometry: THREE.PlaneGeometry
  private scene: THREE.Scene
  private position = { x: 0, y: 0 }
  private targetPosition = { x: 0, y: 0 }

  constructor(scene: THREE.Scene, imageUrl: string, width: number = 1, height: number = 1) {
    this.scene = scene

    // テクスチャの作成
    this.texture = new THREE.TextureLoader().load(imageUrl)

    // ジオメトリとマテリアルの作成
    this.geometry = new THREE.PlaneGeometry(width, height)
    this.material = new THREE.MeshBasicMaterial({
      map: this.texture,
      transparent: true,
      side: THREE.DoubleSide
    })

    // メッシュの作成とシーンへの追加
    this.mesh = new THREE.Mesh(this.geometry, this.material)
    this.scene.add(this.mesh)
  }

  setPosition(x: number, y: number, z: number = 0) {
    if (this.mesh) {
      this.mesh.position.set(x, y, z)
      this.position = { x, y }
      this.targetPosition = { x, y }
    }
  }

  setTargetPosition(x: number, y: number) {
    this.targetPosition = { x, y }
  }

  update(lerpFactor: number = 0.1) {
    if (this.mesh) {
      this.position.x += (this.targetPosition.x - this.position.x) * lerpFactor
      this.position.y += (this.targetPosition.y - this.position.y) * lerpFactor

      this.mesh.position.x = this.position.x
      this.mesh.position.y = this.position.y
    }
  }

  switchImage(newImageUrl: string) {
    if (this.material) {
      if (this.texture) {
        this.texture.dispose()
      }
      this.texture = new THREE.TextureLoader().load(newImageUrl)
      this.material.map = this.texture
      this.material.needsUpdate = true
    }
  }

  dispose() {
    if (this.geometry) {
      this.geometry.dispose()
    }
    if (this.material) {
      this.material.dispose()
    }
    if (this.texture) {
      this.texture.dispose()
    }
    if (this.mesh) {
      this.scene.remove(this.mesh)
    }
  }
}
