<template>
  <v-card width="500" class="mx-auto my-3">
    <v-card-title>Change Current Info</v-card-title>
    <div class="d-flex flex-row">
      <v-text-field
        ref="month"
        label="month"
        prepend-icon="mdi-calendar-month"
        class="mx-5 mt-0"
        width="100"
      ></v-text-field>
      <v-text-field
        ref="year"
        label="year"
        prepend-icon="mdi-calendar-month"
        class="mx-5 mt-0"
        width="100"
      ></v-text-field>
    </div>

    <div class="d-flex flex-row">
      <v-text-field
        ref="boss1"
        label="boss 1 HP"
        prepend-icon="mdi-google-downasaur"
        class="mx-5 mt-0"
        width="100"
      ></v-text-field>
      <v-text-field
        ref="boss2"
        label="boss 2 HP"
        prepend-icon="mdi-google-downasaur"
        class="mx-5 mt-0"
        width="100"
      ></v-text-field>
    </div>
    <div class="d-flex">
      <v-text-field
        ref="boss3"
        label="boss 3 HP"
        prepend-icon="mdi-google-downasaur"
        class="mx-5 mt-0"
        width="100"
      ></v-text-field>
      <v-text-field
        ref="boss4"
        label="boss 4 HP"
        prepend-icon="mdi-google-downasaur"
        class="mx-5 mt-0"
        width="100"
      ></v-text-field>
      <v-text-field
        ref="boss5"
        label="boss 5 HP"
        prepend-icon="mdi-google-downasaur"
        class="mx-5 mt-0"
        width="100"
      ></v-text-field>
    </div>
    <div class="d-flex flex-row">
      <v-text-field
        ref="verificationCode"
        label="Verification Code"
        prepend-icon="mdi-onepassword"
        class="mx-auto mt-0 shrink"
      ></v-text-field>
    </div>
    <div class="d-flex justify-center my-3" v-if="verificationCodeIncorrect">
      <span class="text-center text-subtitle-1">
        Verification Code Incorrect
        <br />Please contact adminstrator for the correct code
      </span>
    </div>
    <div class="d-flex justify-center mb-5">
      <v-btn class="success" @click="submit">Submit</v-btn>
      <v-progress-circular v-if="formInSubmission" indeterminate color="green"></v-progress-circular>
    </div>
  </v-card>
</template>

<script>
export default {
  data: function() {
    return {
      verificationCodeIncorrect: false,
      formInSubmission:false
    };
  },
  methods: {
    // Note: Not doing verification here, please make sure the thing entered is correct
    submit: function() {
      if(!this.formInSubmission){
        this.formInSubmission=true
        if(this.$refs.month.lazyValue && this.$refs.year.lazyValue && this.$refs.boss1.lazyValue && this.$refs.boss2.lazyValue&& this.$refs.boss3.lazyValue&& this.$refs.boss4.lazyValue && this.$refs.boss5.lazyValue){
         if (this.$refs.verificationCode.lazyValue == "114514") {
            this.verificationCodeIncorrect = false;
            var data={
                month:this.$refs.month.lazyValue,
                year:this.$refs.year.lazyValue,
                bossHP_1:this.$refs.boss1.lazyValue,
                bossHP_2:this.$refs.boss2.lazyValue,
                bossHP_3:this.$refs.boss3.lazyValue,
                bossHP_4:this.$refs.boss4.lazyValue,
                bossHP_5:this.$refs.boss5.lazyValue,
            }
            this.$http
                .post("/api/postCurrentInfo",data)
                .then((res)=>{
                    if(res.body.overrideSuccessful){
                        alert("Successfully Updated Current Info")
                    }else{
                        alert("Update NOT succeed, please got to PHP MY admin to check for current Info")
                    }
                    this.formInSubmission=false
                },(res)=>{
                    console.log("Error occured, res is:",res)
                    this.formInSubmission=false
                })
        
        } else {
            this.verificationCodeIncorrect = true;
            this.formInSubmission=false

        } 
      }else{
          alert("Missing required field")
          this.formInSubmission=false
      }
      }
      

    }
  }
};
</script>