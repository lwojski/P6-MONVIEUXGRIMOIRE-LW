const multer = require('multer')
const sharp = require('sharp')
const path = require('path')
const fs = require('fs')

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
}

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images')
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_')
        const extension = MIME_TYPES[file.mimetype]
        callback(null, name + Date.now() + '.' + extension)
    }
})

const upload = multer({ storage }).single('image')
const resizeImage = async (req, res, next) => {
    if (!req.file) {
      return next()
    }
    const inputPath = req.file.path
    const outputPath = path.join('images', 'resized_' + req.file.filename)

    try {
        await sharp(inputPath)
            .resize(400, 600, {
                fit: 'inside',
                withoutEnlargement: true
            })
            .toFile(outputPath)

        fs.unlink(inputPath, (err) => {
            if (err) {
                console.error('Erreur lors de la suppression du fichier original :', err)
            } else {
                console.log('Fichier original supprimé avec succès')
            }
        })

        req.file.path = outputPath
        req.file.filename = 'resized_' + req.file.filename

        next()
    } catch (error) {
      console.error('Erreur lors du redimensionnement de l\'image :', error)
      res.status(500).json({ error: 'Erreur lors du traitement de l\'image.' })
    }
}
  
module.exports = { upload, resizeImage }