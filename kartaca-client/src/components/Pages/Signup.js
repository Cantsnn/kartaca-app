import React, { useEffect } from 'react'
import { useFormik } from 'formik';
import { SingUpValidations } from '../Validations/FormValidations';
import { Button, Form, InputGroup } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useUser } from '../../context/UserContext';
function Signup() {
    const  {setIsLogin} = useUser()

        useEffect(()=>{
setIsLogin(false)
    })
    const userUrl = "http://localhost:5000/api/v1/user"
    const { handleSubmit, handleChange, values, errors, touched, handleBlur } = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            passwordConfirm: ''
        },
        onSubmit: async (values) => {
           
            const userData = JSON.stringify({
                firstname: values.firstName,
                lastname: values.lastName,
                email: values.email,
                password: values.password

            }, null, 2)
            postData(userData)

        },
        validationSchema: SingUpValidations,
    });

    const navigate = useNavigate();


    async function postData(userData) {
        const data = await axios.post(userUrl, userData, {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        ).then(() => {
            alert("Kayıt başarılı")
            navigate("/login")
        }
        ).catch(e => alert(e.response.data.message))





    }

    return (
        <div className="App">
            <h1>Sign Up</h1>


            <form className='form-padding' onSubmit={handleSubmit}>
                <InputGroup className="mb-3" onSubmit={handleSubmit}>
                    <InputGroup.Text>First and last name</InputGroup.Text>
                    <Form.Control
                        name="firstName"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.firstName}
                        placeholder="First Name" aria-label="First name" />
                    <Form.Control
                        name="lastName"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.lastName}
                        placeholder="Last Name" aria-label="Last name" />
                </InputGroup>
                <div className='error'>
                    {errors.firstName && touched.firstName && <span>{errors.firstName}</span>}
                    {errors.lastName && touched.lastName && <span>{errors.lastName}</span>}

                </div>

                <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">Email</InputGroup.Text>
                    <Form.Control onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        name="email"
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
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.password}
                        placeholder="Password"
                        aria-label="Password"
                        aria-describedby="basic-addon1"
                    />
                </InputGroup>

                {errors.password && touched.password && <div className='error'>{errors.password}</div>}

                <InputGroup className="mb-3" >
                    <InputGroup.Text id="basic-addon1">Password Confirm</InputGroup.Text>
                    <Form.Control 
                        type='password'
                        name="passwordConfirm"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.passwordConfirm}
                        placeholder="Password Confirm"
                        aria-label="Password Confirm"
                        aria-describedby="basic-addon1"
                    />
                </InputGroup>



                {errors.passwordConfirm && touched.passwordConfirm && <div className='error'>{errors.passwordConfirm}</div>}

                <Button as="input" className='btn btn-dark' type="submit" value="Submit" />{' '}

 
            </form>
        </div>
    )
}
export default Signup;