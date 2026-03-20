import { useState,useEffect } from "react";

export default function App(){
  const APIlink='https://dummyjson.com/posts';
  const [posts,setPosts]=useState([]);
  const [error,setError]=useState();
  const [loading,setLoadingState]=useState(false);
  useEffect(()=>{
    const fetchPosts=  async ()=>{
      setLoadingState(true);
      try{
         const response= await fetch(`${APIlink}`);
        const data = await response.json();
        setPosts(data.posts);
      } catch(e){
        setError(e);
      }
      finally{
        setLoadingState(false);
      }
      
    }
    fetchPosts();
  },[]);
  return(
    <>
      <h1 className="text-center text-red-800 text-[50px]">ThoughtsInPlace</h1>
      <p className="text-center text-[20px] text-red-500">A safe space to express yourself</p>
      {loading && <p className="mt-[20px] text-[20px]">Posts are loading,please wait...</p>}
      {error&&<p className="mt-[20px] text-[20px]">An error has occured, please refresh</p>}
      <ul className="mt-[20px]">
        {posts.map((post)=>(
          <li className="pt-[20px] pb-[20px] border-b text-center bg-orange-500 hover:bg-red-500" key={post.id}>{post.title}</li>
        ))}
      </ul>
    </>
  )
}