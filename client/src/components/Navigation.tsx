import { Component } from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { reset } from '../store/hooks'


interface Props {
    location: any
    history: any
    setMyPost: any
    reset: any

    data: {
        user: any
        login: boolean
    }
    page: {
        blogs: any
        current: number
    }
}


class Navigation extends Component<Props | any> {

    path: string
    username: string
    uuid: string
    blogs: any

    constructor(props: any) {
        super(props)
        const { pathname } = this.props.location
        const { username, uuid } = this.props.data.user
        const { blogs } = this.props.page

        this.blogs = blogs
        this.uuid = uuid
        this.path = pathname
        this.username = username
        // console.log(this.props.data.login)
    }

    logout = () => {
        this.props.reset()
        this.props.history.push('/')
    }

    myBlogs = () => {
        this.props.history.push(`/${this.username}/myblogs`)
    }

    home = () => {
        this.props.history.push(`/${this.username}`)
    }

    isLogin = (): JSX.Element => {

        const { login } = this.props.data

        return login === false ?
            <div className="navigation">
                <Navbar bg="dark" variant="dark">
                    <Container>
                        <Navbar.Brand href="/">TS Blogs</Navbar.Brand>
                        <Nav>
                            <Nav.Link href="/login" active={this.path === '/login'}>Login</Nav.Link>
                            <Nav.Link href="/signup" active={this.path === '/signup'} >SignUp</Nav.Link>
                        </Nav>
                    </Container>
                </Navbar>
            </div> :
            <div className="navigation">
                <Navbar bg="dark" variant="dark">
                    <Container>
                        <Navbar.Brand href="/">TS Blogs</Navbar.Brand>
                        <Nav>
                            <Nav.Link onClick={this.home} active={this.path === `/${this.username}`}>Home</Nav.Link>
                            <Nav.Link onClick={this.myBlogs} active={this.path === `/${this.username}/myblogs`}>My blogs</Nav.Link>
                            <Nav.Link onClick={this.logout} >Logout</Nav.Link>
                        </Nav>
                    </Container>
                </Navbar>
            </div>
    }

    render = (): JSX.Element => {
        return this.isLogin()
    }

}


const mapStateToProps = (state: any) => ({
    data: state.data,
    page: state.page
})

const mapDispatchToProps = (dispatch: any) => ({
    reset: () => dispatch(reset())
})


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navigation))