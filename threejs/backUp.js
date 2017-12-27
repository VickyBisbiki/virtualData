var initScene = (function(){

  var setUpScene = {};
  var dolly;

  var binormal = new THREE.Vector3();
  var normal = new THREE.Vector3();
  var lookAt;
  var pos;
  var time;
  var b_time = true;
  var countTrigCloud = 0;

  var scene = new THREE.Scene();
  //scene.fog = new THREE.FogExp2( 0xefd1b5, 0.0025 );
  var renderer = new THREE.WebGLRenderer( { antialias: true} );
  //.fog = new THREE.Fog(0xccccc, 1, 20000);
  // scene.fog = new THREE.FogExp2( 0xefd1b5, 0.0025 );
  //  scene.fog.color.setHSL( 0.51, 0.6, 0.6 );
  // renderer.setClearColor( 0xefd1b5 );
  renderer.setPixelRatio( window.devicePixelRatio );
  //renderer.setClearColor(0x000000, 1);
  //renderer.setSize( window.innerWidth, window.innerHeight );
  //renderer.autoClear = true;
  document.body.appendChild( renderer.domElement );
  //document.body.style.background = "linear-gradient(to bottom, #ffffff -20%,#000000 50%,#ffffff 180%)";

  skyShader.renderSky(scene);
  var camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.001, 2000000 );
  //var splineCamera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.3, 10000 );
  var controls = new THREE.VRControls( camera );
  controls.standing = true;
  var effect = new THREE.VREffect( renderer );
  effect.setSize( window.innerWidth, window.innerHeight );
  // Create a VR manager helper to enter and exit VR mode.
  var manager = new WebVRManager( renderer, effect, { hideButton: false, isUndistorted: false } );

  var boxGeometry = new THREE.BoxGeometry( 0.1, 0.1, 0.1 );
  var materialTexts = new THREE.MultiMaterial( [
      new THREE.MeshPhongMaterial( { color: "#2db8c5" , shading: THREE.FlatShading } ), // front
      new THREE.MeshPhongMaterial( { color: "#2db8c5" , shading: THREE.SmoothShading } ) // side
  ] );
  var cube00;
  var cube0;
  var cube2;
  var cube003;

  var cubeStart;
  var planeInstractions;

  var arrowObj = new THREE.Object3D();
  var loaderarrow = new THREE.ObjectLoader();
  var lightInstractions;
  var lightRingOrbit;

  function addMeshStart(){

    planeInstractions();

    cubeStart = new THREE.Mesh(new THREE.TorusGeometry( 10.12, 2.32, 16, 60), new THREE.MeshLambertMaterial({ color: 0xfdc300 }));
    cubeStart.position.set(250, -40, -200);
    cubeStart.rotation.set(0, 90, 0);

    lightInstractions = new THREE.PointLight( 0xffffff, 1.2, 1000 );
    lightInstractions.position.set( 40, 20, 0 );
    scene.add( lightInstractions );

    // var sphereSize = 10;
    // var pointLightHelper = new THREE.PointLightHelper( lightInstractions, sphereSize );
    // scene.add( pointLightHelper );

    Reticulum.add( cubeStart, {
        onGazeOver: function(){

        },
        onGazeOut: function(){

          console.log("start");
          addMeshDataParticles();
          addMeshMoveDown();
          Reticulum.remove(cubeStart);
          scene.remove(cubeStart);
          scene.remove(planeInstractions);
          scene.remove(lightInstractions);

      }
    });
      scene.add( cubeStart );
  }

function addMeshBeginAgain(){

  cube003 = new THREE.Mesh(new THREE.TorusGeometry( 0.086, 0.02, 16, 60), new THREE.MeshLambertMaterial({ color: 0xfdc300 }));
  cube003.position.set(-6, 1.1, 9);
  cube003.rotation.set(0, 5, 0);

  Reticulum.add( cube003, {
      onGazeOver: function(){

      },
      onGazeOut: function(){
        tweenCam03();
    }
  });
    scene.add( cube003 );
}

function addMeshMoveToOrbit(){

  cube2 = new THREE.Mesh(new THREE.TorusGeometry( 0.05, 0.009, 16, 60 ), new THREE.MeshLambertMaterial({ color: 0xfdc300 }));
  cube2.position.set(-2.2, 1.2, 8.1);
  cube2.rotation.set(0, 89.3, 0);

  lightRingOrbit = new THREE.PointLight( 0xffffff, 1, 0.6 );
  lightRingOrbit.position.set( -2.5, 1.2, 8.0 );
  scene.add( lightRingOrbit );

  //  var sphereSize = 0.1;
  //  var pointLightHelper = new THREE.PointLightHelper( lightRingOrbit, sphereSize );
  //  scene.add( pointLightHelper );

         Reticulum.add( cube2, {
             onGazeOver: function(){

             },
             onGazeOut: function(){
               tweenCam02();
           }
         });
           scene.add( cube2 );

}
function addMeshMoveDown(){


    cube0 = new THREE.Mesh(new THREE.TorusGeometry( 0.1, 0.018, 16, 60), new THREE.MeshLambertMaterial({ color: 0xfdc300 }));
    cube0.position.set(-3.6, 0.7, 7.1);
    cube0.rotation.set(90, 0, 0);


           Reticulum.add( cube0, {
               onGazeOver: function(){

               },
               onGazeOut: function(){
                  tweenCam01();
             }
           });
             scene.add( cube0 );

}
function generateData(xPosStart, zPosStart, xPosEnd, zPosEnd){

       dataPoints.xPosStart = xPosStart;
       dataPoints.yPosStart = 0.7;
       dataPoints.zPosStart = zPosStart;

       dataPoints.xPosEnd = xPosEnd;
       dataPoints.yPosEnd = 0.7;
       dataPoints.zPosEnd = zPosEnd;

      dataPoints.init(scene);
      countTrigCloud += 1;

}

function addMeshDataParticles() {

    var loader = new THREE.FontLoader();
    var geometryTextGeneratData;
    var meshTextGenerateData;

    loader.load( 'fonts/helvetiker_regular.typeface.js', function ( font ) {

          geometryTextGeneratData = new THREE.TextGeometry( 'data', {
            font: font,
            size: 1.1,
            height: 0.001,
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: 0.4,
            bevelSize: 0.01,
            bevelSegments: 3
          } );
          meshTextGenerateData = new THREE.Mesh( geometryTextGeneratData, materialTexts );
          //meshTextGenerateData.position.set( 30 , 4 , -25);
            meshTextGenerateData.position.set( -10 , 3.5 , -1);
          //meshTextGenerateData.rotation.set( 0 , -88.9, 0);
            meshTextGenerateData.rotation.set( 0 , 0.4, 0);

          Reticulum.add( meshTextGenerateData, {
              onGazeOver: function(){
                    clearPointCloud();


              },
              onGazeOut: function(){
                tweenData1();
                Reticulum.remove( meshTextGenerateData );
                scene.remove( meshTextGenerateData );

        		  }

            });
    scene.add( meshTextGenerateData );
  });
}

//tweenData1();
function tweenData1() {

    var tweenData01 = new TWEEN.Tween()
        .onUpdate(function () {

        })
        .onComplete(function () {
          for (var i = 0; i < 3; i++) {
             generateData(-2.7, 7, -2.7+THREE.Math.randFloatSpread(5),  7 - THREE.Math.randFloatSpread(5));
          }

          });

        var tweenData02 = new TWEEN.Tween()
            .delay(7000)
            .onUpdate(function () {
            })
            .onComplete(function () {
              for (var i = 0; i < 3; i++) {
                generateData(-2.7+THREE.Math.randFloatSpread(5), 7-THREE.Math.randFloatSpread(6), -2.7+THREE.Math.randFloatSpread(4), 7 - THREE.Math.randFloatSpread(6));

              }

             });

        var tweenData03 = new TWEEN.Tween()
                .delay(15000)
                .onUpdate(function () {
                })
                .onComplete(function () {
                  for (var i = 0; i < 3; i++) {
                    generateData(-2.7+THREE.Math.randFloatSpread(5), 7-THREE.Math.randFloatSpread(6), -2.7+THREE.Math.randFloatSpread(4), 7 - THREE.Math.randFloatSpread(6));
                  }

                });

        var tweenData04 = new TWEEN.Tween()
                  .delay(20000)
                  .onUpdate(function () {
                  })
                  .onComplete(function () {
                    for (var i = 0; i < 3; i++) {
                      generateData(-2.7+THREE.Math.randFloatSpread(5), 7-THREE.Math.randFloatSpread(6), -2.7+THREE.Math.randFloatSpread(4), 7 - THREE.Math.randFloatSpread(6));
                      //
                    }
                    addMeshDataParticles();
                   });

        tweenData01.start();
        tweenData02.start();
        tweenData03.start();
        tweenData04.start();
}

function tweenCam03() {

      var to = {
            x: -1.1,
            y: -0.3,
            z: 8.5
          };
      var to5 = {
            x : -6,
            y : 0.8,
            z : 9
              };
    var tween05 = new TWEEN.Tween(to)
        .to(to5,12000)
        //.to(to2,3000)
        .easing(TWEEN.Easing.Exponential.Out)
        .onUpdate(function () {
          dolly.position.set(this.x, this.y, this.z);
          //app.camera.lookAt(new THREE.Vector3(0,0,0));
          //app.camera.lookAt(new THREE.Vector3(0,0,0));
        })
        .onComplete(function () {

          addMeshMoveDown();

        });

        tween05.start();
        Reticulum.remove( cube003 );
        scene.remove( cube003 );
        //scene.remove( meshTextGenerateData );
    //    clearPointCloud();
}
function tweenCam02() {

          var to = {
                  x : -4,
                  y : -0.8,
                  z : 7
              };
          var to3 = {
                    x : -2.6,
                    y : -0.9,
                    z : 8.4
                  };
          var to4 = {
              x: -1.1,
              y: -0.3,
              z: 8.5
          };
        var tween03 = new TWEEN.Tween(to)
            .to(to3,14000)
            //.to(to3,3000)
            .easing(TWEEN.Easing.Exponential.Out)
            .onUpdate(function () {
              dolly.position.set(this.x, this.y, this.z);
            })
            .onComplete(function () {

            });
            var tween04 = new TWEEN.Tween(to3)
                .to(to4,15000)
                //.to(to4,3000)
                .easing(TWEEN.Easing.Exponential.Out)
                .onUpdate(function () {
                  dolly.position.set(this.x, this.y, this.z);
                })
                .onComplete(function () {
                  addMeshBeginAgain();
                  //addMeshMoveDown();
                });

            tween03.start();
            tween03.chain(tween04);
            Reticulum.remove( cube2 );
            scene.remove( cube2 );
            scene.remove(lightRingOrbit);
}
function tweenCam01() {

            var to = {
                  x : -6,
                  y : 0.8,
                  z : 9
                };
            var to2 = {
                  x : -4,
                  y : -0.8,
                  z : 7
                };
          var tween02 = new TWEEN.Tween(to)
              .to(to2,12000)
              //.to(to2,3000)
              .easing(TWEEN.Easing.Exponential.Out)
              .onUpdate(function () {
                dolly.position.set(this.x, this.y, this.z);
              })
              .onComplete(function () {
                addMeshMoveToOrbit();
              });

              tween02.start();
              Reticulum.remove( cube0 );
              scene.remove( cube0 );

}

function planeInstractions(){

  var texture;

  texture = THREE.ImageUtils.loadTexture( "assets/images/instractions.png" );

  // assuming you want the texture to repeat in both directions:
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;

  // how many times to repeat in each direction; the default is (1,1),
  //   which is probably why your example wasn't working
  texture.repeat.set( 1, 1 );

      var geometry = new THREE.PlaneGeometry( 460, 240, 32 );
      var material = new THREE.MeshLambertMaterial({ map : texture });
      //var material = new THREE.MeshBasicMaterial( {color: 0x000000, side: THREE.DoubleSide} );
      planeInstractions = new THREE.Mesh( geometry, material );
      planeInstractions.material.side = THREE.DoubleSide;
      planeInstractions.position.x = 250;
      planeInstractions.position.z = -300;
      planeInstractions.position.y = 50;
      planeInstractions.rotation.y = -95.2;

      scene.add( planeInstractions );
}


    var urlOrbit = "./models/jsonModels/modelOrbit003.json";
    var urlStadium = "./models/jsonModels/modelStadium003.json";
    var urlLinesOlypmPark = "./models/jsonModels/sceneLinesOlympicPark_08.json";
    var urlaquarium = "./models/jsonModels/modelAquarium003.json";
    //var urlArrow = "./models/jsonModels/arrow_01.json";
    buildingsLoad.initModels(urlLinesOlypmPark, urlStadium, urlOrbit, urlaquarium, scene);
  //setUpScene.init = function () {

      parent = new THREE.Object3D();
			scene.add( parent );

      Reticulum.init(camera, {
      	proximity: false,
      	clickevents: true,
      	reticle: {
      		visible: true,
      		restPoint: 350, //Defines the reticle's resting point when no object has been targeted
      		color: 0xfdc300,
      		innerRadius: 0.002,
      		outerRadius: 0.004,
      		hover: {
      			color: 0xcdcdcd,
      			innerRadius: 0.02,
      			outerRadius: 0.027,
      			speed: 5,
      			vibrate: 50 //Set to 0 or [] to disable
      		}
      	},
      	fuse: {
      		visible: false,
      		duration: 2.5,
      		color: 0xcdcdcd,
      		innerRadius: 0.045,
      		outerRadius: 0.06,
      		vibrate: 0, //Set to 0 or [] to disable
      		clickCancelFuse: false //If users clicks on targeted object fuse is canceled
      	}
      });

      dolly = new THREE.Group();
      dolly.position.x = -6;
      dolly.position.y = 0.8;
      dolly.position.z = 9;
      dolly.rotation.y = 0.2;
      //dolly.rotation.z = 0.5;
      scene.add( dolly );
      dolly.add( camera );

      addMeshStart();

        var cubeUp = new THREE.Mesh(boxGeometry, new THREE.MeshBasicMaterial({ color: 0xCC0000}));
        cubeUp.position.set(-2.2, 1.2, 8.1);
        // x: -2.42,
        // y: -0.63,
        // z: 7.59
    //    scene.add(cubeUp);



        // Buildings(urlLinesOlypmPark, urlStadium, urlOrbit, urlaquarium, scene);

          // lights
           light = new THREE.DirectionalLight( 0xffffff );
           light.position.set( 1, 1, 1 );
           scene.add( light );
          //  light = new THREE.DirectionalLight( 0x002288 );
          //  light.position.set( -1, -1, -1 );
          //  scene.add( light );
           light1 = new THREE.AmbientLight( 0x222222 );
           scene.add( light1 );


function clearPointCloud(){
          for (var j = 0; j < countTrigCloud; j++) {
              for (var i = 0; i < scene.children.length; i++) {

                  if (scene.children[i].name == "objAnimation") {

                      scene.remove(scene.children[i]);
                    }
                    }
                }

}

function handleKeyDown(event) {
              //console.log(event.keyCode);
            if (event.keyCode === 49) {
              console.log("1 key is up");
              //tween02.start();
                  clearPointCloud();

            }
            if (event.keyCode === 50) {
                  console.log("2 key is up");

            }
            if (event.keyCode === 51) {
                  console.log("3 key is up");
            }

}

function handleKeyUp(event) {
    if (event.keyCode === 66) {
      console.log("b key is down");
      tweenData1();
    }
}

setUpScene.animate = function (timestamp) {
	// *******************************
	// --- Reticulum ---
	// keep checking if user is looking at any tracked objects
	Reticulum.update();
  //renderer.clear();
	controls.update();
	camera.updateMatrixWorld(); // Required to stop ghosting - must be placed before render update
	manager.render(scene, camera, timestamp);
  TWEEN.update();
	requestAnimationFrame(setUpScene.animate);

  //cube00.rotation.y += 0.009;

}
function onWindowResize() {
	effect.setSize( window.innerWidth, window.innerHeight );
	camera.aspect = window.innerWidth / window.innerHeight;
 //  effectFXAA.uniforms['resolution'].value.set(1 / (window.innerWidth * dpr), 1 / (window.innerHeight * dpr));
 //  renderer.clear();
 // composer.setSize(window.innerWidth * dpr, window.innerHeight * dpr);
	camera.updateProjectionMatrix();
}

  window.addEventListener('keydown', handleKeyDown, false);
  window.addEventListener('keyup', handleKeyUp, false);
    window.addEventListener( 'resize', onWindowResize, false );
    window.addEventListener( 'vrdisplaypresentchange', onWindowResize, true );

        return setUpScene;
}());
