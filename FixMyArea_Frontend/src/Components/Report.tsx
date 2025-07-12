import React, { useEffect, useState, useMemo } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Select from 'react-select';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';
import {
    ArrowUpTrayIcon as UploadIcon,
    SparklesIcon,
    CheckCircleIcon,
    ExclamationTriangleIcon as ExclamationIcon,
    MapPinIcon as LocationMarkerIcon,
    ClipboardDocumentIcon as ClipboardListIcon
  } from '@heroicons/react/24/outline';

const url = "http://localhost:3000/api";

function Report() {
    const [image, setImage] = useState<File | null>(null);
    const [imageUrl, setImageurl] = useState<string | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [loading, setLoading] = useState(false);
    const [finalSubmitEnabled, setFinalSubmitEnabled] = useState(true);
    const [city, setCity] = useState<string>('');
    const [cities, setCities] = useState<string[]>([]);
    const [searchInput, setSearchInput] = useState('');

    const fetchCities = async (searchTerm = '') => {
        try {
            const response = await axios.get(`${url}/cities/India`, {
                params: { search: searchTerm }
            });
            const sortedCities = response.data.cities.sort((a: string, b: string) =>
                a.localeCompare(b)
            );
            setCities(sortedCities);
        } catch (error) {
            console.error("Error fetching cities:", error);
        }
    };

    useEffect(() => {
        const timerId = setTimeout(() => {
            fetchCities(searchInput);
        }, 300);

        return () => {
            clearTimeout(timerId);
        };
    }, [searchInput]);

    const user = JSON.parse(localStorage.getItem('user-info') || '{}');

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleUploadImage = async () => {
        if (!image) return;

        setLoading(true);
        const formData = new FormData();
        formData.append("image", image);

        try {
            const res = await axios.post(`${url}/upload`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    authorization: `${user?.token || ''}`,
                },
            });

            setDescription(res.data.aidescriptions.description);
            setCategory(res.data.aidescriptions.category);
            setImageurl(res.data.imageUrl);
            // setFinalSubmitEnabled(true);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleFinalSubmit = async () => {
        if (!description || !category || !city) {
            toast.error('Please fill all required fields', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return;
        }

        try {
            const response = await axios.post(`${url}/issue`, {
                description,
                category,
                city,
                imageUrl,
            }, {
                headers: {
                    Authorization: `${user?.token || ''}`,
                },
            });

            // Success notification
            toast.success(
                <div>
                    <p className="font-bold">Issue submitted successfully!</p>
                    {response.data.assignedTo && (
                        <p className="text-sm">Assigned to: {response.data.assignedTo}</p>
                    )}
                </div>, 
                {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                }
            );

            // Reset form
            setImage(null);
            setPreview(null);
            setDescription('');
            setCategory('');
            setCity('');
            
        } catch (err) {
            console.error(err);
            toast.error('Failed to submit issue. Please try again.', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };

    useEffect(() => {
        fetchCities();
    }, []);

    const cityOptions = useMemo(() => {
        return cities.map(city => ({
            value: city,
            label: city
        }));
    }, [cities]);

    const customSelectStyles = {
        control: (base: any) => ({
            ...base,
            backgroundColor: '#1F2937',
            borderColor: '#374151',
            minHeight: '48px',
            boxShadow: 'none',
            '&:hover': {
                borderColor: '#4B5563'
            }
        }),
        menu: (base: any) => ({
            ...base,
            backgroundColor: '#1F2937',
            zIndex: 9999
        }),
        option: (base: any, { isFocused }: any) => ({
            ...base,
            backgroundColor: isFocused ? '#374151' : '#1F2937',
            color: isFocused ? '#F3F4F6' : '#D1D5DB',
            '&:active': {
                backgroundColor: '#4B5563'
            }
        }),
        singleValue: (base: any) => ({
            ...base,
            color: '#F3F4F6'
        }),
        input: (base: any) => ({
            ...base,
            color: '#F3F4F6'
        }),
        placeholder: (base: any) => ({
            ...base,
            color: '#9CA3AF'
        })
    };

    return (
        <>
        <Header/>
        <div className="min-h-screen bg-gray-900 p-6">
            <div className="max-w-6xl mx-auto bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
                <div className="p-1 bg-gradient-to-r from-blue-600 to-purple-600"></div>
                
                <div className="p-8">
                    <h1 className="text-2xl font-bold text-white mb-6 flex items-center">
                        <ClipboardListIcon className="w-6 h-6 mr-2 text-blue-400" />
                        Report an Issue
                    </h1>
                    
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Left: Image upload */}
                        <div className="w-full lg:w-1/2">
                            <div className="bg-gray-700 rounded-lg p-6 border border-gray-600">
                                <div className="flex flex-col items-center gap-6">
                                    {preview ? (
                                        <div className="relative w-full h-64 rounded-lg overflow-hidden border-2 border-dashed border-gray-600 group">
                                            <img
                                                src={preview}
                                                alt="Preview"
                                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                                                <span className="text-white text-sm font-medium">Issue Preview</span>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="w-full h-64 flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-600 bg-gray-700/50">
                                            <UploadIcon className="w-12 h-12 text-gray-500 mb-3" />
                                            <p className="text-gray-400 mb-2">Upload an image of the issue</p>
                                            <p className="text-gray-500 text-sm">Supports JPG, PNG (Max 5MB)</p>
                                        </div>
                                    )}

                                    <label className="w-full">
                                        <div className="flex items-center justify-center px-4 py-3 bg-gray-700 rounded-lg border border-gray-600 hover:bg-gray-600 transition-colors cursor-pointer">
                                            <UploadIcon className="w-5 h-5 mr-2 text-blue-400" />
                                            <span className="text-white font-medium">Select Image</span>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageChange}
                                                className="hidden"
                                            />
                                        </div>
                                    </label>

                                    <button
                                        onClick={handleUploadImage}
                                        disabled={loading || !image}
                                        className={`w-full flex items-center justify-center px-4 py-3 rounded-lg font-medium transition-colors ${
                                            loading
                                                ? 'bg-blue-700 text-blue-200 cursor-not-allowed'
                                                : !image
                                                ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                                                : 'bg-blue-600 hover:bg-blue-500 text-white'
                                        }`}
                                    >
                                        {loading ? (
                                            <>
                                                <SparklesIcon className="w-5 h-5 mr-2 animate-pulse" />
                                                Analyzing with AI...
                                            </>
                                        ) : (
                                            <>
                                                <SparklesIcon className="w-5 h-5 mr-2" />
                                                Upload & Analyze
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Right: Form inputs */}
                        <div className="w-full lg:w-1/2">
                            <div className="bg-gray-700 rounded-lg p-6 border border-gray-600 h-full">
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Description
                                        </label>
                                        <div className="relative">
                                            <textarea
                                                value={description}
                                                onChange={(e) => setDescription(e.target.value)}
                                                placeholder="AI-generated description will appear here"
                                                className="w-full p-4 bg-gray-800 text-gray-200 rounded-lg border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none min-h-[150px]"
                                            />
                                            {description && (
                                                <div className="absolute bottom-3 right-3 text-xs text-gray-500">
                                                    {description.length}/500
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                                Category
                                            </label>
                                            <select
                                                value={category}
                                                onChange={(e) => setCategory(e.target.value)}
                                                className="w-full p-3 bg-gray-800 text-gray-200 rounded-lg border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            >
                                                <option value="">Select category</option>
                                                <option value="road">Road</option>
                                                <option value="water">Water</option>
                                                <option value="electricity">Electricity</option>
                                                <option value="sanitation">Sanitation</option>
                                                <option value="garbage">Garbage</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                                <LocationMarkerIcon className="w-4 h-4 inline mr-1 text-blue-400" />
                                                City
                                            </label>
                                            <Select
                                                options={cityOptions}
                                                value={city ? { value: city, label: city } : null}
                                                onChange={(selectedOption) => setCity(selectedOption?.value || '')}
                                                onInputChange={(inputValue) => setSearchInput(inputValue)}
                                                placeholder="Search city..."
                                                isSearchable
                                                styles={customSelectStyles}
                                                className="text-sm"
                                            />
                                        </div>
                                    </div>

                                    <button
                                        onClick={handleFinalSubmit}
                                        disabled={!finalSubmitEnabled || !city}
                                        className={`w-full py-3 px-4 rounded-lg font-medium flex items-center justify-center transition-colors ${
                                            !finalSubmitEnabled || !city
                                                ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                                                : 'bg-green-600 hover:bg-green-500 text-white'
                                        }`}
                                    >
                                        <CheckCircleIcon className="w-5 h-5 mr-2" />
                                        Submit Report
                                    </button>

                                    {(!description || !category || !city) && (
                                        <div className="flex items-start text-sm text-amber-400 bg-amber-900/30 p-3 rounded-lg">
                                            <ExclamationIcon className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                                            <span>Please complete all fields before submitting</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            return (
        <div className="min-h-screen bg-gray-900 p-6">
            {/* ... (keep all your existing JSX) */}
            
            {/* Add this ToastContainer at the end of your component */}
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </div>
    );
        </div>
        <Footer></Footer>
</>
    );
}

export default Report;