export const uploadToCloudinary = async (file: File) => {
    const formData = new FormData();

    formData.append("file", file);
    formData.append(
        "upload_preset",
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!
    );

    const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/image/upload`,
        {
            method: "POST",
            body: formData,
        }
    );

    if (!res.ok) {
        console.log("sdlkfajsldkjf cloudinary error",res)
        throw new Error("Failed to upload image to Cloudinary");
    }

    const data = await res.json();

    return {
        url: data.secure_url,
        publicId: data.public_id,
    };
};
