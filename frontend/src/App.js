import React, { useEffect, useState } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

function App() {

    const [lists, setLists] = useState([]);
    const [value, setValue] = useState('');

    useEffect(() => {
        axios.get('/api/values')
            .then(response => {
                console.log(response.data);
                setLists(response.data);
            })
    }, [])


    const changeHandler = (event) => {
        setValue(event.currentTarget.value);
    }

    const submitHandler = (event) => {
        event.preventDefault();

        axios.post(`/api/value`, {value: value})
            .then(response => {
                if (response.data.success) {
                    console.log(response);
                    setLists([...lists, response.data]) // append
                    setValue('');
                } else {
                    alert('insert fail');
                }
            })
    }


    return (
        <div className="App">
        <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />



            <div className="container">

                {lists && lists.map((list, index) => (
                    <li key={index}>
                        {list.VALUE}
                        {/* db에 컬럼명을 대문자로 했으면 대문자로, 혹은 백엔드에서 카멜케이스로 변환하여 response */}
                    </li>
                ))}
                <br />

                <form className="example" onSubmit={submitHandler}>
                    <input type="text" placeholder="입력" onChange={changeHandler} value={value} />
                    <button type="submit">확인</button>
                </form>
            </div>



        </header>
        </div>
    );
}

export default App;
