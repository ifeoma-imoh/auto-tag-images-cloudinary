const cloudinary = require("cloudinary").v2;
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});
export default async function handler(req, res) {
  const image = JSON.parse(req.body.image);
  try {
    const cldResponse = await cloudinary.uploader.upload(image, {
      categorization: "google_tagging",
      auto_tagging: 0.6,
    });

    res.status(200).json(cldResponse);
  } catch (error) {
    console.log(error);
    res.json({ message: "an error occured while uploading image" });
  }
}

export const config = {
    api: {
      bodyParser: {
        sizeLimit: "4mb",
      },
    },
  };