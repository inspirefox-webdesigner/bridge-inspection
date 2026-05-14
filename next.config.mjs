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
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: "/bridge-inspection",
  assetPrefix: "/bridge-inspection/",
};

export default nextConfig;