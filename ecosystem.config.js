module.exports =
{
    apps :
    [
        {
            name: "halloween",
            script: "./server.js",
            env:
            {
                "PORT": 3000,
                "MONGODB_URI": "",
                "NODE_ENV": "dev"
            },
            env_production:
            {
                "PORT": 80,
                "MONGODB_URI": "",
                "NODE_ENV": "prod"
            }
        }
    ]
}