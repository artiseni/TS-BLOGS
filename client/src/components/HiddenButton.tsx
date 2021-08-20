import { Component } from "react"
import { Button } from 'react-bootstrap'


interface Props {
    text: string
}

interface State {
    textBody: string
    slicer: string
    id: number
}

class HiddenButton extends Component<Props, State> {

    id: number = 0

    constructor(props: any) {
        super(props)
        this.state = {
            textBody: this.props.text,
            slicer: '',
            id: 0
        }
    }

    componentDidMount = () => {
        // console.log(this.state.slicer)
    }

    readMore = (e: any) => {

        const { parentNode } = e.target
        const { childNodes } = parentNode
        const child = childNodes[0].childNodes[4]
        if (e.target.innerHTML === 'Read more') {
            this.setState({ slicer: this.slicer(this.state.textBody) })
            child.innerHTML = this.state.textBody
            // console.log(this.state.textBody)
            e.target.innerHTML = 'Show less'
        } else {
            child.innerHTML = this.state.slicer
            e.target.innerHTML = 'Read more'
        }
    }

    isDisplay = () => {
        const { text }: any = this.props
        const words = text.match(/(\w+)/g).length
        return words >= 100 ? <Button onClick={this.readMore} variant="dark" >Read more</Button> : null
    }

    textBody = (text: any) => {

        const words = text.match(/(\w+)/g).length
        if (words >= 100) {
            // console.log(words)
        }
        return words <= 100 ? text : this.slicer(text)
    }

    slicer = (text: string) => {
        const slicer = text.slice(0, 200)
        // this.setState({ slicer: `${slicer}...` })
        return `${slicer}...`
    }

    render = () => {
        return this.isDisplay()
    }
}

export default HiddenButton