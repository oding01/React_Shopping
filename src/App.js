import { lazy, Suspense, useEffect, useState } from 'react';
import './App.css';
import { Navbar, Container, Nav } from 'react-bootstrap';
import data from './data';
import { Routes, Route, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from 'react-query';

const Details = lazy(() => import('./pages/Details.js'));
const Cart = lazy(() => import('./pages/Cart.js'));

function App() {
  let [shoes, setShoes] = useState(data);
  let [btnCount, setBtnCount] = useState(0);
  let nav = useNavigate();

  useEffect(() => {
    if (!localStorage.key('watched')) {
      localStorage.setItem('watched', JSON.stringify([]));
    }
  }, []);

  let result = useQuery(
    'userName',
    () =>
      axios.get('https://codingapple1.github.io/userdata.json').then((a) => {
        return a.data;
      }),
    { staleTime: 2000 }
  );

  //result.isLoading 로딩중일때
  //result.data 성공
  //result.error 실패

  // let [count, setCount] = useState(0);
  // let [age, setAge] = useState(20);

  // useEffect(() => {
  //   if (count !== 0 && count < 3) {
  //     setAge(age + 1);
  //   }
  // }, [count]);

  // let countUp = () => {
  //   setCount(count + 1);
  // };

  return (
    <div className="App">
      {/* <div>
        <div>
          안녕하십니까 전 {age} 카운트 {count}
        </div>
        <button onClick={countUp}>누르면 한살 먹기</button>
      </div> */}
      <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand
            onClick={() => {
              nav('/');
            }}
            style={{ cursor: 'pointer' }}
          >
            Shopping
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => nav('/')}>Home</Nav.Link>
            <Nav.Link onClick={() => nav('/details')}>Products</Nav.Link>
            <Nav.Link
              onClick={() => {
                nav('/cart');
              }}
            >
              Cart
            </Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            {result.isLoading && '로딩중'}
            {result.error && '실패'}
            {result.data && '반가워요, ' + result.data.name}
          </Nav>
        </Container>
      </Navbar>
      <Suspense fallback={<div>로딩중...</div>}>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <div className="main-bg"></div>
                <div className="container">
                  <div className="row">
                    {shoes.map((a, i) => {
                      return <Card shoes={shoes[i]} i={i} key={i}></Card>;
                    })}
                  </div>
                </div>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    setBtnCount(++btnCount);
                    switch (btnCount) {
                      case 1:
                        axios
                          .get('https://codingapple1.github.io/shop/data2.json')
                          .then((result) => {
                            // setShoes([...shoes, ...result.data]); 스프레드 연산자 사용 ({}, {})
                            setShoes(shoes.concat(result.data)); //concat 함수 사용
                          })
                          .catch(() => {
                            console.log('실패');
                          });
                        break;
                      case 2:
                        axios
                          .get('https://codingapple1.github.io/shop/data3.json')
                          .then((result) => {
                            // setShoes([...shoes, ...result.data]); 스프레드 연산자 사용 ({}, {})
                            setShoes(shoes.concat(result.data)); //concat 함수 사용
                          })
                          .catch(() => {
                            console.log('실패');
                          });
                        break;
                      default:
                        return (
                          <p className="alert alert-warning">더 이상 없어요~</p>
                        );
                    }
                  }}
                >
                  더보기
                </button>
              </>
            }
          />
          <Route path="/details/:id" element={<Details shoes={shoes} />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/about" element={<div>About</div>}>
            <Route path="location" />
          </Route>
          <Route path="*" element={<div>404 페이지</div>} />
        </Routes>
      </Suspense>
    </div>
  );
}

const Card = (props) => {
  let nav = useNavigate();
  return (
    <div className="col-md-4">
      <img
        src={`https://codingapple1.github.io/shop/shoes${props.i + 1}.jpg`}
        width="80%"
        alt=""
        style={{ cursor: 'pointer' }}
        onClick={() => {
          nav(`/details/${props.i}`);
        }}
      />
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.content}</p>
      <p>{props.shoes.price}</p>
    </div>
  );
};

export default App;
