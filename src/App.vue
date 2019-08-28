<template>
    <div class="main">
        <h1>{{title}}</h1>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';

    export default {
        name: 'App',
        computed: {
            ...mapGetters({
                title: 'title'
            })
        },
    };
</script>
