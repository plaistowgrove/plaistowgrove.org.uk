import path from 'node:path';

import { glob } from 'node:fs/promises';
import { fileURLToPath } from 'url';

import MarkdownIt from 'markdown-it';
import outdent from 'outdent';

import { IdAttributePlugin, InputPathToUrlTransformPlugin, RenderPlugin } from '@11ty/eleventy';
const RenderManager = new RenderPlugin.RenderManager();

const markdown = MarkdownIt({
  html: true,
  breaks: false,
  linkify: true,
});

function fontPath(fontName) {
    return path.relative(
        path.dirname(fileURLToPath(import.meta.url)),
        fileURLToPath(import.meta.resolve(`@fontsource/${fontName}/files/*-latin-*.woff*`))
    );
}

export default async function (eleventy) {
    const config = {
		templateFormats: ['md', 'njk', 'html'],
        markdownTemplateEngine: 'njk',
		htmlTemplateEngine: 'njk',
		passthroughFileCopy: true,
		dir: {
			input: 'src/site',
			output: 'dist',
			includes: '../layouts/includes',
            modules: '../layouts/modules',
			layouts: '../layouts',
			data: '../data'
		}
	};

    eleventy.setLibrary('md', markdown);

	let templateConfig;
	eleventy.on("eleventy.config", (tmplConfigInstance) => {
		templateConfig = tmplConfigInstance;
	});

	let extensionMap;
	eleventy.on("eleventy.extensionmap", (map) => {
		extensionMap = map;
	});

    const fontDir = 'assets/fonts';
    const fonts = {
        ["Montserrat"]: fontPath("montserrat"),
        ["Open Sans"]: fontPath("open-sans"),
        ["Caveat"]: fontPath("caveat"),
    };
    
    eleventy.addCollection("fontfaces", async (collectionsApi) => {
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

    eleventy.addCollection("schedule", function (collectionsApi) {
        const {schedule = {}} = collectionsApi.getAll()[0].data;
        const today = new Date();
        today.setUTCHours(0, 0, 0, 0);
        return Array.from({length: 14}).map((_, index) => {
            const date = new Date(today.getTime() + index * 24 * 60 * 60 * 1000);
            const year = date.getUTCFullYear().toString(10);
            const month = (date.getUTCMonth() + 1).toString(10).padStart(2, "0");
            const day = date.getUTCDate().toString(10).padStart(2, "0");
            const key = `${year}-${month}-${day}`;
            const {events} = schedule[key] || {};
            return {date, key, events: events?.map(event => ({
                ...event,
                start: event.start ? new Date(event.start) : undefined,
                end: event.end ? new Date(event.end) : undefined,
            }))};
        });
    });

    eleventy.addPlugin(IdAttributePlugin);
    eleventy.addPlugin(InputPathToUrlTransformPlugin);
    eleventy.addPlugin(RenderPlugin);

    eleventy.addFilter("datestring", function(date, _options, locale = "en-GB") {
        const options = {
            timeZone: "Europe/London",
            ...(_options || {
                day: "numeric",
                month: "numeric",
                year: "numeric",
            }),
        };

        return date.toLocaleDateString(locale, options);
    });

    eleventy.addFilter("timestring", function(date, _options, locale = "en-GB") {
        const options = {
            timeZone: "Europe/London",
            ...(_options || {
                hour: "2-digit",
                minute: "2-digit",
            }),
        };

        return date.toLocaleTimeString(locale, options);
    });

    eleventy.addExtension("ncss", {
        outputFileExtension: "css",
        key: "njk",
    });
    eleventy.addTemplateFormats("ncss");

    eleventy.addShortcode("photo", function(src, alt, caption) {
        const img = `<img src="${src}" alt="${alt}" loading="lazy" />`;
        const figcaption = caption ? `<figcaption>${caption}</figcaption>` : '';
        return `<figure class="photo">${img}${figcaption}</figure>`;
    });

    eleventy.addPairedShortcode("full", function(children) {
        const content = markdown.renderInline(children);
        return outdent`<div class="full">${content}</div>`;
    });
    
    eleventy.addPairedShortcode("pull", function(children, side, data) {
        if (!side) return children;
        const content = markdown.renderInline(children);
        const attributes = Object.entries(data ?? {}).map(([key, val]) => ` data-${key}="${val}"`).join('');
        return outdent`<div class="pull-${side}"${attributes}>${content}</div>`
    });

    eleventy.addPairedShortcode("columns", function(content, count) {
        return `<div class="columns count-${count || 2}">${content}</div>`;
    });

    eleventy.addPairedShortcode("column", function(content, cols) {
        return `<div class="column${ cols > 1 ? ` span-${cols}` : ''}">${content}</div>`;
    });

    eleventy.addShortcode("module", async function(module, ...args) {
        const filepath = path.join(config.dir.input, config.dir.modules, '/', module);
        try {
            const render = await RenderPlugin.File(filepath, { templateConfig, extensionMap }, "njk");
            return await RenderManager.render(render, {args}, this.ctx);
        } catch (err) {
            console.error('⚠️ Unable to render module:', module);
            console.log(err);
        }
    });

    eleventy.addShortcode("ariaCurrent", function(file) {
        const {inputPath} = this.page;
        const {input: inputRoot} = this.eleventy.directories;
        const filePath = path.relative(inputRoot, inputPath);
        if (filePath === file) {
            return ` aria-current="page"`;
        }
        return "";
    });

    eleventy.addPassthroughCopy('src/site/assets/*.css');
    eleventy.addPassthroughCopy('src/site/assets/*.js');
    eleventy.addPassthroughCopy('src/site/assets/images/*');
    eleventy.addPassthroughCopy('src/site/assets/resources/*');
    eleventy.addPassthroughCopy({
        [fonts["Montserrat"]]: fontDir,
        [fonts["Open Sans"]]: fontDir,
        [fonts["Caveat"]]: fontDir,
    });

    eleventy.addWatchTarget('src/site/assets');

    return config;
}