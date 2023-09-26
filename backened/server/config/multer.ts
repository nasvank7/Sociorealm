import multer ,{Multer,FileFilterCallback} from 'multer'
import path from 'path';
import express, {Request, Response, NextFunction } from 'express';

const app = express();

// Your `multer` configuration
const max = 50 * 1024 * 1024;

const multerMiddleware = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    const ext = path.extname(file.originalname);
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
      cb(null, false); // Indicate that the file is not supported
    } else {
      cb(null, true); // Indicate that the file is supported
    }
  },
  
  limits: {
    fileSize: max,
  },
});

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof multer.MulterError) {
    // Multer-related errors, e.g., file size limit exceeded
    return res.status(400).json({ message: err.message });
  } else if (err) {
    // Other application-specific errors
    return res.status(500).json({ message: "Internal Server Error" });
  }
  next();
});

export default multerMiddleware;
