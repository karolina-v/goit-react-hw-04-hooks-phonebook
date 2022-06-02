import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import ContactForm from './ContactForm';
import Filter from './Filter';
import ContactsList from './ContactsList';

export class App extends Component {
  state = {
    contacts: [
      {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
      {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
      {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
      {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
    ],
    filter: '',
  }

    componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

    componentDidUpdate(prevProps, prevState) {
      // console.log(prevState);
      // console.log(this.state);
      if (this.state.contacts !== prevState.contacts) {
        localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
      }
    }


  formSubmit = (data) => {

    if (!this.hasContact(data.name)) {
      this.setState((prevState) => ({
        contacts: [...prevState.contacts, data]
      }));
    } else {
      alert(`${data.name} is already in contacts`);
    }
  }

  hasContact = name => {
    return this.state.contacts.find(contact => {
      return contact.name.toLocaleLowerCase() === name.toLocaleLowerCase();
    });
  }


  changeFilter = (e) => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  }

  findContact = () => {
    const { filter, contacts } = this.state;

    if (filter.length) {
      return contacts.filter(contact =>
        contact.name.toLowerCase().includes(filter.toLocaleLowerCase()),
      );
    } else {
      return contacts;
    }
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };


  render() {
    const { filter } = this.state;

    return ( 
      <div>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.formSubmit}/>

        <h2>Contacts</h2>
        <Filter value={filter} onChange={this.changeFilter} />
        
        <ContactsList findContact={this.findContact} deleteContact={this.deleteContact}/>
  
      </div>
    );
  }
};