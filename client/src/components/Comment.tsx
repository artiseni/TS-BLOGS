
import { Component } from "react"
import { Button, Form, Card } from 'react-bootstrap'
import { connect } from 'react-redux'
import Api from '../api/Api'
import { setHiddenComments, setIsHide, setIndexPost } from '../store/hooks'


interface Props {
    data: {
        login: boolean
        blogs: any
        user: {
            uuid: string
            username: string
        }
        index_post: {
            0: any
        }
        isHide: string
    }

    page: { blogs: any }

    result: any
    infocomments: any
    setHiddenComments: any
    setIndexPost: any
    setIsHide: any
    history?: any
}

interface State {
    comments: string
    isHide: string
    dataHide: any
    pushData: any
}


class Comment extends Component<Props | any, State> {


    constructor(props: any) {
        super(props)
        this.state = {
            comments: '',
            isHide: this.props.data.isHide,
            dataHide: [],
            pushData: null
        }
    }


    static getDerivedStateFromProps = (props: any, state: any) => {
        state.dataHide = props.infocomments
        return null
    }


    componentDidMount = () => {
        // console.log(this.state.dataHide)
    }


    commentValue = (e: any) => {
        const { value } = e.target
        this.setState({ comments: value })
    }


    submit = async (e: any): Promise<void> => {

        const { comments } = this.state

        if (this.props.data.login === false) {
            alert('You need to login!')
        } else if (comments === '') {
            alert(`Don't submit empty data!`)
        } else {
            // console.log(this.state)
            const { uuid } = this.props.result
            const data = {
                username: this.props.data.user.username,
                user_uuid: this.props.data.user.uuid,
                post_uuid: uuid,
                comments
            }

            try {

                const api = new Api(data)
                const result: any = await api.addComment()

                const index_data = new Api(this.props.page.blogs)
                const res: any = await index_data.index()

                if (result && res) {

                    new Promise(data => {
                        data(this.props.setIndexPost(res))
                    }).then(() => {
                        const { parentNode } = e.target
                        const textarea = parentNode.querySelector('textarea')
                        textarea.value = ''
                        this.setState({ comments: '' })
                        this.setState({ isHide: 'block' })
                    })

                }

            } catch (error) {
                console.log(`${error}`)
            }

        }
    }

    displayComments = (e: any) => {
        return this.state.isHide === 'none' ?
            this.setState({ isHide: 'block' }) :
            this.setState({ isHide: 'none' })
    }


    render = () => {

        return (
            <>
                <hr />
                <Card.Text className="displayComments" onClick={this.displayComments}>{this.props.infocomments.length} comments</Card.Text>
                {
                    this.state.dataHide.length !== 0 ?
                        <Card className="cardComments" style={{ display: this.state.isHide }}>
                            {
                                this.state.dataHide.map((res: any) =>
                                    <div key={res.uuid}>
                                        <p>{res.username} :</p>
                                        <p>{res.comments}</p>
                                        <hr />
                                    </ div>
                                )
                            }
                        </ Card> :
                        null
                }
                <br />
                <Form.Control as="textarea" placeholder="Add comments" name="comments" onChange={this.commentValue} rows={2} />
                <br />
                <Button variant="dark" onClick={this.submit}>Comment</Button>
            </>
        )
    }
}


const mapStateToProps = (state: any) => ({
    data: state.data,
    page: state.page
})

const mapDispatchToProps = (dispatch: any) => ({
    setHiddenComments: (data: any) => dispatch(setHiddenComments(data)),
    setIsHide: (data: string) => dispatch(setIsHide(data)),
    setIndexPost: (data: any) => dispatch(setIndexPost(data))
})


export default connect(mapStateToProps, mapDispatchToProps)(Comment)