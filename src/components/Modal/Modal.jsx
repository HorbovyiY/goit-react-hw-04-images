import { useEffect } from "react";
import PropTypes from 'prop-types'

import { Overlay, ModalWindow } from "./Modal.styled";

export const Modal = ({ images, closeModal, id }) => {
    
    useEffect(() => { 
        window.addEventListener('keydown', handleKeyDown)

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const handleKeyDown = e => { 
            if (e.code === 'Escape') {
                closeModal();
            }
    } 
    
    const handleOverlayClick = e => { 
        if (e.target === e.currentTarget) { 
            closeModal();
        }
    }

        return (
            <Overlay onClick={handleOverlayClick}>
                <ModalWindow>
                    <img
                        src={images.find(img => img.id === id).largeImageURL}
                        alt={images.find(img => img.id === id).tags}
                    />
                </ModalWindow>
            </Overlay>
        )
}

Modal.propTypes = {
    images: PropTypes.arrayOf(PropTypes.object).isRequired,
    closeModal: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired
}