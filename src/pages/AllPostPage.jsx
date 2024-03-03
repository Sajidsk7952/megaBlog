import React, { useEffect, useState } from 'react'
import service from '../appwrite/configuration';
import { Container,PostCard } from '../components';

const AllPostPage = () => {
    const [posts,setPosts] = useState([]);
    useEffect(()=>{
        service.getActivePosts([]).then((posts)=>{
            if (posts) {
                setPosts(posts.documents);
            }
        })
    },[]);

  return (
    <div className='w-full py-8'>
      <Container>
        <div className='flex flex-wrap'>
            {posts.map((post)=>(
                <PostCard post={post} />
            ))}
        </div>
      </Container>
    </div>
  )
}

export default AllPostPage
