import ImageCard from '../ImageCard/ImageCard'
import css from './ImageGallery.module.css'


const ImageGallery = ({images, onSelect}) => {
  return (
    <ul className={css.imgList}>
      {images && images.map(image => (
        <li key={image.id} className={css.imgItem}>
          
            <ImageCard image={image} onSelect={onSelect} />
          
        </li>
        ))}
    </ul>
  )
}

export default ImageGallery
