import { diskStorage } from 'multer';
import { extname } from 'path';

export const storgeUserPicture = diskStorage({
  destination: './uploads/users',
  filename: (req, file, cb) => {
    const uqName = Date.now() + '-' + Math.round(Math.random() * 1e9);

    cb(null, uqName + extname(file.originalname));
  },
});
