<template>
    <div class="main">
        <h1>{{title}}</h1>
        <router-view></router-view>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';

    export default {
        name: 'App',

        metaInfo: {
            meta: [
                { charset: 'utf-8' },
            ]
        },

        computed: {
            ...mapGetters({
                title: 'title',
            })
        },
    };
</script>
