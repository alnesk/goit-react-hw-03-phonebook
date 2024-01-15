import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ErrorMessage, Formik } from 'formik';
import { FormButton, FormField, FormLabel, Input, LabelWrap } from './ContactForm.styled';
import { MdCreate, MdPermContactCalendar, MdStayCurrentPortrait } from 'react-icons/md';

const initialValues = {
  name: '',
  number: '+380',
};
export default class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleInputChange = ({ target }) => {
    // console.log(event.target.value);
    this.setState({
      [target.name]: target.value,
    });
  };

  handleSubmit = (values, actions) => {
    const contactData = {
      ...this.state,
    };

    this.props.onAddContact(contactData);

    this.setState({
      name: '',
      number: '',
    });
    actions.resetForm()
  };

  render() {
    return (
      <Formik initialValues={initialValues} onSubmit={this.handleSubmit}>
        <FormField>
          <FormLabel>
           <LabelWrap><MdPermContactCalendar />
           <span> Name:</span></LabelWrap>
            <Input
              onChange={this.handleInputChange}
              value={this.state.name}
              pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="The title can only contain letters, apostrophes, hyphens, and spaces."
              name="name"
              type="text"
              required
            />
            <ErrorMessage name="name" />
          </FormLabel>
          <FormLabel>
          <LabelWrap><MdStayCurrentPortrait />
           <span> Number:</span></LabelWrap>
            <Input
              onChange={this.handleInputChange}
              value={this.state.number}
              type="tel"
              name="number"
              pattern="\+?\d{1,4}?[\-.\s]?\(?\d{1,3}?\)?[\-.\s]?\d{1,4}[\-.\s]?\d{1,4}[\-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
            />
            <ErrorMessage name="number" />
          </FormLabel>
          <FormButton type="submit" className="form-btn"> <MdCreate />
            <span>Add contact</span>
          </FormButton>
        </FormField>
      </Formik>
    );
  }
}

ContactForm.propTypes = {
  onAddContact: PropTypes.func.isRequired,
};
