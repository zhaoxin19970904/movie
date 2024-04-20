import React, {useState, useEffect} from 'react';
import axios from 'axios'
import { Pagination } from 'antd';
import { Input, Space,Select,Menu } from 'antd';
import './App.css';
const { Search } = Input;
function Searchn(){
    const [movie,setMovie]=useState({});
    const [people,setPeople]=useState({});
    const [company,setCompany]=useState({});
    const [tv,setTv]=useState({});
    const [keyword,setKeyword]=useState({});
    const [network,setNetwork]=useState({});
    const [collection,setCollection]=useState({});
    const [data,setData]=useState({});
    const [pagestate,setPageState]=useState('');
    const [pagetype,setPageType]=useState('person');
    const [currentpage,setCurrent]=useState(1);
    let loop1=['setMovie','setPeople','setCompany','setTv','setKeyword','setNetwork','setCollection'];

  const onClick = (e) => {
    console.log('click ', e);
    setPageType(e.key);
  };
  const apic = (e, f) => {
    const requests = [
        axios.get(`https://api.themoviedb.org/3/search/${f}?api_key=dd6df1c5ee27ca15782a9ebcda516743&query=${e}`),
        axios.get(`https://api.themoviedb.org/3/search/movie?api_key=dd6df1c5ee27ca15782a9ebcda516743&query=${e}`),
        axios.get(`https://api.themoviedb.org/3/search/person?api_key=dd6df1c5ee27ca15782a9ebcda516743&query=${e}`),
        axios.get(`https://api.themoviedb.org/3/search/company?api_key=dd6df1c5ee27ca15782a9ebcda516743&query=${e}`),
        axios.get(`https://api.themoviedb.org/3/search/tv?api_key=dd6df1c5ee27ca15782a9ebcda516743&query=${e}`),
        axios.get(`https://api.themoviedb.org/3/search/keyword?api_key=dd6df1c5ee27ca15782a9ebcda516743&query=${e}`),
        // axios.get(`https://api.themoviedb.org/3/search/network?api_key=dd6df1c5ee27ca15782a9ebcda516743&query=${e}`),
        axios.get(`https://api.themoviedb.org/3/search/collection?api_key=dd6df1c5ee27ca15782a9ebcda516743&query=${e}`)
    ];

    Promise.all(requests)
        .then((responses) => {
            // 处理所有响应
            setData(responses[0].data);
            setMovie(responses[1].data);
            setPeople(responses[2].data);
            setCompany(responses[3].data);
            setTv(responses[4].data);
            setKeyword(responses[5].data);
            // setNetwork(responses[6].data);
            setCollection(responses[6].data);

        })
        .catch((err) => {
            console.error(err);
        });
};
        
        
    
    const onSearch = (value, _e, info) => {
        console.log(info?.source, value);
        setPageState(value);
    }

    const handleChange = (value) => {
        console.log(`selected ${value}`);
        setPageType(value)
      };

      const items = [
        {
          label: `Movies ${movie.total_results}`,
          key: 'movie',

        },
        {
          label: `People ${people.total_results}`,
          key: 'person',
        },
        {
            label: `Companies ${company.total_results}`,
            key: 'company',
          },
          {
            label: `TV Shows ${tv.total_results}`,
            key: 'tv',
          },
          {
            label: `Keywords ${keyword.total_results}`,
            key: 'keyword',
          },
          {
            label: 'Networks',
            key: 'network',
          },
          {
            label: `Collections ${collection.total_results}`,
            key: 'collection',
          },
    ]


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
        if(pagetype==='movie'||pagetype==='tv'){
        return(
            <div>
                {data.results&&data.results.map((e)=>
                    <div >
                        <div className='movie' >
                            <img src={`https://image.tmdb.org/t/p/original${e.poster_path}`} style={{width:240,height:300,margin:5}} alt=''/>
                        
                            <p>Name: {e?e.title:null}</p>
                            <p>Release Date: {e?e.release_date:null}</p>
                            <p>Overview: {e?e.overview:null}</p>
                        </div>
                        
                    </div>
                )}
            </div>
        )}
        else if(pagetype==='collection'){
            return(
                <div>
                    {data.results&&data.results.map((e)=>
                        <div >
                            <div className='movie' >
                                <img src={`https://image.tmdb.org/t/p/original${e.poster_path}`} style={{width:240,height:300,margin:5}} alt=''/>
                            
                                <p>Name: {e?e.name:null}</p>
                                <p>Overview: {e?e.overview:null}</p>
                            </div>
                            
                        </div>
                    )}
                </div>
            )}
        else if(pagetype==='person'){
            return(
            <div>
                {data.results&&data.results.map((e)=>
                    <div >
                        <div className='movie' >
                            <img src={`https://image.tmdb.org/t/p/original${e.profile_path}`} style={{width:240,height:300,margin:5}} alt=''/>
                        
                            <p>Name: {e?e.name:null}</p>
                            <p>{e?e.known_for_department:null}</p>
                            <p>Title:{e.known_for?e.known_for.map((k)=>
                                <a>{k.title}|</a>
                            ):null}
                            </p>
                        </div>
                        
                    </div>
                )}
            </div>
        )}
        else if(pagetype==='company'||pagetype==='keyword'){
            return(
            <div>
                {data.results&&data.results.map((e)=>
                    <div >
                        <div className='movie' >
                            <p>Name: {e?e.name:null}</p>
                        </div>
                        
                    </div>
                )}
            </div>
        )}
    }
    return(
        <div>
            <div>
            
            <Search
                placeholder="input search text"
                allowClear
                onSearch={onSearch}
                style={{
                width: 200,
                }}
            />
            <Menu onClick={onClick} selectedKeys={[pagetype]} mode="horizontal" items={items} />
            </div>
            
            {pagestate !==''?
            <div>
            <Pagination showQuickJumper current={currentpage} total={data.total_results} pageSize={20} showSizeChanger={false} onChange={onChangepage} />
            {data.results&&a()}
            </div>
            :null}
        </div>
    )
}

export default Searchn;