module.exports = {
    async rewrites() {
      return [
          // {
          //   source:`/${encodeURI("بلیط هواپیما")}`,
          //   destination: '/flights',
          // },
           
            {
//              "/بلیط-هواپیما/:source/:destination"
              source:`/${encodeURI("بلیط-هواپیما")}/:path*`,
              destination: '/flights',
            },
           
            {
              source:`/${encodeURI("بلیط قطار")}`,
              destination: '/mehdi',
            },
            
          
        ]
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


