import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';

interface ProfileCropperProps {
  croppedImage: string | null;
  setCroppedImage: (image: string | null) => void;
}

interface Crop {
  x: number;
  y: number;
}

interface PixelCrop {
  x: number;
  y: number;
  width: number;
  height: number;
}

const ProfileCropper: React.FC<ProfileCropperProps> = ({ croppedImage, setCroppedImage }) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState<Crop>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<PixelCrop | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const onCropComplete = useCallback((croppedArea: any, croppedAreaPixels: PixelCrop) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result as string);
        setIsEditing(true); // Automatically enter edit mode when a new image is selected
      };
      reader.readAsDataURL(file);
    }
  };

  const getCroppedImage = async (imageSrc: string, pixelCrop: PixelCrop): Promise<string> => {
    const image = new Image();
    image.src = imageSrc;

    return new Promise((resolve, reject) => {
      image.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        if (!ctx) {
          reject('Failed to get canvas context');
          return;
        }

        canvas.width = pixelCrop.width;
        canvas.height = pixelCrop.height;

        ctx.drawImage(
          image,
          pixelCrop.x,
          pixelCrop.y,
          pixelCrop.width,
          pixelCrop.height,
          0,
          0,
          pixelCrop.width,
          pixelCrop.height
        );

        // Convert canvas to data URL
        resolve(canvas.toDataURL('image/jpeg'));
      };

      image.onerror = () => {
        reject('Failed to load image');
      };
    });
  };

  const handleSaveCroppedImage = async () => {
    if (imageSrc && croppedAreaPixels) {
      try {
        const croppedImage = await getCroppedImage(imageSrc, croppedAreaPixels);
        setCroppedImage(croppedImage); // Update cropped image in parent component state
        // console.log(`Cropped Image Saved: ${croppedImage}`)
        setIsEditing(false); // Hide the cropper and slider after saving
      } catch (error) {
        console.error('Error cropping image:', error);
      }
    }
  };

  const handleEdit = () => {
    setIsEditing(true); // Show the cropper and slider for editing
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageChange} />

      {imageSrc && isEditing && (
        <div style={{ position: 'relative', width: '100%', height: '300px' }}>
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={1}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
            cropShape="round"
          />
        </div>
      )}

      {isEditing && (
        <div style={{ marginTop: '10px' }}>
          <Slider
            value={zoom}
            min={1}
            max={3}
            step={0.1}
            aria-labelledby="Zoom"
            onChange={(e, zoom) => setZoom(zoom as number)}
          />
        </div>
      )}

      {imageSrc && (
        <div style={{ marginTop: '10px' }}>
          <Button onClick={handleSaveCroppedImage} variant="contained" color="primary" style={{ marginRight: '10px' }}>
            Save
          </Button>
          <Button onClick={handleEdit} variant="outlined" color="secondary" disabled={isEditing}>
            Edit
          </Button>
        </div>
      )}

      {croppedImage && !isEditing && (
        <div style={{ marginTop: '10px' }}>
          <h3>Cropped Image Preview:</h3>
          <img
            src={croppedImage}
            alt="Cropped"
            style={{
              width: '150px',
              height: '150px',
              borderRadius: '50%',
              objectFit: 'cover',
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ProfileCropper;
