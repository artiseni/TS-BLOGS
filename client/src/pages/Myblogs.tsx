import { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Row, Col, Card, Alert, Button } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import Navigation from '../components/Navigation'
import { setMyPost, setLoading } from '../store/hooks'
import HiddenButton from '../components/HiddenButton'
import Api from '../api/Api'


interface Props {
    data: {
        user: any
        myPost: any
    }
    page: {
        loading: boolean
    }
    setMypost: any
    setLoading: any
}


class Myblogs extends Component<Props | any> {

    user: any = this.props.data.user
    data: any

    componentDidMount = () => {
        this.updatePage()
    }

    updatePage = async (): Promise<void> => {
        const { blogs } = this.props.data
        const { uuid } = this.props.data.user
        const { currentPage, take } = blogs
        const data = { uuid, currentPage, take }

        try {

            const api = new Api(data)
            const result: any = await api.myBlogs()

            if (result) {
                this.props.setLoading()
                this.props.setMyPost(result)
            }

        } catch (error) {
            const { data } = error.response
            alert(data.message)
        }
    }

    btnEdit = (uuid: string) => {
        console.log(uuid)
    }

    render = () => {

        const hidden = new HiddenButton({})
        const { loading } = this.props.page
        const { myPost } = this.props.data

        return (
            <>
                <Navigation />
                <div className="App">
                    <Container>
                        <Row>
                            <Col md>
                                {loading ?
                                    myPost[0].map((result: any) =>
                                        <div className='App blogs' key={result.uuid}>
                                            <Card>
                                                <Card.Body>
                                                    <Card.Text>
                                                        By : {result.infouser.username}
                                                    </Card.Text>
                                                    <Card.Text>
                                                        Last update : {result.updatedAt}
                                                    </Card.Text>
                                                    <Card.Title>
                                                        {result.title}
                                                    </Card.Title>
                                                    <hr />
                                                    <Card.Text className="content">
                                                        {hidden.textBody(result.content)}
                                                    </Card.Text>
                                                    <Button variant="dark" onClick={() => this.btnEdit(result.uuid)} >Edit</Button>
                                                </Card.Body>
                                                <HiddenButton text={result.content} />
                                            </Card>
                                            <br />
                                        </div>
                                    ) : <Alert variant="success">Processing data... </Alert>
                                }
                            </Col>
                        </Row>
                    </Container>
                </div>
            </>
        )
    }

}

const mapStateToProps = (state: any) => ({
    data: state.data,
    page: state.page
})

const mapDispatchToProps = (dispatch: any) => ({
    setMyPost: (data: any) => dispatch(setMyPost(data)),
    setLoading: () => dispatch(setLoading())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Myblogs))
