module.exports =
{
    apps :
    [
        {
            name: "gorza",
            script: "./server.js",
            env:
            {
                "PORT": 3000,
                "MONGODB_URI": "mongodb://gorza-dev:gorza-dev@cluster0-shard-00-00-fbe5x.mongodb.net:27017,cluster0-shard-00-01-fbe5x.mongodb.net:27017,cluster0-shard-00-02-fbe5x.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin",
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