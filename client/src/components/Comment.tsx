import { Component } from "react"
import { Button, Form, Card } from 'react-bootstrap'
import { connect } from 'react-redux'
import Api from '../api/Api'


interface Props {
    data: {
        login: boolean
        user: {
            uuid: string
            username: string
        }
        index_post: {
            0: any
        }
    }
    result: any
    infocomments: any
}

interface State {
    comments: string
}


class Comment extends Component<Props | any, State> {


    count: number = 0

    constructor(props: any) {
        super(props)
        this.state = {
            comments: ''
        }
    }

    commentValue = (e: any) => {
        const { value } = e.target
        this.setState({ comments: value })
    }

    submit = async (): Promise<void> => {

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
                if (result) {
                    window.location.reload()
                    // this.props.history.push('/')
                }
            } catch (error) {
                const { data } = error.response
                alert(data.message)
            }

        }
    }

    displayComments = (e: any) => {
        this.count++
        const { parentNode } = e.target
        const { childNodes } = parentNode
        if (this.count === 1 && childNodes[8].childNodes.length !== 0) {
            childNodes[8].style.display = 'block'
        } else if (this.count === 2 && childNodes[8].childNodes.length !== 0) {
            childNodes[8].style.display = 'none'
            return this.count = 0
        }
    }

    hiddenComments = () => {
        return this.props.infocomments.length !== 0 ?
            <Card className="cardComments" style={{ display: 'none' }}>
                {
                    this.props.infocomments.map((res: any) =>
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

    render = () => {

        // console.log(this.props.data.index_post[0])

        return (
            <>
                <Card.Text className="displayComments" aria-disabled={this.props.result.infocomments.length === 0} onClick={this.displayComments}>{this.props.result.infocomments.length} comments</Card.Text>
                <hr />
                {this.hiddenComments()}
                <br />
                <Form.Control as="textarea" placeholder="Add comments" name="comments" onChange={this.commentValue} rows={2} />
                <br />
                <Button variant="dark" onClick={this.submit}>Comment</Button>
            </>
        )
    }
}


const mapStateToProps = (state: any) => ({
    data: state.data
})


export default connect(mapStateToProps)(Comment)