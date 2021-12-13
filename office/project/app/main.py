from flask import Flask, render_template, jsonify
import requests

app = Flask(__name__)


@app.route("/")
def hello_world():
    return render_template("home.html")


@app.route("/inquiry")
def inquiry_page():
    mock_data = [
        {
            "id": 0,
            "title": "나는 0번째 질문, 존재하지않지",
            "name": "김상훈",
            "content": "넌 나를 볼 수 없다",
            "email": "sanghunkim.nz@gmail.com",
            "date": "2021-12-04",
            "phone": "010-1234-5678",
            "replied": False,
        },
    ]

    return render_template("inquiry.html", inquiries=mock_data)


@app.route("/inquiry/<inquiry_id>")
def page(inquiry_id):
    mock_data = [
        {
            "id": 0,
            "title": "나는 0번째 질문, 존재하지않지",
            "name": "김상훈",
            "content": "넌 나를 볼 수 없다",
            "email": "sanghunkim.nz@gmail.com",
            "date": "2021-12-04",
            "phone": "010-1234-5678",
            "replied": False,
        },
    ]

    return render_template(
        "inquiry_reply.html", inquiry_example=mock_data[int(inquiry_id)]
    )


@app.route("/order")
def order_page():
    mock_order_data = [
        {
            "id": 1,
            "name": "김상훈",
            "email": "sanghunkim.nz@gmail.com",
            "phone": "010-1234-5678",
            "date": "2021-12-05",
            "status": "배송완료",
        }
    ]
    return render_template("order.html", orders=mock_order_data)


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")
