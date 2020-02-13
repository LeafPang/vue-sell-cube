<template>
  <div class="star" :class="starSize">
    <span class="star-item" v-for="(starItemClass,index) in starItemClasses" :key="index" :class="starItemClass"></span>  
  </div> 
</template>
<script>
const LEN=5;
const STAR_ON="on";
const STAR_OFF="off";
const STAR_HALF="half";
export default {
  props:{
    size:{
      type:Number
    },
    score:{
      type:Number
    }
  },
  data(){
    return{

    }
  },
  computed:{
    starSize(){
      return "star-"+this.size;
    },
    starItemClasses(){
      let result=[];
      let score=Math.floor(this.score*2)/2;
      let hasDecimal=score%1 !==0;
      let inter=Math.floor(score);

      for(let i=0;i<inter;i++){
        result.push(STAR_ON);
      }
      if(hasDecimal){
        result.push(STAR_HALF);
      }
      while(result.length<LEN){
        result.push(STAR_OFF);
      }

      return result;

    }
  },
}
</script>
<style lang="stylus" scoped>
@import '../../assets/common/stylus/minix.styl';
@import "./star.styl";
</style>