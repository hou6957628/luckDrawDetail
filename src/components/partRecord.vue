<template>
  <div id="part">
    <div class="ruleDetail">
      <div class="box">幸运号</div>
      <div class="box">获取时间</div>
      <div class="box">是否中奖</div>
    </div>
    <div class="ruleDetail" v-for="(item,index) in canData">
      <div class="box">{{item.luckyNumber}}</div>
      <div class="box">{{item.createDate}}</div>
      <div v-if="item.status==0" class="box">待开奖</div>
      <div v-if="item.status==1" class="box">未中奖</div>
      <div v-if="item.status==2" class="box">已中奖</div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
  }
  export default {
    data() {
      return {
        arr:[],
        canData:[],
        newArr1:[],
      }
    },
    methods: {
      getInfo(id){
        axios({
          method:"POST",
          url:"http://"+this.baseUrl+"/flowPool/api/prizes/luckDrawRecord",
          headers:{
            'Content-Type':'application/x-www-form-urlencoded',
            'token': localStorage.token
          },
          params:{
            prizesId:id
          },
        }).then((res)=>{
          if(res.data.msgCd=='ZYCASH-200'){
            this.canData=res.data.body.list;
          }else if(res.data.msgCd=='ZYCASH-1009'){
          }
          else {
          }
        })
      },
    },
    mounted() {
      var id=getQueryString("id");
      this.id=id;
      localStorage.id=id;
      this.getInfo(localStorage.id);
    }
  }
</script>

<style scoped>
  #part .ruleText {
    width: 300px;
    height: 50px;
    line-height: 50px;
    text-indent: 25px;
    border-left: 5px solid #FF0000;
    margin-bottom: 29px;
    font-size: 32px;
    font-weight: 500;
    text-align: left;
  }
  #part{
    margin-bottom: 60px;
  }
  #part .ruleDetail {
    text-align: left;
    margin-left: 25px;
    line-height: 60px;
    font-size: 30px;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
  }

  #part .ruleDetail {
    display: flex;
    display: -webkit-flex; /* Safari */
    flex-direction: row;
    flex-wrap: wrap-reverse;
    justify-content: space-around;
    align-items: stretch;
    text-align: center;
    align-content: space-around;
  }
  #part .box {
    width: 33.33%;
    line-height: 50px;
    flex-grow: 0;
  }
  #part .proImg{
    width: 640px;
    height: 380px;
    margin: 0 auto;
    margin-top: 30px;
    margin-bottom: 60px;
    background: url("http://jmyq.wzgeek.com/images/jiangBg.png") no-repeat;
    background-size: contain;
  }
  #part .proImg span{
    display: inline-block;
    font-size: 36px;
    font-weight: normal;
    width: 227px;
    height: 35px;
    margin: 55px 0 33px 0;
    color: rgba(154, 88, 18, 1);
  }
  #part .proImg .proImage{
    display: block;
    width: 178px;
    height: auto;
    margin: 0 auto;
    margin-top: 33px;
  }
</style>
