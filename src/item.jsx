import React, {useState, useEffect} from 'react';
import axios from 'axios'
import { Pagination } from 'antd';
import { Input, Space,Select } from 'antd';
import './App.css';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FloatButton } from 'antd';
const { Search } = Input;
function Item(props){
    const [data,setData]=useState({});
    const [cast,setCast]=useState({});
    const navigate = useNavigate();
    let {id}= useParams();
    const onClick=(eid)=>{
        navigate(`/person/${eid}`);
    }
    const uptotop = ()=>{
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
          })
    }

    const apic=()=>{
        console.log(`https://api.themoviedb.org/3/movie/${id}?api_key=dd6df1c5ee27ca15782a9ebcda516743`)
        console.log(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=dd6df1c5ee27ca15782a9ebcda516743`)
        axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=dd6df1c5ee27ca15782a9ebcda516743`)
        .then((response)=>{
            setData(response.data)
            console.log(response.data)
            
        })
        .catch((err)=>{
            console.log(err)
        })
        axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=dd6df1c5ee27ca15782a9ebcda516743`)
        .then((response)=>{
            setCast(response.data)
            console.log(response.data)
            
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    useEffect(()=>{
        apic()
    },[])

  
    return(
        <div>
            <h1>Details id is {id}</h1>
            <img src={`https://image.tmdb.org/t/p/original${data.poster_path}`} alt='img' style={{width:240,height:300,margin:5}}/>
            <h1>Name: {data.original_title}</h1>
            <div style={{width:600 , margin: '0 auto'}}>
            <p>Overview: {data.overview}</p>
            </div>
            {cast.cast?cast.cast.map((e)=>
                <div onClick={()=>{onClick(e.id)}}
                style={{
                    width:300,
                    height:440,
                    display:'inline-block',
                    border:'1px solid',
                    margin:10,
                    verticalAlign: 'top',
                    boxShadow: '0px 4px 8px 0px rgba(0, 0, 0, 0.2)'
                    }}>
                    <img src={`https://image.tmdb.org/t/p/original${e.profile_path}`} alt='img' style={{width:240,height:300,margin:5}} />
                    <h2>Name: {e.original_name}</h2>
                    <h2>ID: {e.id}</h2>

                </div>
            ):null}
            <FloatButton.BackTop visibilityHeight={0}  onClick={uptotop()}/>

            
        </div>
    )
}

export default Item;