<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="cart-decrease" v-show="food.count>0" @click.stop.prevent="decreaseCart">
        <span class="inner icon-remove_circle_outline"></span>
      </div>
    </transition>
    <div class="cart-count" v-show="food.count>0">{{ food.count }}</div>
    <div class="cart-add icon-add_circle" @click.stop.prevent="addCart"></div>
  </div>
</template>
<script>
import Vue from 'vue'
export default {
  props :{
    food:{
      type:Object
    }

  },
  methods:{
    decreaseCart(){
      if(!this.food.count){
        this.food.count--;
      }
    },
    addCart(event){
      // debugger;
      if(!this.food.count){
        Vue.set(this.food,"count",1);
      }else {
        this.food.count++;
      }
      this.$emit('add',event.target,this.food.parentName);
    }
  }
}
</script>
<style lang="stylus" scoped>
@import "./cartcontrol.styl";
</style>