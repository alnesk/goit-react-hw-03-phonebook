import React, { Component } from 'react';
import ContactForm from '../ContactForm/ContactForm';
import { nanoid } from 'nanoid';
import { Filter } from '../Filter/Filter';
import ContactList from '../ContactList/ContactList';
import { ContactTitle, Container } from './App.styled';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '+459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '+443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '+645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '+227-91-26' },
    ],
    filter: '',
  };

  onAddContact = contactData => {
    const contactBook = {
      ...contactData,
      id: nanoid(),
    };
    const isInContacts = this.state.contacts.some(
      ({ name }) => name.toLowerCase() === contactData.name.toLowerCase()
    );

    if (isInContacts) {
      alert(`${contactData.name} is already in contacts`);
      return;
    }

    this.setState({
      name: '',
      number: '',
    });

    this.setState({
      contacts: [contactBook, ...this.state.contacts],
    });
  };

  onRemoveContact = contactId => {
    this.setState({
      contacts: this.state.contacts.filter(contact => contact.id !== contactId),
    });
  };

  handleFilterChange = event => {
    this.setState({
      filter: event.target.value,
    });
  };

  getFilterContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  componentDidMount() {
    const stringifiedContacts = localStorage.getItem('contacts');
    const contacts = JSON.parse(stringifiedContacts) ?? [];

    this.setState({ contacts });
  }

  componentDidUpdate(prevProps, prevState) {
    
    if (prevState.contacts.length !== this.state.contacts.length) {
      const stringifiedContacts = JSON.stringify(this.state.contacts);
      localStorage.setItem('contacts', stringifiedContacts);
    }
  }
    render() {
    const filteredContacts = this.getFilterContacts();
    const { filter, contacts } = this.state;
    return (
      <Container>
        <h1>Phonebook</h1>
        <ContactForm onAddContact={this.onAddContact} />
        <ContactTitle>Contacts</ContactTitle>
        {contacts.length > 0 ? (
          <Filter filter={filter} onFilterChange={this.handleFilterChange} />
        ) : (
          <div>Your phonebook is empty. Add first contact!</div>
        )}
        <ContactList
          contacts={filteredContacts}
          onRemoveContact={this.onRemoveContact}
        />
      </Container>
    );
  }
}
