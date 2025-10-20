"use client";

import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  MenuItem,
  Switch,
  FormControlLabel,
} from "@mui/material";
import { StoreCategory, defaultBusinessHours } from "@/app/collections/schema";
import { StoreService } from "@/app/lib/services/store-services/storeServices";
import { auth } from "@/app/config/firebase";
import { useRouter } from "next/navigation";

const categories: StoreCategory[] = [
  "electronics",
  "fashion",
  "home-garden",
  "beauty-health",
  "sports-outdoors",
  "food-grocery",
  "books-media",
  "toys-games",
  "automotive",
  "other",
];

const CreateStoreForm = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    // ownerId: "user123",  
    storeName: "",
    description: "",
    category: "other",
    email: "",
    phone: "",
    website: "",
    address: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
    },
    settings: {
      allowReturns: true,
      returnPeriod: 7,
      minimumOrder: 0,
      freeShippingThreshold: 0,
    },
    socialMedia: {
      facebook: "",
      instagram: "",
      twitter: "",
    },
    businessHours: defaultBusinessHours,
    isActive: true,
    isVerified: false,
  });
  const user = auth.currentUser;
 const router = useRouter()
  // ✅ Handle top-level field changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Handle nested field changes (like address, socialMedia, etc.)
  const handleNestedChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    section: keyof typeof formData
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [section]: { ...(prev[section] as any), [name]: value },
    }));
  };

  // ✅ Submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!user) {
        alert('Sign in first please')
        return;
      }else{
        const storeId = await StoreService.createStore({
          ...formData,
          ownerId: user?.uid
        });
        alert(`✅ Store created successfully! (ID: ${storeId})`);
        // Optionally reset form
        setFormData({
          ...formData,
          storeName: "",
          description: "",
          category: "other",
          email: "",
          phone: "",
          website: "",
          address: {
            street: "",
            city: "",
            state: "",
            zipCode: "",
            country: "",
          },
        });
      }
     router.push('/dashboard')
    } catch (error) {
      console.error("❌ Error creating store:", error);
      alert("Failed to create store. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" py={4}>
      <Card
        sx={{
          width: "100%",
          maxWidth: 900,
          p: 4,
          borderRadius: 3,
          boxShadow: "0 4px 25px rgba(0,0,0,0.08)",
          backgroundColor: "#fff",
        }}
      >
        <Typography variant="h5" fontWeight={600} mb={3}>
          🏪 Create Your Store
        </Typography>

        <CardContent>
          <form onSubmit={handleSubmit}>
            {/* BASIC INFO */}
            <Box display="flex" flexDirection="column" gap={2} mb={3}>
              <TextField
                label="Store Name"
                name="storeName"
                value={formData.storeName}
                onChange={handleChange}
                fullWidth
                required
              />
              <TextField
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                multiline
                minRows={3}
                fullWidth
              />
              <TextField
                select
                label="Category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                fullWidth
              >
                {categories.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat.replace("-", " ").toUpperCase()}
                  </MenuItem>
                ))}
              </TextField>
            </Box>

            {/* CONTACT INFO */}
            <Typography variant="h6" fontWeight={600} mb={1}>
              Contact Information
            </Typography>
            <Box display="flex" flexDirection="column" gap={2} mb={3}>
              <TextField
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                label="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                label="Website"
                name="website"
                value={formData.website}
                onChange={handleChange}
                fullWidth
              />
            </Box>

            {/* ADDRESS */}
            <Typography variant="h6" fontWeight={600} mb={1}>
              Address
            </Typography>
            <Box display="flex" flexDirection="column" gap={2} mb={3}>
              <TextField
                label="Street"
                name="street"
                value={formData.address.street}
                onChange={(e) => handleNestedChange(e, "address")}
              />
              <Box display="flex" gap={2} flexWrap="wrap">
                <TextField
                  label="City"
                  name="city"
                  value={formData.address.city}
                  onChange={(e) => handleNestedChange(e, "address")}
                  sx={{ flex: 1 }}
                />
                <TextField
                  label="State"
                  name="state"
                  value={formData.address.state}
                  onChange={(e) => handleNestedChange(e, "address")}
                  sx={{ flex: 1 }}
                />
              </Box>
              <Box display="flex" gap={2} flexWrap="wrap">
                <TextField
                  label="Zip Code"
                  name="zipCode"
                  value={formData.address.zipCode}
                  onChange={(e) => handleNestedChange(e, "address")}
                  sx={{ flex: 1 }}
                />
                <TextField
                  label="Country"
                  name="country"
                  value={formData.address.country}
                  onChange={(e) => handleNestedChange(e, "address")}
                  sx={{ flex: 1 }}
                />
              </Box>
            </Box>

            {/* STORE SETTINGS */}
            <Typography variant="h6" fontWeight={600} mb={1}>
              Store Settings
            </Typography>
            <Box display="flex" flexDirection="column" gap={2} mb={3}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.settings.allowReturns}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        settings: {
                          ...prev.settings,
                          allowReturns: e.target.checked,
                        },
                      }))
                    }
                  />
                }
                label="Allow Returns"
              />
              <TextField
                label="Return Period (days)"
                type="number"
                name="returnPeriod"
                value={formData.settings.returnPeriod}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    settings: {
                      ...prev.settings,
                      returnPeriod: +e.target.value,
                    },
                  }))
                }
              />
              <TextField
                label="Minimum Order Amount"
                type="number"
                name="minimumOrder"
                value={formData.settings.minimumOrder}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    settings: {
                      ...prev.settings,
                      minimumOrder: +e.target.value,
                    },
                  }))
                }
              />
              <TextField
                label="Free Shipping Threshold"
                type="number"
                name="freeShippingThreshold"
                value={formData.settings.freeShippingThreshold}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    settings: {
                      ...prev.settings,
                      freeShippingThreshold: +e.target.value,
                    },
                  }))
                }
              />
            </Box>

            {/* SOCIAL MEDIA */}
            <Typography variant="h6" fontWeight={600} mb={1}>
              Social Media
            </Typography>
            <Box display="flex" flexDirection="column" gap={2} mb={4}>
              <TextField
                label="Facebook URL"
                name="facebook"
                value={formData.socialMedia.facebook}
                onChange={(e) => handleNestedChange(e, "socialMedia")}
              />
              <TextField
                label="Instagram URL"
                name="instagram"
                value={formData.socialMedia.instagram}
                onChange={(e) => handleNestedChange(e, "socialMedia")}
              />
              <TextField
                label="Twitter URL"
                name="twitter"
                value={formData.socialMedia.twitter}
                onChange={(e) => handleNestedChange(e, "socialMedia")}
              />
            </Box>

            <Button
              variant="contained"
              type="submit"
              fullWidth
              color="primary"
              sx={{ py: 1.4, fontWeight: 600 }}
              disabled={loading}
            >
              {loading ? "Creating Store..." : "Create Store"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CreateStoreForm;
