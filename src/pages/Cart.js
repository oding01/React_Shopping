import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { plusCount } from '../store/cartSlice';

const Cart = () => {
  let state = useSelector((state) => {
    return state;
  });
  let dispatch = useDispatch();

  return (
    <div>
      <p>{state.userName}의 장바구니</p>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경하기</th>
          </tr>
        </thead>
        <tbody>
          {state.cart.map((item, i) => (
            <tr key={i}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.count}</td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    dispatch(plusCount({ id: item.id, count: 1 }));
                  }}
                >
                  +
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Cart;
