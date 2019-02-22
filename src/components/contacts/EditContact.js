import React, { Component } from 'react';
import { Consumer } from '../../context';
import TextInputGroup from '../../components/layout/TextInputGroup';
//import uuid from 'uuid';
import axios from 'axios';

class EditContact extends Component {
    state = {
        name: '',
        email: '',
        phone: '',
        errors: {
            name: '',
            email: '',
            phone: ''
        }
    }

    onChange = e => this.setState({
        [e.target.name]: e.target.value
    });

    async componentDidMount() {
        const { id } = this.props.match.params;
        const res = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
        const contact = res.data;
        this.setState({
            name: contact.name,
            email: contact.email,
            phone: contact.phone
        })
    }

    onSubmit = async (dispatch, e) => {
        e.preventDefault();
        const { name, email, phone } = this.state;

        //Check for errors
        if (name === '') {
            this.setState({ errors: { name: 'Name is Required' } });
            return;
        }
        if (email === '') {
            this.setState({ errors: { email: 'Email is Required' } });
            return;
        }
        if (phone === '') {
            this.setState({ errors: { phone: 'Phone is Required' } });
            return;
        }

        const updContact = {
            name,
            email,
            phone
        }

        const { id } = this.props.match.params;
        const res = await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, updContact);
        dispatch({
            type: 'UPDATE_CONTACT',
            payload: res.data
        })

        //clear state
        this.setState({
            name: '',
            email: '',
            phone: '',
            error: {}
        })

        this.props.history.push('/');
    }

    render() {
        const { name, email, phone, errors } = this.state;

        return (
            <Consumer>
                {value => {
                    const { dispatch } = value;
                    return (
                        <div className="card mb-3">
                            <div className="card-header">Edit Contact</div>
                            <div className="card-body">
                                <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                                    <TextInputGroup
                                        label="Name"
                                        name="name"
                                        placeholder="Enter Name"
                                        onChange={this.onChange}
                                        value={name}
                                        error={errors.name}
                                    />
                                    <TextInputGroup
                                        label="Email"
                                        type="email"
                                        name="email"
                                        placeholder="Enter Email"
                                        onChange={this.onChange}
                                        value={email}
                                        error={errors.email}
                                    />
                                    <TextInputGroup
                                        label="Phone"
                                        name="phone"
                                        placeholder="Enter Phone"
                                        onChange={this.onChange}
                                        value={phone}
                                        error={errors.phone}
                                    />
                                    <input type="submit" value="Update Contact" className="btn btn-light btn-block" />
                                </form>
                            </div>
                        </div>
                    )
                }}

            </Consumer>
        )
    }
}


export default EditContact;