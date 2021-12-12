import scrapy

from poem.items import PoemItem
from scrapy.loader import ItemLoader


class FeelpoemSpider(scrapy.Spider):
    name = "feelpoem"

    def start_requests(self):
        for i in range(2647, 0, -1):
            yield scrapy.Request(
                f"http://www.feelpoem.com/bbs/board.php?bo_table=m11&wr_id={i}",
                self.parse,
            )

    def parse(self, response):
        l = ItemLoader(item=PoemItem(), response=response)
        l.add_value(
            "title",
            response.xpath('.//h2[@id="bo_v_title"]/span/text()')
            .get()
            .split("/")[0]
            .strip(),
        )
        l.add_value(
            "author",
            response.xpath('.//h2[@id="bo_v_title"]/span/text()')
            .get()
            .split("/")[1]
            .strip(),
        )
        for i in response.xpath('.//*[@id="bo_v_con"]//p[@class="0"]'):
            for j in i.xpath(".//text()"):
                l.add_value("content", "" if j.get() is None else j.get().strip())
            l.add_value(
                "content",
                "<br>",
            )
        yield l.load_item()
