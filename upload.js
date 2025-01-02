import { v2 as cloudinary } from "cloudinary";
import { configDotenv } from "dotenv";

// Configure Cloudinary
configDotenv();

cloudinary.config({
  cloud_name: "dpnzmcban",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImages = async (filePaths) => {
  if (!Array.isArray(filePaths) || filePaths.length === 0) {
    throw new Error(
      "Invalid file paths provided. Please provide an array of file paths."
    );
  }

  try {
    const uploadPromises = filePaths.map((filepath) =>
      cloudinary.uploader.upload(filepath, {
        folder: "accommodation",
        use_filename: true,
        unique_filename: false,
      })
    );

    const results = await Promise.all(uploadPromises);
    const uploadedUrls = results.map((result) => result.secure_url);

    console.log("Uploaded URLs:", uploadedUrls);
    return uploadedUrls;
  } catch (error) {
    console.error("Failed to upload images:", error.message);
    throw new Error("Error uploading images to Cloudinary.");
  }
};

const generateTransformedUrl = (publicId) => {
  try {
    return cloudinary.url(publicId, {
      transformation: [
        {
          quality: "auto",
          fetch_format: "auto",
        },
        {
          width: 1000,
          height: 1000,
          crop: "fill",
          gravity: "auto",
        },
      ],
    });
  } catch (error) {
    console.error("Failed to generate transformed URL:", error.message);
    throw new Error("Error generating transformed URL.");
  }
};

// Example usage
(async () => {
  const images = [
    "./accommodation/apartment/apartment-1.jpg",
    "./accommodation/apartment/apartment-2.jpg",
    "./accommodation/apartment/apartment-3.jpg",
    "./accommodation/apartment/apartment-4.jpg",
    "./accommodation/apartment/apartment-5.jpg",
    "./accommodation/apartment/apartment-6.jpg",
    "./accommodation/apartment/apartment-7.jpg",
    "./accommodation/apartment/apartment-8.jpg",
    "./accommodation/apartment/apartment-9.jpg",
    "./accommodation/apartment/apartment-10.jpg",
  ];

  try {
    const uploadedUrls = await uploadImages(images);
    console.log("Uploaded URLs:", uploadedUrls);

    if (uploadedUrls.length > 0) {
      // Extract public_id from the first uploaded URL
      const publicId = uploadedUrls[0]
        .split("/")
        .slice(-2) // Handle nested folder structures
        .join("/")
        .split(".")[0]; // Remove file extension

      const transformedUrl = generateTransformedUrl(publicId);
      console.log("Transformed URL:", transformedUrl);
    } else {
      console.warn("No uploaded URLs found.");
    }
  } catch (error) {
    console.error("Error in image upload or URL generation:", error.message);
  }
})();

// const url = cloudinary.url("bedroom-490779_1280_qy8dxb", {
//   transformation: [
//     {
//       fetch_format: "auto",
//     },
//     { quality: "auto" },
//   ],
// });

// console.log(url);
