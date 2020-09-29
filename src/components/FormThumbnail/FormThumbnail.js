import React, { useContext } from 'react';
import './FormThumbnail.css';
import { ItemContext } from '../../context';
import Item from '../Item/Item';

export default function FormThumbnail(form) {
    const { id, contentsArray } = form.form;

    const { handleSelectForm } = useContext(ItemContext)
    
    return (
        <>
            <div id="formThumbnailBox">
                <div className="thumbnailItem" onClick={handleSelectForm}>
                    <div>
                        id: {id}
                    </div>
                    <div>contents: {contentsArray}</div>
                </div>
            </div>
        </>
    );
};