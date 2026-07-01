import path from 'node:path';

import { glob } from 'node:fs/promises';
import { fileURLToPath } from 'url';

function fontPath(fontName) {
    return path.relative(
        path.dirname(fileURLToPath(import.meta.url)),
        fileURLToPath(import.meta.resolve(`@fontsource/${fontName}/files/*-latin-*.woff*`))
    );
}

export default async function (config) {
    const fontDir = 'assets/fonts';
    const fonts = {
        ["Montserrat"]: fontPath("montserrat"),
        ["Open Sans"]: fontPath("open-sans"),
    };
    
    config.addCollection("fontfaces", async (collectionsApi) => {
        const families = await Promise.all(Object.entries(fonts).map(async ([family, filepath]) => ({
            family,
            files: await Array.fromAsync(glob(filepath))
        })));
        return Object.values(families.flatMap(({family, files}) => (
            files.map((filepath) => ({
                family,
                filepath,
                filename: path.basename(filepath),
                path: `/${fontDir}/${path.basename(filepath)}`,
                extended: !!path.basename(filepath).match('-ext-'),
                style: path.basename(filepath).match(/(italic|normal)/)[0],
                weight: parseInt(path.basename(filepath).match(/([1-9]00)/)[0], 10),
                format: path.extname(filepath).replace('.', ''),
                key: path.basename(filepath, path.extname(filepath)),
            }))
        )).reduce((f, {key, family, extended, style, weight, ...src}) => {
            // const key = `${family}-${extended}-${weight}-${style}`;
            f[key] ??= {key, family, extended, style, weight, srcs: []};
            f[key].srcs.push(src);
            return f;
        }, {}));
    });

    config.addExtension("ncss", {
        outputFileExtension: "css",
        key: "njk",
    });
    config.addTemplateFormats("ncss");

    config.addPassthroughCopy('src/site/assets/*.css');
    config.addPassthroughCopy('src/site/assets/*.js');
    config.addPassthroughCopy('src/site/assets/images/*');
    config.addPassthroughCopy({
        [fonts["Montserrat"]]: fontDir,
        [fonts["Open Sans"]]: fontDir,
    });

    config.addWatchTarget('src/site/assets');

    return {
		templateFormats: ['md', 'njk', 'html'],
        markdownTemplateEngine: 'njk',
		htmlTemplateEngine: 'njk',
		passthroughFileCopy: true,
		dir: {
			input: 'src/site',
			output: 'dist',
			includes: '../layouts/includes',
			layouts: '../layouts',
			data: '../data'
		}
	}
}