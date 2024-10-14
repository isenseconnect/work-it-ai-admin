module.exports = {
  apps: [
    {
      name: "did it with ai - admin",
      script: "npx",
      args: "next start -p 5000",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
