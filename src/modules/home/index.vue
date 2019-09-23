<template>
    <div>        
        <router-link to="/about">Go to About page</router-link>
        <ul>
            <li v-for="user in users">{{user.name}} {{user.lastname}}</li>
        </ul>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';

    export default {
        name: 'Home',
        computed: {
            ...mapGetters({
                users: 'users',
            })
        },

        // Server-side only
        // This will be called by the server renderer automatically
        serverPrefetch () {
            // return the Promise from the action
            // so that the component waits before rendering
            return this.getUsers();
        },

        // Client-side only
        mounted () {
            // If we didn't already do it on the server, we fetch the users
            if (!this.users.length) {
                this.getUsers();
            }
        },

        methods: {
            getUsers () {
                return this.$store.dispatch('getUsers');
            }
        }
    };
</script>
