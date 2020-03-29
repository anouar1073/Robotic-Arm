// variable definitions
var k = Math.PI/180;
var controls, renderer, camera, scene;
var reference_plane,articulation_0,articulation_1,segment_1,segment_2;
var theta1_deg=0,theta2_deg=45,theta3_deg=45;
var theta1 = k*theta1_deg,theta2 = k*theta2_deg,theta3= k*theta3_deg, theta4=0;
var step = 0.01;
var manual_controls=false;
var d1=10,d2=10,d3=10;
var x0,y0,z0;

init();
animate();

			
function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000 );
    camera.position.z=50;

    // the reference plane
    geometry_ref = new THREE.BoxGeometry( 400,0,400);
    material_ref = new THREE.MeshBasicMaterial( { color: 0x634BAB });
    reference_plane = new THREE.Mesh( geometry_ref, material_ref );

    // the first articulation
    geometry_a0 = new THREE.CylinderGeometry(3.5,6,3,32);
    material_a0 = new THREE.MeshBasicMaterial({ color: 0xD5DADB });
    articulation_0 = new THREE.Mesh(geometry_a0, material_a0 );
    
    // the first segment
    geometry_s1 = new THREE.CylinderGeometry( 1.6,1.5,d1,64);
    material_s1 = new THREE.MeshBasicMaterial( { color : 0xD8A950});
    segment_1 = new THREE.Mesh( geometry_s1, material_s1 );
    
    // the second articulation
    geometry_a1 = new THREE.CylinderGeometry(1.5,1.5,4,64);
    material_a1 = new THREE.MeshBasicMaterial({ color: 0xD5DADB});
    articulation_1 = new THREE.Mesh(geometry_a1,material_a1);

    // the second segment
    geometry_s2 = new THREE.CylinderGeometry( 1,1.5,d2,64);
    material_s2 = new THREE.MeshBasicMaterial( { color : 0xD8A950});
    segment_2 = new THREE.Mesh( geometry_s2, material_s2 );
    
    // the third segment
    geometry_s3 = new THREE.CylinderGeometry( 0.8,1,d3,64);
    material_s3 = new THREE.MeshBasicMaterial({ color : 0xD8A950 });
    segment_3 = new THREE.Mesh( geometry_s3, material_s3 );

    // thrid articulation
    geometry_a2 = new THREE.CylinderGeometry(1,1,3,64);
    material_a2 = new THREE.MeshBasicMaterial({color : 0xD5DADB });
    articulation_2 = new THREE.Mesh(geometry_a2,material_a2);

    // fourth articulation
    geometry_a4 = new THREE.SphereGeometry(1.2,64,64);
    material_a4 = new THREE.MeshBasicMaterial({color : 0xD5DADB });
    articulation_4 = new THREE.Mesh(geometry_a4,material_a4);

    // five articulation
    finger1_g = new THREE.CylinderGeometry(0.05,0.3,3,64);
    finger1_mat = new THREE.MeshBasicMaterial({color: 0xD5DADB });
    finger1 = new THREE.Mesh(finger1_g,finger1_mat);
    
    // six articulation
    finger2_g = new THREE.CylinderGeometry(0.05,0.3,3,64);
    finger2_mat = new THREE.MeshBasicMaterial({color: 0xD5DADB });
    finger2 = new THREE.Mesh(finger2_g,finger2_mat);
    
    // seven articulation
    finger3_g = new THREE.CylinderGeometry(0.05,0.3,3,64);
    finger3_mat = new THREE.MeshBasicMaterial({color: 0xD5DADB });
    finger3 = new THREE.Mesh(finger3_g,finger3_mat);

    // define the relative relationship of objects
    
    reference_plane.add(articulation_0);
    articulation_0.add(segment_1);
    segment_1.add(articulation_1);
    articulation_1.add(segment_2);
    segment_2.add(articulation_2);
    articulation_2.add(segment_3);
    segment_3.add(articulation_4);
    articulation_4.add(finger1);
    articulation_4.add(finger2);
    articulation_4.add(finger3);

    // initial positions/rotations
    reference_plane.position.set(0,-12,0);
    articulation_0.position.set(0,0.5,0);
    segment_1.position.set(0,5,0);
    articulation_1.position.set(0,5,0);
    segment_2.position.set(0,0,-5);
    articulation_2.position.set(0,5,0);
    segment_3.position.set(0,0,-5);
    articulation_4.position.y=5;
    finger1.position.y=1;
    finger1.rotation.z=-theta4;
    finger2.position.y=1;
    finger2.rotation.x=-theta4;
    finger3.rotation.x=theta4;
    finger3.position.y=1;
    finger1.position.x=1;
    finger2.position.x=-0.5;
    finger2.position.z=-Math.sqrt(3)/2;
    finger3.position.x=-0.5;
    finger3.position.z=Math.sqrt(3)/2;



    articulation_1.rotation.x=k*90;
    articulation_2.rotation.x=k*90;

    segment_2.rotation.x=-k*90;
    segment_3.rotation.x=-k*90;

    // background color
    scene.background = new THREE.Color(0x0);
    
    // add the referene_plane which is the root parent of all objects (children will be added automatically)
    scene.add(reference_plane);

    // create the renderer
    renderer = new THREE.WebGLRenderer({antiaslias:true});
    renderer.setSize( window.innerWidth/1.3, window.innerHeight );
    document.getElementById('renderer_div').appendChild( renderer.domElement );
    controls = new THREE.TrackballControls(camera,renderer.domElement);
    controls.addEventListener('change',render);
    }
    
