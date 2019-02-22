import React, { Component } from 'react'

class AddContact extends Component {
    constructor(props) {
        super(props);

        this.nameInput = React.createRef();
        this.emailInput = React.createRef();
        this.phoneInput = React.createRef();
    }


    onSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
        const contact = {
            name: this.nameInput.current.value,
            email: this.emailInput.current.value,
            phone: this.phoneInput.current.value
        }
        console.log(contact)
    }

    static defaultProps = {
        name: 'Fred smith',
        email: 'fred@123.com',
        phone: '123-123-1232'
    }

    render() {
        const { name, email, phone } = this.props;
        return (
            <div className="card mb-3">
                <div className="card-header">Add Contact</div>
                <div className="card-body">
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input type="text"
                                className="form-control form-control-lg"
                                placeholder="enter name"
                                name="name"
                                defaultValue={name}
                                ref={this.nameInput} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email"
                                className="form-control form-control-lg"
                                placeholder="enter email"
                                name="email"
                                defaultValue={email}
                                ref={this.emailInput} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">phone</label>
                            <input type="text"
                                className="form-control form-control-lg"
                                placeholder="enter phone"
                                name="phone"
                                defaultValue={phone}
                                ref={this.phoneInput} />
                        </div>
                        <input type="submit" value="Add Contact" className="btn btn-light btn-block" />
                    </form>
                </div>
            </div>
        )
    }
}


export default AddContact;