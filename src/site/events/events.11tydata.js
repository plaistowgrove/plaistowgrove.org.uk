function urlSlug({page: {date, fileSlug}}) {
    const year = date.getUTCFullYear().toString(10);
    const month = (date.getUTCMonth() + 1).toString(10).padStart(2, "0");
    const day = date.getUTCDate().toString(10).padStart(2, "0");
    return `${year}${month}${day}-${fileSlug}`;
}

export default {
    layout: "event.html",
    permalink: (meta) => `events/${ urlSlug(meta) }/index.html`,
    tags: ['events'],
}