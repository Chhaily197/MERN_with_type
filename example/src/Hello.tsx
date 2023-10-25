import React from 'react'
import { Box, TextField, Button } from '@mui/material'
import { useState } from 'react'

type Props = {
  name: string;
  email: string;
  password: string;
}

const Form: React.FC = () => {

  const [data , setData] = useState<Props>({
    name: '',
    email: '',
    password: ''
  })


  const styles = {
    form: {
      padding: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }

  const handleChange = (e: any) => {
    e.preventDefault();
    setData({...data, [e.target.name]: e.target.value});
  }

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    const data1 = {
      name: data.name,
      email: data.email,
      password: data.password
    }

    if(data1 !== null){
      console.log(data1)
    }else{
      alert("Please Input your data.")
    }
  }


  return(
  <div style={styles.form}>
      <Box component={`form`} style={{width: '400px'}} onSubmit={handleSubmit}>
        <TextField 
          margin='normal' 
          placeholder='Username' 
          fullWidth 
          name='name'
          onChange={handleChange}
          required  />
        <TextField 
          margin='normal' 
          placeholder='Email' 
          fullWidth 
          name='email'
          onChange={handleChange}
          required  />
        <TextField 
          margin='normal' 
          placeholder='Password' 
          name='password'
          onChange={handleChange}
          fullWidth required  />
        <Button 
          type="submit"
          variant='outlined' 
          fullWidth>Submit</Button>
        </Box>
    </div>
  )
}

export default Form
