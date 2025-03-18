import React from "react";

interface ImageGroupProps {
  images: string[]; // Array of image URLs
}

const ImageGroup: React.FC<ImageGroupProps> = ({ images }) => {
  const displayedImages = images.slice(0, 2); // Show at most two images
  const remainingImages = images.length - displayedImages.length; // Count of remaining images

  return (
    <div className="relative w-8 h-8">

{displayedImages[1] && (
        <img
          src={displayedImages[1]}
          className="absolute top-2 left-2 w-8 h-8 rounded-[7px] border-2 border-white"
          alt="Second Image"
        />
      )}
      {displayedImages[0] && (
        <img
          src={displayedImages[0]}
          className="absolute top-0 left-0 w-8 h-8 rounded-[7px] border-2 border-white"
          alt="Top Image"
        />
      )}
      {remainingImages > 0 && (
        <span className="absolute top-3 left-5 text-xs text-white">
          {remainingImages}
        </span>
      )}
    </div>
  );
};

export default ImageGroup;
