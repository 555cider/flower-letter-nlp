from flask import Flask, render_template, jsonify, flash
import requests
from config import get_config

config = get_config()

app = Flask(__name__)

app.secret_key = "super secret"


@app.route("/")
def hello_world():
    return render_template("home.html")


@app.route("/inquiry")
def inquiry_page():
    url = f"{config.api_url}/question"
    try:
        response = requests.get(url)
        inquiries = response.json()
    except:
        flash("문의 불러오기 실패.")

    print(inquiries)

    return render_template("inquiry.html", inquiries=inquiries)


@app.route("/inquiry/<inquiry_id>")
def page(inquiry_id):
    url = f"{config.api_url}/question/{inquiry_id}"
    try:
        response = requests.get(url)
        inquiry = response.json()
    except:
        flash("문의 불러오기 실패.")

    return render_template("inquiry_reply.html", inquiry_example=inquiry)


@app.route("/order")
def order_page():
    url = f"{config.api_url}/orders"
    try:
        response = requests.get(url)
        orders = response.json()
    except:
        flash("주문목록 불러오기 실패.")

    return render_template("order.html", orders=orders)


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")
