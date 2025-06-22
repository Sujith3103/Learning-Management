const cloudinary = require("cloudinary").v2

//configure with env data
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

const uploadMediaToCloudinary = async (filepath) => {
    try {
        const result = await cloudinary.uploader.upload(filepath, {
            resource_type: "auto",
        }) 

        return result
    }
    catch (err) {
        console.log(err)
        throw new Error('Error uploading to cloudinary')
    }
}

const deleteMediaFromCloudinary = async (publicId) => {
    try {

        await cloudinary.uploader.destroy(publicId)

    } catch (error) {
        console.log(error);
        throw new Error('failed to delete asset from cloudinary')
    }
}

module.exports = {uploadMediaToCloudinary,deleteMediaFromCloudinary}