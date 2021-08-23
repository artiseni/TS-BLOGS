import { Component } from 'react'
import Navigation from '../components/Navigation'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Container, Button, Row, Col, Card, Form } from 'react-bootstrap'
import Api from '../api/Api'



interface State {
    uuid: string
    title?: string
    content?: string
}

interface Props {
    history: any
    data: {
        user: any
        login: boolean
    }
}

class Home extends Component<Props, State> {

    constructor(props: any) {
        super(props)
        this.state = {
            uuid: this.props.data.user.uuid,
            title: '',
            content: ''
        }

        console.log(this.props.data.user)
    }


    componentDidMount = (): void => {
        if (this.props.data.login === false) {
            this.props.history.push('/')
        }
    }


    dataValue = (e: any): void => {
        const { name, value } = e.target
        this.setState({ ...this.state, [name]: value })
    }

    btnAdd = async (): Promise<void> => {
        const { title, content } = this.state
        if (title === '' || content === '') {
            alert(`Title or content blogs can't be empty!`)
        } else {
            const api = new Api(this.state)
            const result: any = await api.addPost()
            if (result) {
                const { username } = this.props.data.user
                this.props.history.push(`/${username}/myblogs`)
            }
        }
    }


    render = (): JSX.Element => {

        const { username } = this.props.data.user

        return (
            <>
                <Navigation />
                <div className="App">
                    <Container>
                        <Row>
                            <Col md>
                                <div className='App blogs'>
                                    <Card.Body>
                                        <Card.Title>
                                            Hi {username}, welcome!
                                        </Card.Title>
                                        <hr />
                                        <Card.Text>
                                            This is your blogs
                                            <br />
                                            Please write interesting blogs below!
                                        </Card.Text>
                                    </Card.Body>
                                    <br />
                                </div>
                            </Col>
                        </Row>
                    </Container>
                    <br />
                    <Card>
                        <Card.Body>
                            <Form.Label>Title</Form.Label>
                            <Form.Control as="textarea" onChange={this.dataValue} name="title" rows={1} />
                            <br />
                            <Form.Label>Content</Form.Label>
                            <Form.Control as="textarea" onChange={this.dataValue} name="content" rows={4} />
                            <br />
                            <Button variant="dark" onClick={this.btnAdd} >Add</Button>
                        </Card.Body>
                    </Card>
                </div>
            </>
        )
    }
}

const mapStateToProps = (state: any) => ({
    data: state.data
})

export default withRouter(connect(mapStateToProps)(Home))