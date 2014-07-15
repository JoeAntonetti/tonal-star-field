var STARS_PER_FRAME = 10;
var FIELD_OF_VIEW = 400;

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, FIELD_OF_VIEW);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var geometry = new THREE.CircleGeometry(1, 15);
var material = new THREE.MeshBasicMaterial({
	color: 0xffffff
});
camera.position.z = 5;

function render() {
	requestAnimationFrame(render);
	renderer.render(scene, camera);

	// zoom out camera
	camera.position.z += 1;

	// remove far away objects from scne
	scene.children.forEach(function(object){
		if ((camera.position.z - object.position.z) > FIELD_OF_VIEW) {
			scene.remove(object);
		}
	});

	// add stars to scene
	for (var i = 0; i < STARS_PER_FRAME; i++) {
		var circle = new THREE.Mesh(geometry, material);
		circle.position.set(Math.floor(Math.random() * window.innerWidth) - window.innerWidth / 2, Math.floor(Math.random() * window.innerHeight) - window.innerHeight / 2, camera.position.z);
		scene.add(circle);
	}
}
render();
