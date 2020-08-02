<template>
    <div>
        <v-card min-width="350" max-width="350" class="mx-auto mt-5">
            <div class="d-flex align-center">
                <v-card-title>
                    目前已有的作业
                </v-card-title>
                <v-spacer></v-spacer>
                <v-btn class="white--text mx-2" color="blue" @click="redirect">Add New</v-btn>
            </div>

            <div v-for="(boss,index) in allTimeLines" :key="index">
                <v-treeview :items="[{name:index,children:boss}]">
                    <template v-slot:label="{item,leaf}">
                        <v-card-title class="text-body-1" v-if="!leaf">{{index+1}}王的作业：</v-card-title>
                        <v-card v-if="leaf">
                            <infoButtonInTimeLine  :timeLine="item"></infoButtonInTimeLine>
                        </v-card>
                    </template>
                </v-treeview>
            </div>
        </v-card>
    </div>

</template>

<script>
import infoButtonInTimeLine from "./infoButtonInTimeLine"
export default {
    props:["allTimeLines"],
    components:{
        infoButtonInTimeLine
    },methods:{
        redirect:function(){
            this.$router.push({name:"timeLineInsert"})
        }
    }
    
}
</script>