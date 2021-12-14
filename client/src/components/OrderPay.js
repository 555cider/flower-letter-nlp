import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

import {
  Flex,
  Box,
  Input,
  Center,
  Button,
  Text,
  VStack,
  HStack,
  Heading,
  Divider,
  FormControl,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { useSelector } from 'react-redux';
import FinalPreview from './FinalPreview';
import styled from 'styled-components';

const PaymentContainer = styled.div`
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
  margin-bottom: 10px;
  width: 70vw;
  display: flex;
  gap: 50px;
  justify-content: center;
  font-size: 1rem;
  .left-box {
    display: flex;
    flex-direction: column;
    width: 40vw;
    gap: 20px;
    .title {
      width: 100%;
      padding-bottom: 5px;
      border-bottom: 3px solid #aaa;
      font-weight: bold;
      font-size: 1.8rem;
    }
    .heading {
      font-weight: bold;
      font-size: 1.5rem;
      padding-bottom: 5px;
      border-bottom: 1px solid #ddd;
      margin-bottom: 20px;
    }
    .info {
      padding: 10px;
      display: flex;
      flex-direction: column;
      gap: 10px;

      .short {
        border: 1px solid #aaa;
        width: 250px;
        padding: 5px;
        border-radius: 5px;
      }
      .long {
        border: 1px solid #aaa;
        width: 450px;
        padding: 5px;
        border-radius: 5px;
      }
    }
    .payment-method {
      padding: 10px;
      .button-container {
        display: flex;
        gap: 20px;
        .buttons {
          width: 200px;
          height: 50px;
          border-radius: 5px;
          border: 1px solid #aaa;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          &:hover {
            border: 3px solid skyblue;
          }
        }
        .selected {
          font-weight: bold;
          background-color: skyblue;
          color: white;
          border: none;
        }
      }
    }
  }

  .right-box {
    border: 1px solid #ddd;
    width: 300px;
    padding: 30px;
    border-radius: 5px;
    box-shadow: 1px 1px 1px rgba(120, 120, 120, 0.2);
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
    .heading {
      width: 100%;
      font-weight: bold;
      font-size: 1.3rem;
      padding-bottom: 5px;
      border-bottom: 1px solid #eee;
    }
    .preview {
      width: 100%;
      display: flex;
      justify-content: center;
      border: 1px solid #eee;
      border-radius: 5px;
      padding: 15px;
    }
    .confirm {
      width: 100%;
      display: flex;
      flex-direction: column;
      .sp-between {
        padding: 5px;
        padding-top: 5px;
        padding-bottom: 5px;
        display: flex;
        justify-content: space-between;
      }
      .divider {
        border-top: 1px solid #ddd;
        border-bottom: 1px solid #ddd;
        padding-top: 10px;
        padding-bottom: 10px;
        margin-bottom: 10px;
        margin-top: 10px;
      }
    }
    .payment {
      display: flex;
      flex-direction: column;
      gap: 15px;
      .buttons {
        width: 230px;
        height: 50px;
        border: 1px solid #aaa;
        cursor: pointer;
        display: flex;
        border-radius: 5px;
        justify-content: center;
        align-items: center;
      }
      .pay {
        border: none;
        background-color: skyblue;
        color: white;
        font-weight: bold;
      }
      .cancel {
      }
    }
  }
`;

function OrderPay({ history }) {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    name: '',
    phone: '',
    email: '',
    delivery_name: '',
    address: '',
    post_code: '',
    memo: '',
  });

  const [paymentMethod, setPaymentMethod] = useState();

  const { name, phone, email, delivery_name, address, post_code, memo } =
    inputs;

  const onChange = (e) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const {
    title,
    letter_content,
    user_flower_id,
    free_content,
    userfont,
    usercolor,
    poems,
  } = useSelector((state) => ({
    title: state.title,
    letter_content: state.letter_content,
    user_flower_id: state.user_flower_id,
    free_content: state.free_content,
    userfont: state.userfont,
    usercolor: state.usercolor,
    poems: state.poems,
  }));

  const trimmedLetter = letter_content.replace(/\n|\r/g, ' ');

  const poemList = poems.map((content) => ({
    type: 'poem',
    poem_id: content['_id'],
  }));

  const freecontentList = free_content.map((content) => ({
    type: 'text',
    text_content: content,
  }));

  const contentList = [...poemList, ...freecontentList];

  const free_content_count = free_content.length;
  const free_content_price = free_content_count * 3000;
  const totalPrice = 48000 + free_content_price;

  const orderInfo = {
    order: {
      price: totalPrice,
      name: name,
      delivery_name: delivery_name,
      address: address,
      post_code: post_code,
      email: email,
      phone: phone,
      delivery_memo: memo,
    },
    book: {
      title: title,
      letter: trimmedLetter,
      flower_id: user_flower_id,
      contents: contentList,
      font: userfont,
      color: usercolor,
    },
  };

  const onClickPayButton = async () => {
    await axios({
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}/orders`,
      data: orderInfo,
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => {
        console.log('주문API 성공', response);
        const order = response.data;
        serverAuth(order.id, order.price);
      })
      .catch((err) => {
        alert('error 주문생성');
        console.log(err);
      });
  };

  const serverAuth = (orderId, orderAmount) => {
    console.log('SERVER AUTH STARTED');
    window.AUTHNICE.requestPay({
      clientId: process.env.REACT_APP_CLIENT_ID,
      method: paymentMethod === 'normal' ? 'card' : 'naverpayCard',
      orderId: orderId,
      amount: orderAmount,
      goodsName: '꽃편지-시집',
      returnUrl: `${process.env.REACT_APP_API_URL}/pay`,
      fnError: function (result) {
        console.log('임의에러발생: ', result.errorMsg);
      },
    });
  };

  const orderPassCheck = () => {
    if (
      name === '' ||
      phone === '' ||
      email === '' ||
      memo === '' ||
      delivery_name === '' ||
      address === '' ||
      post_code === ''
    ) {
      return false;
    } else {
      return true;
    }
  };

  const handleCheck = () => {
    if (orderPassCheck() === true) {
      onClickPayButton();
    } else {
      alert('필수 입력값이 비어있습니다. 확인해주세요');
    }
  };
  const handlePaymentMethod = (method) => {
    setPaymentMethod(method);
  };

  return (
    <PaymentContainer>
      <Helmet>
        <script src="https://pay.nicepay.co.kr/v1/js/" type="text/javascript" />
      </Helmet>
      <div className="left-box">
        <div className="title">결제하기</div>
        {/* <FormControl id="orderInfo"> */}
        <div className="info">
          <div className="heading">1. 주문자 정보</div>
          <input
            className="short"
            placeholder="이름"
            name="name"
            value={name}
            onChange={onChange}
          />
          <input
            className="short"
            placeholder="전화번호"
            name="phone"
            value={phone}
            onChange={onChange}
          />
          <input
            className="short"
            placeholder="이메일"
            name="email"
            value={email}
            onChange={onChange}
          />
        </div>
        <div className="info">
          <div className="heading">2. 배송 정보</div>

          <input
            className="short"
            placeholder="받으시는 분"
            name="delivery_name"
            value={delivery_name}
            onChange={onChange}
          />
          <input
            className="short"
            placeholder="우편번호"
            name="post_code"
            value={post_code}
            onChange={onChange}
          />

          <input
            className="long"
            placeholder="주소"
            name="address"
            value={address}
            onChange={onChange}
          />

          <input
            className="long"
            borderColor="black"
            placeholder="배송메모"
            name="memo"
            value={memo}
            onChange={onChange}
          />
        </div>
        {/* </FormControl> */}

        <div className="payment-method">
          <div className="heading">3. 결제방법</div>
          <div className="button-container">
            <div
              className={
                paymentMethod === 'normal' ? 'buttons selected' : 'buttons'
              }
              onClick={() => handlePaymentMethod('normal')}
            >
              일반 결제
            </div>
            <div
              className={
                paymentMethod === 'simple' ? 'buttons selected' : 'buttons'
              }
              onClick={() => handlePaymentMethod('simple')}
            >
              간편 결제
            </div>
          </div>
        </div>
      </div>
      {/*End of left-box*/}
      <div className="right-box">
        <div className="heading">결제정보</div>
        <div className="preview">
          {/*시집 이미지*/}
          <FinalPreview userfont={userfont} usercolor={usercolor} />
        </div>
        <div className="confirm">
          <div className="sp-between">
            <span>시집 x 1</span> <span>48,000원</span>
          </div>
          <div className="sp-between">
            <span>자유글 x {free_content_count}</span>{' '}
            <span>{free_content_price}원</span>
          </div>
          <div className="sp-between divider">
            <span>배송</span>
            <span>무료</span>
          </div>
          <div className="sp-between">
            <span>합계</span>
            <span>
              <b>{totalPrice / 1000 + ',000'}</b>원
            </span>
          </div>
        </div>
        <div className="payment">
          <div className="buttons pay" onClick={handleCheck}>
            결제하기
          </div>
          <div
            className="buttons cancel"
            onClick={() => {
              navigate('/');
            }}
          >
            결제취소
          </div>
        </div>
      </div>
    </PaymentContainer>
  );
}
export default OrderPay;
