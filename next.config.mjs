await import('./src/env.mjs')
import nextMdx from '@next/mdx'

const withMDX = nextMdx({
  extension: /\.mdx?$/,
  options: {
    // If you use remark-gfm, you'll need to use next.config.mjs
    // as the package is ESM only
    // https://github.com/remarkjs/remark-gfm#install
    remarkPlugins: [],
    rehypePlugins: [],
    // If you use `MDXProvider`, uncomment the following line.
    // providerImportSource: "@mdx-js/react",
  },
})

/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  images: {
    domains: [
      'uploadthing.com',
      'source.unsplash.com',
      'intcomexpim.blob.core.windows.net',
    ],
    unoptimized: true,
  },
  experimental: {
    serverActions: true,
    appDir: true,
  },
  async redirects() {
    return [
      {
        source: '/producto/:path*',
        destination: '/tienda/producto/:path*',
        permanent: true,
      },
      {
        source: '/categoria-producto/:path*',
        destination: '/tienda/categoria-producto/:path*',
        permanent: true,
      },
      {
        source: '/tienda-siim/:path*',
        destination: '/tienda',
        permanent: true,
      },
    ]
  },
}

export default withMDX(nextConfig)
