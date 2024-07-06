<template>
    <div>
        <Header></Header>
        <homesec1></homesec1>
        <homesec2User></homesec2User>
        <Footer></Footer>
    </div>
</template>


<script>

import Footer from '../components/sections/Footer.vue';
import Header from '../components/sections/Header.vue';
import homesec1 from '../components/Home/home_sec1.vue';
import homesec2User from '../components/Home/home_sec2_user.vue';
export default {
    data () {
        

        return {}
    },
    components:{
        Header,
        Footer,
        homesec1,
        homesec2User,
    }
}
</script>

<style lang="scss" scoped>

</style>