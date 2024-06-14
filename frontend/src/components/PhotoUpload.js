import React, { useState } from 'react';
import axios from 'axios';

const PhotoUpload = ({ onUpload }) => {
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
        event?.preventDefault();

        handleUpload()
    };

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append('photo', file);

        setUploading(true);

        try {
            const response = await axios.post('http://localhost:3001/employees/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            onUpload(response.data.url);
        } catch (error) {
            console.error('Failed to upload image', error);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div>
            <label>Foto:</label>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload} disabled={!file || uploading}>
                {uploading ? 'Uploading...' : 'Upload Foto'}
            </button>
        </div>
    );
};

export default PhotoUpload;
