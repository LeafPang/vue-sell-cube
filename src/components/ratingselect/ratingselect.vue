<template>
  <div class="ratingselect">
    <div class="rating-type">
      <span class="block positive" :class="{'active':selectType === 2}" @click="select(2)">
        {{desc.all}}
        <span class="count">{{ratings.length}}</span>
      </span>
       <span class="block positive" :class="{'active':selectType === 0}" @click="select(0)">
        {{desc.positive}}
        <span class="count">{{positives.length}}</span>
      </span>
       <span class="block negative" :class="{'active':selectType === 1}" @click="select(1)">
        {{desc.negative}}
        <span class="count">{{negatives.length}}</span>
      </span>
    </div>
    <div class="switch" @click="toggleContent" :class="{'on': onlyContent}">
      <span class="icon-check_circle" ></span>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>
<script>
const POSITIVE = 0;
const NEGATIVE = 1;
const ALL = 2;

export default {
  props:{
    selectType:{
      type:Number,
      default:0
    },
    onlyContent:{
      type:Boolean,
      default:true
    },
    desc:{
      type:Object,
      default(){
        return{
          all: '全部',
          positive: '推荐',
          negative: '吐槽'
        }
       
      }
    },
    ratings:{
      type:Array,
      default(){
        return []
      }
    }

  },
  computed:{
    positives(){
      return this.ratings.filter((rating)=>{
        return rating.rateType === 0;
      });
    },
    negatives(){
      return this.ratings.filter((rating)=>{
        return rating.rateType === 1;
      });
    }
  },
  methods:{
    // 评论头部切换
    select(type){
      // debugger;
      this.$emit("select",type);
    },
    // 只看有评论内容的按钮切换
    toggleContent(){
      // debugger;
      this.$emit("toggle");
    }
  }
}
</script>
<style lang="stylus" scoped>
@import 'ratingselect.styl';
</style>