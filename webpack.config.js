const path = require('path')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: {
        main: './src/main.ts',
    },
    output: {
        path: path.join(__dirname, '/dist/lib'),
        filename: '[name].js',
    },
    resolve: {
        modules: ['node_modules', path.join(__dirname, 'src')],
        extensions: ['.js', '.ts'],
        plugins: [new TsconfigPathsPlugin()],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /(node_modules)/,
                use: 'ts-loader',
            },
        ],
    },
}
