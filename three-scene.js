// Three.js product showcase. A stylized sneaker is built from 3D geometry.
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';

function makeSneaker(scene, color=0xd9dfd0) {
  const group=new THREE.Group();
  const mat=(c,rough=.72)=>new THREE.MeshStandardMaterial({color:c,roughness:rough,metalness:.02});
  const soleMat=mat(0xf4f1e8), upperMat=mat(color), trimMat=mat(0xb5b9a8), laceMat=mat(0xfaf9f2);
  const sole=new THREE.Mesh(new THREE.BoxGeometry(3.25,.34,1.18),soleMat);sole.position.set(0,-.48,0);group.add(sole);
  const mid=new THREE.Mesh(new THREE.BoxGeometry(3.05,.17,1.12),mat(0xd3d4c8));mid.position.set(0,-.27,0);group.add(mid);
  const body=new THREE.Mesh(new THREE.BoxGeometry(2.65,.76,1.02),upperMat);body.position.set(-.08,.12,0);group.add(body);
  const toe=new THREE.Mesh(new THREE.SphereGeometry(.53,32,24),upperMat);toe.scale.set(1.12,.72,1);toe.position.set(1.08,.1,0);group.add(toe);
  const heel=new THREE.Mesh(new THREE.BoxGeometry(.62,.75,1.04),trimMat);heel.position.set(-1.02,.12,0);group.add(heel);
  const tongue=new THREE.Mesh(new THREE.BoxGeometry(.72,.78,.16),upperMat);tongue.position.set(.02,.54,0);tongue.rotation.z=-.22;group.add(tongue);
  for(let i=0;i<5;i++){const lace=new THREE.Mesh(new THREE.BoxGeometry(.52,.045,.09),laceMat);lace.position.set(.05+i*.12,.42-i*.075,.28);lace.rotation.z=-.18;group.add(lace);}
  for(let i=0;i<5;i++){const stitch=new THREE.Mesh(new THREE.BoxGeometry(.18,.025,.025),trimMat);stitch.position.set(-.9+i*.24,-.03,.516);group.add(stitch);}
  group.rotation.z=-.08;group.rotation.y=-.3;group.scale.setScalar(.9);scene.add(group);return group;
}
function setup(canvas, color, compact=false){
  if(!canvas)return null;
  const renderer=new THREE.WebGLRenderer({canvas,antialias:true,alpha:true});
  renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.outputColorSpace=THREE.SRGBColorSpace;
  const scene=new THREE.Scene();
  const camera=new THREE.PerspectiveCamera(34,1,.1,100);camera.position.set(4.1,3.0,6.6);camera.lookAt(0,0,0);
  scene.add(new THREE.HemisphereLight(0xffffff,0x8d927f,2.1));
  const key=new THREE.DirectionalLight(0xffffff,3.0);key.position.set(3,6,5);scene.add(key);
  const fill=new THREE.DirectionalLight(0xdde9c7,1.4);fill.position.set(-5,1,-4);scene.add(fill);
  const shoe=makeSneaker(scene,color);
  const floor=new THREE.Mesh(new THREE.CircleGeometry(2.7,64),new THREE.MeshBasicMaterial({color:0xdfe3d5,transparent:true,opacity:.55}));floor.rotation.x=-Math.PI/2;floor.position.y=-.68;scene.add(floor);
  let dragging=false,lastX=0,lastY=0,auto=true;
  canvas.addEventListener('pointerdown',e=>{dragging=true;auto=false;lastX=e.clientX;lastY=e.clientY;canvas.setPointerCapture(e.pointerId);});
  canvas.addEventListener('pointermove',e=>{if(!dragging)return;shoe.rotation.y+=(e.clientX-lastX)*.012;shoe.rotation.x+=(e.clientY-lastY)*.006;lastX=e.clientX;lastY=e.clientY;});
  canvas.addEventListener('pointerup',()=>{dragging=false;});
  canvas.addEventListener('wheel',e=>{camera.position.z=Math.max(4.2,Math.min(9,camera.position.z+e.deltaY*.004));},{passive:true});
  const resize=()=>{const w=canvas.clientWidth||canvas.parentElement.clientWidth,h=canvas.clientHeight||canvas.parentElement.clientHeight;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();};
  const ro=new ResizeObserver(resize);ro.observe(canvas.parentElement);resize();
  function animate(){requestAnimationFrame(animate);if(auto)shoe.rotation.y+=.003;shoe.position.y=Math.sin(performance.now()*.001)*.035;renderer.render(scene,camera);}
  animate();return {setColor(c){shoe.children.forEach((o,i)=>{if(i===2||i===3||i===5)o.material.color.setHex(c);});}};
}
setup(document.querySelector('#hero3d'),0xd4dac9);
const productCanvas=document.querySelector('#product3d');
let quickScene=setup(productCanvas,0xd4dac9,true);
window.addEventListener('forme:show-product',e=>{if(quickScene)quickScene.setColor(e.detail.color||0xd4dac9);});
