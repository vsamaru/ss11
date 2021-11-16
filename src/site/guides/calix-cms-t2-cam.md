---
layout: "layouts/base.njk"
pagination: 
  data: guide.content
  alias: guide
  size: 1
permalink: "/{{ guide.title | slug }}/"
eleventyComputed:
  title: "{{ guide.title }}"
---

{{ guide.content }}