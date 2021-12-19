<template>
<div class="pnf">
    <h1>Page Not Found</h1>  
    <h3>Go to Home Page</h3>
    <router-link :to="{ path: '/' }">Home</router-link>
    
    
</div>
    
</template>
<script>
export default{
    name:"PageNotFound"
}
</script>
<style scoped>
.pnf{
    padding-top: 200px;
    margin: auto;
    text-align: center;
}

</style>
