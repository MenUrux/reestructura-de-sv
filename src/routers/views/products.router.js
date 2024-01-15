import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import productController from '../../controllers/product.controller.js';
import { __dirname } from '../../utils.js';

const router = Router();
const uploadsDir = path.join(__dirname, '../public/uploads/');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

router.post('/products', upload.single('thumbnail'), async (req, res) => {
  try {
    let relativePath = '';
    if (req.file) {
      relativePath = path.relative(path.join(__dirname, '../public'), req.file.path);
    }

    const newProductData = {
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      code: req.body.code,
      stock: req.body.stock,
      thumbnail: relativePath
    };

    await productController.createProduct(newProductData);
    res.redirect('/products');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

export default router;
