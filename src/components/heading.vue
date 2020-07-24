<template>
    <div>
            <v-navigation-drawer v-model="drawerOpen" app temporary>
                <v-list-item>
                    <v-list-item-title class="title">User:{{this.$parent.$parent.username}}</v-list-item-title>
                </v-list-item>
                <v-divider></v-divider>
                <v-list dense nav>
                    <v-list-item v-for="item in items" :key="item.title" link router :to="item.route">
                        <v-list-item-icon>
                            <v-icon>{{item.icon}}</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>{{item.title}}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-navigation-drawer>
            <v-app-bar>
                <v-app-bar-nav-icon @click="drawerOpenfnc"></v-app-bar-nav-icon>
                <v-toolbar-title>Title</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn
                    @click="login"
                    color="success mx-1"
                    width=100
                    >
                        login
                </v-btn>
                <v-btn @click="logout" width=100 color="red lighten-1" class="white--text">logout</v-btn>
            </v-app-bar>
            
    </div>
    
</template>

<script>
export default {
    data:function(){
        return{
            drawerOpen:false,
            items:[
                {title: "guild", icon:"mdi-file-table-box",route:'/guild'},
                {title: "self" , icon:"mdi-account-box",route:'/self'},
                {title: "yourBox",icon:"mdi-apps-box",route:"/selfBox"}
            ]
        }
    },
    props:[
        'username'
    ],
    name:'heading',
    methods:{
        login:function(){
            //push to login page with currerent username
            if(this.$parent.$parent.$route.name!='login'){
                if (this.$parent.$parent.username !=""){
                    if (confirm("Already logged in as "+this.$parent.$parent.username+". Do you want to first logout?")){
                        this.$router.push({name:"login"});
                    }
                }else{
                    this.$router.push({name:"login"});
                }
            }
        },
        logout:function(){
            if(confirm("Do you want to logout?")){
                this.$parent.$parent.username='';
                    const Cookies=require("js-cookie")
                    Cookies.set("username","",{expires:365});
                if(this.$parent.$parent.$route.name!='login'){
                    this.$router.push({name:"login"});
                }
                console.log("LOGOUT");
            }else{
                console.log("choosed not to logout")
            }
        },
        drawerOpenfnc:function(){
            this.drawerOpen = !this.drawerOpen;
        }
    }
}
</script>


