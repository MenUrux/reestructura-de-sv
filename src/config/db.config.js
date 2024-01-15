import dotenv from 'dotenv';

// Carga las variables de entorno del archivo .env
dotenv.config();

const config = {
    db: {
        // Intenté hacer esto de producción y cambiar al otro y no logré hacerlo funcionar. 
        // En una próxima entrega voy a buscar la forma de hacerlo.
        uri: process.env.NODE_ENV === 'production' ? process.env.DB_URI_PROD : process.env.DB_URI,
    },
    port: process.env.PORT || 3000,
    secret: process.env.SESSION_SECRET,
};

export default config;