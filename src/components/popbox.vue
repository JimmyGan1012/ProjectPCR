<template>
    <v-dialog v-model='dialogOn'>
        <template v-slot:activator="{on,attrs}" scrollable max-width="600px">
            <v-btn
                v-bind="attrs"
                v-on="on"
                color="blue"
                class="white--text my-auto">
                Edit
            </v-btn>
        </template>
        <v-card>
            <v-row>
                <v-card-title>Select characters:</v-card-title>
                <v-spacer></v-spacer>
                <v-btn @click="completed" class="success my-3 mx-5">Save</v-btn>
            </v-row>
            <v-divider></v-divider>
            <div class="d-flex mx-3 mt-2 red-text">
                <span v-if="alertmessage" class="mx-3 mt-4 red--text">Select 5 members at most</span>
            </div>
            <v-container>
                <v-row >
                    <v-col
                        v-for="character in characters"
                        :key="character.id"
                        class="px-1">
                        <v-btn 
                            width=90px 
                            height =90px 
                            :color="character.isSelected ? 'red':'white'"
                            @click="clicked(character)">
                            <img width=80px height =80px :src="character.imgpath">
                        </v-btn> 
                    </v-col>
                </v-row>
            </v-container>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        name:'popbox',
        data:function (){
            return{
                alertmessage:false,
                characters:require("./characters"),
                selectedCharacters:new Set(),
                dialogOn:false
            }
        },
        methods:{
            clicked:function(character){
                if(character.isSelected){
                    this.alertmessage =false;
                    character.isSelected =false;
                    this.selectedCharacters.delete(character);
                }else{
                    if(this.selectedCharacters.size <5){
                        character.isSelected = true;
                        this.selectedCharacters.add(character)
                    }else{
                        //member fulled at 5
                        this.alertmessage  = true;
                    }
                }
            },
            completed:function(){
                var selectedCharacters=[]
                for (var c of this.characters){
                    if(c.isSelected){
                       selectedCharacters.push(c) 
                    }
                }
                while (selectedCharacters.length<5){
                    selectedCharacters.push("")
                }
                this.$emit("completed",{selectedCharacters:selectedCharacters})
                this.dialogOn=false
            }
        }
        
    }
</script>