<template>
    <div id="homepage">
        <span
            class="display-1"
            >
            Welcome to PCR_GUILD_PROJECT, {{this.$parent.$parent.username}}
        </span>
    </div>
</template>

<script>
export default {
    created:function(){
        if (this.$parent.$parent.username==""){
            this.$router.push({name:"login"})
        }
    },
    methods:{

    }
}
</script>