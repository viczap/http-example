import React, { Component } from 'react';
import axios from 'axios';
import './FullPost.css';

class FullPost extends Component {

    state = {
        thePost: null
    }

    componentDidUpdate() {
        if (this.props.selectedPostId) {
            if (!this.state.thePost || 
                (this.state.thePost.id !== this.props.selectedPostId)) {
                axios.get(`/posts/${this.props.selectedPostId}`)
                    .then(response => {
                        this.setState({ thePost: response.data })
                        console.log(response.data);
                    });
            }
        }
    }

    render() {
        let post = <p style={{textAlign : 'center'}}>Please select a Post!</p>;
        if (this.props.selectedPostId) {
            post = <p style={{textAlign : 'center'}}>Loading...</p>
        }
        
        if(this.state.thePost) {
            post = (
                <div className="FullPost">
                    <h1>{this.state.thePost.title}</h1>
                    <p>{this.state.thePost.body}</p>
                    <div className="Edit">
                        <button className="Delete">Delete</button>
                    </div>
                </div>
    
            );
    
        }
        return post;
    }
}

export default FullPost;