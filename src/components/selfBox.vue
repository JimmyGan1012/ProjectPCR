<template>
<div class="d-flex flex-column justify-center my-5">
  <v-card max-width=90% class="mx-auto" ref="topCard" min-width="90%">
    <div class='d-flex justify-center align-center'>
      <v-card-title>Box一览：</v-card-title>
      <v-spacer></v-spacer>
      <v-btn @click="enableEdit" v-if="!inEdit" class="mx-3 white--text" color=blue>Edit</v-btn>
      <v-btn @click="saveBox" v-if="inEdit" class="mx-3 white--text" color=blue>Save</v-btn>
      <v-progress-circular v-if="inSubmit" indeterminate color="green"></v-progress-circular>
    </div>
    <v-container>
      <v-row>
        <v-col v-for="character in have()" :key="character.id" class="px-1">
          <selfBoxEditHave :character="character" :inEdit="inEdit" @confirmEdit="confirmEdit" @removeCharacter="remove"></selfBoxEditHave>
        </v-col>
      </v-row>
    </v-container>
  </v-card>

  <v-card max-width=90% class="mx-auto mt-5" ref="bottomCard" min-width="90%">
    <v-card-title>未拥有的角色：</v-card-title>

    <v-container>
      <v-row>
        <v-col v-for="character in notHave()" :key="character.id" class="px-1">
          <v-btn
            width="90px"
            height="110px"
            @click="edit2Have(character)"
          >
            <div class="d-flex flex-column jusitfy-center align-center">
              <v-img width="80px" height="80px" :src="character.imgpath"></v-img>
              <div class="d-flex justify-center align-center my-1">
                <v-img width=18 height=18 class="mx-0 my-1" v-for="index in new Array(character.defaultStar)" :key="index">
                  <v-icon color="amber accent-2" small>mdi-star</v-icon>
                </v-img>
              </div>
            </div>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</div>
</template>

<script>
import selfBoxEditHave from "./selfBoxEditHave"
    export default {
        props:["userLoggedIn","users"],
        components:{
          selfBoxEditHave
        },
        data:function (){
            return{
                characters:require("./characters"),
                box:[],
                inEdit:false,
                inSubmit:false
            }
        },
        methods:{
          inBox:function(name){
            var result=false
            for (var character of this.box){
              if(character.name==name){
                  result=true;
                  break
              }
            }
            return result
          },
          have:function(){
            var have=[]
            for (var character of this.characters){
              for (var cBox of this.box){
                if(cBox.name==character.name){
                  var editingCharacter=JSON.parse(JSON.stringify(character))
                  if(cBox.userStar==0 || !cBox.isEditted){
                    editingCharacter.userStar=character.defaultStar
                  }else{
                    editingCharacter.userStar=cBox.userStar
                  }
                  editingCharacter.isTrained=cBox.isTrained
                  editingCharacter.isEditted=cBox.isEditted
                  have.push(editingCharacter)
                }
              }
            }
            return have
          },
          notHave:function(){
            var notHave=[]
            for (var character of this.characters){
              if(!this.inBox(character.name)){
                notHave.push(character)
              }
            }
            return notHave
          },
          edit2Have:function(character){
            if(this.inEdit){
              var newBoxCharacter={
                name:character.name,
                userStar:0,
                isEditted:false,
                isTrained:false
              }
              this.box.push(newBoxCharacter)        
            }
          },
          enableEdit:function(){
            if(confirm("Do you want to edit your box?")){
              this.inEdit=true
              alert("如何编辑：\n      1.在未拥有的角色中点击头像就能加入box\n      2.在已拥有的角色中点击头像就能打开编辑面板\n\nP.S.没练的角色会显示透明，还未编辑的会被标记成红色")
            }
          },
          confirmEdit:function(boxCharacter){
            for (var character of this.box){
              if(character.name==boxCharacter.name){
                character.userStar=boxCharacter.userStar
                character.isEditted=boxCharacter.isEditted
                character.isTrained=boxCharacter.isTrained
                }
            }
          },
          saveBox:function(){
            this.inSubmit=true
            this.$http
              .post("/api/postBox",
                {username:this.userLoggedIn,
                 box_JSON:JSON.stringify(this.box)
                })
              .then(function(res){
                        if(res.body.insertSuccess ){
                            alert("Box Saved!")
                        }else{
                            alert("Error occurred, Please try again.")
                        }
                        this.inSubmit=false
                    },function(res){
                        console.log("res.status:",res.status)
                        this.inSubmit=false
                        alert("Error occurred, Please try again. Error Code: "+res.status)
                    })
            this.inEdit=false
          },
          remove:function(name){
            for (var c in this.box){
              if(this.box[c].name==name){
                this.box.splice(c,1)
              }
            }
          },
          updateBox(){
            for(var user of this.$parent.$parent.allUsers){
              if(user.name==this.userLoggedIn){
                this.box=JSON.parse(JSON.stringify(user.box))
              }
            }
          }

        },
        created:function(){
          this.updateBox()
        }, mounted:function(){
          this.$emit("pageMounted")
        }
    };
</script>