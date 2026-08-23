---
layout: archive.html
title: Events
eleventyExcludeFromCollections: true
permalink: /events/{% if pagination.pageNumber > 0 %}page-{{ pagination.pageNumber | plus(1) }}/{% endif %}index.html
pagination:
  data: collections.events
  size: 20
  reverse: true
  generatePageOnEmptyData: true
---
