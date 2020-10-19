const { default: Axios } = require("axios")
const url = process.env.REACT_APP_DB_URL

class Fetches {
    fetchGetSum = async () =>{
        const res = await Axios.get(`${url}/notes.json`)
        return res.data
    }
    fetchGetUser = async (user) =>{//
        const res = await Axios.get(`${url}/user/${user}.json`)
        return res.data
    }
    fetchPostSum = async (data) =>{
        console.log(data)
        const res = await Axios.post(`${url}/notes.json`, data)
        return res.data
    }
    removeSum = async (id) =>{
        return await Axios.delete(`${url}/notes/${id}.json`)
     }
    fetchPostEmail = async (data) =>{
        const res = await Axios.post(`${url}/user.json`, data)
        return res.data
    }
}

export default Fetches






/* const fetchGetSum = async () =>{
    const res = await Axios.get(`${url}/notes.json`)
    console.log('fetchGetSum ',res.data)
} */

/* const fetchPostSum = async (data) =>{
    const res = await Axios.post(`${url}/notes.json`, data)
    console.log('fetchPostSum ',res.data)
} */

/* const removeSum = async (id) =>{
   await Axios.delete(`${url}/notes/${id}.json`)
} */
