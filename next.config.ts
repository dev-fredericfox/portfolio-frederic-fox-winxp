import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
	/* config options here */
	output: "export",
	basePath: isProd ? "/portfolio-frederic-fox-winxp/" : "",
	assetPrefix: isProd ? "/portfolio-frederic-fox-winxp/" : "",
	images: { unoptimized: true },
};

export default nextConfig;
