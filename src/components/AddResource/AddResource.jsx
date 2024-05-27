import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AddResource.css';
import Header from '../Header/Header';

const AddResource = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        link: '',
        url: '',
        category: '',
        tag_name: ''
    });

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.title || formData.title.length < 3) {
            newErrors.title = 'Title should be at least 3 characters long';
        }
        if (!formData.description || formData.description.length < 10) {
            newErrors.description = 'Description should be at least 10 characters long';
        }
        if (!formData.link || !/^https?:\/\/.+\..+/.test(formData.link)) {
            newErrors.link = 'Please enter a valid URL';
        }
        if (!formData.url || !/^https?:\/\/.+\..+/.test(formData.url)) {
            newErrors.url = 'Please enter a valid URL';
        }
        if (!formData.category) {
            newErrors.category = 'Please enter a valid Category';
        }
        if (!formData.tag_name) {
            newErrors.tag_name = 'Please select a tag';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            const response = await axios.get(
                'https://media-content.ccbp.in/website/react-assignment/add_resource.json'
            );

            if (response.status === 200) {
                toast.success('Resource created successfully!', {
                    position: "bottom-center",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    style: { backgroundColor: 'green', color: 'white' }
                });
                setTimeout(() => navigate('/'), 2000);
            } else {
                toast.error('Failed to create resource. Please try again.', {
                    position: "bottom-center",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    style: { backgroundColor: 'red', color: 'white' }
                });
            }
        } catch (error) {
            toast.error('Failed to create resource. Please try again.');
        }
    };

    return (
        <div>
            <Header />
            <div className="add-resource-page">

                <div className="content">
                    <div className="form-container">
                        <h1>Item Details</h1>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label>ITEM TITLE:</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                />
                                {errors.title && <span className="error">{errors.title}</span>}
                            </div>
                            <div>
                                <label>LINK:</label>
                                <input
                                    type="text"
                                    name="link"
                                    value={formData.link}
                                    onChange={handleChange}
                                />
                                {errors.link && <span className="error">{errors.link}</span>}
                            </div>
                            <div>
                                <label>ICON URL:</label>
                                <input
                                    type="text"
                                    name="url"
                                    value={formData.url}
                                    onChange={handleChange}
                                />
                                {errors.url && <span className="error">{errors.url}</span>}
                            </div>
                            <div>
                                <label>Tag:</label>
                                <select name="tag_name" value={formData.tag_name} onChange={handleChange}>
                                    <option value="">Select Tag</option>
                                    <option value="resources">Resources</option>
                                    <option value="request">Request</option>
                                    <option value="user">User</option>
                                </select>
                                {errors.tag_name && <span className="error">{errors.tag_name}</span>}
                            </div>
                            <div>
                                <label>CATEGORY:</label>
                                <input
                                    type="text"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                />
                                {errors.category && <span className="error">{errors.category}</span>}
                            </div>
                            <div>
                                <label>DESCRIPTION:</label>
                                <input
                                    type="text"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                />
                                {errors.description && <span className="error">{errors.description}</span>}
                            </div>

                            <button type="submit">Create</button>
                        </form>
                        <ToastContainer position="bottom-center" />
                    </div>
                    <div className="image-container">
                        <img src="https://s3-alpha-sig.figma.com/img/4451/ed3a/155011c955cbce9bdc9f5a65f80e1282?Expires=1717372800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=JANMBaQOYR4pbhpFFZG0v3Lo-dT9JJdtND8TetmAamY-3JuuxSDIHMutJp~FlsTb1EwD2Knu5s8v~neh-Dha6azCDkjtfBKZzvTJiFyoel2j8dCnOZNM8ZZwYotvKItEOQ1K0BTXLDhbhW45PXeosKPev4ruZeqVfrdlPC1ZaJWyNQK6f~hlTBfPgjAqqpO-mDqQ-w0JtEPPWjx75X6EowqeVx5yPM-hrnvP57Tw~VZjSGFAetLT~6aXuBlv-s76tQX51elL2K-ssp95ouO6H-I2u7MDEhpCYoaVLWxxdpdk4HuBSU0bd5cbbUu8zmHAGKDFsFjZ4QDBOkva1aszuQ__" alt="Example" />
                    </div>
                </div>
            </div>

        </div>
    );
};

export default AddResource;
