import React, { useId } from 'react';
import {
  Box,
  TextField,
  MenuItem,
  Button,
  Typography,
  Card,
  CardMedia,
  Chip,
  IconButton,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  Grid,
} from '@mui/material';
import {
  Store as StoreIcon,
  Email,
  Phone,
  LocationOn,
  AddPhotoAlternate,
  Delete,
  CloudUpload,
} from '@mui/icons-material';
import { STORE_CATEGORIES, IMAGE_UPLOAD_CONFIG } from '@/app/constants/store';

// Image Upload Components
// export const LogoUpload: React.FC<{
//   preview: string;
//   onUpload: (files: FileList | null) => void;
//   onRemove: () => void;
//   required?: boolean;
// }> = ({ preview, onUpload, onRemove, required = false }) => {
//   const fileInputId = useId();
  
//   return (
//     <Card variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
//       <Typography variant="subtitle1" gutterBottom>
//         Store Logo {required && '*'}
//       </Typography>
//       <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
//         Recommended: {IMAGE_UPLOAD_CONFIG.LOGO_RECOMMENDED_SIZE}, PNG or JPG
//       </Typography>

//       {preview ? (
//         <Box sx={{ position: 'relative', display: 'inline-block' }}>
//           <CardMedia
//             component="img"
//             image={preview}
//             alt="Store logo preview"
//             sx={{ width: 120, height: 120, borderRadius: 1, objectFit: 'cover', mx: 'auto' }}
//           />
//           <IconButton
//             size="small"
//             onClick={onRemove}
//             sx={{
//               position: 'absolute', top: -8, right: -8,
//               backgroundColor: 'error.main', color: 'white',
//               '&:hover': { backgroundColor: 'error.dark' }
//             }}
//           >
//             <Delete fontSize="small" />
//           </IconButton>
//         </Box>
//       ) : (
//         <Box>
//           <input 
//             type="file" 
//             hidden 
//             id={fileInputId}
//             accept="image/*" 
//             onChange={(e) => onUpload(e.target.files)}
//             required={required}
//           />
//           <label htmlFor={fileInputId}>
//             <Button 
//               component="span" 
//               variant="outlined" 
//               startIcon={<CloudUpload />} 
//               sx={{ mb: 1 }}
//             >
//               Upload Logo
//             </Button>
//           </label>
//         </Box>
//       )}
//     </Card>
//   );
// };

// export const BannerUpload: React.FC<{
//   preview: string;
//   onUpload: (files: FileList | null) => void;
//   onRemove: () => void;
// }> = ({ preview, onUpload, onRemove }) => {
//   const fileInputId = useId();
  
//   return (
//     <Card variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
//       <Typography variant="subtitle1" gutterBottom>Store Banner</Typography>
//       <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
//         Recommended: {IMAGE_UPLOAD_CONFIG.BANNER_RECOMMENDED_SIZE}, PNG or JPG
//       </Typography>

//       {preview ? (
//         <Box sx={{ position: 'relative', display: 'inline-block' }}>
//           <CardMedia
//             component="img"
//             image={preview}
//             alt="Store banner preview"
//             sx={{ width: 200, height: 100, borderRadius: 1, objectFit: 'cover', mx: 'auto' }}
//           />
//           <IconButton
//             size="small"
//             onClick={onRemove}
//             sx={{
//               position: 'absolute', top: -8, right: -8,
//               backgroundColor: 'error.main', color: 'white',
//               '&:hover': { backgroundColor: 'error.dark' }
//             }}
//           >
//             <Delete fontSize="small" />
//           </IconButton>
//         </Box>
//       ) : (
//         <Box>
//           <input 
//             type="file" 
//             hidden 
//             id={fileInputId}
//             accept="image/*" 
//             onChange={(e) => onUpload(e.target.files)} 
//           />
//           <label htmlFor={fileInputId}>
//             <Button 
//               component="span" 
//               variant="outlined" 
//               startIcon={<CloudUpload />} 
//               sx={{ mb: 1 }}
//             >
//               Upload Banner
//             </Button>
//           </label>
//         </Box>
//       )}
//     </Card>
//   );
// };

// export const StoreImagesUpload: React.FC<{
//   previews: string[];
//   onUpload: (files: FileList | null) => void;
//   onRemove: (index: number) => void;
// }> = ({ previews, onUpload, onRemove }) => {
//   const fileInputId = useId();
  
//   return (
//     <Card variant="outlined" sx={{ p: 2 }}>
//       <Typography variant="subtitle1" gutterBottom>Store Images</Typography>
//       <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
//         Upload up to {IMAGE_UPLOAD_CONFIG.MAX_STORE_IMAGES} images of your store 
//         (Recommended: {IMAGE_UPLOAD_CONFIG.STORE_IMAGES_RECOMMENDED_SIZE})
//       </Typography>

//       <Grid container spacing={2}>
//         {previews.map((preview, index) => (
//           <Grid size={{ xs: 6, sm: 4, md: 3 }} key={index}>
//             <Card sx={{ position: 'relative' }}>
//               <CardMedia
//                 component="img"
//                 image={preview}
//                 alt={`Store image ${index + 1}`}
//                 sx={{ height: 120, objectFit: 'cover' }}
//               />
//               <IconButton
//                 size="small"
//                 onClick={() => onRemove(index)}
//                 sx={{
//                   position: 'absolute', top: 4, right: 4,
//                   backgroundColor: 'error.main', color: 'white',
//                   '&:hover': { backgroundColor: 'error.dark' }
//                 }}
//               >
//                 <Delete fontSize="small" />
//               </IconButton>
//               <Chip
//                 label={`${index + 1}`}
//                 size="small"
//                 sx={{
//                   position: 'absolute', top: 4, left: 4,
//                   backgroundColor: 'rgba(0,0,0,0.7)', color: 'white'
//                 }}
//               />
//             </Card>
//           </Grid>
//         ))}

