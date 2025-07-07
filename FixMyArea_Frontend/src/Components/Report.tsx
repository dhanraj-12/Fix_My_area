import React, { useEffect, useState, useMemo } from 'react';
import Select from 'react-select';
import axios from 'axios';

const url = "http://localhost:3000/api";

function Report() {
    const [image, setImage] = useState<File | null>(null);
    const [imageUrl, setImageurl] = useState<string | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [loading, setLoading] = useState(false);
    const [finalSubmitEnabled, setFinalSubmitEnabled] = useState(false);
    // const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
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
            alert("Failed to fetch cities. Please try again later.");
        }
    };

    // Debounce the search input
    useEffect(() => {
        const timerId = setTimeout(() => {
            fetchCities(searchInput);
        }, 300);

        return () => {
            clearTimeout(timerId);
        };
    }, [searchInput]);

    // const getUserLocation = () => {
    //     if (!navigator.geolocation) {
    //         alert("Geolocation is not supported by your browser.");
    //         return;
    //     }

    //     navigator.geolocation.getCurrentPosition(
    //         (position) => {
    //             const { latitude, longitude } = position.coords;
    //             setLocation({ lat: latitude, lng: longitude });
    //             console.log("Latitude:", latitude, "Longitude:", longitude);
    //         },
    //         (error) => {
    //             alert("Unable to retrieve location. Please allow location access.");
    //             console.error(error);
    //         }
    //     );
    // };

    const user = JSON.parse(localStorage.getItem('user-info') || '{}');

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleUploadImage = async () => {
        if (!image) {
            alert("Please select an image.");
            return;
        }

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

            console.log(res.data);
            setDescription(res.data.aidescriptions.description);
            setCategory(res.data.aidescriptions.category);
            setImageurl(res.data.imageUrl)
            setFinalSubmitEnabled(true);
            alert("AI analysis completed.");
        } catch (err) {
            console.error(err);
            alert("Image upload failed.");
        } finally {
            setLoading(false);
        }
    };

    const handleFinalSubmit = async () => {
        if (!description || !category || !city) {
            alert("Description, category, and city are required.");
            return;
        }

        try {
            await axios.post(`${url}/issue`, {
                description,
                category,
                city,
                imageUrl,
            }, {
                headers: {
                    Authorization: `${user?.token || ''}`,
                },
            });

            alert("Issue submitted successfully!");
            // Optional: reset form
        } catch (err) {
            console.error(err);
            alert("Final submission failed.");
        }
    };

    useEffect(() => {
        fetchCities();
    }, []);

    // Convert cities to options format for react-select
    const cityOptions = useMemo(() => {
        return cities.map(city => ({
            value: city,
            label: city
        }));
    }, [cities]);

    return (
        <div className="flex flex-col md:flex-row items-start p-6 bg-gray-100 rounded-lg shadow-md gap-6">
            {/* Left: Image upload */}
            <div className="flex flex-col items-center gap-4">
                {preview && (
                    <img
                        src={preview}
                        alt="Preview"
                        className="w-64 h-64 object-cover rounded-lg shadow"
                    />
                )}
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="file:mr-4 file:py-2 file:px-4 file:border file:rounded file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                <button
                    onClick={handleUploadImage}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
                    disabled={loading || !image}
                >
                    {loading ? "Analyzing..." : "Upload & Get AI Analysis"}
                </button>
            </div>

            {/* Right: AI-filled inputs */}
            <div className="flex flex-col gap-4 w-full">
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="AI-generated description"
                    className="w-full p-4 h-40 text-lg border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <div className='flex flex-row items-center gap-4'>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Select Category</option>
                        <option value="road">Road</option>
                        <option value="water">Water</option>
                        <option value="electricity">Electricity</option>
                        <option value="sanitation">Sanitation</option>
                        <option value="garbage">Garbage</option>
                    </select>

                    <div className="w-full">
                        <Select
                            options={cityOptions}
                            value={city ? { value: city, label: city } : null}
                            onChange={(selectedOption) => setCity(selectedOption?.value || '')}
                            onInputChange={(inputValue) => setSearchInput(inputValue)}
                            placeholder="Select City"
                            isSearchable
                            className="text-base"
                            styles={{
                                control: (base) => ({
                                    ...base,
                                    minHeight: '48px',
                                    borderColor: '#d1d5db',
                                    '&:hover': {
                                        borderColor: '#d1d5db'
                                    }
                                }),
                                menu: (base) => ({
                                    ...base,
                                    zIndex: 9999
                                })
                            }}
                        />
                    </div>
                </div>

                <button
                    onClick={handleFinalSubmit}
                    className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 disabled:bg-gray-400"
                    disabled={!finalSubmitEnabled || !city}
                >
                    Submit Final Report
                </button>
            </div>
        </div>
    );
}

export default Report;