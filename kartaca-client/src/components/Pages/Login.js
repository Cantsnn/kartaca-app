import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect } from 'react'
import { Button, Form, InputGroup } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { LoginValidations } from '../Validations/FormValidations';


function Login() {
    const loginUrl = "http://localhost:5000/api/v1/auth/login"
    const signOutUrl = "http://localhost:5000/api/v1/auth/logout"
    const { user, setUser,  setIsLogin ,removeLocalDatas,getUserToken} = useUser()
    const navigate = useNavigate();
    useEffect(()=>{
        setIsLogin(false)
        signOut()
    })
    const { handleSubmit, handleChange, values, errors, touched, handleBlur } = useFormik({
        initialValues: {
            email: '',
            password: '',

        },
        onSubmit: async (values) => {
            await axios.post(loginUrl, values, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => res.data).then(res => {
                setUser({
                    firstName: res.firstname,
                    lastName: res.lastname,
                    accessToken: res.access_token

                })
               
                localStorage.setItem('firstName',res.firstname)
                localStorage.setItem('lastName',res.lastname)
                localStorage.setItem('access_token', res.access_token)
                setIsLogin(true)
                navigate('/')


            })
                .catch((e) => { alert(e.response.data.messsage) })
 
        },
        validationSchema: LoginValidations

    });
    async function signOut() {
        removeLocalDatas()
        await axios.post(signOutUrl,
          { "access_token": getUserToken() },
          {
            headers: {
              'Access-Control-Allow-Origin': "*",
              'Content-Type': 'application/json'
            }
          })
          .then((data) => console.log(data))
          .catch((e) => console.log(e))
      }
    return (
        <div className='App'>
            <form onSubmit={handleSubmit} className='form-padding'>
                <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">Email</InputGroup.Text>
                    <Form.Control
                        name="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}

                        placeholder="Mail"
                        aria-label="Mail"
                        aria-describedby="basic-addon1"
                    />
                </InputGroup>
                {errors.email && touched.email && <div className='error'>{errors.email}</div>}
                <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">Password</InputGroup.Text>
                    <Form.Control
                    type='password'

                        name='password'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                        placeholder="Password"
                        aria-label="Password"
                        aria-describedby="basic-addon1"
                    />
                </InputGroup>
                {errors.password && touched.password && <div className='error'>{errors.password}</div>}
                <br />
                <Button as="input" className='btn btn-dark' type="submit" value="Login" /> 
            </form>
        </div>
    )
}

export default Login