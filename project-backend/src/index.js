// //це все з конспекту, підключення бази

// import { initMongoDB } from './db/initMongoDB.js';
// import { startServer } from './server.js';

// const bootstrap = async () => {
//   await initMongoDB();
//   startServer();
// };

// bootstrap();

// src/index.js
import { startServer } from './server.js';

startServer(3000);
