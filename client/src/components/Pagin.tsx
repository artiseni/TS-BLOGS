import { Component } from "react"
import { Pagination } from 'react-bootstrap'
import { connect } from 'react-redux'
import { firstPage, nextPage, previousPage, targetPage, setLoading, setIndexPost } from '../store/hooks'
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

    firstPage: any
    nextPage: any
    previousPage: any
    targetPage: any
    setLoading: any
    setIndexPost: any

}


class Paginate extends Component<Props> {


    btnNumber = () => {

        const pageNumber = []
        for (let i = 1; i <= Math.ceil(this.props.page.countBlogs / this.props.page.blogs.take); i++) {
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
                const api = new Api(this.props.page.blogs)
                const data = await api.index()
                this.props.setLoading()
                this.props.setIndexPost(data)
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
                const api = new Api(this.props.page.blogs)
                const data = await api.index()
                this.props.setLoading()
                this.props.setIndexPost(data)
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
                const api = new Api(this.props.page.blogs)
                const data = await api.index()
                this.props.setLoading()
                this.props.setIndexPost(data)
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
                const api = new Api(this.props.page.blogs)
                const data = await api.index()
                this.props.setLoading()
                this.props.setIndexPost(data)
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
                const api = new Api(this.props.page.blogs)
                const data = await api.index()
                this.props.setLoading()
                this.props.setIndexPost(data)
            }

        } catch (error) {
            console.log(`${error}`)
        }


    }

    render = () => {

        return (
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
        )
    }
}

const mapStateToProps = (state: any) => ({
    page: state.page
})

const mapDispatchToProps = (dispatch: any) => ({
    firstPage: () => dispatch(firstPage()),
    nextPage: () => dispatch(nextPage()),
    setLoading: () => dispatch(setLoading()),
    setIndexPost: (data: any) => dispatch(setIndexPost(data)),
    previousPage: () => dispatch(previousPage()),
    targetPage: (num: number) => dispatch(targetPage(num))
})

export default connect(mapStateToProps, mapDispatchToProps)(Paginate)