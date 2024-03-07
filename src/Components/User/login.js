import React, { useState } from "react";

export default function Login () {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <form onSubmit={handleSubmit}>
            <h1>Login</h1>
            <label for="email">Email:
                <input id="email" type="text" name="email" value={email} onChange={e => setEmail(e.currentTarget.value)} placeholder="your.email@gmail.com"></input>
            </label> 
            <label for="username">Username:
                <input id="username" type="text" name="username" value={username} onChange={e => setUsername(e.currentTarget.value)} placeholder="Username"></input>
            </label>
            <label for='password'>
                <input id="password" type="password" name="password" value={password} onChange={e => setPassword(e.currentTarget.value)} placeholder="Password"></input>
            </label>
            
        </form>
    );
}