import { Component } from "react"
import { Card, Form, Button } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import Navigation from '../components/Navigation'
import { connect } from 'react-redux'
import { setDataUser, setLogin } from '../store/hooks'
import Api from '../api/Api'


interface Props {
    setDataUser: any
    history: any
    setLogin: any
}

interface State {
    user: any
}

class Signup extends Component<Props, State> {

    constructor(props: any) {
        super(props)
        this.state = {
            user: {
                email: '' as string,
                username: '' as string,
                password: '' as string,
                password_retype: '' as string
            }
        }
    }

    getChange = (e: any): void => {
        const { name, value } = e.target
        this.setState({
            user: { ...this.state.user, [name]: value }
        })
    }

    submit = async (): Promise<void> => {
        console.log(this.state.user)
        const { email, username, password, password_retype } = this.state.user

        try {

            if (email === '' || username === '' || password === '' || password_retype === '') {
                alert(`Data can't be empty!`)
            } else if (password !== password_retype) {
                alert(`Password not match!`)
            } else {

                const api = new Api(this.state.user)
                const result: any = await api.register()
                if (result) {
                    this.props.setLogin()
                    this.props.setDataUser(result)
                    this.props.history.push('/home')
                }
            }

        } catch (error) {
            const { data } = error.response
            alert(data.message)
        }

    }

    render = (): JSX.Element => {
        return (
            <>
                <Navigation />
                <div className="App">
                    <Card className="form">
                        <Form>
                            <h3>Signup</h3>
                            <br />
                            <Form.Group>
                                <Form.Control type="text" name="username" onChange={this.getChange} placeholder="Username" />
                            </Form.Group>
                            <br />
                            <Form.Group>
                                <Form.Control type="email" name="email" onChange={this.getChange} placeholder="Email" />
                            </Form.Group>
                            <br />
                            <Form.Group>
                                <Form.Control type="password" name="password" onChange={this.getChange} placeholder="Password" />
                            </Form.Group>
                            <br />
                            <Form.Group>
                                <Form.Control type="password" name="password_retype" onChange={this.getChange} placeholder="Retype Password" />
                            </Form.Group>
                            <br />
                            <Button onClick={this.submit} variant="dark" >Signup</Button>
                        </Form>
                    </Card>
                </div>
            </>
        )
    }

}


const mapDispatchToProps = (dispatch: any) => ({
    setDataUser: (data: any) => dispatch(setDataUser(data)),
    setLogin: () => dispatch(setLogin())
})


export default withRouter(connect(null, mapDispatchToProps)(Signup))