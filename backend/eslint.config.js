module.exports = [
    {
        files: ["**/*.js"],
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "commonjs",
            globals: {
                console: "readonly",
                process: "readonly",
                module: "readonly",
                require: "readonly",
                __dirname: "readonly",
                exports: "readonly"
            }
        },
        rules: {
            "no-unused-vars": "off",
            "no-undef": "error",
            "no-console": "off"
        }
    }
];
