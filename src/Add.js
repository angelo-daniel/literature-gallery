import { useState } from 'react';
import './App.css';
import { useNavigate } from 'react-router-dom';

export default function Add() {
    const [title, setTitle] = useState();
    const [text, setText] = useState();

    const navigate = useNavigate();

    const redirectList =() => {
        navigate('/list');
    }

    const handleSubmit = async () => {
         const titlebar = document.getElementById('title-input');
         const textbox = document.getElementById('text-input');

         //checking for empty values
         if(titlebar.value.trim() === "" || textbox.value.trim() === "") {
            alert("boxes cannot be empty!"); 
         }else{
            try {
                //using fetch to send the data
                //converting it into JSON format
                const response = await fetch('http://localhost:8081/insert-data', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json'},
                    body: JSON.stringify({name: title, body: text })
                    });

                    if(!response.ok) {
                        throw new Error(`Server error: ${response.status}`);
                    }

                    const data = await response.json();
                    console.log("Success", data);
                    alert("your writing has been added!");
                    
                    //clearing the values
                    setText('');
                    setTitle('');
                    titlebar.value = '';
                    textbox.value = '';
                    
            } catch (error) {
                console.log("Error inserting data", error);
            }
         }
    };

    return(
        <div className='main-body'>
            <div className="list-buttons">
                <button id='gal-btn'
                    onClick={redirectList}>GALLERY</button>
            </div>
            <div>
                <h2>ADD WRITING</h2>
            </div>
            <div className='form-container'>
                     <label htmlFor='title-input'>Title</label>
                    <input name='title-input'
                        type='text'
                        id='title-input'
                        placeholder='input title here'
                        onChange={(e) => setTitle(e.target.value)}
                    ></input>
                    <label htmlFor='text-input'>Text Body</label>
                    <textarea name='text-input'
                        type='text'
                        id='text-input'
                        onChange={(e) => setText(e.target.value)}
                        rows='30'
                    ></textarea>

                    <button type='submit' id='submit-btn' onClick={handleSubmit}>Submit</button>
            </div>

            
        </div>
    )
}