<template lang='pug'>
  .d-flex.text-center
    h1 EM EM PUSH NOTIFICATION
    XAFormsInput(
      v-model="subscription",
      placeholder="Topic",
      error-class="has-text-white"
    )
    b-button(type="is-primary" @click='subscribe') Subscribe
    b-button(type="is-primary" @click='deleteDATA') Un-Subscribe


//    hotfiix build modifier
</template>

<script>
import XAFormsInput from '../components/atoms/Forms/Input'
export default {
  components: { XAFormsInput },
  layout: 'blank',
  data() {
    return {
      subscription: ''
    }
  },
  methods:{
    subscribe(){
      if(this.subscription){
        this.$fireMess.subscribeToTopic({ topicName: this.subscription })
        this.$toast.success(`Nakapag Subscribe na to the ${this.subscription} `, {
          duration: 5000,
          position: 'bottom-center',
          className: 'fx1-success',
          iconPack: 'mdi',
          icon: 'check-circle-outline',
        })
      }
    },
    deleteDATA(){
      if(this.subscription){
        this.$fireMess.unSubscribeToTopic({ topicName: this.subscription })
        this.$toast.success(`Nakapag UN Subscribe na to the ${this.subscription} `, {
          duration: 5000,
          position: 'bottom-center',
          className: 'fx1-success',
          iconPack: 'mdi',
          icon: 'check-circle-outline',
        })
      }
    }
  },
  async mounted() {
    const token = await this.$fire.messaging.getToken();
    // console.log("TOKEN ID FOR this browser");
    // console.log(token);
  }
}
</script>

<style scoped>

</style>
