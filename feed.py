import feedparser
import re
import datetime
from weshappening import add_event

feed_url = "http://events.wesleyan.edu/events/cal_rss_today"

feed = feedparser.parse(feed_url)

ite = 0
for item in feed["items"]:
    name = str(item["title"])
    value = item["summary_detail"]["value"].split("<br />")
    date = re.match("\d\d/\d\d/\d\d\d\d", str(value[0])).group().split("/")
    time = re.search("(TBA|\d\d:\d\d (a|p)m( - \d\d:\d\d (a|p)m)*)", str(value[0])).group().split(" ")
    desc = value[0]
    loc = re.search("Location: .*", str(value[-1])).group().lstrip("Location: ")
    link = ""
    for v in value:
        if v.startswith("URL"):
            link = v.lstrip("URL: ")

    if len(time) > 1:
        t = time[0].split(":")
        if (time[1] == "pm") and not (int(t[0]) == 12):
            dt = datetime.datetime(int(date[2]), int(date[0]), int(date[1]), (int(t[0])+12)%24, int(t[1]))
        elif (int(t[0]) == 12) and (t[1] == ("am")):
            dt = datetime.datetime(int(date[2]), int(date[0]), int(date[1]), 0, int(t[1]))
        else:
            dt = datetime.datetime(int(date[2]), int(date[0]), int(date[1]), int(t[0]), int(t[1]))
    else:
        dt = datetime.datetime(int(date[2]), int(date[0]), int(date[1]))

    cat = ite % 4
    ite += 1

    event = {"name": name, "location": loc, "time": dt, "link": link, "description": desc, "category":cat}

    add_event(event)