import React, {useState, useEffect} from 'react';
import axios from 'axios'
import { Pagination } from 'antd';
import { Radio } from 'antd';
import Item from './item'
import './App.css';
import { FloatButton } from 'antd';
import { BrowserRouter , Routes, Route, Link, Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Sec({data1, onDataChange }){
    const [data,setData]=useState({});
    const [pagestate,setPageState]=useState('now_playing');
    const [currentpage,setCurrent]=useState(1);
    const [itemdata,setItem]=useState({});
    const navigate = useNavigate();
    const handleClick = (id) => {
        console.log('change page')
        onDataChange(id);
        navigate(`/movies/${id}`); 
      };
    const apic=(e)=>{
        axios.get(`https://api.themoviedb.org/3/movie/${e}api_key=dd6df1c5ee27ca15782a9ebcda516743`)
        .then((response)=>{
            setData(response.data)
            console.log(response.data)
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    const clickItem=(e)=>{
        console.log('work')
        return(
            <div>
                <Item type={pagestate} />
            </div>
        )
    }
    

  const onChange = (e) => {
    console.log('radio checked', e.target.value);
    setPageState(e.target.value);
    setCurrent(1);

    
  };
  const uptotop = ()=>{
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
}
  const onChangepage = (pageNumber) => {
    console.log('page', pageNumber);
    console.log(`${pagestate}?page=${pageNumber}&`)
    setCurrent(pageNumber);
    apic(`${pagestate}?page=${pageNumber}&`)

  };
    useEffect(()=>{
        apic(`${pagestate}?`)
    },[pagestate])

    const a=()=>{
        console.log("a")
        let res=new Array(5).fill(null).map(()=>Array(4).fill(null));
        let c=0;
 
        for(let i=0;i<5;i++){
            for(let j=0;j<4;j++){
                res[i][j]=data.results[c];
                c+=1;
            }
        }
        console.log(res)
        
        return(
            <div>
                {data.results&&res.map((e)=>
                    <div style={{fontSize:15,}}>
                        <Outlet />
                        {e[0]?
                        <div className='movie' onClick={()=>handleClick(e[0].id)} style={{width:300,height:440,display:'inline-block',border:'1px solid',margin:10,boxShadow: '0px 4px 8px 0px rgba(0, 0, 0, 0.2)'}}>
                               
                            <img src={`https://image.tmdb.org/t/p/original${e[0].poster_path}`} style={{width:240,height:300,margin:5}}/>
                        
                            <p>Name: {e[0]?e[0].title:null}</p>
                            <p>Release Date: {e[0]?e[0].release_date:null}</p>
                            <p>Vote Average: {e[0]?e[0].vote_average:null}</p>
                        </div>
                        :null}
                        {e[1]?
                        <div className='movie'onClick={()=>handleClick(e[1].id)}  style={{width:300,height:440,display:'inline-block',border:'1px solid',margin:10,boxShadow: '0px 4px 8px 0px rgba(0, 0, 0, 0.2)'}}>

                            <img src={`https://image.tmdb.org/t/p/original${e[1].poster_path}`} style={{width:240,height:300,margin:5}}/>

                            <h6>Name: {e[1]?e[1].title:null}</h6>
                            <h6>Release Date: {e[1]?e[1].release_date:null}</h6>
                            <h6>Vote Average: {e[1]?e[1].vote_average:null}</h6>
                        </div>
                        :null}
                        {e[2]?
                        <div className='movie'onClick={()=>handleClick(e[2].id)} style={{width:300,height:440,display:'inline-block',border:'1px solid',margin:10,boxShadow: '0px 4px 8px 0px rgba(0, 0, 0, 0.2)'}}>
                            <img src={`https://image.tmdb.org/t/p/original${e[2].poster_path}`} style={{width:240,height:300,margin:5}}/>
                            
                            <h6>Name: {e[2]?e[2].title:null}</h6>
                            <h6>Release Date: {e[2]?e[2].release_date:null}</h6>
                            <h6>Vote Average: {e[2]?e[2].vote_average:null}</h6>
                        </div>
                        :null}
                        {e[3]?
                        <div className='movie' onClick={()=>handleClick(e[3].id)} style={{width:300,height:440,display:'inline-block',border:'1px solid',margin:10,boxShadow: '0px 4px 8px 0px rgba(0, 0, 0, 0.2)'}}>
                            <img src={`https://image.tmdb.org/t/p/original${e[3].poster_path}`} style={{width:240,height:300,margin:5}}/>
                            <h6>Name: {e[3]?e[3].title:null}</h6>
                            <h6>Release Date: {e[3]?e[3].release_date:null}</h6>
                            <h6>Vote Average: {e[3]?e[3].vote_average:null}</h6>
                        </div>
                        :null}
                    </div>
                )}
            </div>
        )
    }
    return(
        <div>
            <Outlet/>
            <div>
                <Radio.Group onChange={onChange} value={pagestate}>
                    <Radio value={'now_playing'}>Now Playing</Radio>
                    <Radio value={'popular'}>Popular</Radio>
                    <Radio value={'top_rated'}>Top Rated</Radio>
                    <Radio value={'upcoming'}>Upcoming</Radio>
                </Radio.Group>
            </div>
            <div>
            {/* {data.results?data.results.map((e)=>
            <h1>{e.title}</h1>
            ):null} */}
            </div>
            <Pagination showQuickJumper current={currentpage} total={data.total_results} pageSize={20} showSizeChanger={false} onChange={onChangepage}/>
            {data.results&&a()}
            <FloatButton.BackTop visibilityHeight={0}  onClick={uptotop()}/>
        </div>
    )
}

export default Sec;