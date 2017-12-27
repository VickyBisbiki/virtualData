var percentagesLoad = (function(){

        var percentage = {};
        //var group = new THREE.Object3D();//create an empty container
        //var pivotA_001 = new THREE.Object3D();
        //var meshPercentage001;


        percentage.initPercentage_01 = function (scene, xpos, ypos, zpos, stringNum, name) {

          var loaderPercentage01 = new THREE.FontLoader();
          var geometryPercentage001;





          var meshPercentage001;

          var materialPercentage = new THREE.MultiMaterial( [
              new THREE.MeshPhongMaterial( { color: "#2daa56" , shading: THREE.SmoothShading, wireframe:false } ), // front
              new THREE.MeshPhongMaterial( { color: "#2daa56" , shading: THREE.SmoothShading, wireframe:false } ) // side
          ] );

          loaderPercentage01.load( 'fonts/helvetiker_regular.typeface.js', function ( font ) {

                geometryPercentage001 = new THREE.TextGeometry( stringNum, {
                  font: font,
                  size: 1.04,
                  height: 0.001,
                  curveSegments: 8,
                  bevelEnabled: true,
                  bevelThickness: 0.1,
                  bevelSize: 0.05,
                  bevelSegments: 2
                } );

                geometryPercentage001.computeBoundingBox();
                var textWidth001 = geometryPercentage001.boundingBox.max.x - geometryPercentage001.boundingBox.min.x;

                meshPercentage001 = new THREE.Mesh( geometryPercentage001, materialPercentage );
                meshPercentage001.position.set( -0.5 * textWidth001, 0, 60 );//left-rt/high/far
                meshPercentage001.name = name;


                //console.log(percentage.meshPercentage001);

                // meshPercentage001.position.set( -3.6, 0.82, 7.95);
                // meshPercentage001.rotation.set( 0 , -1.7, 0);
                meshPercentage001.position.set( xpos, ypos, zpos);
                meshPercentage001.rotation.set( 0 , -1.2, 0);
                meshPercentage001.scale.set(0.09, 0.09, 0.09);

                // pivotA_001.position.set( -3.6, 0.7, 7.95);
                // pivotA_001.rotation.set( 0 , -1.2, 0);
                // pivotA_001.scale.set(0.09, 0.09, 0.09);

                // wifispark blue: 2db8c5
                //wifispark green: 2daa56
                //wifispark yellow: fdc300

                //pivotA_001.add( meshPercentage001 );
                scene.add(meshPercentage001);
                //scene.add( pivotA_001 );
                });

                percentage.clearPercentages = function (){
                //  meshPercentage001.rotation.y += 0.0225;
                //for (var i = 0; i < 6; i++) {
                //scene.remove(percentage.meshPercentage001);
              //}

                };

        };
        return percentage;
}());
