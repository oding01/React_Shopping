import { createContext, useState } from 'react';
import './App.css';
import { Navbar, Container, Nav } from 'react-bootstrap';
import data from './data';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
import Details from './pages/Details';
import axios from 'axios';
import Cart from './pages/Cart';

export let Context1 = createContext();

function App() {
  let [shoes, setShoes] = useState(data);
  let [btnCount, setBtnCount] = useState(0);
  let nav = useNavigate();

  let [재고] = useState([10, 11, 12]);

  return (
    <div className="App">
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
        </Container>
      </Navbar>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <div className="main-bg"></div>
              <div className="container">
                <div className="row">
                  {shoes.map((a, i) => {
                    return <Card shoes={shoes[i]} i={i}></Card>;
                  })}
                </div>
              </div>
              <button
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
        <Route
          path="/details/:id"
          element={
            <Context1.Provider value={{ 재고, shoes }}>
              <Details shoes={shoes} />
            </Context1.Provider>
          }
        />
        <Route path="/cart" element={<Cart />} />
        <Route path="/about" element={<div>About</div>}>
          <Route path="location" />
        </Route>
        <Route path="*" element={<div>404 페이지</div>} />
      </Routes>
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
