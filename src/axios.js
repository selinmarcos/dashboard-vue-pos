import axios from 'axios'

// axios.defaults.baseURL = 'http://localhost:8000/api/'  //LOCAL
axios.defaults.baseURL = 'https://invoicing-wmb.herokuapp.com/api/'     //CLOUD
axios.defaults.headers.common['Authorization'] = 'Bearer' + localStorage.getItem('token')
axios.defaults.withCredentials = true;