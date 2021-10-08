module.exports = {
  async rewrites() {
    return [
      {
        source: `/${encodeURI("flight")}/:path*`,
        destination: "/flights",
      },

      {
        source: `/${encodeURI("villa")}/:path*`,
        destination: "/villa",
      },
      {
        source: `/${encodeURI("panel")}/:path*`,
        destination: "/panel",
      },
      {
        source: `/${encodeURI("dashboard")}/:path*`,
        destination: "/dashboard",
      },
    ];
  },

  images: {
    loader: "imgix",
    path: "",
  },

  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      resolve: {
        fallback: {
          fs: false
        }
      }
    }
    return config;
  },
};
