module.exports =
{
    apps :
    [
        {
            name: "halloween",
            script: "./server.js",
            instances : "1",
            exec_mode : "cluster",
            error_file : "err.log",
            out_file : "out.log",
            merge_logs : true,
            log_date_format : "YYYY-MM-DD HH:mm Z",
            watch: false,
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