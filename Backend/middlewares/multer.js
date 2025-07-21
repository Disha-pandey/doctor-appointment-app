// utils/multer.js
import multer from 'multer';

const storage = multer.memoryStorage(); // ✅ No destination or filename

const upload = multer({ storage });

export default upload;
