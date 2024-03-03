import React,{useState,useEffect} from 'react'
import service from '../appwrite/configuration';
import { Link,useParams,useNavigate } from 'react-router-dom';
import { Container,Button } from '../components';
import parse from 'html-react-parser';
import { useSelector } from 'react-redux';
const Post = () => {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);
    const user = userData.userData;
    const isAuthor = post && userData ? post.userId === user.$id : false;

    useEffect(() => {
        if (slug) {
            service.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);
    console.log(post);
    const deletePost = () => {
        service.deletePost(post.$id).then((status) => {
            if (status) {
                service.deleteFile(post.featuredImg);
                navigate("/");
            }
        });
    };
    console.log(isAuthor);
    return post ? (
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={service.getFilePreview(post.featuredImg)}
                        alt={post.title}
                        className="rounded-xl"
                        loading='lazy'
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/editpost/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">
                    {parse(post.content)}
                </div>
            </Container>
        </div>
    ) : null;
}

export default Post
