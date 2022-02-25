import { diskStorage, Options } from 'multer';
import { resolve } from 'path';
import { randomBytes } from 'crypto';

// Caminho da pasta onde ficarão as imagens
const uploadsDest = resolve(__dirname, '..', '..', 'uploads');

export const multerConfig: Options = {
  dest: uploadsDest,
  // Local onde ficarão gravadas as imagens
  storage: diskStorage({
    destination: (request, file, callback) => {
      callback(null, uploadsDest);
    },
    filename: (request, file, callback) => {
      randomBytes(4, (error, hash) => {
        if (error) {
          callback(error, file.filename);
        }

        const extension = file.mimetype.replace('image/', '');
        const filename = `${hash.toString('hex')}.${extension}`;

        callback(null, filename);
      });
    },
  }),
  // Define o tamanho máximo de arquivo que pode ser feito o upload
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
  // Define quais tipos de arquivos podem ser enviados
  fileFilter: (request, file, callback) => {
    const formats = ['image/jpeg', 'image/png', 'image/jpg'];

    if (formats.includes(file.mimetype)) {
      callback(null, true);
    } else {
      callback(new Error('Formats not supported'));
    }
  },
};
