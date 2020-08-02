<template>
    <div class="d-flex justify-center align-start">
        <v-card class="my-4" min-width=500 max-width=500>
            <v-card-title>提交新的轴</v-card-title>
            <div class="d-flex justify-center align-center">
                <v-select
                :items="['a','b','c']"
                ref="bossStage"
                label="阶段"
                prepend-icon="mdi-google-downasaur"
                class="mb-3 mx-3">
                </v-select>
                <v-select
                :items="[1,2,3,4,5]"
                ref="bossNum"
                label="几王"
                prepend-icon="mdi-google-downasaur"
                class="mb-3 mx-3"
                >
                </v-select>
                <v-text-field
                    ref="qualifiedDamage"
                    label="及格伤害"
                    prepend-icon="mdi-knife"
                    class="mb-3 mx-3"
                    suffix="W"
                    type="number"
                    :rules="[rule]">
                </v-text-field>
            </div>
        
            <div class="d-flex flex-row mx-auto my-2">
            <v-spacer></v-spacer>
            <img
                class="mx-2"
                height="60"
                width="60"
                :src="selectedCharacters[0]=='' ? '../../static/character_icons/logo.png':selectedCharacters[0].imgpath"
            />
            <img
                class="mx-2"
                height="60"
                width="60"
                :src="selectedCharacters[1]=='' ? '../../static/character_icons/logo.png':selectedCharacters[1].imgpath"
            />
            <img
                class="mx-2"
                height="60"
                width="60"
                :src="selectedCharacters[2]=='' ? '../../static/character_icons/logo.png':selectedCharacters[2].imgpath"
            />
            <img
                class="mx-2"
                height="60"
                width="60"
                :src="selectedCharacters[3]=='' ? '../../static/character_icons/logo.png':selectedCharacters[3].imgpath"
            />
            <img
                class="mx-2"
                height="60"
                width="60"
                :src="selectedCharacters[4]=='' ? '../../static/character_icons/logo.png':selectedCharacters[4].imgpath"
            />
            <popbox ref="popbox" @completed="update"></popbox>
            <v-spacer></v-spacer>
            </div>
            <v-card class="d-flex justify-center mx-auto" max-width=450 min-width=450 flat>
                <v-textarea 
                    outlined
                    label="轴"
                    placeholder="请输入文字轴，目前还不支持图片上传,建议输入需要星级"
                    :auto-grow="true"
                    ref="timeLineText">
                </v-textarea>
            </v-card>

            <div class="d-flex justify-center mb-4">
                <v-btn class="success" @click="submit">Submit</v-btn>
                <v-progress-circular v-if="formInSubmission" indeterminate color="green"></v-progress-circular>
            </div>


        </v-card>

    </div>    
</template>

<script>
import popbox from "./popbox"
export default {
    props:["info"],
    data:function(){
        return{
            selectedCharacters:["","",'','',''],
            formInSubmission:false,
            rule: function(value) {
                if (value <= 0) {
                return "Must be greater than 0";
                }
                return true;
            }
        }
    },
    components:{
        popbox
    },
    methods:{
        update:function(data){
            this.selectedCharacters=data.selectedCharacters
        },
        submit:function(){
            if(! (this.$refs.bossNum.lazyValue && this.$refs.qualifiedDamage.lazyValue && this.$refs.timeLineText.lazyValue  && this.$refs.bossStage.lazyValue && this.selectedCharacters[0]!=''
                && this.selectedCharacters[1]!=''&& this.selectedCharacters[2]!=''&& this.selectedCharacters[3]!=''
                && this.selectedCharacters[4]!=''&& this.selectedCharacters[5]!='')){
                alert("Mississing Information!")
                return
            }
            var data={
                        month:this.info.month,
                        year:this.info.year,
                        bossStage:this.$refs.bossStage.lazyValue,
                        bossNum:this.$refs.bossNum.lazyValue,
                        timeLineText:this.$refs.timeLineText.lazyValue,
                        slot1:this.selectedCharacters[0].name,
                        slot2:this.selectedCharacters[1].name,
                        slot3:this.selectedCharacters[2].name,
                        slot4:this.selectedCharacters[3].name,
                        slot5:this.selectedCharacters[4].name,
                        qualifiedDamage:this.$refs.qualifiedDamage.lazyValue
                        }
            console.log(data)
            
            if(!this.formInSubmission){
                this.formInSubmission=true
                this.$http
                    .post('/api/postTimeLine',data)
                    .then((res)=>{
                        if(res.body.insertSuccess){
                            alert("提交成功！")
                        }else{
                            alert("提交错误 请重试")
                        }
                        this.formInSubmission=false
                    },(res)=>{
                        console.log("res.status:",res.status)
                        alert("服务器错误 请重试"+"res.status:"+res.status)
                        this.formInSubmission=false
                    })
            }

        }
    }
}
</script>

