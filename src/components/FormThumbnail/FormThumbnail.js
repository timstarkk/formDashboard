import React, { useContext } from 'react';
import './FormThumbnail.css';
import { ItemContext } from '../../context';

export default function FormThumbnail(form) {
    const { id, contents } = form.form;

    const { handleSelectForm } = useContext(ItemContext)
    
    return (
        <>
            <div id="formThumbnailBox">
                <div className="thumbnailItem" onClick={() => handleSelectForm(form.form)}>
                    <div>
                        id: {id}
                    </div>
                    <div>contents: {contents}</div>
                </div>
            </div>
        </>
    );
};