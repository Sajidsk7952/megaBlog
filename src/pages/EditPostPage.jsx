import React, { useEffect, useState } from 'react'
import { PostForm,Container } from '../components';
import service from '../appwrite/configuration';
import { useNavigate, useParams } from 'react-router-dom';
// import { s } from 'vite/dist/node/types.d-jgA8ss1A';
const EditPostPage = () => {
    const [post,setPost] = useState(null);
    const {slug} = useParams();
    const navigate = useNavigate();
    useEffect(()=>{
        if(slug){
            service.getPost(slug).then(post => {
                if(post){
                    setPost(post);
                }
            })
        }else{
            navigate('/')
        }
    },[slug,navigate])
  return post ? (
    <div>
      <div className='py-8'>
        <Container >
            <PostForm post={post}/>
        </Container>
      </div>
    </div>
  ) : null
}

export default EditPostPage;
