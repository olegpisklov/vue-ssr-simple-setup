import axios from 'axios';

const instance = axios.create({
    baseURL:'http://localhost:3000/',
});

const getUsers = () => instance.get('/users');

export default {
    getUsers
};