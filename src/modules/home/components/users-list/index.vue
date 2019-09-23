<template>
    <ul>
        <li v-for="user in users">{{user.name}} {{user.lastname}}</li>
    </ul>
</template>

<script>
    export default {
        name: 'UsersList',
        props: {
            users: {
                type: Array,
                required: true
            }
        },
    };
</script>
