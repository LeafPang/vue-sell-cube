import moment from 'moment';
const ALL=2;
export default{
  data(){
    return {
      selectType:ALL,//商品评价类型
      onlyContent:true,//只看有内容评价
    }
  },
  methods:{
     // 评论头部切换，改变选择类型
     selectHead(type){
      this.selectType=type;
    },
    //只看有评论内容的评论
    toggleCon(){
      // debugger;
      this.onlyContent=!this.onlyContent;
    },
    // 格式化时间戳
    format(time){
      return moment(time).format('YYYY-MM-DD hh:mm');
    },
    //根据选择类型，显示与隐藏评论
    needShow(selectedtype,text){
      if(this.onlyContent && !text){
        return false;
      }
      if(this.selectType === ALL){
        return true;
      }else {
        return this.selectType === selectedtype;
      }
    }
  }
}