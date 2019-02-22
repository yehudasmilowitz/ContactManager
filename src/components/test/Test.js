import React, { Component } from 'react'

class Test extends Component {
    state = {
        title: "",
        body: ""
    }

    componentDidMount() {
        console.log("component mounted")
        fetch('https://jsonplaceholder.typicode.com/posts/1')
            .then(response => response.json())
            .then(data => this.setState({
                title: data.title,
                body: data.body
            }))
    }

    /* 
    componentWillMount() {
        console.log("component will mount")
    }

    componentWillUpdate() {
        console.log("component will update")
    }

    componentDidUpdate() {
        console.log("component updated")
    }

    componentWillReceiveProps(nextProps, nextState) {
        console.log("componentWillReceiveProps")
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        return {
            test: 'something'
        }
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        console.log("getSnapshotBeforeUpdate..")
    }

    */

    render() {
        const { title, body } = this.state;
        return (
            <div>
                <h1>{title}</h1>
                <p>{body}</p>
            </div>
        )
    }
}

export default Test;
