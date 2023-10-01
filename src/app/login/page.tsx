'use client'
import React, {useState, useEffect} from 'react'
import { useRouter } from 'next/navigation'
import { login, setLocalStorage } from '@/services/registerService'

export default function page() {

    const router = useRouter() 

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    useEffect(()=>{
        setLocalStorage()
    }, [])

    const onclick = ()=> {
        console.log('click')
        if (login({email: email, password: password})) {
            console.log('done')
            router.push('/')
        }
    }

    return (
        <div className='m-5'>
            <div className="form-outline mb-4">
                <input value={email} onChange={e => setEmail(e.target.value)} type="email" className="form-control" placeholder='email'/>
            </div>
            <div className="form-outline mb-4">
                <input value={password} onChange={e => setPassword(e.target.value)} type="password" className="form-control" placeholder='password'/>
            </div>
            <button type="button" onClick={onclick} className="btn btn-primary btn-block mb-4">Sign in</button>
        </div>
    )
}
