<template>
    <v-card>
        <v-btn @click="storge">storge</v-btn>
        <v-btn @click="get">get</v-btn>
    </v-card>
</template>

<script>
export default {
    name:"test",
    data:function(){
        return{
        
        }
    },
    methods:{
        storge:function(){
            document.cookie="username=1234"
        },
        get:function(){
            console.log(document.cookie)
        }
    }
}
</script>