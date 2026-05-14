// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   /* config options here */
//   output: "export",
//   images: {
//     unoptimized: true,
//   },
// };

// export default nextConfig;


/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: isProd ? "/bridge-inspection" : "",
  assetPrefix: isProd ? "/bridge-inspection/" : "",
};

export default nextConfig;