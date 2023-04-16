import React from "react";
import PropTypes from 'prop-types'

import { Overlay, ModalWindow } from "./Modal.styled";

export class Modal extends React.Component {

    componentDidMount() { 
        window.addEventListener('keydown', this.handleKeyDown)
    }

    componentWillUnmount() { 
        window.removeEventListener('keydown', this.handleKeyDown)
    }

    handleKeyDown = e => { 
            if (e.code === 'Escape') {
                this.props.closeModal();
            }
        } 

    handleOverlayClick = e => { 
        if (e.target === e.currentTarget) { 
            this.props.closeModal();
        }
    }

    render() {
        return (
            <Overlay onClick={this.handleOverlayClick}>
                <ModalWindow>
                    <img
                        src={this.props.images.find(img => img.id === this.props.id).largeImageURL}
                        alt={this.props.images.find(img => img.id === this.props.id).tags}
                    />
                </ModalWindow>
            </Overlay>
        )
    }
}

Modal.propTypes = {
    images: PropTypes.arrayOf(PropTypes.object).isRequired,
    closeModal: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired
}