<template>
    <v-dialog v-model='dialogOn' max-width=600>
        <template v-slot:activator="{on,attrs}" scrollable max-width="600px">
            <v-btn
                v-bind="attrs"
                v-on="on"
                width=225 
                height=50
                :color="theme[arrangement.day-1].color"
                :class="theme[arrangement.day-1].class"
                >

                <div width=225 height=50 class="d-flex justify-center">
                    <v-img max-width=35 max-height=35 :src="arrangement.slot1.imgpath" :style="arrangement.played==1 ? 'opacity:0.3':''"></v-img>
                    <v-img max-width=35 max-height=35 :src="arrangement.slot2.imgpath" :style="arrangement.played==1 ? 'opacity:0.3':''"></v-img>
                    <v-img max-width=35 max-height=35 :src="arrangement.slot3.imgpath" :style="arrangement.played==1 ? 'opacity:0.3':''" ></v-img>
                    <v-img max-width=35 max-height=35 :src="arrangement.slot4.imgpath" :style="arrangement.played==1 ? 'opacity:0.3':''" ></v-img>
                    <v-img max-width=35 max-height=35 :src="arrangement.slot5.imgpath" :style="arrangement.played==1 ? 'opacity:0.3':''"></v-img>
                    <div class="d-flex align-center text-caption">
                        <span v-if="arrangement.expectedDamage==0 && arrangement.played==0" :src="arrangement.slot5.imgpath" >{{(arrangement.highestDamage +arrangement.lowestDamage)/2}}W</span>
                        <span v-if="arrangement.highestDamage==0 && arrangement.lowestDamage==0 && arrangement.played==0" :src="arrangement.slot5.imgpath">{{arrangement.expectedDamage}}W</span>
                        <span v-if="arrangement.played==1" :src="arrangement.slot5.imgpath" :style="arrangement.played==1 ? 'opacity:0.8':''">{{arrangement.playedDamage}}W</span>
                    </div>
                </div>
            </v-btn>
        </template>
        <v-card >
            <v-card-title>Arrangement Information</v-card-title>
            <v-divider></v-divider>
            <div class="d-flex mx-3 my-2 text-subtitle-1 justify-center">
                <span class="mx-2" >User: {{arrangement.username}}</span>
                <span class="mx-2" >Round Number: {{arrangement.round}}</span>
                <span class="mx-2" >@Boss:{{arrangement.bossID}}</span>
                <span class="mx-2" >Day:{{arrangement.day}}</span>
            </div>

            <div class="d-flex mx-3 my-2 text-subtitle-1">Selected Characters:</div>
            <div class="d-flex mx-5 my-2 justify-center">
                <v-img max-width=75 max-height=75 :src="arrangement.slot1.imgpath"></v-img>
                <v-img max-width=75 max-height=75 :src="arrangement.slot2.imgpath"></v-img>
                <v-img max-width=75 max-height=75 :src="arrangement.slot3.imgpath"></v-img>
                <v-img max-width=75 max-height=75 :src="arrangement.slot4.imgpath"></v-img>
                <v-img max-width=75 max-height=75 :src="arrangement.slot5.imgpath"></v-img>
            </div>
            <div class="d-flex mx-5 my-4 justify-center">
                <span class="mx-5" v-if="arrangement.played==1" >Already Made: Yes</span>
                <span class="mx-5" v-if="arrangement.played==1" >Damage: {{arrangement.playedDamage}}</span>
                <span class="mx-5" v-if="arrangement.played==0" >Already Made: No</span>
            </div>
            <div class="d-flex mx-5 my-3 justify-center" v-if="arrangement.played==0">
                <span class="mx-5" v-if="arrangement.expectedDamage==0" >Highest Damage: {{arrangement.highestDamage}}</span>
                <span class="mx-5" v-if="arrangement.expectedDamage==0" >Lowest Damage: {{arrangement.lowestDamage}}</span>
                <span class="mx-5" v-if="arrangement.expectedDamage==0" >Average Damage: {{(arrangement.highestDamage +arrangement.lowestDamage)/2}}</span>
                <span class="mx-5" v-if="arrangement.highestDamage==0 && arrangement.lowestDamage==0" >ExpectedDamage: {{arrangement.expectedDamage}}</span>
            </div>
            <div class="d-flex mx-5 my-4 justify-center">
                <v-btn class="white--text" color=green @click="dialogOn=false">Done</v-btn>
            </div>
            <div class="d-flex mx-5 pb-0 justify-center">
               <p></p>
            </div>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    props:[
      "arrangement"  
    ],
    data:function(){
        return{
            dialogOn:false,
            theme:[{
                color:"red",
                class:"white--text accent-2"
            },{
                color:"orange",
                class:"white--text accent-3"
            },{
                color:"yellow",
                class:"black--text accent-4"
            },{
                color:"lime",
                class:"black--text"
            },{
                color:"blue",
                class:"white--text accent-3"
            },{
                color:"blue-grey",
                class:"white--text lighten-1"
            },{
                color:"purple",
                class:"white--text accent-1"
            },]
        }
    },
    methods:{

    }
}
</script>