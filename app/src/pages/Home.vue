<template>
    <div>
    <Header></Header>
    <homesec1></homesec1>
    <homesec2></homesec2>
    <AuthSection></AuthSection>
    <Footer></Footer>
    </div>
</template>

<script>
import Footer from '../components/sections/Footer.vue';
import Header from '../components/sections/Header.vue';
import homesec1 from '../components/Home/home_sec1.vue';
import homesec2 from '../components/Home/home_sec2.vue';
import AuthSection from '../components/Home/connexion.vue';
export default {
    name: 'home-page',
    data () {
        

        return {

        }
    },

    components:{
        Header,
        Footer,
        homesec1,
        homesec2,
        AuthSection,
    }
}
</script>

<style lang="scss" scoped>

</style>