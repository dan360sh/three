const path = require('path');
module.exports = {
    mode: 'development',
    entry: './src/index.ts',
    devtool: 'source-map',
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
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
            {
                test: /\.(jpg|png|gif|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]', // сохранять оригинальные имена файлов и их расширения
                            outputPath: 'img/', // указать папку для сохранения изображений
                        },
                    },
                ],
            },
        ]
    },
    devServer: {
        static: {
            directory: path.join(__dirname),
            staticOptions: {
                watch: true, // добавлено
            },
        },
        port: 9000,
    },

}
