import React from 'react';
import './App.css';
import axios from 'axios';


const PATH = 'https://guitardo.ru/123/display.php';



const initialState = {
  name: '',
  email: '',
  message: '',
  sent: false,
  error: null
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  submitHandler(evt) {
    evt.preventDefault();
    console.log(this.state)

    axios({
      method: 'post',
      url: `${PATH}`,
      headers: { 'content-type': 'application/json' },
      data: this.state
    })
      .then(result => {
        this.setState({
          sent: result.data.sent
        })
      })
      .catch(error => this.setState({ error: error.message }));

    this.setState(initialState)
  }

  render() {
    return (
      <div className="App">
        <h1>Contact Me</h1>
        <div className="container">
          <form action="/action_page.php">

            <label>Full Name</label>

            <input
              type="text" id="name"
              name="name"
              value={this.state.name}
              onChange={(evt) => this.setState({ name: evt.target.value })}
              placeholder="Enter your name.."
            />
            <br />

            <label>Email</label>

            <input
              type="email"
              id="email"
              name="email"
              value={this.state.email}
              onChange={(evt) => this.setState({ email: evt.target.value })}
              placeholder="Enter your email"
            />
            <br />

            <label>Subject</label>

            <textarea
              id="subject"
              name="subject"
              value={this.state.message}
              onChange={(evt) => this.setState({ message: evt.target.value })}
              placeholder="Enter your message.."
            ></textarea>

            <input
              type="submit"
              value="Submit"
              onClick={evt => this.submitHandler(evt)}
            />
          </form>

          <p>{this.state.sent ? `Отправлено` : `Не отправлено` }</p>


        </div>
      </div>
    )
  }

}




