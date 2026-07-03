---
layout: archive.html
title: News
eleventyExcludeFromCollections: true
permalink: /news/{% if pagination.pageNumber > 0 %}page-{{ pagination.pageNumber | plus(1) }}/{% endif %}index.html
pagination:
  data: collections.news
  size: 20
  reverse: true
  generatePageOnEmptyData: true
---