function animate() {

    requestAnimationFrame( animate );
    controls.update();
    renderer.render( scene, camera );
    if(manual_controls == false) {
        if(articulation_1.rotation.y<=theta2-step || articulation_1.rotation.y>=theta2+step) {
            if(articulation_1.rotation.y>theta2+step){
                articulation_1.rotation.y-=step;
            }
            else if (articulation_1.rotation.y<theta2) {
                articulation_1.rotation.y+=step;
            }
        
        }
        if(articulation_0.rotation.y<=theta1-step || articulation_0.rotation.y>=theta1+step){
            if(articulation_0.rotation.y>theta1+step) {
            articulation_0.rotation.y-=step;
            } 
            else if(articulation_0.rotation.y<theta1-step) {
                articulation_0.rotation.y+=step;
            }
        }
        if(articulation_2.rotation.y<=theta3-step || articulation_2.rotation.y>=theta3+step){
            if(articulation_2.rotation.y>theta3+step) {
            articulation_2.rotation.y-=step;
            } 
        else if(articulation_2.rotation.y<theta3-step) {
                articulation_2.rotation.y+=step;
            }
        }
        finger1.rotation.z=-theta4;
        finger2.rotation.x=-theta4;
        finger3.rotation.x=theta4;
    }
}
    
    
function render() {
    renderer.render(scene,camera);
}
    
document.addEventListener('keyup', (e) => {
switch(e.code){
    case 'KeyR' :
        controls.reset();
        break;
    case 'KeyT' :
        articulation_0.rotation.y-=5*step/3;
        break;
    case 'KeyY':
        articulation_0.rotation.y+=5*step/3;
        break;
    case 'ArrowDown':
        articulation_1.rotation.y+=5*step/3;
        break;
    case 'ArrowLeft':
        articulation_2.rotation.y+=5*step/3;
        break;
    case 'ArrowUp':
        articulation_1.rotation.y-=5*step/3;
        break;
    case 'ArrowRight':
        articulation_2.rotation.y-=5*step/3;
        break;
    case 'KeyM':
        if(manual_controls==false)
            manual_controls=true;
        else
            manual_controls=false;
        break;

        }
                                    
    });
document.addEventListener('keydown', (e) => {
    switch(e.code){
        case 'KeyT' :
            articulation_0.rotation.y-=5*step/3;
            break;
        case 'KeyY':
            articulation_0.rotation.y+=5*step/3;
            break;
        case 'ArrowDown':
            articulation_1.rotation.y+=5*step/3;
            break;
        case 'ArrowLeft':
            articulation_2.rotation.y+=5*step/3;
            break;
        case 'ArrowUp':
            articulation_1.rotation.y-=5*step/3;
            break;
        case 'ArrowRight':
            articulation_2.rotation.y-=5*step/3;
            break;
    }	                           
});
function getInputValue1(){ 
    var theta1_local = document.getElementById("theta1").value;
    theta1=k*theta1_local;
    var theta2_local = document.getElementById("theta2").value;
    theta2=theta2_local *k;
    var theta3_local = document.getElementById("theta3").value;
    theta3=k*theta3_local;
    var theta4_local = document.getElementById("theta4").value;
    theta4=theta4_local*k;
}
function getInputValue_position(){
    x0 = document.getElementById("x_0").value;
    y0 = document.getElementById("y_0").value;
    z0 = document.getElementById("z_0").value;
    x=z0-d1;
    y=Math.sqrt(x0*x0+y0*y0);
    var term0= (x*x+y*y-(d3*d3+d2*d2))/(2*d2*d3);
    theta3 = Math.acos(term0);
    var term1,term2;
    theta1=Math.atan(y0/x0);
    theta2=0;
    if (x0>0){
    term1=(y*(d2+d3*Math.cos(theta3))-x*d3*Math.sin(theta3));
    term2=(x*(d2+d3*Math.cos(theta3)) + y*d3*Math.sin(theta3));
    }
    else {
        x=-x;
        term1=(y*(d2+d3*Math.cos(theta3))-x*d3*Math.sin(theta3));
        term2=(x*(d2+d3*Math.cos(theta3)) + y*d3*Math.sin(theta3));
        theta2=Math.PI/2;
    }
    theta2=theta2+Math.atan(term1/term2);
}
