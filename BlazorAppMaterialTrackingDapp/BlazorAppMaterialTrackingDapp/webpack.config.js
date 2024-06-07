/// <binding BeforeBuild='Run - Development (old)' />
const path = require('path');

module.exports = {
    entry: {
        app: './Scripts/app'
    },
    mode: 'production',
    optimization: {
        minimize: false,
        splitChunks: {
            chunks: 'all',
            minSize: 0,
            name: 'shared'
        }
    },
    devServer: {
        contentBase: ".",
        host: "localhost",
        port: 7143
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'wwwroot/js'),
        library: 'sample',
        libraryTarget: 'umd'
    }
};