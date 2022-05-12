const mix = require("laravel-mix");

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.setPublicPath("public");
mix.webpackConfig({
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules(?!\/foundation-sites)|bower_components/,
                use: [
                    {
                        loader: "babel-loader",
                        options: Config.babel()
                    }
                ]
            }
        ]
    },
    resolve: {
        alias: {
            "@": path.resolve("resources/sass")
        }
    }
});
mix.js("resources/js/app.js", "")
    .extract(["vue"], "vendor~utils-1.js")
    .extract(["@websanova/vue-auth"], "vendor~utils-2.js")
    .extract(["vuetify"], "vendor~utils-3.js")
    .extract(["vuex"], "vendor~utils-4.js")
    .extract(["vue-axios", "vue-router"], "vendor~utils-5.js")
    .version();
