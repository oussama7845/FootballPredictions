<template>
    <div class="container">
        <div class="container-header">
            <div class="container-img">
                <img @click.prevent="home" src="../../assets/logo.png" alt="logo">
            </div>
            <div>
                <h1>Bienvenu sur FootPredict</h1>
                <p>votre guide de prediction de match de football</p>
            </div>

        </div>
    </div>
</template>

<script>

export default {
    name: "Header-component",
    data() {
        return {

        }
    },

    methods: {
        home() {
            this.$router.push("/userHome");
        }
    }
}

</script>

<style lang="css" scoped>
.container-header img {
    width: 100px;
}

.container-header {
    background-color: #1b263b;
    color: white;
    display: flex;
    margin: auto;
    justify-content: center;
    align-items: center;

}

</style>