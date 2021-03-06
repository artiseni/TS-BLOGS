import { createSlice } from '@reduxjs/toolkit'


export const dataUser = createSlice({

    name: 'blogs',
    initialState: {
        token_keys: {} as object,
        user: {} as object,
        display: true as boolean,
        content: [],
        button_number: 0 as number,
        str: '' as string,
        countBlogs: 0 as number,
        ceil: 0,
        current: 1,
        loading: false,
        login: false,
        edit: false,
        displayComments: false,
        hiddenComments: [] as any,
        isHide: 'none' as string,

        blogs: {
            currentPage: 1 as number,
            take: 4 as number
        } as any,

        edit_post: {
            uuid: '' as string,
            username: '' as string,
            updatedAt: '' as string,
            title: '' as string,
            content: '' as string
        } as object,

        index_post: [[], 0] as any[],
        myPost: [[], 0] as any[]
    },

    reducers: {

        setIsHide: (state, action) => {
            const { payload } = action
            state.isHide = payload
        },

        setHiddenComments: (state, action) => {
            const { payload } = action
            state.hiddenComments = payload
        },

        setDisplayComments: state => {
            state.displayComments = !state.displayComments
        },

        setEdit: state => {
            state.edit = !state.edit
        },

        setLogin: state => {
            state.login = true
        },

        setBlogs: (state, action) => {
            const { payload } = action
            state.blogs = payload
        },

        setCeil: state => {
            state.ceil = Math.ceil(state.countBlogs / state.blogs.take)
        },

        setCountBlogs: (state, action) => {
            const { payload } = action
            state.countBlogs = payload
        },

        setLoading: state => {
            state.loading = true
        },

        setString: (state, action) => {
            const { payload } = action
            state.str = payload
        },

        nextButtonNumber: state => {
            state.button_number += 1
        },

        changeButtonNumber: (state, action) => {
            const { payload } = action
            state.button_number = payload
        },

        setContent: (state, action) => {
            const { payload } = action
            state.content = payload
        },

        firstPage: state => {
            state.current = 1
            state.blogs = { currentPage: 1, take: 4 }
        },

        targetPage: (state, action) => {
            const { payload } = action
            state.current = payload
            state.blogs = { currentPage: payload, take: 4 }
        },

        nextPage: state => {
            state.current = state.current + 1
            state.blogs = {
                currentPage: state.blogs.currentPage + 1,
                take: 4
            }
        },

        previousPage: state => {
            state.current = state.current - 1
            state.blogs = {
                currentPage: state.blogs.currentPage - 1,
                take: 4
            }
        },

        setDisplay: (state, action) => {
            const { payload } = action
            state.display = payload
        },

        setIndexPost: (state, action) => {
            const { payload } = action
            state.index_post = payload
        },

        setMyPost: (state, action) => {
            const { payload } = action
            state.myPost = payload
        },

        setEditPost: (state, action) => {
            const { payload } = action
            state.edit_post = payload
        },

        setDataUser: (state, action) => {
            const { payload } = action
            state.user = payload
        },

        setTokenKeys: (state, action) => {
            const { payload } = action
            state.token_keys = payload
        },

        reset: state => {
            state.edit = false
            state.login = false
            state.button_number = 0
            state.user = {}
            state.token_keys = {}
            state.myPost = [[], 0]
        }
    }
})

export const {
    setDataUser, reset, setIndexPost,
    setMyPost, setTokenKeys, setEditPost,
    setDisplay, nextPage, previousPage,
    firstPage, targetPage, setContent,
    nextButtonNumber, changeButtonNumber,
    setString, setLoading, setCountBlogs,
    setCeil, setBlogs, setLogin, setEdit,
    setDisplayComments, setHiddenComments,
    setIsHide
} = dataUser.actions

export default dataUser.reducer