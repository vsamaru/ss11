---
title: NRTC Managed Services Knowledge Base
layout: default
---

<div class="listing">
{%- for item in home.content -%}
  <h1 id="home-head" class="text-center">{{ item.header }} </h1>
{%- endfor -%}
</div>

<div class="panel">
{%- for item in home.content -%}
  <h4>{{ item.header2}}  </h4>
  <p>{{ item.body7 }}</p>
  <div class="col-sm-12 embed-responsive-item ">
  <embed class="shadow rounded" src="{{ item.body8 }}" width="100%" height="720px"></embed>
  </div>
{%- endfor -%}
</div>





