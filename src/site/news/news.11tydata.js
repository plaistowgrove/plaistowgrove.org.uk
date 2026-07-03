function urlSlug({page: {date, fileSlug}}) {
    const year = date.getUTCFullYear().toString(10);
    const month = (date.getUTCMonth() + 1).toString(10).padStart(2, "0");
    const day = date.getUTCDate().toString(10).padStart(2, "0");
    return `${year}${month}${day}-${fileSlug}`;
}

export default {
    layout: "news.html",
    permalink: (meta) => `news/${ urlSlug(meta) }/index.html`,
    tags: ['news'],
}