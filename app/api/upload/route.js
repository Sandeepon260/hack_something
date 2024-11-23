import multer from 'multer';
import nextConnect from 'next-connect';
import path from 'path';
import fs from 'fs';

// Setup storage to save uploaded files to the "public/uploads" directory
const upload = multer({
  storage: multer.diskStorage({
    destination: './public/uploads',
    filename: (req, file, cb) => cb(null, file.originalname),
  }),
  fileFilter: (req, file, cb) => {
    const fileExt = path.extname(file.originalname).toLowerCase();
    if (fileExt === '.jpg' || fileExt === '.png') {
      cb(null, true);
    } else {
      cb(new Error('Only .jpg and .png files are allowed'));
    }
  },
});

const apiRoute = nextConnect({
  onError(error, req, res) {
    res.status(501).json({ error: `Error: ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  },
});

apiRoute.use(upload.single('file'));

apiRoute.post((req, res) => {
  res.status(200).json({ filePath: `/uploads/${req.file.filename}` });
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Disabling bodyParser to handle raw file uploads
  },
};
