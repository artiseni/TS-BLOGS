import { Component, createRef } from 'react'
import { Navbar, Nav, Container, Modal, Button } from 'react-bootstrap'
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

interface State {
    show: boolean
}


class Navigation extends Component<Props | any, State> {

    path: string
    username: string
    uuid: string
    blogs: any
    wrapper: any

    constructor(props: any) {
        super(props)
        this.wrapper = createRef()
        this.state = {
            show: false
        }

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
        this.setState({ show: !this.state.show })
    }

    handleYes = () => {
        this.props.reset()
        this.setState({ show: false })
        this.props.history.push('/')
    }

    myBlogs = () => {
        this.props.history.push(`/${this.username}/myblogs`)
        window.location.reload()
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
            <div className="navigation" ref={this.wrapper} >

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

                <Modal show={this.state.show} onHide={this.logout} animation={false} >
                    <Modal.Header>
                        <Modal.Title>TS Blogs</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Please click Yes to next...</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.logout}>
                            Close
                        </Button>
                        <Button variant="dark" onClick={this.handleYes}>
                            Yes
                        </Button>
                    </Modal.Footer>
                </Modal>

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