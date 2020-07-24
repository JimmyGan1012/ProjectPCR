<template>
            <div>
            <v-card max-width=500px 
                :width="this.window_tooSmall ? '100%':'500px'"
                class="mx-auto mt-2 text-center" 
                v-resize="onResize">
                <div style="height:5px"><p></p></div>
                <v-img :src="require('../assets/title.jpg')" 
                    class="mx-auto mt-5 " 
                    :height="this.window_tooSmall ? '50%':'250px'"
                    :width="this.window_tooSmall ? '50%':'250px'"> 
                </v-img>
                <v-flex class="mt-3 mx-5"><span class="display-1 float-left" >Login</span></v-flex>
                <div style="clear: both"></div>
                
                <v-form @submit="submit"> 
                    <v-text-field 
                        label="Username"
                        prepend-icon="mdi-account-circle"
                        class="mx-5 mt-3"
                        id="inputbox"
                        >
                    </v-text-field>
                </v-form>
                <span class="red--text mx-auto"  v-if="username_invalid"> Invalid UserName. Please Enter again </span>
                <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            color="blue"
                            class="white--text"
                            @click="submit"
                            >
                            Submit
                        </v-btn>
                        <v-progress-circular v-if="formInSubmission" indeterminate color="green"></v-progress-circular>
                        <v-spacer></v-spacer>
                </v-card-actions>
                <div class="d-flex mx-5 justify-end">
                    <v-btn class="text-subtitle-2" fab small outlined color="red" @click="addUser">
                        <v-icon>mdi-account-plus</v-icon>
                    </v-btn>
                </div>
                <div style="height:3px"><p></p></div>
            </v-card>
            </div>
</template>

<script>
export default {
    name:"login",
    created:function(){
        if (window.outerWidth < 500){
                this.window_tooSmall=true
        }
    },
    data:function() {
        return {
            username_invalid:false,
            window_tooSmall:false,
            formInSubmission:false
        }
    },
    mounted:function(){
        this.username_invalid=false;
    },
    methods:{
        submit:function(){
            if(!this.formInSubmission){
                this.formInSubmission=true
                if (document.getElementById("inputbox").value){
                this.$http
                    .post('/api/login',{
                        username:document.getElementById("inputbox").value
                    })
                    .then(function(res){
                        if(res.body.login_successful ){
                            alert("Login Successful")
                                const Cookies=require("js-cookie")
                                Cookies.set("username",res.body.username);
                            this.$emit("loginSuccesful",res.body.username)
                            this.$router.push({name:'homepage'})
                        }else{
                            this.username_invalid=true
                            console.log("Login not success")
                        }
                        this.formInSubmission=false
                    },function(res){
                        console.log("res.status:",res.status)
                        this.formInSubmission=false
                        alert("Login Error occurred, Please refresh the page. Error Code: "+res.status)
                    })
            }else{
                alert("Can't Enter Null")
                this.formInSubmission=false
            } 
            }
               
        },
        onResize:function(){
            if (window.outerWidth < 500){
                this.window_tooSmall=true
            }else{
                 this.window_tooSmall=false
            }
        },
        addUser:function(){
            this.$router.push({name:"add"})
        }
    }   
}
</script>

