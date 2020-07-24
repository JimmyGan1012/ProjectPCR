<template>
  <div>
    <v-dialog v-if="inEdit" width=500 v-model="dialogOn">
      <template v-slot:activator="{on,attrs}" scrollable max-width="600px">
        <v-btn
          width="90px"
          height="110px"
          :color="character.isEditted ? 'white':'red lighten-4'"
          v-bind="attrs"
          v-on="on"
        >
          <div class="d-flex flex-column jusitfy-center align-center">
            <v-img
              width="80px"
              height="80px"
              :src="character.imgpath"
              :style="character.isTrained ? '':'opacity:0.3'"
            ></v-img>
            <div class="d-flex justify-center align-center my-1">
              <v-img
                width="18"
                height="18"
                class="mx-0 my-1"
                v-for="index in getStarArray()"
                :key="index"
              >
                <v-icon
                  color="amber accent-2"
                  small
                  :style="character.isTrained ? '':'opacity:0.3'"
                >mdi-star</v-icon>
              </v-img>
            </div>
          </div>
        </v-btn>
      </template>
      <v-card width=500>
        <div class="d-flex align-center">
          <v-card-title>编辑Box角色</v-card-title>
          <v-spacer></v-spacer>
          <v-btn @click="remove" class='mr-5 white--text' color=blue >从box中删除</v-btn>
        </div>
        <v-divider></v-divider>
        <v-container>
        <v-row class="d-flex justify-center">
          <v-col>
              <v-select
              prepend-icon="mdi-star"
              label="Star Number"
              class="my-0 mx-5"
              :items="[1,2,3,4,5]"
              ref="starNumber"
              v-model="defaultStar"
            ></v-select>
          </v-col>
          <v-col class="d-flex justify-center">
            <v-switch class="mx-2" label="练了" v-model="character.isTrained"></v-switch>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="d-flex justify-center">
            <v-btn class='success' @click="btnSave">save</v-btn>
          </v-col>
        </v-row>
        </v-container>
      </v-card>
    </v-dialog>


<!-- v-btn for not inEdit -->
    <v-btn
      width="90px"
      height="110px"
      :color="character.isEditted ? 'white':'red lighten-4'"
      v-if="!inEdit"
    >
      <div class="d-flex flex-column jusitfy-center align-center">
        <v-img
          width="80px"
          height="80px"
          :src="character.imgpath"
          :style="character.isTrained ? '':'opacity:0.3'"
        ></v-img>
        <div class="d-flex justify-center align-center my-1">
          <v-img
            width="18"
            height="18"
            class="mx-0 my-1"
            v-for="index in getStarArray()"
            :key="index"
          >
            <v-icon
              color="amber accent-2"
              small
              :style="character.isTrained ? '':'opacity:0.3'"
            >mdi-star</v-icon>
          </v-img>
        </div>
      </div>
    </v-btn>
  </div>
</template>

<script>
export default {
  props: ["character", "inEdit"],
  data:function(){
    return{
      dialogOn:false
    }
  },
  methods:{
    getStarArray:function(){
      if(this.character.userStar!=0){
        return (new Array(this.character.userStar))
      }else{
        return(new Array(this.character.defaultStar))
      }
    },
    btnSave:function(){
      this.dialogOn=false
      var boxCharacter={
        "name":this.character.name,
        "userStar":this.$refs.starNumber.lazyValue,
        "isEditted":true,
        "isTrained":this.character.isTrained
      }
      this.$emit("confirmEdit",boxCharacter)
    },
    remove:function(){
      this.dialogOn=false
      this.$emit("removeCharacter",this.character.name)
    }
  },
  created:function(){
    this.defaultStar=this.character.defaultStar
  }
};
</script>