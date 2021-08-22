import { Component } from 'react'
import Navigation from '../components/Navigation'
import { connect } from 'react-redux'
import { Container, Row, Col, Card, Alert } from 'react-bootstrap'
import HiddenButton from '../components/HiddenButton'
import Api from '../api/Api'
import Paginate from '../components/Pagin'
import Comment from '../components/Comment'
import { withRouter } from 'react-router-dom'
import { setLoading, setCountBlogs, setIndexPost, setCeil } from '../store/hooks'


interface Props {
    page: {
        blogs: {
            currentPage: number
            skip: number
        }
        loading: boolean
        countBlogs: number
        index_post: {
            0: any
            1: number
        }

    }

    setLoading: any
    setCountBlogs: any
    setIndexPost: any
    setCeil: any
    history: any

}


interface State {
    hiddenData: any
}


class Index extends Component<Props | any, State>{


    setLoading: any
    setCountBlogs: any
    setIndexPost: any
    setCeil: any
    count: number = 0

    constructor(props: any) {

        super(props)

        this.state = {
            hiddenData: []
        }

        const { setLoading, setCountBlogs, setIndexPost, setCeil }: any = this.props

        this.setLoading = setLoading
        this.setCountBlogs = setCountBlogs
        this.setIndexPost = setIndexPost
        this.setCeil = setCeil

        // console.log(this.props)

    }

    componentDidMount = () => {
        console.log(this.state.hiddenData)
        this.updatePage()
    }

    shouldComponentUpdate = (): boolean => {
        // console.log(`Should be updated? --> ${this.data}`)
        return true
    }

    componentDidUpdate = (): void => {
        console.log(`Updated`)
    }

    componentWillUnmount = () => {
        console.log(`Will unmount`)
    }

    updatePage = async (): Promise<void> => {

        try {
            const api = new Api(this.props.page.blogs)
            const data: any = await api.index()

            if (data) {
                this.setLoading()
                this.setIndexPost(data)
                this.setCountBlogs(data[1])
                this.setCeil()
            }

        } catch (error) {
            console.log(`${error}`)
        }

    }


    hiddenComments = (data: any) => {
        this.count++
        // console.log(this.count)
        // console.log(data)
    }

    render = (): JSX.Element => {

        const { loading } = this.props.page
        const hidden = new HiddenButton({})


        return (
            <>
                <Navigation />
                <div className="App">
                    <Container>
                        <Row>
                            <Col md>
                                {loading ?
                                    this.props.page.index_post[0].map((result: any) =>
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
                                                    <br />
                                                    <Comment
                                                        history={this.props.history}
                                                        result={result}
                                                        infocomments={result.infocomments}
                                                    />
                                                    {
                                                        this.hiddenComments(result.infocomments)
                                                    }
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
                    <Paginate type="index" />
                </div>
            </>
        )
    }
}

const mapStateToProps = (state: any) => ({
    page: state.page
})

const mapDispatchToProps = (dispatch: any) => {
    return {
        setLoading: () => dispatch(setLoading()),
        setCeil: () => dispatch(setCeil()),
        setCountBlogs: (num: number) => dispatch(setCountBlogs(num)),
        setIndexPost: (data: any) => dispatch(setIndexPost(data))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Index))