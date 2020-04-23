const CleanTerminalPlugin = require('clean-terminal-webpack-plugin');

module.exports = {
    mode: "development",
    // Feel free to swap between the 2 optimisation approaches here to test which one will suit us better
    optimization: {
        minimize: true
    },
    entry: "./GAME/@@DEV_BASE_PATH/src/gameIndex.ts",
    devtool: 'source-map',
    devServer: {
        port: 9000,
        overlay: true
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            }
        ]
    },
    plugins: [new CleanTerminalPlugin({
        onlyInWatchMode: false
    })],
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    output: {
        filename: 'gameIndex.js',
        path: '@@PROJECT_PATH/GAME/IWG/src'

    }
};
