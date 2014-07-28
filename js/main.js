/**
 * Constants
 */
var STARS_PER_FRAME = 2;
var FIELD_OF_VIEW = 1000;

/**
 * Scene variables
 */
var sound = new Sound();
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, FIELD_OF_VIEW);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var geometry = new THREE.CircleGeometry(2, 12);
camera.position.z = 5;

function render() {
    stats.begin();

    requestAnimationFrame(render);
    renderer.render(scene, camera);

    // zoom out camera
    camera.position.z += 1;

    // remove far away objects from scne
    scene.children.forEach(function(object) {
        if ((camera.position.z - object.position.z) > FIELD_OF_VIEW) {
            scene.remove(object);
        }
    });

    // add stars to scene
    for (var i = 0; i < STARS_PER_FRAME; i++) {
        var material = new THREE.MeshBasicMaterial({
            color: 0xffffff
        });
        var circle = new THREE.Mesh(geometry, material);
        circle.position.set(Math.floor(Math.random() * window.innerWidth) - window.innerWidth / 2, Math.floor(Math.random() * window.innerHeight) - window.innerHeight / 2, camera.position.z - 1);
        if (Math.random() < 0.01) {
            sound.playNote(0.10);
        }
        circle.material.color.setRGB(Math.random(), Math.random(), Math.random());
        scene.add(circle);
    }

    stats.end();
}

/**
 * Stats
 */
var stats = new Stats();
stats.setMode(0);
stats.domElement.style.position = 'absolute';
stats.domElement.style.left = '0px';
stats.domElement.style.top = '0px';
stats.domElement.style.display = 'none';

document.onkeypress = function onKeyPress(e) {
    e = e || window.event;
    if (e.keyCode == 100) {
        if (stats.domElement.style.display === 'none') {
            stats.domElement.style.display = 'block';
        } else {
            stats.domElement.style.display = 'none';
        }
    }
}
document.body.appendChild(stats.domElement);

render();
