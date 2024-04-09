import css from './ImageCard.module.css';

const ImageCard = ({ image, onSelect }) => {
  return (
    <div className={css.imgBox}>
      <img
        className={css.imgItem}
        src={image.urls.small}
        alt={image.alt_description}
        onClick={() =>
          onSelect(true, {
            src: image.urls.regular,
            description: image.alt_description,
          })
        }
      />
    </div>
  );
};

export default ImageCard;
