import React, { useState } from 'react';

const ImageSelector = () => {
  const [image, setImage] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      
      {image && (
        <img
          src={image}
          alt="Selected"
          className="w-64 h-64 object-cover rounded shadow-lg"
        />
      )}
      
      
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="file:mr-4 file:py-2 file:px-4 file:border file:rounded file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
      />
      
    </div>
  );
};

export default ImageSelector;
