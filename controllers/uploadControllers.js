const cloudinary = require('cloudinary')
const fs = require('fs')

/*cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})*/

const uploadControllers = {
    uploadAvatar: async (req, res) => {
        try {
            /*const file = req.files.file
            
            cloudinary.v2.uploader.upload(file.tempFilePath, {
                folder: 'avatar', width: 150, height: 150, crop: "fill"
            }, async(err, result) => {
                if(err) throw err

                //removeTmp(file.tempFilePath)
                fs.unlink(
                    file.tempFilePath, 
                    (err => {
                        if(err) console.log(err)
                    }))
                    
                res.json({url: result.secure_url})
            })*/
        
        } catch (e) {
            return res.status(500).json({message: e.message})
        }
    }
}

module.exports = uploadControllers