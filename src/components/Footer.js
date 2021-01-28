import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import {AnnounceEmail} from './AnnounceEmail.js'
const Footer = () => {
  return (
    <footer>
      <div><AnnounceEmail/></div>
      <Container style={{fontWeight:'bold'}}>
        <Row>
          <Col className='text-center py-3'>Copyright &copy; ANADOL<strong style={{fontWeight:'bold', color: "gold", WebkitTextStroke: "1px red", fontSize:'14px', letterSpacing:'.5rem'}}>MART</strong></Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
