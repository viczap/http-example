import React, { Component } from 'react';
import axios from 'axios';
import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {

    state = {
        posts : [],
        selectedPost : null
    };

    postSelectedHandler = (id) => {
        this.setState({ selectedPost : id });
    }

    componentDidMount() {
        axios.get('/posts')
            .then(response => {
                const posts = response.data.slice(0, 4);
                const updatedPosts = posts.map(post => { 
                    return {...post, author: 'Victor'} 
                });
                this.setState({ posts : updatedPosts });
            }); 
    }

    render () {

        const posts = this.state.posts.map(post => {
            return <Post key={post.id} 
                        title={post.title} 
                        author={post.author}
                        clicked={this.postSelectedHandler.bind(this, post.id)} />
        });

        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    <FullPost selectedPostId={this.state.selectedPost} />
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;