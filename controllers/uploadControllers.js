const cloudinary = require('cloudinary')
const fs = require('fs')
const config = require('config')

cloudinary.config({ 
    cloud_name: config.cloud_name, 
    api_key: config.api_key, 
    api_secret: config.api_secret 
  });

const uploadControllers = {
    uploadAvatar: async (req, res) => {
        try {
            const file = req.files.file
            
            cloudinary.v2.uploader.upload(file.tempFilePath, {
                folder: 'avatar', width: 150, height: 150, crop: "fill"
            }, async(err, result) => {
                if(err) throw err
                fs.unlink(
                    file.tempFilePath, 
                    (err => {
                        if(err) console.log(err)
                    }))
                    
                res.json({url: result.secure_url})
            })
        
        } catch (e) {
            return res.status(500).json({message: e.message})
        }
    }
}

module.exports = uploadControllers