import React, { Component } from "react";
import axios from "axios";
import logo from "./logo.svg";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import "./App.css";

class App extends Component {
  state = { content: "", name: "", email: "" };

  updateName = e => {
    this.setState({ name: e.target.value });
  };
  updateEmail = e => {
    this.setState({ email: e.target.value });
  };

  getUser = () => {
    axios({
      url: "/graphiql",
      method: "post",
      data: {
        query: `
        query{
          Users {
            email
            name
          }
        }
          `
      }
    }).then(result => {
      this.setState({ content: result.data.data.Users });
    });
  };

  addUser = () => {
    const { name, email } = this.state;
    axios({
      url: "/graphiql",
      method: "post",
      data: {
        query: `
        mutation AddUser($email:String!, $name:String!){
          addUser(data:{email:$email, name:$name}) {
            email
            name
          }
        }
        `,
        variables: {
          name,
          email
        }
      }
    }).then(result => {
      this.setState({ content: result.data.data });
    });
  };

  render() {
    return (
      <div className="App">
        <div>
          <Button variant="contained" onClick={this.getUser}>
            Fetch Users
          </Button>
        </div>
        <div>
          <TextField
            id="standard-name"
            label="Name"
            value={this.state.name}
            onChange={this.updateName}
            margin="normal"
          />
          <TextField
            id="standard-email"
            label="email"
            defaultValue="foo"
            value={this.state.email}
            onChange={this.updateEmail}
            margin="normal"
          />
          <Button variant="contained" onClick={this.addUser}>
            Add Users
          </Button>
        </div>

        <Paper>{JSON.stringify(this.state.content)}</Paper>
      </div>
    );
  }
}

export default App;
