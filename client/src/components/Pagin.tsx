import { Component } from "react"
import { Pagination } from 'react-bootstrap'
import { connect } from 'react-redux'
import {
    firstPage, nextPage, previousPage,
    targetPage, setLoading, setIndexPost,
    setMyPost
} from '../store/hooks'
import Api from '../api/Api'


interface Props {
    page: {
        blogs: {
            currentPage: number
            take: number
        }
        countBlogs: number
        ceil: number
        current: number
    }

    data: {
        user: { uuid: string }
    }

    type: string
    firstPage: any
    nextPage: any
    previousPage: any
    targetPage: any
    setLoading: any
    setIndexPost: any
    setMyPost: any

}


class Paginate extends Component<Props> {


    constructor(props: any) {
        super(props)

        console.log(props.type)
    }


    index = async (): Promise<void> => {
        const api = new Api(this.props.page.blogs)
        const data: any = await api.index()
        if (data) {
            this.props.setLoading()
            this.props.setIndexPost(data)
        }
    }


    userBlogs = async (): Promise<void> => {

        const { uuid } = this.props.data.user
        const { currentPage, take } = this.props.page.blogs

        const api = new Api({ uuid, currentPage, take })
        const data: any = await api.myBlogs()

        if (data) {
            this.props.setLoading()
            this.props.setMyPost(data)
        }
    }


    btnNumber = () => {

        const pageNumber = []
        for (let i = 1; i <= this.props.page.ceil; i++) {
            pageNumber.push(<Pagination.Item key={i} active={i === this.props.page.blogs.currentPage} onClick={async () => await this.targetButton(i)} >{i}</Pagination.Item>)
        }
        return pageNumber
    }

    targetButton = async (num: number) => {
        try {

            const promise = new Promise(res => {
                res(this.props.targetPage(num))
            })
            const result = await promise
            if (result) {
                this.props.type === 'index' ? this.index() : this.userBlogs()
            }

        } catch (error) {
            console.log(`${error}`)
        }
    }

    firstButton = async () => {

        try {

            const promise = new Promise(res => {
                res(this.props.targetPage(1))
            })
            const result = await promise
            if (result) {
                this.props.type === 'index' ? this.index() : this.userBlogs()
            }

        } catch (error) {
            console.log(`${error}`)
        }

    }


    nextButton = async () => {

        try {

            const promise = new Promise(res => {
                res(this.props.nextPage())
            })
            const result = await promise
            if (result) {
                this.props.type === 'index' ? this.index() : this.userBlogs()
            }

        } catch (error) {
            console.log(`${error}`)
        }

    }

    previousButton = async () => {
        try {

            const promise = new Promise(res => {
                res(this.props.previousPage())
            })
            const result = await promise
            if (result) {
                this.props.type === 'index' ? this.index() : this.userBlogs()
            }

        } catch (error) {
            console.log(`${error}`)
        }
    }

    lastButton = async () => {

        try {

            const promise = new Promise(res => {
                res(this.props.targetPage(this.props.page.ceil))
            })
            const result = await promise
            if (result) {
                this.props.type === 'index' ? this.index() : this.userBlogs()
            }

        } catch (error) {
            console.log(`${error}`)
        }


    }

    render = () => {

        const { countBlogs } = this.props.page
        const { take } = this.props.page.blogs

        console.log(countBlogs)

        return countBlogs > take ?
            <div className="pagination">
                <Pagination size="sm">
                    <Pagination.First onClick={this.firstButton} disabled={this.props.page.blogs.currentPage === 1} />
                    <Pagination.Prev onClick={this.previousButton} disabled={this.props.page.blogs.currentPage === 1} />
                    {
                        this.btnNumber()
                    }
                    <Pagination.Next onClick={this.nextButton} disabled={this.props.page.blogs.currentPage === this.props.page.ceil} />
                    <Pagination.Last onClick={this.lastButton} disabled={this.props.page.blogs.currentPage === this.props.page.ceil} />
                </Pagination>
            </div>
            : null
    }
}

const mapStateToProps = (state: any) => ({
    page: state.page,
    data: state.data
})

const mapDispatchToProps = (dispatch: any) => ({
    firstPage: () => dispatch(firstPage()),
    nextPage: () => dispatch(nextPage()),
    setLoading: () => dispatch(setLoading()),
    setIndexPost: (data: any) => dispatch(setIndexPost(data)),
    setMyPost: (data: any) => dispatch(setMyPost(data)),
    previousPage: () => dispatch(previousPage()),
    targetPage: (num: number) => dispatch(targetPage(num))
})

export default connect(mapStateToProps, mapDispatchToProps)(Paginate)