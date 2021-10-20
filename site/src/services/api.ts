import axios from 'axios'

export const api = axios.create({
    baseURL: 'http://localhost:4000'
})

// const token = localStorage.getItem( '@doWhile:token' )
// if( token ) {
//     api.defaults.headers.common.authorization = `Bearer ${token}`
// }

// export { api };