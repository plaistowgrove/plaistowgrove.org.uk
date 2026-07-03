import fs from "node:fs/promises";
import path from 'node:path';
import { fileURLToPath } from 'url';

import ical from "node-ical";
import getTimezoneOffset from "get-timezone-offset";

const feeds = [
    // PGRA
    {
        id: "events",
        src: "https://calendar.google.com/calendar/ical/plaistowgrove%40gmail.com/private-d821c697572622c3ba4b3190b09a222f/basic.ics",
    },
    // Bromley Waste and Recycling
    {
        id: "waste",
        src: "https://recyclingservices.bromley.gov.uk/waste/6254933/calendar.ics",
    },
    // Elections
    {
        id: "elections",
        src: "https://whocanivotefor.co.uk/elections/BR1%203PB.ics",
    }
];

function getLocalTime(date, tz) {
    const offset = getTimezoneOffset(tz, date);
    return new Date(date.getTime() - offset * 60 * 1000);
}

Promise.all(feeds.map(({id, src}) => ical.fromURL(src).then(calendar => ({id, calendar})))).then(async (calendars) => {
    const calendar = {};

    calendars.forEach(({id, calendar: {vcalendar, ...items}}) => {
        Object.values(items).forEach((data) => {
            const {type, summary, location, class: visibility, start: _start, end: _end} = data;
            if (type !== 'VEVENT' || visibility === 'PRIVATE' ) return;

            const date = getLocalTime(_start, "Europe/London");
            const year = date.getUTCFullYear().toString(10);
            const month = (date.getUTCMonth() + 1).toString(10).padStart(2, "0");
            const day = date.getUTCDate().toString(10).padStart(2, "0");
            const key = `${year}-${month}-${day}`;

            const start = _start.dateOnly ? undefined : _start;
            const end = _end.dateOnly ? undefined : _end;

            calendar[key] ??= {events: []};
            calendar[key].events.push({summary, start, end, location, calendar: id});
        });
    });

    const dates = Object.keys(calendar);
    dates.sort();

    const orderedCalendar = dates.reduce((_, date) => {
        _[date] = calendar[date];
        return _;
    }, {});

    const target = path.join(
        path.dirname(fileURLToPath(import.meta.url)),
        "../src/data/schedule.json"
    );

    await fs.writeFile(
        target,
        JSON.stringify(orderedCalendar, null, 2),
        { flag: 'w+' }
    );
}).catch(error => {
    console.error(error);
});
