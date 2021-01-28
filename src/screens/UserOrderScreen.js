/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserOrderDetails } from '../actions/orderActions'

const userOrderScreen = ({ history }) => {
  const dispatch = useDispatch()

  const orderList = useSelector((state) => state.userOrderDetails)
  const { loading, error, orders } = orderList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (userInfo) {
      dispatch(getUserOrderDetails())
    } else {
      history.push('/login')
    }
  }, [dispatch, history, userInfo])
console.log(orders);
  return (
    <>
      <h1>Orders</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ORDER ID</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAYMENT TYPE</th>
              <th>Shipping Addres</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>${order.total_price}</td>
                <td>
                  {order.payment_way}
                </td>
                <td>
                  {order.order_status}
                </td>
                <td>{order.shipping_address}</td>
                 <td></td>
                  <td></td>
                  <td>
                  <LinkContainer to={`/order/${order.id}`}>
                    <Button variant='light' className='btn-sm'>
                      Details
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table> 
      )}
    </>
  )
}

export default userOrderScreen;