module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  publicRuntimeConfig: { CORS_ENDPOINT: process.env.CORS_ENDPOINT },
  serverRuntimeConfig: { STATIC_TOKEN: process.env.STATIC_TOKEN },
  images: { domains: ['fastly.picsum.photos'] }
}
