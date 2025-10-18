"use client"
import { useStoreForm } from '@/app/hooks/useStoreForm';
import {
  Box,
  Button,
  Typography,
  Paper,
  Grid,
  Alert,
  CircularProgress,
} from '@mui/material';
import {
  // LogoUpload,
  // BannerUpload,
  // StoreImagesUpload,
  StoreBasicInfo,
  ContactInfo,
  AddressInfo,
} from './storeFormComponent';
import { StoreService } from '@/app/lib/services/store-services/storeServices';

interface CreateStoreFormProps {
  userId: string;
  userEmail: string;
}

export function CreateStoreForm({ userId, userEmail }: CreateStoreFormProps) {
  const {
    formData,
    imageFiles,
    imagePreviews,
    loading,
    error,
    success,
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
  } = useStoreForm(userEmail, userId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const uploadedImages = await uploadImagesToServer();
      const storeData = createStoreData(uploadedImages);
      const storeId = await StoreService.createStore(storeData);

      setSuccess(`Store created successfully! Store ID: ${storeId}`);
      console.log('Store created with ID:', storeId);
      resetForm();

    } catch (error) {
      console.log('Failed to create store:', error);
      setError('Failed to create store. Please try again.', );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 1000, mx: 'auto' }}>
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Create Your Store
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Fill in the details below to set up your online store
        </Typography>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 3 }}>{success}</Alert>}

      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Grid container spacing={3}>
          {/* Store Images Section */}
          {/* <Grid size={{ xs: 12 }}>
            <Typography variant="h6" gutterBottom sx={{ borderBottom: 1, borderColor: 'divider', pb: 1 }}>
              Store Images
            </Typography>
          </Grid> */}

          {/* <Grid size={{ xs: 12, md: 6 }}>
            <LogoUpload
              preview={imagePreviews.logo}
              onUpload={(files) => handleImageUpload('logo', files)}
              onRemove={() => removeImage('logo')}
            />
          </Grid> */}

          {/* <Grid size={{ xs: 12, md: 6 }}>
            <BannerUpload
              preview={imagePreviews.banner}
              onUpload={(files) => handleImageUpload('banner', files)}
              onRemove={() => removeImage('banner')}
            />
          </Grid> */}

          {/* <Grid size={{ xs: 12 }}>
            <StoreImagesUpload
              previews={imagePreviews.images}
              onUpload={(files) => handleImageUpload('images', files)}
              onRemove={(index) => removeImage('images', index)}
            />
          </Grid> */}

          {/* Store Information */}
          <Grid size={{ xs: 12 }}>
            <Typography variant="h6" gutterBottom sx={{ borderBottom: 1, borderColor: 'divider', pb: 1, mt: 2 }}>
              Store Information
            </Typography>
          </Grid>
          <StoreBasicInfo formData={formData} onChange={handleChange} onSelectChange={handleSelectChange} />

          {/* Contact Information */}
          <Grid size={{ xs: 12 }}>
            <Typography variant="h6" gutterBottom sx={{ borderBottom: 1, borderColor: 'divider', pb: 1, mt: 2 }}>
              Contact Information
            </Typography>
          </Grid>
          <ContactInfo formData={formData} userEmail={userEmail} onChange={handleChange} />

          {/* Address Information */}
          <Grid size={{ xs: 12 }}>
            <Typography variant="h6" gutterBottom sx={{ borderBottom: 1, borderColor: 'divider', pb: 1, mt: 2 }}>
              Address Information
            </Typography>
          </Grid>
          <AddressInfo formData={formData} onChange={handleChange} />

          {/* Submit Button */}
          <Grid size={{ xs: 12 }}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading || !imageFiles.logo}
              sx={{ mt: 3, py: 1.5 }}
            >
              {loading ? (
                <>
                  <CircularProgress size={20} sx={{ mr: 2 }} />
                  Creating Store...
                </>
              ) : (
                'Create Store'
              )}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}