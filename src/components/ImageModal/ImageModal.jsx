import Modal from 'react-modal';
import css from './ImageModal.module.css';

Modal.setAppElement(document.getElementById('root'));

const ImageModal = ({ isOpen = false, image, onClose }) => {
    
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
  };

  return (
    <Modal
      style={customStyles}
      className={css.modal}
      isOpen={isOpen}
      onRequestClose={() => onClose(false)}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
    >
      <img className={css.modalImg} src={image.src} alt={image.description} />
    </Modal>
  );
};

export default ImageModal;


