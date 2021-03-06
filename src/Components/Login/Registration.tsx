import * as React from 'react'
import {Alert, Button, Container, Form} from "react-bootstrap";
import {useState} from "react";
import {gql, useMutation} from "@apollo/client";
import {useHistory} from "react-router-dom";

const REGISTRATION_MUTATION = gql`
mutation REGISTER($email: String!, $password1: String!, $password2: String!, $username: String!){
  register(email: $email, password1: $password1, password2: $password2, username: $username){
    success
    errors
    refreshToken
    token
  }
}`
export default function Registration(){
    const [mail, changeMail] = useState('')
    const [userName, changeUserName] = useState('')
    const [password1, changePassword1] = useState('')
    const [password2, changePassword2] = useState('')
    const history = useHistory();

    const [registration, { data, error }] = useMutation(REGISTRATION_MUTATION, {
        variables: {
            email: mail,
            password1: password1,
            password2: password2,
            username: userName
        }
    })
    const saveData = () =>{
        localStorage.setItem('token', data.register.token)
        localStorage.setItem('refreshToken', data.register.refreshToken)
        localStorage.setItem('is_login', 'true')
        setTimeout(()=>{
            window.location.reload(false);
        }, 500)
    }
    {data?.register.success ?  data?.register.success === true? saveData(): null: null}
    {localStorage.getItem('is_login') === 'true' ? setTimeout(history.push, 1000, '/'): null}
    {data ? console.log(data): null}
    {error ? console.log(error): null}
    return(
        <div>
            <Container>
                <div className="display-4 text-center mt-5" style={{fontSize: '33px'}}>Регистрация</div>
                <div className="col-4 offset-4 mt-3">
                    {/*<Card>*/}
                    <Form>
                        <Form.Group>
                            <Form.Label>Введите имя пользователя</Form.Label>
                            <Form.Control type="text" placeholder="Имя пользователя" value={userName} onChange={(event) =>{changeUserName(event.target.value)}}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Введите ваш email</Form.Label>
                            <Form.Control type="email" placeholder="email" value={mail} onChange={(event) =>{changeMail(event.target.value)}}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Введите пароль</Form.Label>
                            <Form.Control type="password" placeholder="Пароль" value={password1} onChange={(event) =>{changePassword1(event.target.value)}}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Повторно введите пароль</Form.Label>
                            <Form.Control type="password" placeholder="Пароль" value={password2} onChange={(event) =>{changePassword2(event.target.value)}}/>
                        </Form.Group>
                        <Button variant="primary" type="submit" className="mr-auto" size="lg" block onClick={(event => {event.preventDefault(); registration()})}>
                            Зарегистрироваться
                        </Button>
                        { data?.register.errors.email ? data?.register.errors.email[0].message === "A user with that email already exists." ?
                            <Alert variant='danger' className="mt-2" >Этот email уже был использован</Alert>: null: null}
                        { data?.register.errors.username ? data?.register.errors.username[0].message === "Enter a valid username. This value may contain only letters, numbers, and @/./+/-/_ characters." ?
                            <Alert variant='danger' className="mt-2" >Имя пользователя может содержать только буквы, цифры и символы @/./+/-/_</Alert>: null: null}
                        { data?.register.errors.username ? data?.register.errors.username[0].message === "A user with that username already exists." ?
                            <Alert variant='danger' className="mt-2" >Пользователь с таким именем уже создан</Alert>: null: null}
                        { data?.register.errors.password2 ? data?.register.errors.password2[0].message === "The two password fields didn’t match." ?
                            <Alert variant='danger' className="mt-2" >Пароли не совпадают</Alert>: null: null}
                        { data?.register.errors.password2 ? (data?.register.errors.password2[0].message === "This password is too short. It must contain at least 8 characters.") ||
                        (data?.register.errors.password2[0].message === "This password is too common.") ||
                        (data?.register.errors.password2[0].message === "This password is entirely numeric.")?
                            <Alert variant='danger' className="mt-2" >Пароль слишком простой</Alert>: null: null}

                        {data?.register.success ?  data?.register.success === true? <Alert variant='primary' className="mt-2">Вы зарегистрировались, запрос на подтверждение аккаунта отправлен вам на почту</Alert>: null: null}

                    </Form>
                    {/*</Card>*/}
                </div>
            </Container>
        </div>
    )
}