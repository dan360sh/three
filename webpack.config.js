const path = require('path');
module.exports = {
    mode: 'development',
    entry: './src/index.ts',
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.tsx?$/, // Применять к TypeScript и TypeScript-React файлам
                use: 'ts-loader', // Использовать ts-loader для компиляции TypeScript
                exclude: /node_modules/, // Исключить папку node_modules
            },
        ]
    }
}
