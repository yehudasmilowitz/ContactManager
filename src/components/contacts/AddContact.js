import React, { Component } from 'react';
import { Consumer } from '../../context';
import TextInputGroup from '../../components/layout/TextInputGroup';
//import uuid from 'uuid';
import axios from 'axios';

class AddContact extends Component {
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

        const newContact = {
            //id: uuid(),
            name,
            email,
            phone
        }

        const res = await axios.post('https://jsonplaceholder.typicode.com/users', newContact)
        dispatch(
            {
                type: "ADD_CONTACT",
                payload: res.data
            }
        )

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
                            <div className="card-header">Add Contact</div>
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
                                    <input type="submit" value="Add Contact" className="btn btn-light btn-block" />
                                </form>
                            </div>
                        </div>
                    )
                }}

            </Consumer>
        )
    }
}


export default AddContact;