
var skyShader = (function(){

      var setUpSky = {};
			var sky, sunSphere;

			function initSky(scene, lum, azim) {

				// Add Sky Mesh
				sky = new THREE.Sky();
				scene.add( sky.mesh );

				// Add Sun Helper
				sunSphere = new THREE.Mesh(
					new THREE.SphereBufferGeometry( 20000, 16, 8 ),
					new THREE.MeshBasicMaterial( { color: 0xffffff } )
				);
				sunSphere.position.x = - 700000;
				sunSphere.visible = false;
				scene.add( sunSphere );

        //var helper = new THREE.GridHelper( 5000, 2, 0xffffff, 0xffffff );
				//scene.add( helper );

				/// GUI
				var effectController  = {
					turbidity: 1,
					rayleigh: 0,
					mieCoefficient: 0.026,
          //mieCoefficient: 0.1,
					mieDirectionalG: 0.377,
					luminance: 0.97,
          //inclination: 0.4965, // elevation / inclination
          azimuth: 0.2689, // Facing front,
					inclination: 0.3773, // elevation / inclination
					//azimuth: 0.4422, // Facing front,
					sun: ! true
          // turbidity: 1,
          // rayleigh: 0,
          // mieCoefficient: 0.1,
          // mieDirectionalG: 0.616,
          // luminance: 0.97,
          // inclination: 0.0, // elevation / inclination
          // azimuth: 0.2147, // Facing front,
          // sun: ! true
				};

				var distance = 400000;

        function guiChanged() {

  					var uniforms = sky.uniforms;
  					uniforms.turbidity.value = effectController.turbidity;
  					uniforms.rayleigh.value = effectController.rayleigh;
  					uniforms.luminance.value = lum;
  					uniforms.mieCoefficient.value = effectController.mieCoefficient;
  					uniforms.mieDirectionalG.value = effectController.mieDirectionalG;

  					var theta = Math.PI * ( effectController.inclination - 0.5 );
  					var phi = 2 * Math.PI * ( azim - 0.5 );

  					sunSphere.position.x = distance * Math.cos( phi );
  					sunSphere.position.y = distance * Math.sin( phi ) * Math.sin( theta );
  					sunSphere.position.z = distance * Math.sin( phi ) * Math.cos( theta );

  					sunSphere.visible = effectController.sun;
  					sky.uniforms.sunPosition.value.copy( sunSphere.position );
  					//renderer.render( scene, camera );

  				}
  				// var gui = new dat.GUI();
          //
  				// gui.add( effectController, "turbidity", 1.0, 20.0, 0.1 ).onChange( guiChanged );
  				// gui.add( effectController, "rayleigh", 0.0, 4, 0.001 ).onChange( guiChanged );
  				// gui.add( effectController, "mieCoefficient", 0.0, 0.1, 0.001 ).onChange( guiChanged );
  				// gui.add( effectController, "mieDirectionalG", 0.0, 1, 0.001 ).onChange( guiChanged );
  				// gui.add( effectController, "luminance", 0.0, 2 ).onChange( guiChanged );
  				// gui.add( effectController, "inclination", 0, 1, 0.0001 ).onChange( guiChanged );
  				// gui.add( effectController, "azimuth", 0, 1, 0.0001 ).onChange( guiChanged );
  				// gui.add( effectController, "sun" ).onChange( guiChanged );
          //
  				 guiChanged();
           console.log(lum);
           console.log(azim);

  			}
      setUpSky.renderSky = function (scene, lum, azim) {
        initSky(scene, lum, azim);
      };
      return setUpSky;
}());
