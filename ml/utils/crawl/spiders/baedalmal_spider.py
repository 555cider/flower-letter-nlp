import scrapy

from poem.items import PoemItem
from scrapy.loader import ItemLoader


class BaedalmalSpider(scrapy.Spider):
    name = "baedalmal"
    a = 1
    b = 1
    idx = 1

    def start_requests(self):
        yield scrapy.Request(
            f"http://www.baedalmal.com/poem/{self.a}-{self.b}0.html",
            self.parse,
        )

    def parse(self, response):
        author = (
            response.xpath("/html/body/p[10]/font/b/text()").get().split()[1].strip()
        )
        title = (
            response.xpath(
                f"/html/body/ul[{self.idx}]/ul/ul/p[1]/font/b/text()"
            )
            .get()
            .split(".")[1]
            .strip()
        )

        l = ItemLoader(item=PoemItem(), response=response)
        l.add_value("author", author)
        l.add_value("title", title)
        for i in response.xpath(f"/html/body/ul[1]/ul/ul//p"):
            l.add_value("content", i.xpath("./font[@size='3']/text()").get())
            l.add_value(
                "content",
                "<br>",
            )
        yield l.load_item()
