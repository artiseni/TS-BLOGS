import { Component } from "react"
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Card, Form, Button } from 'react-bootstrap'
import Navigation from '../components/Navigation'
import { setLogin, setDataUser } from '../store/hooks'
import Api from '../api/Api'

interface State {
    user: any
}

class Login extends Component<any, State> {


    constructor(props: any) {
        super(props)
        this.state = {
            user: {
                email: '' as string,
                password: '' as string
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

        try {

            const api = new Api(this.state.user)
            const data: any = await api.login()

            if (data) {
                const { token } = data
                const isValid = await api.tokenValidator(token)
                if (isValid) {
                    const { username } = isValid
                    this.props.setLogin()
                    this.props.setDataUser(isValid)
                    this.props.history.push(`/${username}`)
                    // window.location.reload()
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
                            <h3>Login</h3>
                            <br />
                            <Form.Group>
                                <Form.Control type="email" name="email" onChange={this.getChange} placeholder="Email" />
                            </Form.Group>
                            <br />
                            <Form.Group>
                                <Form.Control type="password" name="password" onChange={this.getChange} placeholder="Password" />
                            </Form.Group>
                            <br />
                            <Button onClick={this.submit} variant="dark" >Login</Button>
                        </Form>
                    </Card>
                </div>
            </>
        )
    }

}

const mapDispatchToProps = (dispatch: any) => ({
    setLogin: () => dispatch(setLogin()),
    setDataUser: (data: any) => dispatch(setDataUser(data))
})


export default withRouter(connect(null, mapDispatchToProps)(Login))