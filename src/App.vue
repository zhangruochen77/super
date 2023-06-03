<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
    import Footer from "@/views/Footer";
    import Header from "@/views/Header";

    export default {
        components: {Header, Footer}
    }
</script>