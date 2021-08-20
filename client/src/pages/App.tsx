import { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Index from './Index'
import Login from './Login'
import Signup from './Signup'
import Home from './Home'
import Myblogs from './Myblogs'
import '../css/App.css';


interface Props {
  location: any
  data: {
    user: any
  }
}


class App extends Component<Props>{

  router = (): JSX.Element => {

    const { pathname } = this.props.location
    const { username } = this.props.data.user


    switch (pathname) {
      case `/signup`:
        return <Signup />

      case `/login`:
        return <Login />

      case `/${username}`:
        return <Home />

      case `/${username}/myblogs`:
        return <Myblogs />

      default:
        return <Index />
    }

  }

  render = (): JSX.Element => {
    return this.router()
  }

}


const mapStateToProps = (state: any) => ({
  data: state.data
})


export default withRouter(connect(mapStateToProps)(App))
