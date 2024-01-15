import mongoose from 'mongoose';
import config from '../config/db.config.js';

export const init = async () => {
  try {
    await mongoose.connect(config.db.uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database connected successfully 🚀');
  } catch (error) {
    console.error('Error al conectar con la base de datos: ', error);
  }
};