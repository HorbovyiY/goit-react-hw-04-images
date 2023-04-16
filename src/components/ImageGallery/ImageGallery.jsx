import {useState, useEffect} from "react";
import PropTypes from 'prop-types'

import * as API from "../../services/api";
import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";
import { Button } from "components/Button/Button";
import { Loader } from "components/Loader/Loader";
import { Modal } from "components/Modal/Modal";
import { Gallery } from "./ImageGallery.styled";

export const ImageGallery = ({searchText}) => { 
    const [images, setImages] = useState([])
    const [page, setPage] = useState(1)
    const [status, setStatus] = useState('idle') //pending, resolved, rejected
    const [id, setId] = useState(null)
    const [showModal, setShowModal] = useState(false)

    useEffect(() => { 
        if (searchText === '') { return }
        
        setStatus('pending');
        setPage(1);

        API.getImage(searchText, 1)
            .then((response) => response.json())
            .then((data) => {
                setImages(data.hits);
                setStatus('resolved');
            })
            .catch((error) => {
                console.log(error);
                setStatus('rejected');
            });
    },[searchText])

    useEffect(() => {
        if (searchText === '') { return }
        if (page === 1) { return}
        
        setStatus('pending');

        API.getImage(searchText, page)
            .then((response) => response.json())
            .then((data) => {
                setImages([...images, ...data.hits]);
                setStatus('resolved');
            })
            .catch((error) => {
                console.log(error);
                setStatus('rejected')
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page])

    const addPage = () => { 
        setPage(prevState => prevState + 1)
    }

    const closeModal=()=>{ 
        setShowModal(false)
    }

    const openModal=(id)=>{ 
        setShowModal(true)
        setId(id)
    }

    return (
            <div>
                {(status === 'pending') && <Loader />}
                {(status === 'resolved') && (
                    <Gallery>
                        <ImageGalleryItem images={images} onChooseImage={openModal} />
                    </Gallery>)}
                {(images.length > 0) && <Button add={addPage} />}
                {(status==='rejected')&& <p>Сталась помилка</p> }
                {(showModal) && (
                    <Modal
                        images={images}
                        closeModal={closeModal}
                        id={id}
                    />)}
            </div>
        )
}

ImageGallery.propTypes = {
    searchText: PropTypes.string.isRequired
}