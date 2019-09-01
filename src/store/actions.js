import api from '../api';

export const getUsers = ({ commit }) => 
    api.getUsers()
        .then(response => commit('setUsers', response.data));