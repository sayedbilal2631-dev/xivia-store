import { useState, useRef } from 'react';
import { 
  StoreFormData, 
  ImageFiles, 
  ImagePreviews, 
  CreateStoreData,
} from '@/app/collections/store';
import {  IMAGE_UPLOAD_CONFIG } from '@/app/constants/store';

export const useStoreForm = (userEmail: string, userId: string) => {
  const [formData, setFormData] = useState<StoreFormData>({
    storeName: '',
    description: '',
    category: 'fashion',
    phone: '',
    street: '',
    city: '',
    state: '',
    country: '',
    zipCode: '',
  });

  const [imageFiles, setImageFiles] = useState<ImageFiles>({
    logo: null,
    banner: null,
    images: []
  });

  const [imagePreviews, setImagePreviews] = useState<ImagePreviews>({
    logo: '',
    banner: '',
    images: []
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const logoInputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);
  const imagesInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (type: 'logo' | 'banner' | 'images', files: FileList | null) => {
    if (!files || files.length === 0) return;

    if (type === 'logo' || type === 'banner') {
      const file = files[0];
      if (file) {
        setImageFiles(prev => ({ ...prev, [type]: file }));
        const previewUrl = URL.createObjectURL(file);
        setImagePreviews(prev => ({ ...prev, [type]: previewUrl }));
      }
    } else if (type === 'images') {
      const newFiles = Array.from(files);
      setImageFiles(prev => ({
        ...prev,
        images: [...prev.images, ...newFiles].slice(0, IMAGE_UPLOAD_CONFIG.MAX_STORE_IMAGES)
      }));

      const newPreviews = newFiles.map(file => URL.createObjectURL(file));
      setImagePreviews(prev => ({
        ...prev,
        images: [...prev.images, ...newPreviews].slice(0, IMAGE_UPLOAD_CONFIG.MAX_STORE_IMAGES)
      }));
    }
  };

  const removeImage = (type: 'logo' | 'banner' | 'images', index?: number) => {
    if (type === 'logo' || type === 'banner') {
      setImageFiles(prev => ({ ...prev, [type]: null }));
      setImagePreviews(prev => ({ ...prev, [type]: '' }));
    } else if (type === 'images' && index !== undefined) {
      setImageFiles(prev => ({
        ...prev,
        images: prev.images.filter((_, i) => i !== index)
      }));
      setImagePreviews(prev => ({
        ...prev,
        images: prev.images.filter((_, i) => i !== index)
      }));
    }
  };

  const uploadImagesToServer = async (): Promise<{ logo: string; banner: string; images: string[] }> => {
    const uploadPromises = [];

    if (imageFiles.logo) {
      uploadPromises.push(
        new Promise<string>((resolve) => {
          setTimeout(() => {
            resolve(`https://example.com/images/logo-${Date.now()}.jpg`);
          }, 500);
        })
      );
    }

    if (imageFiles.banner) {
      uploadPromises.push(
        new Promise<string>((resolve) => {
          setTimeout(() => {
            resolve(`https://example.com/images/banner-${Date.now()}.jpg`);
          }, 500);
        })
      );
    }

    const storeImagesPromises = imageFiles.images.map((_, index) =>
      new Promise<string>((resolve) => {
        setTimeout(() => {
          resolve(`https://example.com/images/store-${Date.now()}-${index}.jpg`);
        }, 500);
      })
    );

    const [logoUrl, bannerUrl, ...imageUrls] = await Promise.all([
      ...uploadPromises,
      ...storeImagesPromises
    ]);

    return {
      logo: imageFiles.logo ? logoUrl as string : '',
      banner: imageFiles.banner ? bannerUrl as string : '',
      images: imageUrls as string[]
    };
  };

  const createStoreData = (uploadedImages: { logo: string; banner: string; images: string[] }): CreateStoreData => ({
    storeName: formData.storeName,
    description: formData.description,
    category: formData.category,
    ownerId: userId,
    isActive: true,
    isVerified: false,
    phone: formData.phone,
    email: userEmail,
    id: `store_${userId}_${Date.now()}`,
    settings: {
      notifications: true,
      currency: 'USD',
    },
    contactInfo: {
      email: userEmail,
      phone: formData.phone,
    },
    address: {
      street: formData.street,
      city: formData.city,
      state: formData.state,
      country: formData.country,
      zipCode: formData.zipCode,
    },
    media: {
      logo: uploadedImages.logo,
      banner: uploadedImages.banner,
      images: uploadedImages.images
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  const resetForm = () => {
    setFormData({
      storeName: '',
      description: '',
      category: 'fashion',
      phone: '',
      street: '',
      city: '',
      state: '',
      country: '',
      zipCode: '',
    });

    setImageFiles({
      logo: null,
      banner: null,
      images: []
    });

    setImagePreviews({
      logo: '',
      banner: '',
      images: []
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return {
    formData,
    imageFiles,
    imagePreviews,
    loading,
    error,
    success,
    logoInputRef,
    bannerInputRef,
    imagesInputRef,
    handleImageUpload,
    removeImage,
    uploadImagesToServer,
    createStoreData,
    resetForm,
    handleChange,
    handleSelectChange,
    setLoading,
    setError,
    setSuccess,
  };
};