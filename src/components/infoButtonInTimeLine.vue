<template>
    <v-dialog v-model='dialogOn'  min-wdith=500 max-width="500">
        <template v-slot:activator="{on,attrs}" scrollable max-width="600px">
            <v-btn
                v-bind="attrs"
                v-on="on"
                width=225 
                height=50
                rounded
                text
                >
                <div width=225 height=50 class="d-flex justify-center">
                    <v-img max-width=35 max-height=35 :src="timeLine.slot1.imgpath"></v-img>
                    <v-img max-width=35 max-height=35 :src="timeLine.slot2.imgpath"></v-img>
                    <v-img max-width=35 max-height=35 :src="timeLine.slot3.imgpath"></v-img>
                    <v-img max-width=35 max-height=35 :src="timeLine.slot4.imgpath"></v-img>
                    <v-img max-width=35 max-height=35 :src="timeLine.slot5.imgpath"></v-img>
                    <span class="mx-auto my-auto">{{timeLine.qualifiedDamage}}W</span>
                </div>
            </v-btn>
        </template>
        <v-card min-wdith=500 max-width="500">
            <v-card-title>及格伤害：{{timeLine.qualifiedDamage}}W</v-card-title>
            <div class="d-flex flex-row mx-auto my-2 justify-center">
                <img
                    class="mx-2"
                    height="60"
                    width="60"
                    :src="timeLine.slot1.imgpath"
                />
                <img
                    class="mx-2"
                    height="60"
                    width="60"
                    :src="timeLine.slot2.imgpath"
                />
                <img
                    class="mx-2"
                    height="60"
                    width="60"
                    :src="timeLine.slot3.imgpath"
                />
                <img
                    class="mx-2"
                    height="60"
                    width="60"
                    :src="timeLine.slot4.imgpath"
                />
                <img
                    class="mx-2"
                    height="60"
                    width="60"
                    :src="timeLine.slot5.imgpath"
                />
            </div>
            <div v-html="textConvert()"
                class="d-flex justify-center align-center">

            </div>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        props:["timeLine"],
        data:function(){
            return{
                dialogOn:false
            }
        },
        methods:{
            textConvert:function(){
                console.log(this.timeLine.timeLineText)
                return this.timeLine.timeLineText.replace(/\n/g,"<br/>")
            }
        }
        
    }
</script>