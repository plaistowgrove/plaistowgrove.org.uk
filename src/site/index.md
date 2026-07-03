---
layout: home.html
eleventyImport:
  collections: ["events", "news"]
---

{% columns 2 %}
    {% column 2 -%}
        <section aria-labelledby="module-welcome-title" class="module">
            <h2 id="module-welcome-title" class="title">Welcome to the PGRA</h2>
            <div class="multicol">

                Nullam nec ante est. Morbi rutrum lacus nisl, in lobortis erat tincidunt et. Etiam sit amet magna ac nunc aliquam fermentum. Nam eu ex vitae ante vestibulum euismod vel nec leo. Curabitur mattis sed purus ut vestibulum. Vestibulum non ligula consectetur, imperdiet ligula vitae, consequat lorem. Morbi malesuada laoreet risus sit amet hendrerit. Fusce non justo vitae tellus semper suscipit vel eget libero.

                Donec tempus efficitur elit. Vivamus interdum vel tortor ut facilisis. Praesent at porttitor neque, et vulputate massa. Duis imperdiet nisi dui, vel vehicula nibh tincidunt eget. Proin volutpat, est sit amet commodo aliquet, quam turpis tristique lacus, non interdum tellus nibh et massa. Vivamus molestie elit sed massa tempus rutrum. Duis egestas lacus sed ante consequat efficitur. Aenean vel lectus vitae elit commodo finibus ut sed lacus. Suspendisse dignissim dapibus ornare. Maecenas aliquam consequat odio sit amet fermentum. In hac habitasse platea dictumst. Cras ut ante vel felis finibus mollis non ut tortor. In faucibus ultricies risus, et tristique justo semper in. Morbi volutpat est eget maximus tristique. Sed eget nisl at turpis sodales blandit eget ornare turpis.
            </div>
        </section>
    {%- endcolumn %}
    {% column -%}
        <section aria-labelledby="module-news-title" class="module">
            <h2 id="module-news-title" class="title"><a href="news/index.md">Latest Updates & News</a></h2>
            {% module "news.html", collections.news %}
        </section>
    {%- endcolumn %}
    {% column -%}
        <section aria-labelledby="module-events-title" class="module">
            <h2 id="module-events-title" class="title"><a href="events/index.md">Upcoming Events</a></h2>
            {% module "events.html" %}
        </section>
    {%- endcolumn %}
    {% column 1, "no-borders" -%}
        <section aria-labelledby="module-schedule-title" class="module">
            <h2 id="module-schedule-title" class="title">For Your Diary</h2>
            {% module "schedule.html" %}
        </section>
    {%- endcolumn %}
    {% column -%}
        <section aria-labelledby="module-resources-title" class="module">
            <h2 id="module-resources-title" class="title">Local Resources</h2>

            <ul class="info">
                <li><a href="https://www.bromley.gov.uk/">Bromley Borough Council</a></li>
                <li>Ward Councillors:
                    <ul>
                        <li><a href="https://cds.bromley.gov.uk/mgUserInfo.aspx?UID=50022974">Panos Papayannakos</a></li>
                        <li><a href="https://cds.bromley.gov.uk/mgUserInfo.aspx?UID=50022975">Alwin Puthenpurakal</a></li>
                    </ul>
                </li>
                <li>Member of Parliament:
                    <ul>
                        <li><a href="https://members.parliament.uk/member/5209/contact">Peter Fortune</a></li>
                    </ul>
                </li>
                <li>Report or view problems on <a href="https://www.fixmystreet.com/">FixMyStreet</a></li>
            </ul>
        </section>
    {%- endcolumn -%}
{% endcolumns %}