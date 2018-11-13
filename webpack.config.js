"use strict";

module.exports = [
    {
        context: __dirname,
        entry: "./index.js",
        mode: "production",
        devtool: "source-map",
        output: {
            path: __dirname,
            filename: "./dist/bigbit.js",
            library: "bigbit",
            libraryTarget: "var"
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    loader: "babel-loader"
                }
            ]
        },
        target: "web"
    }
];
