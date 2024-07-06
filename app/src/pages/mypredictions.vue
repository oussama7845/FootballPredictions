<template>
    <div>
        <Header></Header>
        <mypredictions></mypredictions>
        <Footer></Footer>
    </div>
</template>

<script>

import mypredictions from '../components/predictions/mypredictions.vue';
import Footer from '../components/sections/Footer.vue';
import Header from '../components/sections/Header.vue';

export default {
    name:'mypredictions-page',
    data () {
        

        return {}
    },

    components:{
        mypredictions,
        Footer,
        Header,
    }
}
</script>

<style lang="scss" scoped>

</style>



