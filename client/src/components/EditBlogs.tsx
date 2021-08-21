import { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Card, Form, Button, Container } from 'react-bootstrap'
import { setEdit } from '../store/hooks'
import Api from '../api/Api'


interface Props {
    page: {
        edit_post: {
            uuid: string
            username: string
            updatedAt: string
            title: string
            content: string
        }
    }
    setEdit: any
}


interface State {
    uuid: string
    title: string
    content: string
}


class EditBlogs extends Component<Props | any, State> {

    constructor(props: any) {
        super(props)
        const { uuid, title, content } = this.props.page.edit_post

        this.state = {
            uuid, title, content
        }
    }

    dataValue = (e: any) => {
        const { name, value } = e.target
        this.setState({
            ...this.state, [name]: value
        })
    }

    btnEdit = async (): Promise<void> => {

        try {
            const api = new Api(this.state)
            const result: any = await api.editPost()
            if (result) {
                window.location.reload()
            }
        } catch (error) {
            const { data } = error.response
            alert(data.message)
        }
    }

    btnCencle = () => {
        this.props.setEdit()
    }

    render = () => {

        const { username, updatedAt, title, content } = this.props.page.edit_post

        return (
            <Container>
                <Card>
                    <Card.Body>

                        <Form.Label>By : {username}</Form.Label>
                        <br />
                        <Form.Label>Last update : {updatedAt}</Form.Label>
                        <br />
                        <Form.Label>Title</Form.Label>
                        <Form.Control as="textarea" onChange={this.dataValue} defaultValue={title} name="title" rows={1} />
                        <br />
                        <Form.Label>Content</Form.Label>
                        <Form.Control as="textarea" onChange={this.dataValue} defaultValue={content} name="content" rows={4} />
                        <br />
                        <Button variant="dark" onClick={this.btnEdit} >Edit</Button> {' '}
                        <Button variant="dark" onClick={this.btnCencle} >Cencle</Button>
                    </Card.Body>
                </Card>
            </Container>
        )
    }
}

const mapStateToProps = (state: any) => ({
    page: state.page
})

const mapDispatchToProps = (dispatch: any) => ({
    setEdit: () => dispatch(setEdit())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditBlogs))