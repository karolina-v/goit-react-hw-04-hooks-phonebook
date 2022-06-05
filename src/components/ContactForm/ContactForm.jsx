import { useState } from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';


function ContactForm({ onSubmit }) {
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');


    const nameInputId = shortid.generate();
    const numberInputId = shortid.generate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const contact = {
            id: shortid.generate(),
            name: name,
            number: number,
        }
        onSubmit(contact);
        reset();
    }
    
    const inputChange = e => {
        const { name, value } = e.currentTarget;

        switch (name) {
            case 'name':
                setName(value);
                break;
            
            case 'number':
                setNumber(value);
                break;
            
            default:
                return;
        }
    }

    const reset = () => {
        setName('');
        setNumber('');
    }


     return (
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <label htmlFor={nameInputId}>
                        Name
                        <input
                            type="text"
                            name='name'
                            value={name}
                            onChange={inputChange}
                            id={nameInputId}
                            placeholder="Name..."
                            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                            required
                        />
                    </label>
                    <label htmlFor={numberInputId}>
                        Number
                        <input
                            type="tel"
                            name="number"
                            value={number}
                            onChange={inputChange}
                            id={numberInputId}
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


ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default ContactForm;