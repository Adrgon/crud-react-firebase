import React, { useState, useEffect } from 'react';
import { db } from '../firebase';



const LinkForm = (props) => {

    const initialStateValues = {
        url: '', 
        name: '',
        description: ''
    };

    const [values, setValues] = useState(initialStateValues)

    const handleInputChange = e => {
        const {name, value} = e.target;
        setValues({...values, [name]:value})
        //console.log(name, value);
    }

    const handleSubmit = e => {
        e.preventDefault();
        //console.log(values)
        props.addOrEditLink(values)
        setValues({...initialStateValues})
    }

    const getLinkById = async (id) =>{
        const doc = await db.collection('links').doc(id).get();
        //console.log(doc.data);
        setValues({...doc.data()});
    }

    useEffect(()=>{
        if(props.currentId === ''){
            setValues({...initialStateValues});
        } else {
            //console.log('Editando');
            getLinkById(props.currentId)

        }
    },[props.currentId]);

    return (
        <form className="card card-body" onSubmit={handleSubmit}>
            <div className='form-group input-group'>
                <div className="input-group-text bg-light">
                    <i className="material-icons">insert_link</i>
                </div>
                <input 
                    type="text" 
                    name="url" 
                    className="form-control"
                    placeholder="https://someurl/.com"
                    onChange={handleInputChange}
                    value={values.url}
                />
            </div>

            <div className='form-group input-group'>
                <div className="input-group-text bg-light">
                    <i className="material-icons">create</i>
                </div>
                <input 
                    type="text" 
                    name="name" 
                    className="form-control"
                    placeholder="Website name"
                    onChange={handleInputChange}
                    value={values.name}
                />
            </div>

            <div className='form-group'>
                <textarea 
                    name="description" 
                    className="form-control"
                    placeholder="Write some description"
                    rows="3"
                    onChange={handleInputChange}
                    value={values.description}
                ></textarea>
            </div>
    <button className="btn btn-primary btn-block">{props.currentId==='' ? 'Save':'Update'}</button>

        </form>
    ) 
        
}

export default LinkForm;