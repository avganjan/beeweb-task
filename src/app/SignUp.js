import React, {useState, useEffect} from 'react'
import {Link, useHistory} from 'react-router-dom'

import useDebounce from "../use-debounce";

import Modal from "./Modal";

const SignUp = ()=>{
    const [registerUsername, setRegisterUsername] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [search, setSearch] = useState("");
    const [beewebs, setBeeWebs] = useState("...");
    const [data, setData] = useState(null);
    const [modal, setModal] = useState(null);

    const history = useHistory()

    const signUp = (e) => {
        fetch('/api/sign/up',{
            method: 'POST',
            body: JSON.stringify({
                username: registerUsername,
                password: registerPassword
            }),
            headers: { 'Content-Type': 'application/json' }})
            .then((res)=> res.json())
            .then((res)=>{
                console.log(res)
                setModal(res)
            })
        setRegisterPassword('')
        setRegisterUsername('')
        e.preventDefault()
    }
    const login = (e) => {

        fetch('/api/login',{
            method: 'POST',
            body: JSON.stringify({
                username: registerUsername,
                password: registerPassword
            }),
            headers: { 'Content-Type': 'application/json' }})
            .then((res)=> res.json())
            .then((res)=>{
                console.log(res)
                setModal(res)
            })

        setRegisterPassword('')
        setRegisterUsername('')
        e.preventDefault()
    }
    const getUser = () => {
        fetch('/api/user',{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }})
            .then((res)=> res.json())
            .then((res)=>{
                setData(res)
                console.log(res)
            })
        if (data) return history.push('/account')
    };

    const getSubDomains = ()=>{
        fetch('/api/get/beewebs',
            {
                method: 'POST',
                body: JSON.stringify({str: debounced}),
                headers: {'Content-Type': 'application/json'}
            }).then(res=>res.json()).then((res)=>{
                console.log(res);
                setBeeWebs(res)
        }).then(err=>console.log('Error message: ' + err))
    }

    const debounced = useDebounce(search, 300)

    useEffect(()=>{
        getSubDomains()
    },[debounced])

    return (
        <section style={{position: 'relative'}}>
            <h2>Fill the necessary fields!</h2>
            {modal && <Modal data={modal}/>}
            <form>
                <label htmlFor="login">Login:</label>
                <input
                    type="text"
                    id="login"
                    name="login"
                    placeholder="What's on your mind?"
                    value={registerUsername}
                    onChange={(e) => setRegisterUsername(e.target.value)}
                />
                <label htmlFor="password">Password:</label>
                <input
                    type="text"
                    id="password"
                    name="password"
                    value={registerPassword}
                    placeholder="password"
                    onChange={(e) => setRegisterPassword(e.target.value)}
                />
                <button type={'button'} onClick={signUp} style={{marginRight: '5px'}}>Sign up</button>
                <button type={'button'} onClick={login}>Log in</button>
            </form>
            <button type={'button'} onClick={getUser}>After Logging in, continue with passport</button>
            <hr/>
            <label htmlFor="debounce">Test debouncing with 300ms delay:</label>
            <input
                type="text"
                id="debounce"
                name="debounce"
                value={search}
                placeholder="try JS debouncing..."
                onChange={(e) => setSearch(e.target.value)}
            />
            <h3>{beewebs.status ?
                `beeweb already exist, consider please '${beewebs.status[0]}' or '${beewebs.status[1]}'` :
                `No match, type the domain name 'beeweb' correctly!`
            }</h3>
            {/*<h3>{debounced}</h3>*/}
        </section>
    );
}

export default SignUp