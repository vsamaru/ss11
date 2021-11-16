const UglifyJS = require("uglify-es");
const CleanCSS = require("clean-css");

module.exports = function(config) {
    // A useful way to reference the context we are runing eleventy in
    let env = process.env.ELEVENTY_ENV;

    // Layout aliases can make templates more portable
    config.addLayoutAlias("default", "layouts/base.njk");
    config.addLayoutAlias("emailpanel", "layouts/mail-base.njk");

    // minify the html output
    config.addTransform("htmlmin", require("./src/utils/minify-html.js"));

    // use a filter for simple css minification
    config.addFilter("cssmin", require("./src/utils/minify-css.js"));
    // Minify CSS
    config.addFilter("cssmin", function(code) {
        return new CleanCSS({}).minify(code).styles;
    });

    config.addPassthroughCopy("./src/site/assets");

    // Minify JS
    config.addFilter("jsmin", function(code) {
        let minified = UglifyJS.minify(code);
        if (minified.error) {
            console.log("UglifyJS error: ", minified.error);
            return code;
        }
        return minified.code;
    });

    // make the seed target act like prod
    env = env == "seed" ? "prod" : env;
    return {
        dir: {
            input: "src/site",
            output: "dist",
            data: `_data/${env}`,
        },
        templateFormats: ["njk", "md"],
        htmlTemplateEngine: "njk",
        markdownTemplateEngine: "njk",
        passthroughFileCopy: true,
    };
};