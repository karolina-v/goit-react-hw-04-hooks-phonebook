import { useState, useEffect } from 'react';
import ContactForm from './ContactForm';
import Filter from './Filter';
import ContactsList from './ContactsList';


export function App() {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filter, setFilter] = useState('');


  useEffect(() => {
    const localState = JSON.parse(localStorage.getItem("Contacts"));
    if (localState) {
      setContacts(localState);
    } else {
      return;
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("Contacts", JSON.stringify(contacts));
  }, [contacts]);


  const formSubmit = (data) => {
    if (!hasContact(data.name)) {
      setContacts(prevState => [...prevState, data]);
    } else {
      alert(`${data.name} is already in contacts`);
    }
  }

  const hasContact = name => {
    return contacts.find(contact => {
      return contact.name.toLocaleLowerCase() === name.toLocaleLowerCase();
    });
  }


  const changeFilter = e => {
    const { value } = e.currentTarget;
    setFilter(value);
  }

  const findContact = () => {
    if (filter.length) {
      return contacts.filter(contact =>
        contact.name.toLowerCase().includes(filter.toLocaleLowerCase()),
      );
    } 
    return contacts;
  };


  const deleteContact = contactId => {
    setContacts(contacts.filter(
      (contacts) => !contacts.id.includes(contactId)));
  }
  

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={formSubmit} />

      <h2>Contacts</h2>
      <Filter value={filter} onChange={changeFilter} />
          
      <ContactsList findContact={findContact} deleteContact={deleteContact} />
    
    </div>
  ); 
}