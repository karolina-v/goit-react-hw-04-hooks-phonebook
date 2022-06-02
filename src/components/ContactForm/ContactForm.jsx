import React, { Component } from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';

class ContactForm extends Component {
    state = {
        name: '',
        number: '',
    }

    nameInputId = shortid.generate();
    numberInputId = shortid.generate();

    handleSubmit = (e) => {
        e.preventDefault();
        const contact = {
            id: shortid.generate(),
            name: this.state.name,
            number: this.state.number,
        }
        this.props.onSubmit(contact);
        this.reset();
    }
    
    inputChange = (e) => {
        const { name, value } = e.currentTarget;
        this.setState({ [name]: value })
    }

    reset = () => {
        this.setState({ name: '', number: '' })
    }
    

    render() {
        const { name, number } = this.state;

        return (
            <form onSubmit={this.handleSubmit}>
                <fieldset>
                    <label htmlFor={this.nameInputId}>
                        Name
                        <input
                            type="text"
                            name='name'
                            value={name}
                            onChange={this.inputChange}
                            id={this.nameInputId}
                            placeholder="Name..."
                            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                            required
                        />
                    </label>
                    <label htmlFor={this.nameInputId}>
                        Number
                        <input
                            type="tel"
                            name="number"
                            value={number}
                            onChange={this.inputChange}
                            id={this.nameInputId}
                            placeholder="Phone..."
                            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                            required
                        />
                    </label>
                    
                    <button type="submit">Add contact</button>
                </fieldset>
            </form>
        );
    }
}

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default ContactForm;