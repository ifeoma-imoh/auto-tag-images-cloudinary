const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});
export default async function handler(req, res) {
  try {
    const imageTags = await cloudinary.api.tags({
      max_results: 50,
    });
    res.status(200).json(imageTags);
  } catch (error) {
    console.log(error);
    res.json({ message: "an error occurred" });
  }
}
