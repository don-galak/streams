import React, { Component } from 'react'

export class GoogleAuth extends Component {
  state = { isSignedIn: null }

  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        clientId: '685319131179-1v210530k8m41ig2loqhe7cv7poh2l3c.apps.googleusercontent.com',
        scope: 'email'
      }).then(() => {
        this.auth = window.gapi.auth2.getAuthInstance();
        this.setState({ isSignedIn: this.auth.isSignedIn.get() })
        this.auth.isSignedIn.listen(this.onAuthChange)
      })
    })
  }

  onAuthChange = () => {
    this.setState({ isSignedIn: this.auth.isSignedIn.get() })
  }

  renderAuthButton() {
    if (this.state.isSignedIn === null) {
      return null
    } else if (this.state.isSignedIn) {
      return (
        <button onClick={() => this.auth.signOut()} className="ui red google button">
          <i className="google icon" />
            Sign Out
        </button>
      )
    } else {
      return (
        <button onClick={() => this.auth.signIn()} className="ui red google button">
          <i className="google icon" />
            Sign In With Google
        </button>
      )
    }
  }

  render() {
    return (
      <div>{this.renderAuthButton()}</div>
    )
  }
}