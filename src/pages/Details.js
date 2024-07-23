import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import styled from 'styled-components';

import { Context1 } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import { addInCart } from '../store/cartSlice';

// let YellowButton = styled.button`
//   background: yellow;
//   color: black;
//   padding: 20px;
// `;

const Details = (props) => {
  let [alert, setAlert] = useState(true);
  let [addAlert, setAddAlert] = useState(false);
  let [message, setMessage] = useState(false);
  let [count, setCount] = useState(0);
  let [tab, setTab] = useState(0);
  let [trans, setTrans] = useState('');
  let dispatch = useDispatch();

  useEffect(() => {
    // - html 렌더링 후에 실행됨.
    // - 오래 걸리는 작업을 useEffect 안에 넣으면 좀 더 효율적으로 동작
    // -어려운 작업, 서버에서 데이터를 가져오는 작업, 타이머 등
    let timer = setTimeout(() => {
      setAlert(false);
    }, 2000);

    let transTimer = setTimeout(() => {
      setTrans('_1');
    }, 100);

    return () => {
      clearTimeout(timer, transTimer);
      setTrans('');
    };
  }, []);

  useEffect(() => {
    if (isNaN(count)) {
      setMessage(true);
    } else {
      setMessage(false);
    }
  }, [count]);

  useEffect(() => {
    setTimeout(() => {
      if (addAlert) {
        setAddAlert(false);
      }
    }, 2000);
  }, [addAlert]);

  let { id } = useParams();

  let findShoes = props.shoes.find((e) => {
    return e.id == id;
  });

  return (
    <div className={`container transparent${trans}`}>
      {alert === true ? (
        <div className="alert alert-warning">
          <p>2초 이내 구매 시 할인</p>
        </div>
      ) : null}

      <div className="row">
        <div className="col-md-6">
          <img
            src={`https://codingapple1.github.io/shop/shoes${++id}.jpg`}
            width="100%"
            alt=""
          />
        </div>
        <div className="col-md-6">
          {message === true ? (
            <div className="alert alert-warning">숫자만 입력하세요.</div>
          ) : null}
          <input
            type="text"
            value={count}
            onChange={(e) => {
              setCount(e.target.value);
            }}
          />
          <h4 className="pt-5">{findShoes.title}</h4>
          <p>{findShoes.content}</p>
          <p>{findShoes.price}원</p>
          {/* <YellowButton>버튼</YellowButton> */}
          <button
            className="btn btn-danger"
            onClick={() => {
              dispatch(
                addInCart({
                  id: findShoes.id,
                  name: findShoes.title,
                  count: Number(count),
                })
              );
              setAddAlert(true);
            }}
          >
            주문하기
          </button>
        </div>
      </div>
      {addAlert === true && (
        <div className="alert alert-warning">
          <p>장바구니에 추가되었습니다.</p>
        </div>
      )}
      <Nav variant="tabs" defaultActiveKey="link-1">
        <Nav.Item>
          <Nav.Link
            eventKey="link-1"
            onClick={() => {
              setTab(0);
            }}
          >
            Option1
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="link-2"
            onClick={() => {
              setTab(1);
            }}
          >
            Option2
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="link-3"
            onClick={() => {
              setTab(2);
            }}
          >
            Option3
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <TabContent tab={tab} shoes={props.shoes} />
    </div>
  );
};

const TabContent = ({ tab, shoes }) => {
  let [fade, setFade] = useState('');

  useEffect(() => {
    let timer = setTimeout(() => {
      setFade('end');
    }, 100);

    return () => {
      clearTimeout(timer);
      setFade('');
    };
  }, [tab]);

  return (
    <div className={`start ${fade}`}>
      {[<div>{shoes[0].title}</div>, <div>내용1</div>, <div>내용2</div>][tab]}
    </div>
  );
};

export default Details;
