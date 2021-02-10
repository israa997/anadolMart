import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import {AnnounceEmail} from './AnnounceEmail.js'
const Footer = () => {
  return (
    <footer> 
      <Container>
      <Row>
        <Col>
        <AnnounceEmail/>
        </Col>
        </Row>
        <Row>
          <Col className='text-center py-3' style={{fontWeight:'bold'}}>Copyright &copy; ANADOL<strong style={{fontWeight:'bold', color: "gold", WebkitTextStroke: "1px red", fontSize:'14px', letterSpacing:'.5rem'}}>MART</strong></Col>
          </Row>
         
      </Container>
    </footer>
  )
}

export default Footer
