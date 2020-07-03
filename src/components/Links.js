import React, {useEffect, useState} from 'react'
import LinkForm from './LinkForm';

import {toast} from 'react-toastify'

import {db} from '../firebase'



 const Links = () => {
    const [links, setLinks] = useState([]);
    const [currentId, setCurrentId] = useState('');

    const addOrEditLink = async(linkObject) =>{
        try {
            //console.log('new task')
            if(currentId===''){
                await db.collection('links').doc().set(linkObject)
                toast('New link added', {type: "success"});
            }else {
                db.collection('links').doc(currentId).update(linkObject);
                toast('Link updated succesfully', {type: "info"});
                setCurrentId('');
            }            
        } catch (error) {
            console.error(error);
        }



    }

    const onDeleteLik = async (id) => {
        if(window.confirm('are you sure you want to delete this link')){
            //console.log(id)
            await db.collection('links').doc(id).delete();
            toast('Link removed succesfully', {type: "error", autoClose: 3000});
        }
    }

    const getLinks = async () => {
/*         const querySnapshoot = await db.collection('links').get()
        querySnapshoot.forEach( doc => {
            console.log(doc.data())
        }) */
        db.collection('links').onSnapshot( (querySnapshot)=>{
            const docs = [];
            querySnapshot.forEach((doc)=>{
                console.log(doc.data)
                docs.push({...doc.data(), id:doc.id});
            })
            //console.log(docs);
            setLinks(docs)
        })
    }

    useEffect(() => {
        console.log('Obteniendo datos');
        getLinks();
    }, [])

    return (
        <div className='container'>
            <div className="col-md-4 p-2">
                <LinkForm addOrEditLink{...{addOrEditLink, currentId, links}} />
            </div>

            <div className="col-md-8 p-2">{links.map( link => 
                (<div className="card mb-1" key={link.id}>
                    <div className="card-body">
                        <div className="d-flex justify-content-between">
                            <h4>{link.name}</h4>
                            <div>
                                <i className="material-icons text-danger" onClick={()=>{onDeleteLik(link.id)}}>close</i>
                                <i className="material-icons " onClick={()=>setCurrentId(link.id)}>create</i>
                            </div>
                        </div>
                        <p>{link.description}</p>
                        <a href={link.url} 
                            target='_blank' 
                            rel="noopener noreferrer" >
                            Go to website 
                        </a>
                    </div>
                </div>)
                )}</div>
        </div>
    )
}
export default Links