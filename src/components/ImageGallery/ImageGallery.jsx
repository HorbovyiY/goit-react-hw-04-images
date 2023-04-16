import React from "react";
import PropTypes from 'prop-types'

import * as API from "../../services/api";
import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";
import { Button } from "components/Button/Button";
import { Loader } from "components/Loader/Loader";
import { Modal } from "components/Modal/Modal";
import { Gallery } from "./ImageGallery.styled";

export class ImageGallery extends React.Component { 
    state = {
        images: [],
        page: 1,
        status: 'idle', //pending, resolved, rejected
        id: null,
        showModal: false
    }

    componentDidUpdate(prevProps, prevState) { 
        if (prevProps.searchText !== this.props.searchText) { 
            this.setState({ status: 'pending', page: 1 });
            
            API.getImage(this.props.searchText)
                .then((response) => response.json())
                .then((data) => this.setState({ images: data.hits, status: 'resolved' }))
                .catch((error) => {
                    console.log(error);
                    this.setState({ status: 'rejected' })
                });
        }

        if (prevState.page !== this.state.page) { 
            this.setState({ status: 'pending' });
            
            API.getImage(this.props.searchText, this.state.page)
                .then((response) => response.json())
                .then((data) => this.setState({ images: [...this.state.images, ...data.hits], status: 'resolved' }))
                .catch((error) => {
                    console.log(error);
                    this.setState({status: 'rejected'})
                })

        }
    }

    addPage = () => { 
        this.setState((prevState) => { return { page: prevState.page + 1 }; })
    }

    closeModal=()=>{ 
        this.setState({ showModal: false })
    }

    openModal=(id)=>{ 
        this.setState({ showModal: true })
        this.setState({id: id})
    }

    render() { 
        return (
            <div>
                {(this.state.status === 'pending') && <Loader />}
                {(this.state.status === 'resolved') && (
                    <Gallery>
                        <ImageGalleryItem images={this.state.images} onChooseImage={this.openModal} />
                    </Gallery>)}
                {(this.state.images.length > 0) && <Button add={this.addPage} />}
                {(this.state.status==='rejected')&& <p>Сталась помилка</p> }
                {(this.state.showModal) && (
                    <Modal
                        images={this.state.images}
                        closeModal={this.closeModal}
                        id={ this.state.id}
                    />)}
            </div>
        )
    }
}

ImageGallery.propTypes = {
    searchText: PropTypes.string.isRequired
}