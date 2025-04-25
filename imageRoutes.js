import express from 'express';
import multer from 'multer';
import path from 'path';

const router = express.Router();


const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});

const upload = multer({ storage: storage });

let uploadedImages = [];

router.get('/', (req, res) => {
  res.render('index', { images: uploadedImages });
});

router.get('/upload', (req, res) => {
  res.render('upload');
});

router.post('/upload', upload.array('images', 10), (req, res) => {
  const imagePaths = req.files.map(file => `/uploads/${file.filename}`);
  uploadedImages = uploadedImages.concat(imagePaths);
  res.redirect('/');
});

export default router;