var buildingsLoad = (function(){

        var modelsLoad = {};
        var group = new THREE.Object3D();//create an empty container

        modelsLoad.initModels = function (urlLinesOlypmPark, urlStadium, urlOrbit, urlaquarium, sceneModels) {

            var loader = new THREE.ObjectLoader();
            loader.load(urlLinesOlypmPark,function ( obj ) { // kanoniko modelo exported apo editor san Object

             for (var i = 0; i < obj.children[2].children.length; i++) {
                  obj.children[2].children[i].material = new THREE.MeshBasicMaterial({color: 0xffffff});
                }
                for (var i = 0; i < obj.children[3].children.length; i++) {
                     obj.children[3].children[i].material = new THREE.MeshBasicMaterial({color: 0xffffff});
                   }
                   for (var i = 0; i < obj.children[4].children.length; i++) {
                        obj.children[4].children[i].material = new THREE.MeshBasicMaterial({color: 0xffffff});
                      }
                      obj.remove(obj.children[4]);
                      group.add( obj );//add a mesh with geometry to it

            });
            var loaderStadium = new THREE.ObjectLoader();
                loaderStadium.load(urlStadium,function ( obj ) {
                  obj.scale.x = obj.scale.y = obj.scale.z = 0.0032;
                  obj.position.set(0.25, -2.16, 6.73);
                  obj.material.side = THREE.DoubleSide;
                  obj.material.color.setHex( 0x507483); // Hexadecimal color
                  obj.material.shading = THREE.SmoothShading; // Hexadecimal color
                  group.add( obj );
            });
            var loaderOrbit = new THREE.ObjectLoader();
                loaderOrbit.load(urlOrbit,function ( obj ) {
                  obj.scale.x = obj.scale.y = obj.scale.z = 0.0043;
                  obj.material.side = THREE.DoubleSide;
                  obj.material.color.setHex( 0x507483);
                  obj.material.specular.setHex(0xe8e4e3);
                  obj.material.shininess = 1;
                  group.add( obj );
            });
            var loaderAquarium = new THREE.ObjectLoader();
            loaderAquarium.load(urlaquarium,function ( obj ) {
                group.add( obj );
            });



            group.rotation.z = -Math.PI/2;
            group.position.y = 0.6; // was -1
            sceneModels.add( group );
        };
        return modelsLoad;
}());
