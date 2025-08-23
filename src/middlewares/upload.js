
import multer from 'multer';
import cloudinary from '../uploads/cloudinary.js';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'recipes', 
    allowed_formats: ['jpg', 'jpeg', 'png']
  }
});

const upload = multer({ storage });

export default upload;