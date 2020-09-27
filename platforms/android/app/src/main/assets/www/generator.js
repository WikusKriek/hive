
const workboxBuild = require('workbox-build');

  const buildSW = () => {
    // This will return a Promise
    return workboxBuild.injectManifest({
      
      globDirectory:"./",
      swDest:"service-worker.js",
      swSrc: "service-worker.js",
      globPatterns: [
        '**/*.{html,json,js,css,png,svg}',
      ]
      
  
      
      
    }).then(({count, size, warnings}) => {
      // Optionally, log any warnings and details.
      warnings.forEach(console.warn);
      console.log(`${count} files will be precached, totaling ${size} bytes.`);
    });
  };
  
  buildSW();