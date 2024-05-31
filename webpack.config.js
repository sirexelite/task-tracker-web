const path = require("path");
module.exports = {
    mode: process.env.MODE,
    target: ["web", "es5"],
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/i,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            },
            {
                test: /\.(css|sass|scss)$/,
                use: [{
                    loader: 'css-loader',
                    options: {
                        url: false
                    }
                }, {
                    loader: 'resolve-url-loader',
                    options: {
                        absolutePath: true
                    }
                }, {
                    loader: 'sass-loader',
                    options: {
                        sourceMap: true
                    }
                }]
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                use: [
                    {
                        loader: 'file-loader',
                    },
                ],
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
}