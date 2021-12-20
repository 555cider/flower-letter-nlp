import time
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By

chrome_service = Service(r"C:\Programming\ChromeDriver\chromedriver.exe")
driver = webdriver.Chrome(service=chrome_service)

# 최대 5초까지 대기
MAX_WAIT = 5
driver.implicitly_wait(MAX_WAIT)

# 페이지 열기
main_url = (
    "https://blog.naver.com/PostList.naver?blogId=moonyei&from=postList&categoryNo=5"
)
driver.get(main_url)

# 목록 열기
btn_spread = driver.find_element(by=By.XPATH, value='//*[@id="toplistSpanBlind"]')
btn_spread.click()

# 블로그 목록의 기본 값이 5줄 보기
MAX_ROW = 5
row_cnt = 1
page_cnt = 10

while page_cnt < 13:
    # 대상 텍스트
    target_text = driver.find_element(
        by=By.XPATH,
        value='//div[@class="se-main-container"]/div[1]/div[1]/div[1]/div[1]',
    )
    print(target_text.text)

    # 페이지 번호가 MAX_ROW의 배수일 경우, 목록에서 다음 페이지 번호 클릭
    if row_cnt % MAX_ROW == 0:
        next_page = driver.find_element(
            by=By.CSS_SELECTOR,
            value=f"#toplistWrapper > div.wrap_blog2_paginate > div > a.pcol2._goPageTop._param\({page_cnt+1}\)",
        )
        next_page.click()
        page_cnt += 1
        time.sleep(3)

    # 다음 텍스트 제목(행)을 클릭
    next_row = driver.find_element(
        by=By.CSS_SELECTOR,
        value=f"#listTopForm > table > tbody > tr:nth-child({row_cnt%MAX_ROW+1}) > td.title > div > span > a",
    )
    next_row.click()
    row_cnt += 1

