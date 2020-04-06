// variable definitions
var k = Math.PI/180;
var controls, renderer, camera, scene;
var theta1_deg=0,theta2_deg=0,theta3_deg=0;
var theta1 = k*theta1_deg,theta2 = k*theta2_deg,theta3= k*theta3_deg, theta4=0;
var step = 0.01;
var manual_controls=false;
var d1=10,d2=10,d3=10;
var x0,y0,z0;
var arrowHelper=[];
finger=[];
var size = 1000;
var divisions = 100;
init();
animate();

			
function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000 );
    camera.position.z=60;

    // the reference plane
    var gridHelper = new THREE.GridHelper( size, divisions );

    // the first articulation
    geometry_a0 = new THREE.CylinderGeometry(3.5,6,2,32);
    material_a0 = new THREE.MeshBasicMaterial({ color: 0xD5DADB });
    articulation_0 = new THREE.Mesh(geometry_a0, material_a0 );
    
    // the first segment
    geometry_s1 = new THREE.CylinderGeometry( 1.6,1.5,d1,64);
    material_s1 = new THREE.MeshBasicMaterial( { color : 0xD8A950});
    segment_1 = new THREE.Mesh( geometry_s1, material_s1 );
    
    // the second articulation
    geometry_a1 = new THREE.SphereGeometry(2,64,64);
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
    geometry_a2 = new THREE.SphereGeometry(1.5,64,64);
    material_a2 = new THREE.MeshBasicMaterial({color : 0xD5DADB });
    articulation_2 = new THREE.Mesh(geometry_a2,material_a2);

    // fourth articulation
    geometry_a4 = new THREE.SphereGeometry(1.2,64,64);
    material_a4 = new THREE.MeshBasicMaterial({color : 0xD5DADB });
    articulation_4 = new THREE.Mesh(geometry_a4,material_a4);

    // fingers
    finger_g = new THREE.CylinderGeometry(0.05,0.3,3,64);
    finger_mat = new THREE.MeshBasicMaterial({color: 0xD5DADB });
    
    for (i=0;i<3;i++){
        finger.push(new THREE.Mesh(finger_g,finger_mat));
    }

    // draw xyz reference
    var origin = new THREE.Vector3( 15, 15, 15 );
    var length = 10;
    var hex = 0xffff00; 

   
    scene.add( gridHelper );

    var dir = [ new THREE.Vector3( -1, 0, 0 ),
                new THREE.Vector3( 0, 1, 0 ),
                new THREE.Vector3(0, 0, 1 )]

    //normalize the direction vector (convert to vector of length 1)
    index=0;
    dir.forEach(( element, index )=> {
       element.normalize()
       arrowHelper.push(new THREE.ArrowHelper( element, origin, length, hex+index*200 ));
    });


    


    // define the relative relationship of objects
    
    gridHelper.add(articulation_0);
    arrowHelper.forEach(element => {
        gridHelper.add(element)
    });
   // reference_plane.add(arrowHelper)
    articulation_0.add(segment_1);
    segment_1.add(articulation_1);
    articulation_1.add(segment_2);
    segment_2.add(articulation_2);
    articulation_2.add(segment_3);
    segment_3.add(articulation_4);

    finger.forEach(element => {
        articulation_4.add(element);
    });
    
    
    // initial positions/rotations
    gridHelper.position.set(0,-10,0);
    articulation_0.position.set(0,1,0);
    segment_1.position.set(0,5,0);
    articulation_1.position.set(0,5,0);
    segment_2.position.set(0,5,0);
    articulation_2.position.set(0,5,0);
    segment_3.position.set(0,5,0);
    articulation_4.position.y=5;

    finger[0].position.y=1;
    finger[0].rotation.z=-theta4;
    finger[1].position.y=1;
    finger[1].rotation.x=-theta4;
    finger[2].rotation.x=theta4;
    finger[2] .position.y=1;
    finger[0].position.x=1;
    finger[1].position.x=-0.5;
    finger[1].position.z=-Math.sqrt(3)/2;
    finger[2].position.x=-0.5;
    finger[2].position.z=Math.sqrt(3)/2;


    // background color
    scene.background = new THREE.Color(0x0);
    
    // add the referene_plane which is the root parent of all objects (children will be added automatically)
    scene.add(gridHelper);
    
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
        if(articulation_1.rotation.z<=theta2-step || articulation_1.rotation.z>=theta2+step) {
            if(articulation_1.rotation.z>theta2+step){
                articulation_1.rotation.z-=step;
            }
            else if (articulation_1.rotation.z<theta2) {
                articulation_1.rotation.z+=step;
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
        if(articulation_2.rotation.z<=theta3-step || articulation_2.rotation.z>=theta3+step){
            if(articulation_2.rotation.z>theta3+step) {
            articulation_2.rotation.z-=step;
            } 
        else if(articulation_2.rotation.z<theta3-step) {
                articulation_2.rotation.z+=step;
            }
        }
        finger[0].rotation.z=-theta4;
        finger[1].rotation.x=-theta4;
        finger[2].rotation.x=theta4;
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
        articulation_1.rotation.z+=5*step/3;
        break;
    case 'ArrowLeft':
        articulation_2.rotation.z+=5*step/3;
        break;
    case 'ArrowUp':
        articulation_1.rotation.z-=5*step/3;
        break;
    case 'ArrowRight':
        articulation_2.rotation.z-=5*step/3;
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
            articulation_1.rotation.z+=5*step/3;
            break;
        case 'ArrowLeft':
            articulation_2.rotation.z+=5*step/3;
            break;
        case 'ArrowUp':
            articulation_1.rotation.z-=5*step/3;
            break;
        case 'ArrowRight':
            articulation_2.rotation.z-=5*step/3;
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
function arcTan(term1,term2) {
    var theta=Math.atan(Math.abs(term1/term2));
    if(term1<0 && term2>0)
    theta = -theta;
    else if(term1>0 && term2<0)
        theta = Math.PI -theta;
    else if(term1<0 && term2<0)
        theta=theta+Math.PI;
    return theta
}
function getInputValue_position(){
    x0 = document.getElementById("x_0").value;
    y0 = document.getElementById("y_0").value;
    z0 = document.getElementById("z_0").value;
    x=z0-d1;
    y=Math.sqrt(x0*x0+y0*y0);
    var term0= (x*x+y*y-(d3*d3+d2*d2))/(2*d2*d3);
    if(term0>1){
        alert("angles cannot be calculated by mathematical model used, enter another point")
        return
    }
    theta3 = Math.acos(term0);
    var term1,term2;
    theta1=arcTan(y0,x0);
    
    //theta2=0;

    //if (x0>=0){
    term1=(y*(d2+d3*Math.cos(theta3))-x*d3*Math.sin(theta3));
    term2=(x*(d2+d3*Math.cos(theta3)) + y*d3*Math.sin(theta3));
/*p=}
    
    else {
        x=-x;
        term1=(y*(d2+d3*Math.cos(theta3))-x*d3*Math.sin(theta3));
        term2=(x*(d2+d3*Math.cos(theta3)) + y*d3*Math.sin(theta3));
        theta2=Math.PI/2;
    }*/
    theta2=arcTan(term1,term2)
    


    console.log("term0 : "+term0+" term1 "+term1+" term2 "+term2)
    console.log("theta1: "+theta1/k+" theta2 "+theta2/k+" theta3 "+theta3/k)
}
