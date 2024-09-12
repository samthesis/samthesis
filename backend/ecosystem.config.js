module.exports = {
  apps: [
    {
      name: 'new-app',                // Application name
      script: './index.ts',           // Entry point
      interpreter: 'ts-node',         // Use ts-node to run TypeScript files
      instances: "max",                   // Number of instances to run
      autorestart: true,              // Automatically restart the app
      watch: false,                   // Disable watching in production
      max_memory_restart: '1G',       // Restart if memory usage exceeds 1GB
      // env: {
      //   NODE_ENV: 'development',
      //   PORT: 4000,                   // Development port
      //   API_URL: 'http://localhost:4000/api',
      //   DB_HOST: '13.239.30.115',
      //   DB_USER: 'sst',
      //   DB_PASSWORD: 'gIQnRpf6CmZVR1ys',
      // },
      // env_production: {
      //   NODE_ENV: 'production',
      //   PORT: 4000,                   // Production port
      //   API_URL: 'http://localhost:4000/',
      //   DB_HOST: '13.239.30.115',
      //   DB_USER: 'sst',
      //   DB_PASSWORD: 'gIQnRpf6CmZVR1ys',
      //   DB_NAME: 'sst',
      // },
      // env_staging: {
      //   NODE_ENV: 'staging',
      //   PORT: 4000,                   // Staging port
      //   API_URL: 'https://staging.yourapp.com/api',
      //   DB_HOST: 'staging-db-host',
      //   DB_USER: 'staging_user',
      //   DB_PASSWORD: 'staging_password',
      // }
    }
  ]
};
