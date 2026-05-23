const app = require('./app');
const config = require('./config');
const connectDB = require('./config/db');

const startServer = async () => {
  try {
    if (!config.jwtSecret) {
      throw new Error('JWT_SECRET is not defined in environment variables');
    }

    await connectDB();

    app.listen(config.port, () => {
      console.log(`Server running in ${config.nodeEnv} mode on port ${config.port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();
