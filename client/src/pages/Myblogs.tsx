import { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Row, Col, Card, Alert, Button } from 'react-bootstrap'
import { withRouter, Link } from 'react-router-dom'
import Navigation from '../components/Navigation'
import {
    setMyPost, setLoading, setEdit,
    setEditPost, setCountBlogs, setCeil
} from '../store/hooks'
import HiddenButton from '../components/HiddenButton'
import EditBlogs from '../components/EditBlogs'
import Paginate from '../components/Pagin'
import Api from '../api/Api'


interface Props {
    data: {
        user: any
        myPost: any
    }
    page: {
        loading: boolean
        edit: boolean
        blogs: any
    }

    setEdit: any
    setEditPost: any
    setMypost: any
    setLoading: any
    setCountBlogs: any
    setCeil: any
}


class Myblogs extends Component<Props | any> {

    user: any = this.props.data.user
    data: any

    componentDidMount = () => {
        this.updatePage()
    }

    updatePage = async (): Promise<void> => {
        const { blogs } = this.props.page
        const { uuid } = this.props.data.user
        const { currentPage, take } = blogs
        const data = { uuid, currentPage, take }

        try {
            // console.log(data)
            const api = new Api(data)
            const result: any = await api.myBlogs()

            if (result) {
                this.props.setLoading()
                this.props.setMyPost(result)
                this.props.setCountBlogs(result[1])
                this.props.setCeil()
            }

        } catch (error) {
            const { data } = error.response
            alert(data.message)
        }
    }


    btnDelete = async (uuid: string) => {
        try {
            const api = new Api({ uuid })
            const result: any = await api.deletePost()
            if (result) {
                this.updatePage()
            }
        } catch (error) {
            console.log(`${error}`)
        }
    }

    isEdit = (edit: any, myPost: any, hidden: any) => {

        return edit === false ?
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
                            <Button variant="dark" onClick={() => this.btnEdit(result)} >Edit</Button>{' '}
                            <Button variant="dark" onClick={() => this.btnDelete(result.uuid)} >Delete</Button>
                        </Card.Body>
                        <HiddenButton text={result.content} />
                    </Card>
                    <br />
                </div>
            ) :
            <div className="App">
                <EditBlogs />
            </div>

    }

    btnEdit = (result: any) => {
        const { uuid, title, content, infouser, updatedAt } = result
        const { username } = infouser

        this.props.setEditPost({ uuid, username, updatedAt, title, content })
        this.props.setEdit()
    }

    render = () => {


        const hidden = new HiddenButton({})
        const { loading, edit } = this.props.page
        const { myPost, user } = this.props.data

        return myPost[0].length !== 0 ? (
            <>
                <Navigation />
                <div className="App">
                    <Container>
                        <Row>
                            <Col md>
                                {loading ?
                                    this.isEdit(edit, myPost, hidden)
                                    : <Alert variant="success">Processing data... </Alert>
                                }
                            </Col>
                        </Row>
                    </Container>
                    <Paginate type="myblogs" />
                </div>
            </>
        ) :
            <>
                <Navigation />
                <div className="App">
                    <Container>
                        <Card.Body>
                            <br />
                            <Card.Title>
                                {user.username}, You have no blogs yet...
                            </Card.Title>
                            <p>
                                Back to <Link className="link" to={`/${user.username}`} >Home</Link>, write interesting blogs and come back here...
                            </p>
                            <hr />
                        </Card.Body>
                    </Container>
                </div>
            </>
    }

}

const mapStateToProps = (state: any) => ({
    data: state.data,
    page: state.page
})

const mapDispatchToProps = (dispatch: any) => ({
    setMyPost: (data: any) => dispatch(setMyPost(data)),
    setLoading: () => dispatch(setLoading()),
    setEdit: () => dispatch(setEdit()),
    setEditPost: (data: any) => dispatch(setEditPost(data)),
    setCountBlogs: (data: any) => dispatch(setCountBlogs(data)),
    setCeil: () => dispatch(setCeil())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Myblogs))
