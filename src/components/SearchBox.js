import React, { useState } from 'react';
import { Form, FormControl } from 'react-bootstrap';

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      history.push(`/search/${keyword}`)
    } else {
      history.push('/')
    }
  }

  return (

    <Form onSubmit={submitHandler} inline className='w-75' style={{maxWidth:"400px", margin:"auto", position: "relative"}}>
      
      <i type='submit' className="fas fa-search fa-lg" style={{ position: "absolute", padding: "90%", pointerEvents: "none"}}></i>
      <FormControl type="text" onChange={(e) => setKeyword(e.target.value)} placeholder="Search" className="mr-sm-2" style={{width: '100%', borderRadius:'50px'}}/>
    </Form>
  )
}

export default SearchBox
