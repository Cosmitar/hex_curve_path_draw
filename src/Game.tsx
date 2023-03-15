import { Canvas } from '@react-three/fiber'
import { Center } from '@react-three/drei'
import { PCFSoftShadowMap, sRGBEncoding } from 'three'
import SceneTestMove from './scenes/SceneTestMove/SceneTestMove'
import Monitor from './tools/Monitor/Monitor'
import './styles.css'

export default function App() {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [-0, 15, 19], fov: 80, zoom: 3 }}
      shadows
      onCreated={({ gl: renderer }) => {
        renderer.physicallyCorrectLights = true
        renderer.outputEncoding = sRGBEncoding
        renderer.shadowMap.type = PCFSoftShadowMap
      }}
    >
      <color attach="background" args={['#202020']} />
      <directionalLight position={[10, 10, 12]} intensity={1.5} castShadow />
      <Center>
        <SceneTestMove />
      </Center>
      <Monitor />
    </Canvas>
  )
}
