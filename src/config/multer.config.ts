import { diskStorage } from 'multer';
import * as path from 'path';

export default const videoClassUploadConfig = {
  storage: diskStorage({
    destination: './uploads/video-classes',
    filename: (req, file, cb) => {
      const fileName =
        path.parse(file.originalname).name.replace(/\s/g, '') + '-'

      const extension = path.parse(file.originalname).ext;
      cb(null, `${fileName}${extension}`);
    },
  }),
};