//         {previews.length < IMAGE_UPLOAD_CONFIG.MAX_STORE_IMAGES && (
//           <Grid size={{ xs: 6, sm: 4, md: 3 }}>
//             <input 
//               type="file" 
//               hidden 
//               multiple 
//               id={fileInputId}
//               accept="image/*" 
//               onChange={(e) => onUpload(e.target.files)} 
//             />
//             <label htmlFor={fileInputId}>
//               <Button
//                 component="span"
//                 variant="outlined"
//                 sx={{ height: 120, width: '100%', borderStyle: 'dashed' }}
//                 startIcon={<AddPhotoAlternate />}
//               >
//                 Add Image
//               </Button>
//             </label>
//           </Grid>
//         )}
//       </Grid>

//       {previews.length > 0 && (
//         <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
//           {previews.length}/{IMAGE_UPLOAD_CONFIG.MAX_STORE_IMAGES} images selected
//         </Typography>
//       )}
//     </Card>
//   );
// };

// Form Field Components
export const StoreBasicInfo: React.FC<{
  formData: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSelectChange: (e: any) => void;
}> = ({ formData, onChange, onSelectChange }) => (
  <>
    <Grid size={{ xs: 12, md: 6 }}>
      <TextField
        required
        fullWidth
        id="storeName"
        name="storeName"
        label="Store Name"
        value={formData.storeName}
        onChange={onChange}
        placeholder="Enter your store name"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <StoreIcon color="action" />
            </InputAdornment>
          ),
        }}
      />
    </Grid>

    <Grid size={{ xs: 12, md: 6 }}>
      <FormControl fullWidth required>
        <InputLabel id="category-label">Category</InputLabel>
        <Select
          labelId="category-label"
          id="category"
          name="category"
          value={formData.category}
          label="Category"
          onChange={onSelectChange}
        >
          {STORE_CATEGORIES.map((category) => (
            <MenuItem key={category.value} value={category.value}>
              {category.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>

    <Grid size={{ xs: 12 }}>
      <TextField
        required
        fullWidth
        multiline
        rows={3}
        id="description"
        name="description"
        label="Store Description"
        value={formData.description}
        onChange={onChange}
        placeholder="Describe your store and what you sell"
      />
    </Grid>
  </>
);

export const ContactInfo: React.FC<{
  formData: any;
  userEmail: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}> = ({ formData, userEmail, onChange }) => (
  <>
    <Grid size={{ xs: 12, md: 6 }}>
      <TextField
        required
        fullWidth
        id="phone"
        name="phone"
        label="Phone Number"
        value={formData.phone}
        onChange={onChange}
        placeholder="Enter your phone number"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Phone color="action" />
            </InputAdornment>
          ),
        }}
      />
    </Grid>

    <Grid size={{ xs: 12, md: 6 }}>
      <TextField
        fullWidth
        id="email"
        name="email"
        label="Email"
        value={userEmail}
        disabled
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Email color="action" />
            </InputAdornment>
          ),
        }}
        helperText="This is your account email"
      />
    </Grid>

    <Grid size={{ xs: 12 }}>
      <TextField
        fullWidth
        id="website"
        name="website"
        label="Website (Optional)"
        value={formData.website}
        onChange={onChange}
        placeholder="https://example.com"
        helperText="Your store's website URL"
      />
    </Grid>
  </>
);

export const AddressInfo: React.FC<{
  formData: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}> = ({ formData, onChange }) => (
  <>
    <Grid size={{ xs: 12 }}>
      <TextField
        required
        fullWidth
        id="street"
        name="street"
        label="Street Address"
        value={formData.street}
        onChange={onChange}
        placeholder="Enter your street address"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LocationOn color="action" />
            </InputAdornment>
          ),
        }}
      />
    </Grid>

    <Grid size={{ xs: 12, md: 6 }}>
      <TextField
        required
        fullWidth
        id="city"
        name="city"
        label="City"
        value={formData.city}
        onChange={onChange}
        placeholder="Enter your city"
      />
    </Grid>

    <Grid size={{ xs: 12, md: 6 }}>
      <TextField
        required
        fullWidth
        id="state"
        name="state"
        label="State/Province"
        value={formData.state}
        onChange={onChange}
        placeholder="Enter your state or province"
      />
    </Grid>

    <Grid size={{ xs: 12, md: 6 }}>
      <TextField
        required
        fullWidth
        id="country"
        name="country"
        label="Country"
        value={formData.country}
        onChange={onChange}
        placeholder="Enter your country"
      />
    </Grid>

    <Grid size={{ xs: 12, md: 6 }}>
      <TextField
        required
        fullWidth
        id="zipCode"
        name="zipCode"
        label="ZIP/Postal Code"
        value={formData.zipCode}
        onChange={onChange}
        placeholder="Enter your ZIP or postal code"
      />
    </Grid>
  </>
);