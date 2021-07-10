module.exports = {
  generateEtags: false,
  
    async rewrites() {
      return [
           
            {
              source:`/${encodeURI("بلیط-هواپیما")}/:path*`,
              destination: '/flights',
            },
           
            {
              source:`/${encodeURI("ویلا")}/:path*`,
              destination: '/villa',
            },
            {
              source:`/${encodeURI("panel")}/:path*`,
              destination: '/panel',
            },
          
        ]
    },
    
      images: {
        loader: "imgix",
        path: "",
      },
    
    webpack: (config, { isServer }) => {
      // Fixes npm packages that depend on `fs` module
      if (!isServer) {
      config.node = {
      fs: 'empty'
      }
      }
      return config
      }
  }


