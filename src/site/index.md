---
layout: home.html
eleventyImport:
  collections: ["events", "news"]
---

{% columns 2 %}
    {% column 2 -%}
        <section aria-labelledby="welcome-to-plaistow-grove" class="module">
            <h2 id="welcome-to-plaistow-grove" class="title"><a href="about.md">Welcome to Plaistow Grove</a></h2>
            <div class="multicol">

                Plaistow Grove holds a rich suburban history, best known as <a href="bowies-house.md">the childhood home and creative sanctuary of David Bowie</a> from 1955 to 1968, though its origins lie in the late-Victorian railway boom that transformed Bromley from a quiet Kentish market town into a London suburb.
                
                Developed in the 1870s by the People’s Freehold Land Society on land from the Sundridge Park estate, the street was laid out perpendicular to the new Bromley North branch line to provide affordable terraced housing for local labourers, tradespeople, and railway workers.
                
                Living amidst the sights and soot of steam locomotives until the line's electrification in 1926, the community was entirely shaped by this transport link, and the street stands today as a remarkably intact example of a late-Victorian railway development that still echoes its historic, transport-driven past.

                The Plaistow Grove Residents' Association was established to maintain this community; to provide a voice within its local context, and to ensure that the historic value of the road continues.
            </div>
        </section>
    {%- endcolumn %}
    {% column -%}
        <section aria-labelledby="module-news-title" class="module">
            <h2 id="module-news-title" class="title">Latest Updates & News</h2>
            <article class="news-item">
                <h3 class="title">[Bowie's House](bowies-house.md)</h3>
                <p>[Planning Application 26/02597/FPA](https://planningaccess.bromley.gov.uk/s/detail/a0lTv000003WPnxIAG) from [the Heritage of London Trust](https://www.heritageoflondon.org/), seeking to convert David Bowie's childhood home into a visitor attraction, has been withdrawn. Read more about [the Bowie House and PGRA's response](bowies-house.md).</p>
            </article>
            <article class="news-item">
                <h3 class="title">Safer Crossings around Plaistow Green</h3>
                <p>Bromley Council is engaging in a consultation process on proposals for safer crossings around Plaistow Green. [Residents are encouraged to submit their feedback](https://forms.cloud.microsoft/pages/responsepage.aspx?id=C9XDjFokOUa6tIuHmsmDjDCul5wjpolKkWjtPDi01cVUQzVMMUtZT0IzQ1dFOE9SNUxHTlcxUjFOWi4u).
            </article>
        </section>
        <section aria-labelledby="module-schedule-title" class="module">
            <h2 id="module-schedule-title" class="title">For Your Diary</h2>
            {% module "schedule.html" %}
        </section>
    {%- endcolumn %}
    {% column -%}
        <section aria-labelledby="module-resources-title" class="module">
            <h2 id="module-resources-title" class="title">Local Resources</h2>

            <div class="multicol">
                <ul class="info">
                    <li class="government"><a href="https://www.bromley.gov.uk/">Bromley Borough Council</a>
                        <ul>
                            <li class="library"><a href="">Bromley Central Library</a></li>
                            <li class="library"><a href="">Burnt Ash Library</a></li>
                        </ul>
                    </li>
                    <li class="group">Representatives
                        <ul>
                            <li><a href="https://members.parliament.uk/member/5209/contact">Peter Fortune, MP</a></li>
                            <li><a href="https://cds.bromley.gov.uk/mgUserInfo.aspx?UID=50022974">Cllr. Panos Papayannakos</a></li>
                            <li><a href="https://cds.bromley.gov.uk/mgUserInfo.aspx?UID=50022975">Cllr. Alwin Puthenpurakal</a></li>
                        </ul>
                    </li>
                    <li class="orgs">Other organisations
                        <ul>
                            <li class="group"><a href="https://www.bromley.gov.uk/directory-record/6374/sundridge-park-traders-association">Sundridge Park Traders Association</a></li>
                            <li class="outdoor"><a href="https://www.friendsofkingsmeadow.co.uk/">Friends of Kings Meadow</a></li>
                        </ul>
                    </li>
                    <li>Report or view problems on <a href="https://www.fixmystreet.com/">FixMyStreet</a></li>
                </ul>
            </div>
        </section>
    {%- endcolumn -%}
{% endcolumns %}
