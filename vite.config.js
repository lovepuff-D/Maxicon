import vituum from 'vituum'
import posthtml from '@vituum/vite-plugin-posthtml'
import nunjucks from '@vituum/vite-plugin-nunjucks'

/* , viteJoinMediaQueries({
        paths2css: ['./dist/assets/css'],
        cssnanoConfig: { preset: 'default' },
    }) */

export default {
    plugins: [vituum(), nunjucks(), posthtml({
        root: './src',
        plugins: []
    }), {
        name: "custom-hmr",
        enforce: "post",
        handleHotUpdate({file, server}) {
            if (file.endsWith(".html")) {
                server.ws.send({
                    type: "full-reload",
                    path: "*"
                })
            }
        }
    }],
    build: {
        assetsDir: "assets",
        sourcemap: true,
        minify: true,
        rollupOptions: {
            input: ["./src/pages/**/*.njk"],
            output: {
                chunkFileNames: "assets/js/[name].js",
                entryFileNames: "assets/js/[name].js",
                assetFileNames: ({ name }) => {
                    if (/\.(gif|jpe?g|png|svg)$/.test(name ?? "")) {
                        return "assets/img/[name].[ext]";
                    }
                    if (/\.(mp4)$/.test(name ?? "")) {
                        return "assets/video/[name].[ext]";
                    }
                    if (/\.(ttf|woff|otf)$/.test(name ?? "")) {
                        return "assets/fonts/[name].[ext]";
                    }
                    if (/\.css$/.test(name ?? "")) {
                        return "assets/css/[name].[ext]";
                    }
                    return "assets/[name].[ext]";
                },
            },
        },
    },
}
