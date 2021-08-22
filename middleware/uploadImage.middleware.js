const fs = require('fs');


module.exports = async function(req, res, next) {
    try {
        if(!req.files || Object.keys(req.files).length === 0)
            return res.status(400).json({message:"no"})
            
        const file = req.files.file;
        
        console.log(file)

        if(file.size > 2048 * 2048){
            //removeTmp(file.tempFilePath)
            fs.unlink(
                file.tempFilePath, 
                (err => {
                    if(err) console.log(err)
                }))
            return res.status(400).json({message: "Size too large."})
        } 

        if(file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png'){
            removeTmp(file.tempFilePath)
            return res.status(400).json({message: "File format is incorrect."})
        }

        next()
        
    } catch (err) {
        return res.status(500).json({message: err.message})
    }
}

const removeTmp = (path) => {
    fs.unlink(path, err => {
        if(err) console.log(err)
    })
}