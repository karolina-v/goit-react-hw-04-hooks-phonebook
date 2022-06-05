import React from 'react';
import PropTypes from 'prop-types';
import ContactsListItem from './ContactsListItem';

function ContactsList ({ findContact, deleteContact }) {
  return (
    <ul>
      {findContact().map(({ id, name, number }) => {
        return (
          <ContactsListItem
            key={id}
            id={id}
            name={name}
            number={number}
            onDeleteContact={deleteContact}
          />
        );
      })}
    </ul>
  );
}

ContactsList.propTypes = {
  findContact: PropTypes.func.isRequired,
  deleteContact: PropTypes.func.isRequired,
};

export default ContactsList;