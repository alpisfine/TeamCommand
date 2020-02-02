module.exports = {
  apps : [{
    name: 'TeamCommand',
    script: 'index.js',

    // Options reference: https://pm2.keymetrics.io/docs/usage/application-declaration/
    args: '',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    },
    env_webhook: {
      port: 27777,
      path: "/TeamCommand",
      secret: "nonono",
      pre_hook: "npm install",
      action: "pullAndReload",
  }
  }]
};
