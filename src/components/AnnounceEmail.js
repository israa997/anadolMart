import axios from 'axios';
import React, {useState,useEffect,useCallback} from 'react';
import {PrivacyPolicy} from './PrivacyPolicy.js';
import {SocialAccounts} from './socialAccount.js';
import {Button,Form, Col, Modal, Container, Row, } from 'react-bootstrap'; 
import styles from './style.module.css';
function AnnounceEmail(){
 const[announceEmail, getEmail]=useState();
 const getAlreadyExistedEmail = useCallback( async _=>{
  const {data } = await axios.get('http://192.168.1.38:5000/api/home/announce-email');
  getEmail(data)
  for(var i = 0; i < data.length; i++){
    console.log(data[i].email);
  }
} ,[] 
);
console.log(announceEmail);
useEffect(()=> {
  getAlreadyExistedEmail();
}, [getAlreadyExistedEmail])


const [email, setEmail] = useState();
console.log( email);
const [str,setStr] = useState();
const post = async(e) => {
  
  try{
 e.preventDefault();
  await axios
  .post('http://192.168.1.38:5000/api/home/postAnnounce-email', {email});
 setStr("post");
  isPost(str);
  console.log(isPost(str));
} catch(error){
// alert(error);
console.log(error);
setStr("none");
isPost(str);
}
} 


const isPost = (str) => {
  if(str === "post") {
    return true;
  }
  else {
    return false;
  }
}

console.log(isPost(str))






const [showModal, setShow ]= useState(false);
const toggle =() => {
    setShow(!showModal)
}
     
    return(
      <Container style={{float: 'right'}} >
      <Row style={{float: 'right'}}>
        <Col xs={12} md={12}>
       
    <h4>النشرة البريدية</h4>     
           <p>كن الاول بالحصول على النشرات الاعلانية للمنتجات المضافة</p>
            <p>واحدث العروض الحصرية </p>
        <Form  onSubmit={post}>
        <Form.Row>
        <Col xs="auto">
  <Form.Group controlId="formBasicEmail">
    <Form.Control 
    className={styles.formGroup}
            required
            type='email' 
            
            placeholder='Enter email'  
            onChange={(event) => setEmail(event.target.value)}
          ></Form.Control>
  </Form.Group>
  </Col>
  <Col xs="auto">
<Button type="submit" variant="outline-dark" onClick={toggle} className={styles.formGroup}>
  اضافة
  </Button>
{
isPost(str)? 

<Modal show={showModal} onHide={toggle} centered>
        <Modal.Header closeButton centered>

          <Modal.Title  className={styles.modalTitle}>النشرة البريدية</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            تمت الاضافة بنجاح
        </Modal.Body>
      </Modal> :
      <Modal show={showModal} onHide={toggle} centered>
      <Modal.Header closeButton centered>

        <Modal.Title  className={styles.modalTitle}>النشرة البريدية</Modal.Title>
      </Modal.Header>
      <Modal.Body>
         عذرا! لم تتم الاضافة.الرجاء تفقد سياسة الخصوصية او ان البريد المدخل موجود مسبقاً
      </Modal.Body>
    </Modal>
      }

  </Col>
  </Form.Row>

  <Form.Row>
  <Col xs="auto">
  <Form.Group id="formBasicCheckbox">
  <PrivacyPolicy/>
  </Form.Group>
  </Col>
  </Form.Row>
</Form>
<div>
  <SocialAccounts/>
  </div>
        </Col>
      </Row>
    </Container>
    );
}

export {AnnounceEmail};