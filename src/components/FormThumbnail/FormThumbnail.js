import React from 'react';
import './FormThumbnail.css';
import { ItemContext } from '../../context';

export default function FormThumbnail(form) {
    const {id, contentsArray} = form.form;
    
    return (
        <>
            <div id="formThumbnailBox">
                <div className="thumbnailItem" onClick={() => console.log('you clicked it')}>
                    <div>
                        id: {id}
                    </div>
                    <div>contents: {contentsArray}</div>
                </div>
            </div>
        </>
    );
};