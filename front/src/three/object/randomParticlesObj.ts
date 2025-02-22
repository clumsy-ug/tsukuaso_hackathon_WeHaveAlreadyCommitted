import * as THREE from 'three'

export class RandomParticlesObj {
  particlesMaterial: THREE.PointsMaterial
  particlesGeometry: THREE.BufferGeometry<THREE.NormalBufferAttributes>
  velocities: number[] = []
  particlesCount: number = 60

  scene: THREE.Scene
  constructor(sceane: THREE.Scene) {
    this.particlesMaterial = new THREE.PointsMaterial({
      size: 0.1,
      transparent: true,
      opacity: 0.3,
      vertexColors: true
    })

    this.particlesGeometry = new THREE.BufferGeometry()

    this.scene = sceane
  }

  createParticlesObj() {
    const positions = []
    const colors = []
    const color = new THREE.Color()

    // パーティクルの初期位置とランダムな速度を設定
    for (let i = 0; i < this.particlesCount; i++) {
      const x = (Math.random() - 0.5) * 10
      const y = (Math.random() - 0.5) * 10
      const z = (Math.random() - 0.5) * 10
      positions.push(x, y, z)

      // ランダムな速度（少し小さめの値にすると自然な動きに）
      const velocityX = (Math.random() - 0.5) * 0.02
      const velocityY = (Math.random() - 0.5) * 0.02
      const velocityZ = (Math.random() - 0.5) * 0.02
      this.velocities.push(velocityX, velocityY, velocityZ)

      // ランダムな色を生成
      color.setHSL(Math.random(), 1.0, 0.5)
      colors.push(color.r, color.g, color.b)
    }
    this.particlesGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    this.particlesGeometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))

    const particles = new THREE.Points(this.particlesGeometry, this.particlesMaterial)
    this.scene.add(particles)
  }

  animateParticle() {
    const positions = this.particlesGeometry.attributes.position.array

    // 各パーティクルの位置を更新
    for (let i = 0; i < this.particlesCount; i++) {
      // 位置データのインデックス計算
      const index = i * 3

      // 速度で位置を更新
      positions[index] += this.velocities[index]
      positions[index + 1] += this.velocities[index + 1]
      positions[index + 2] += this.velocities[index + 2]

      // パーティクルが一定の範囲を超えたら逆方向に戻す
      if (positions[index] > 5 || positions[index] < -5) this.velocities[index] *= -1
      if (positions[index + 1] > 5 || positions[index + 1] < -5) this.velocities[index + 1] *= -1
      if (positions[index + 2] > 5 || positions[index + 2] < -5) this.velocities[index + 2] *= -1
    }

    // 変更を Three.js に通知
    this.particlesGeometry.attributes.position.needsUpdate = true
  }
}
