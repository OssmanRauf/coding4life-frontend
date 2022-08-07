/** @type {import('next').NextConfig} */
import { info } from "./utils/tokens"
const nextConfig = {
    reactStrictMode: true,
}

module.exports = {
    images: {
        domains: [info.baseUrl],
    },
    nextConfig,
}