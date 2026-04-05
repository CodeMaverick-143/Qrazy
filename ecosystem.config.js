module.exports = {
  apps: [
    {
      name: 'qrazy-backend',
      script: 'src/server.js',
      cwd: './server',
      instances: 'max',
      exec_mode: 'cluster',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env_production: {
        NODE_ENV: 'production',
        PORT: 5000
      },
      wait_ready: true,
      listen_timeout: 10000,
      exp_backoff_restart_delay: 100
    },
    {
      name: 'qrazy-frontend',
      script: 'serve',
      cwd: './client',
      env: {
        PM2_SERVE_PATH: './dist',
        PM2_SERVE_PORT: 3000,
        PM2_SERVE_SPA: 'true',
        PM2_SERVE_HOMEPAGE: './index.html'
      }
    }
  ]
};
