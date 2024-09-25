module.exports = {
  apps: [
    {
      name: "did it with ai - admin",
      script: "npx",
      args: "next start -p 3000",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
