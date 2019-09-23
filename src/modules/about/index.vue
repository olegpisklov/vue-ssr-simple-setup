<template>
    <div>
        <router-link to="/">Go to Home page</router-link>
        <h1>About page</h1>
    </div>
</template>

<script>
    export default {
        name: 'About',

        metaInfo: {
            title: 'Vue SSR Simple Setup About',
            meta: [
                { name: 'description', content: 'About page description' }
            ]
        },
    };
</script>
