import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  typescript: {
    // 忽略构建时的 TypeScript 错误（强制编译）
    ignoreBuildErrors: true, // [!code focus]
  },
}

export default nextConfig
