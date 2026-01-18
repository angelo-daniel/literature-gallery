import { useEffect, useState} from 'react';
import './App.css';
import { useNavigate } from 'react-router-dom';


function List() {
    const [data, setData] = useState([])
    const navigate = useNavigate();
    const [editor, setEditor] = useState(0);
    const editpass = "abc123";

    //storing data
    const [selectedData, setSelectedData] = useState(null);
    
    const [editedContent, setEditedContent] = useState("");
    const [newTitle, setNewTitle] = useState("");


    const redirectHome = () => {
        navigate('/');
    }

    const redirectToAdd = () => {
        let passkey = prompt("Enter passkey access:")
        if(passkey === editpass) {
            navigate('/add');
        }
        
    }
    useEffect(() => {
        
        fetch('http://localhost:8081/files')
        .then(res => res.json())
        .then(data => setData(data))
        .catch(err => console.log(err))
    }, []);

    const handleRemove = async (id) => {
        if(window.confirm("Confirm delete?") == true) {
            try{
                const response = await fetch(`http://localhost:8081/delete-data/${id}`, {
                    method: 'DELETE',
                });

                if (!response.ok) {
                    
                }
                
                fetchUpdatedData();
            }catch(err){
                console.log("fail:", err);
            }
        }
        
    }
    
    const fetchUpdatedData = () => {
        fetch('http://localhost:8081/files')
        .then(res => res.json())
        .then(data => setData(data))
        .catch(err => console.log(err))
    };

    const editorMode = () => {
        const buttonText = document.getElementById('edit-btn');
        if(editor === 0) {
            let passkey = prompt("enter key");
            if(passkey === "abc123"){
                setEditor(1);
            
                buttonText.textContent = 'close edit';
            }
        }else{
            setEditor(0);

            buttonText.textContent = 'edit mode';
        }
    };

    //edit title/text modal function
    var modal = document.getElementById("edit-modal");
    var body = document.getElementById('modal-lit-textarea');
    
    const openLitModal = (d) => {
        setSelectedData(d);
        console.log("Lit ID: ", d);

        modal.style.display = "block";
    }
    
    const closeLitModal = () => {
        modal.style.display = "none";
    }
    
    useEffect(() => {
        console.log('selectedData updated', selectedData);
        console.log('current editor value:', editor);
    }, [selectedData, editor]);
    
    return(
        <div className="main-body">
            
            <div className="list-buttons">
                <button id='home-btn' onClick={redirectHome}>HOME</button>
                <button id='gal-btn'>GALLERY</button>
                <button id='edit-btn' onClick={editorMode}>Edit mode</button>
            </div>
            <div>
                <h1>- LITERATURE -</h1>
            </div>
            <div className='section-container'>
                <button id='add-new-lit-btn'
                    onClick={redirectToAdd}>Writing something new?</button>
                <div className='list-table'>
                    <table>
                        <thead>
                            <tr>
                                {editor === 1 ? <th style={{width:'5%'}}>ID</th> : null}
                                <th>TITLE</th>
                                {editor === 1 ? <th style={{width:'5%'}}>?</th> : null}
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((d, i) => 
                            <tr key={i}>
                                {editor === 1 ? 
                                    <td id='list-id'>
                                        {d.id}
                                    </td> 
                                : null}
                                    <td id='list-title'>
                                        <button id='list-title-btn' 
                                                onClick={() => openLitModal(d)}
                                                >
                                                {d.title}
                                        </button>
                                    </td>
                                {editor === 1 ? 
                                    <td style={{width: '5%'}}>
                                        <button id='list-remove'
                                            onClick={() => handleRemove(d.id)}>
                                                x
                                        </button>
                                    </td> 
                                : null}
                            </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            
            <div className='edit-modal' id="edit-modal">
                <div className='modal-content'>
                    {selectedData && (
                        <div>
                             <h1>{editor === 1 ? "editing modal" : `selected data: ${selectedData.title}` }</h1>
                            <textarea className='modal-lit-textarea' 
                                    id='modal-lit-textarea'
                                    rows='30'
                                    value={selectedData.descript}
                                    onChange={(e) => setEditedContent(e.target.value)}
                                    readOnly={editor !== 1 }
                                />
                        </div> 
                    )}
                    
                    <button className='edit-modal-close-btn' onClick={closeLitModal}>close</button>
                </div>
            </div>
        </div>
    );
}

export default List;