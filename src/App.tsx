import { useRef } from 'react'
import ImageZoom from './components/image-zoom/ImageZoom'


function App() {
  const imgRef = useRef<HTMLImageElement>(null!)
  return (
    <div >
      <ImageZoom ref={imgRef}>
        <img ref={imgRef} src={require('./assets/images/img-bag.jpeg')} alt="girl" />
      </ImageZoom>

    </div>
  )
}

export default App