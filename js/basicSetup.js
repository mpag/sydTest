//////////	
// MAIN //
//////////

// standard global variables
var container, scene, camera, renderer, controls, stats;
// var keyboard = new THREEx.keyboardstate();
var clock = new THREE.Clock();

// custom global variables
var cube;
var counter

// initialization
init();

// animation loop
animate();



///////////////
// FUNCTIONS //
///////////////
			
function init() 
{
	// SCENE
	scene = new THREE.Scene();

	//////// CAMERA //////////
	var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
	// camera attributes
	var VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.1, FAR = 100000;
	camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);

	// new THREE.OrthographicCamera( SCREEN_WIDTH / - 2, SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2, SCREEN_HEIGHT / - 2, 0.1, 100000 )


	scene.add(camera);
	camera.position.set(24,30,-107);
	camera.lookAt(camera.position);
	
	///////// RENDERER /////////
	if ( Detector.webgl )
		renderer = new THREE.WebGLRenderer( {antialias:true} );
	else
		renderer = new THREE.CanvasRenderer();
	
	renderer.shadowMapEnabled = true;
	// renderer.shadowMapType = THREE.PCFSoftShadowMap;
	renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
	container = document.getElementById( 'ThreeJS' );
	container.appendChild( renderer.domElement );
	
	////////// EVENTS //////////
	// automatically resize renderer
	THREEx.WindowResize(renderer, camera);
	
	///////// CONTROLS /////////
	controls = new THREE.OrbitControls( camera, renderer.domElement );

	////////// LIGHT /////////

	var light = new THREE.SpotLight(0xffffff);
	light.position.set(0,50,0);
	light.castShadow = true;
	scene.add(light);
	var ambientLight = new THREE.AmbientLight(0x111111,1.5);
	scene.add(ambientLight);

	//////// GEOMETRY /////////

	var onProgress = function ( xhr ) {
		if ( xhr.lengthComputable ) {
			var percentComplete = xhr.loaded / xhr.total * 100;
			console.log( Math.round(percentComplete, 2) + '% downloaded' );
		}
	};

	var onError = function ( xhr ) {
	};

	var manager = new THREE.LoadingManager();
	manager.onProgress = function ( item, loaded, total ) {
		console.log( item, loaded, total );
	};

	var loader = new THREE.OBJLoader( manager );
	loader.load( 'meshRoof.obj', function ( object ) {
		object.position.x = 10;
		object.position.z = 35;
		object.id = "roof";
		object.receiveShadow = true;
		object.castShadow = true;
		scene.add( object );
		console.log("go");
	}, onProgress, onError );


	//Materials
	var imgTexture = new THREE.ImageUtils.loadTexture( "UV.jpg" );
	imgTexture.wrapS = imgTexture.wrapT = THREE.RepeatWrapping;
	var imgBumpTexture = new THREE.ImageUtils.loadTexture( "UV.jpg" );
	imgBumpTexture.wrapS = imgBumpTexture.wrapT = THREE.RepeatWrapping;
	var material = new THREE.MeshPhongMaterial( { diffuse: 0xFFFFFF, bumpMap: imgBumpTexture, bumpScale: 0.01, side: THREE.DoubleSide});

	//Geom Definition
	var geometryTerrain = new THREE.PlaneGeometry( 2800, 2800, 256, 256 );
	terrain = new THREE.Mesh( geometryTerrain, material );
	terrain.rotation.x = Math.PI / -2;
	terrain.receiveShadow = true;
	terrain.castShadow = true;


	//Addition to Scene
	scene.add(terrain);	


	//////// SKY /////////////

	// var skyBoxGeometry = new THREE.CubeGeometry( 20000, 20000, 20000 );
	// var skyBoxMaterial = new THREE.MeshStandardMaterial( { diffuse: 0xFFFFFF, side: THREE.DoubleSide});
	// skyBox = new THREE.Mesh( skyBoxGeometry, skyBoxMaterial );
	// scene.add(skyBox);
	scene.fog = new THREE.FogExp2( 0x000000, 0.0085 );
}


function animate() 
{
    requestAnimationFrame( animate );	
	render();		
	update();
}


function update()
{
	// delta = change in time since last call (in seconds)
	var delta = clock.getDelta(); 
	// terrain.rotation.z += 0.005;
	// skyBox.rotation.z += -0.005;
	// skyBox.rotation.x += -0.005;



	// for (var i = 0 ; i < (cubes.length) ; i++){
	// 	var num1 = Math.random()*(0.05-0.001)+0.001;
	// 	var num2 = Math.random()*(0.05-0.001)+0.001;
	// 	var num3 = Math.random()*(0.05-0.001)+0.001;
	// 	// object.rotation.z += num1;
	// 	// object.rotation.x += num2;
	// 	// object.rotation.y += num3;
	// };

	// // functionality provided by THREEx.KeyboardState.js
	// if ( keyboard.pressed("1") )
	// 	document.getElementById('message').innerHTML = ' Have a nice day! - 1';	
	// if ( keyboard.pressed("2") )
	// 	document.getElementById('message').innerHTML = ' Have a nice day! - 2 ';	

	controls.update();
	// stats.update();
}


function render() 
{	
	renderer.render( scene, camera );
}