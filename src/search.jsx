import React, {useState, useEffect} from 'react';
import axios from 'axios'
import { Pagination } from 'antd';
import { Input, Space,Select } from 'antd';
import './App.css';
const { Search } = Input;
function Searchf(){
    const [data,setData]=useState({});
    const [pagestate,setPageState]=useState('');
    const [pagetype,setPageType]=useState('movie');
    const [currentpage,setCurrent]=useState(1);
    const apic=(e,f)=>{
        console.log(`https://api.themoviedb.org/3/search/${f}?api_key=dd6df1c5ee27ca15782a9ebcda516743&query=${e}`)
        axios.get(`https://api.themoviedb.org/3/search/${f}?api_key=dd6df1c5ee27ca15782a9ebcda516743&query=${e}`)
        .then((response)=>{
            setData(response.data)
            console.log(response.data)
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    const onSearch = (value, _e, info) => {
        console.log(info?.source, value);
        setPageState(value);
    }

    const handleChange = (value) => {
        console.log(`selected ${value}`);
        setPageType(value)
      };


  const onChangepage = (pageNumber) => {
    console.log('page', pageNumber);
    console.log(`${pagestate}?page=${pageNumber}&`)
    setCurrent(pageNumber);
    apic(`${pagestate}&page=${pageNumber}`,`${pagetype}`)

  };
    useEffect(()=>{
        apic(`${pagestate}`,`${pagetype}`)
    },[pagestate,pagetype])

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
                        {e[0]?
                        <div className='movie' style={{
                            width:300,
                            height:440,
                            display:'inline-block',
                            border:'1px solid',
                            margin:10,
                            verticalAlign: 'top',
                            boxShadow: '0px 4px 8px 0px rgba(0, 0, 0, 0.2)'
                            }}>
                               
                            <img src={`https://image.tmdb.org/t/p/original${e[0].poster_path}`} style={{width:240,height:300,margin:5}} alt=''/>
                        
                            <p>Name: {e[0]?e[0].title:null}</p>
                            <p>Release Date: {e[0]?e[0].release_date:null}</p>
                            <p>Vote Average: {e[0]?e[0].vote_average:null}</p>
                        </div>
                        :null}
                        {e[1]?
                        <div className='movie' style={{width:300,height:440,display:'inline-block',border:'1px solid',margin:10,boxShadow: '0px 4px 8px 0px rgba(0, 0, 0, 0.2)'}}>

                            <img src={`https://image.tmdb.org/t/p/original${e[1].poster_path}`} style={{width:240,height:300,margin:5}} alt=''/>

                            <h6>Name: {e[1]?e[1].title:null}</h6>
                            <h6>Release Date: {e[1]?e[1].release_date:null}</h6>
                            <h6>Vote Average: {e[1]?e[1].vote_average:null}</h6>
                        </div>
                        :null}
                        {e[2]?
                        <div className='movie' style={{width:300,height:440,display:'inline-block',border:'1px solid',margin:10,boxShadow: '0px 4px 8px 0px rgba(0, 0, 0, 0.2)'}}>
                            <img src={`https://image.tmdb.org/t/p/original${e[2].poster_path}`} style={{width:240,height:300,margin:5}} alt=''/>
                            
                            <h6>Name: {e[2]?e[2].title:null}</h6>
                            <h6>Release Date: {e[2]?e[2].release_date:null}</h6>
                            <h6>Vote Average: {e[2]?e[2].vote_average:null}</h6>
                        </div>
                        :null}
                        {e[3]?
                        <div className='movie' style={{width:300,height:440,display:'inline-block',border:'1px solid',margin:10,boxShadow: '0px 4px 8px 0px rgba(0, 0, 0, 0.2)'}}>
                            <img src={`https://image.tmdb.org/t/p/original${e[3].poster_path}`} style={{width:240,height:300,margin:5}} alt=''/>
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
            <div>
            <Select
            value={pagetype}
            style={{width: 120}}
            onChange={handleChange}
            options={[
                {
                value: 'movie',
                label: 'Movie',
                },
                {
                value: 'tv',
                label: 'TV',
                }
            ]}
            />
            <Search
                placeholder="input search text"
                allowClear
                onSearch={onSearch}
                style={{
                width: 200,
                }}
            />
            </div>
            
            {pagestate !==''?
            <div>
            <Pagination showQuickJumper current={currentpage} total={data.total_results} pageSize={20} showSizeChanger={false} onChange={onChangepage}/>
            {data.results&&a()}
            </div>
            :null}
        </div>
    )
}

export default Searchf;