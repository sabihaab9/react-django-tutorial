import React from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

import axios from "axios";

import { API_URL } from "../constants";

//use function components instead of class components in React. 

// create our state object with the corresponding properties of our NewStudentForm model.
class NewStudentForm extends React.Component {
  state = {
    pk: 0,
    name: "",
    email: "",
    document: "",
    phone: ""
  };

  // componentDidMount function will run after the component finishes its startup,
  // so we can recover the student’s props from the parent component (this.props) here, 
  //and set the state with them (if they exist, for the editing scenario.)
  componentDidMount() {
    if (this.props.student) {
      const { pk, name, document, email, phone } = this.props.student;
      this.setState({ pk, name, document, email, phone });
    }
  }

  //The onChange function will handle the update of
  // each state’s prop with the current value typed in each respective field.
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  /*The createStudent function will deal with the HTTP POST requests of our form.
   Every time we press the “submit” button, this function will be called,
   triggering the Axios post() function and passing the current state in the request’s body. */
   
  /* Once it’s completed, we’ll call two props functions: 
  resetState to refresh the table, and toggle to close the modal. */
  createStudent = e => {
    e.preventDefault();
    axios.post(API_URL, this.state).then(() => {
      this.props.resetState();
      this.props.toggle();
    });
  };

  editStudent = e => {
    e.preventDefault();
    axios.put(API_URL + this.state.pk, this.state).then(() => {
      this.props.resetState();
      this.props.toggle();
    });
  };

  defaultIfEmpty = value => {
    return value === "" ? "" : value;
  };

  render() {
    return (
      <Form onSubmit={this.props.student ? this.editStudent : this.createStudent}>
        <FormGroup>
          <Label for="name">Name:</Label>
          <Input
            type="text"
            name="name"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.name)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="email">Email:</Label>
          <Input
            type="email"
            name="email"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.email)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="document">Document:</Label>
          <Input
            type="text"
            name="document"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.document)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="phone">Phone:</Label>
          <Input
            type="text"
            name="phone"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.phone)}
          />
        </FormGroup>
        <Button>Send</Button>
      </Form>
    );
  }
}

export default NewStudentForm;