const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});

export default async function handler(req, res) {
  try {
    const tag = JSON.parse(req.body.tag).tag;
    const resources = await cloudinary.api.resources_by_tag(tag);

    res.status(200).json(resources);
  } catch (error) {
    console.log(error);
    res.json({ message: "an error occured" });
  }
}
