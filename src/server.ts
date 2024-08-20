import app from './app';
import sequelize from './config/database';

const startServer = async (): Promise<void> => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();  // Sync database tables
        console.log('Database connected!');
        app.listen(3000, () => console.log('Server is running on port 3000'));
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

startServer();
