import pymysql
from dotenv import load_dotenv
import os
import sys
from models import Base
from db import engine

load_dotenv()

env_variables = {
    "DB_NAME": os.getenv("DATABASE_NAME"),
    "DB_HOST": os.getenv("DATABASE_HOST"),
    "DB_PORT": int(os.getenv("DATABASE_PORT")),
    "DB_USER": os.getenv("DATABASE_USER"),
    "DB_PASSWORD": os.getenv("DATABASE_PASSWORD"),
}

# .env 파일의 환경변수 설정여부 확인
for key, val in env_variables.items():
    if env_variables[key] is None or env_variables[key] == "None":
        print("Not all required variables are set. Please double check.")
        sys.exit()
    else:
        print(f"{key} variable loaded.")

# MySQL 접속
conn = pymysql.connect(
    host=env_variables["DB_HOST"],
    user=env_variables["DB_USER"],
    password=env_variables["DB_PASSWORD"],
    db=env_variables["DB_NAME"],
    port=env_variables["DB_PORT"],
    charset="utf8",
)
curs = conn.cursor()

# DB 생성
curs.execute("DROP DATABASE IF EXISTS {};".format(env_variables["DB_NAME"]))
curs.execute(
    "CREATE DATABASE {} DEFAULT CHARACTER SET 'utf8'".format(env_variables["DB_NAME"])
)


# 테이블 생성
Base.metadata.create_all(engine)

print(f"{env_variables['DB_NAME']} 데이터베이스 생성 완료!")

# Seeding
curs.execute("USE {};".format(env_variables["DB_NAME"]))

sql = """insert into order_status (status_name) values (%s)"""
statuses = ["결제완료", "배송중"]
for stat in statuses:
    curs.execute(sql, (stat))


# db 저장
conn.commit()

# db 접속 해제
curs.close()
conn.close()

print("Seeding 완료!")
