import scrapy
from scrapy.http.request import Request

from poem.items import PoemItem
from scrapy.loader import ItemLoader


class MoonyeiSpider(scrapy.Spider):
    name = "moonyei"
    start_urls = ["https://blog.naver.com/moonyei/222573775687"]
    # def start_requests(self):
    #     yield scrapy.Request(
    #         f"https://blog.naver.com/moonyei/222573775687",
    #         self.parse,
    #     )

    def parse(self, response):
        self.title = response.xpath("/html/head").get()
        iframe_url = (
            "https://blog.naver.com" + response.xpath('//*[@id="mainFrame"]/@src').get()
        )
        yield Request(iframe_url, callback=self.parse_iframe)

    def parse_iframe(self, response):
        l = ItemLoader(item=PoemItem(), response=response)
        url = response.xpath(
            '/html/body//div[@class="se-main-container"]//div[@class="se-module se-module-text"]//p/span'
        )
        l.add_value("author", url.xpath("./b/text()").getall()[1].strip()[1:])
        l.add_value("title", url.xpath("./b/text()").getall()[0].strip())
        for i in url:
            if i.xpath("./text()").get():
                l.add_value("content", i.xpath("./text()").get())
            l.add_value("content", "<br>")
        yield l.load_item()
