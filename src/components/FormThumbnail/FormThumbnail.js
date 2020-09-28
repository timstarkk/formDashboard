import React from 'react';
import './FormThumbnail.css';

export default function FormThumbnail(form) {
    const {id, contentsArray} = form.form;
    console.log(form);
    console.log(id);
    console.log(contentsArray);
    return (
        <>
            <div id="formThumbnailBox">
                <div className="thumbnailItem">
                    <div>
                        id: {id}
                    </div>
                    <div>contents: {contentsArray}</div>
                </div>
            </div>
        </>
    );
};