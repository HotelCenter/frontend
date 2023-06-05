import { OrbitControls, useTexture } from "@react-three/drei";
import * as THREE from 'three'
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {  useRef } from "react";
function useEnvTexture(src:string){
  const texture=useTexture(src)
  texture.mapping = THREE.EquirectangularReflectionMapping
  return texture
}
function EnvSphere() {
  const envRef = useRef<THREE.Mesh<THREE.SphereGeometry,THREE.MeshBasicMaterial>>(null!)
  const envTexture1 = useEnvTexture('./textures/hotel1.jpeg')
  const envTexture2 = useEnvTexture('./textures/hotel2.jpeg')
  const envTexture3 = useEnvTexture('./textures/hotel3.jpeg')
  const envTexture4 = useEnvTexture('./textures/hotel4.jpeg')
  const textures=[envTexture1,envTexture2,envTexture3,envTexture4]
  useFrame(({clock})=>{
    const time=clock.getElapsedTime()
    const shader=envRef.current.userData.shader
    const m=Math.floor((time*0.3)%textures.length)
    envRef.current.material.map=textures[m]
    if(shader){
      shader.uniforms.time.value=clock.getElapsedTime()
    }
    envRef.current.rotation.y += 0.001

  })

  return <mesh ref={envRef}>
    <sphereGeometry args={[20, 100, 100]} />
    <meshBasicMaterial side={THREE.DoubleSide} color={0xffffff} map={envTexture1} />
  </mesh>
}
// function Stars(){
//   const pointRef=useRef()
//   useEffect(()=>{

//     const size=100*100
//     const points=new Float32Array(size*3)
//     for (let i = 0; i < size; i++) {
//       const stride=i*3
//       const x=Math.random()-0.5
//       const y=(Math.random()-0.5)
//       const z=Math.random()-0.5
//       points[stride]=x
//       points[stride+1]=y
//       points[stride+2]=z
//     }
//     pointRef.current.geometry.setAttribute('position',new THREE.BufferAttribute(points,3))
//   },[])
//   return (
//     <points ref={pointRef}>
//       <bufferGeometry/>
//       <shaderMaterial uniforms={{
        
//       }} fragmentShader={`
//       void main(){
//         gl_FragColor=vec4(1.0,1.0,1.0,1.0);
//       }
//       `} vertexShader={`
//       #define PI 3.141592653589793
//       void main(){
//         vec4 modelPosition=modelMatrix*vec4(position,1.0);
//         vec4 mvPosition=viewMatrix*modelPosition;
//         gl_Position=projectionMatrix*mvPosition;
//         gl_PointSize *= ( 2.0 / - mvPosition.z );
//       }
//       `}/>
//     </points>
//   )
// }
function Scene() {
  const {camera}=useThree()
  const orbitRef = useRef<any>()

  
  return (
    <>
      <OrbitControls target={new THREE.Vector3(0,1,2.5)}  ref={orbitRef} enableDamping={true} dampingFactor={0.2} />
      {/* <Environment preset="city" /> */}
      <EnvSphere/>
      {/* <Stars/> */}
      {/* }} */}
    </>
  )
}

export default function HotelCanvas() {

  return (
    <div className="w-full h-full">
    <Canvas camera={{ fov: 45, near: 0.1, far: 1000, position: [0, 0, 0] }}>
      <Scene />
    </Canvas>
    
          </div>
  )
}