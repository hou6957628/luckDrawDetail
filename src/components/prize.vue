<template>
  <div class="content">
    <swiper style="width:100%" :aspect-ratio="8/10" :auto="true" :loop="true" dots-class="pront" dots-position="center" @on-index-change="prizeChange">
      <swiper-item class="swiper-demo-img" v-for="(item, index) in newArr" :key="index"><img style="width:100%;height: 100%" :src="item.imageUrl"></swiper-item>
    </swiper>
    <div class="title">{{title}}</div>
    <div class="issueNumber">期号：{{number}}</div>
    <div class="rangeBox">
        <x-progress :percent="bili" :show-cancel="false"></x-progress>
    </div>
    <div class="rangeNum">
      <span class="startRange">已参与人数:{{currentPersonTime}}</span>
      <span class="endRange">总需人数:{{personTime}}</span>
    </div>
    <div @click="chouJiang()" class="lotteryBtn">参与0元抽取</div>
    <div class="lotteryText">{{description}}</div>
    <div class="line">&nbsp;</div>
    <div class="modal" v-show="bg">
      <img class="bbbbb" src="http://123.56.12.92/images/lingqu.png"/>
      <p class="activeName">花费<span style="color:#FF5500">30金币</span>即可参与此活动</p>
      <p class="activeGold">当前金币:<span class="liang">{{amount}}个</span></p>
      <span class="activeNo" @click="noBtn()">不要</span>
      <span class="activeYes" @click="yesBtn()">确定</span>
    </div>
    <div class="modal" v-show="bg1">
      <img class="bbbbb" src="http://123.56.12.92/images/lingqu.png"/>
      <p class="activeName">金币账户余额:{{amount}}</p>
      <p class="activeGold1">客官,金币账户余额不足,赶快补充金币吧!</p>
      <span class="activeNo" @click="noBtn()">暂时不了</span>
      <span class="activeYes" @click="goBtn()">去赚金币</span>
    </div>
    <div class="modal" v-show="bg2">
      <img class="bbb" src="http://123.56.12.92/images/hongbb.png"/>
      <p class="zhong1">参于成功!</p>
      <p class="zhong2">恭喜您获得瓜分奖品的资格</p>
      <div class="zhong3">
        <p class="zhong4">您的幸运号码</p>
        <p class="zhong5">{{luckNum}}</p>
      </div>
      <p class="zhong6">开奖后凭此号码兑奖</p>
      <p @click="closeBB()" class="closeBtn">知道了</p>
    </div>
    <div class="tabBox">
      <router-link @click.native="index(0)" :class="activeIndex==0?'active':''" class="productDetail" to="productDetail" tag="li">产品介绍</router-link>
      <router-link @click.native="index(1)" :class="activeIndex==1?'active':''" class="partRecord" to="partRecord" tag="li">参与记录</router-link>
      <router-link @click.native="index(2)" :class="activeIndex==2?'active':''" class="winRecord" to="winRecord" tag="li">获奖记录</router-link>
    </div>
    <div class="darkLine">&nbsp;</div>
    <router-view/>
  </div>
</template>

<script>
  import axios from 'axios'
  import {ToastPlugin,Toast,Swiper,XProgress,SwiperItem} from 'vux'
  function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
  }
  export default {
    data() {
      return {
        prizeIndex: '',
        activeIndex:0,
        newArr:[],
        title:'',
        number:'',
        personTime:'',
        currentPersonTime:'',
        bili:0,
        description:'',
        bg:false,
        bg1:false,
        bg2:false,
        luckNum:'',
      }
    },
    methods: {
      index(data) {
        console.log(data);
        this.activeIndex=data;
      },
      prizeChange() {
      },
      ddd(){
        axios({
          method:"POST",
          url:"http://"+this.baseUrl+"/flowPool/api/prizes/LuckDraw",
          headers:{
            'Content-Type':'application/x-www-form-urlencoded',
            'token': localStorage.token
          },
          params:{
            prizesId:this.id
          },
        }).then((res)=>{
          if(res.data.msgCd=='ZYCASH-200'){
            this.luckNum=res.data.body;
            this.bg=false;
            this.bg2=true;
            this.getInfo(this.id);
          }else if(res.data.msgCd=='ZYCASH-1009'){
            this.sendMsg(res.data.msgInfo);
          }
          else {
            this.sendMsg(res.data.msgInfo);
          }
        })
      },
      getInfo(id){
        axios({
          method:"POST",
          url:"http://"+this.baseUrl+"/flowPool/api/prizes/getPrizesInfo",
          headers:{
            'Content-Type':'application/x-www-form-urlencoded',
            'token': localStorage.token
          },
          params:{
            prizesId:id
          },
        }).then((res)=>{
          if(res.data.msgCd=='ZYCASH-200'){
            let listImg=res.data.body.files;
            this.title=res.data.body.title;
            this.number=res.data.body.number;
            this.description=res.data.body.description;
            this.personTime=res.data.body.personTime;
            this.currentPersonTime=res.data.body.currentPersonTime;
            this.bili=parseInt((this.currentPersonTime/this.personTime)*100);
            localStorage.icon=res.data.body.icon;
            this.newArr = listImg.filter(item => item.type==0);
            this.newArr1 = listImg.filter(item => item.type==1);
          }else if(res.data.msgCd=='ZYCASH-1009'){
          }
          else {
          }
        })
      },
      chouJiang(id){
        axios({
          method:"POST",
          url:"http://"+this.baseUrl+"/flowPool/api/goldCoin/getAccount",
          headers:{
            'Content-Type':'application/x-www-form-urlencoded',
            'token': localStorage.token
          },
        }).then((res)=>{
          if(res.data.msgCd=='ZYCASH-200'){
            let amount=res.data.body;
            this.amount=amount;
            if(amount>=30){
              this.bg=true;
            }else {
              this.bg1=true;
            }
          }else if(res.data.msgCd=='ZYCASH-8012'){
            this.bg1=true;
          }
          else {
          }
        });
      },
      yesBtn(){
        this.ddd();
      },
      noBtn(){
        this.bg=false;
        this.bg1=false;
      },
      goBtn(){
        this.sendMsg("signIn");
      },
      getToken(data){
        localStorage.token=data;
      },
      //发送信息
      sendMsg(data){
        let ua = navigator.userAgent.toLowerCase();
        //Android终端
        let isAndroid = ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1;
        //Ios终端
        let isiOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
        if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
          alert(data);
          //Ios
        } else if (/(Android)/i.test(navigator.userAgent)) {
          //Android终端
          window.control.signIn(data);
        }
      },
      //关闭
      closeBB(){
        this.bg2=false
      },
    },
    mounted() {
      var id=getQueryString("id");
      this.id=id;
      localStorage.id=id;
      this.getInfo(this.id);
      window.getToken = this.getToken;
    },
    components: {
      Toast,
      Swiper,
      XProgress,
      SwiperItem,
    }
  }
</script>

<style>
  .content .vux-slider > .pront > a > .vux-icon-dot{
    display: inline-block;
    vertical-align: middle;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    border: 1px solid #FF5548;
  }
  .content .vux-slider > .pront > a > .vux-icon-dot.active{
    display: inline-block;
    vertical-align: middle;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    border: 1px solid #FF5548;
    background-color: #FF5548;
  }
  .content .title{
    width: 660px;
    height: 34px;
    line-height: 34px;
    text-align: left;
    color: #333333;
    font-size: 32px;
    font-weight: bold;
    margin-top: 30px;
    margin-left: 28px;
  }
  .content .issueNumber{
    width: 406px;
    height: 26px;
    font-size: 28px;
    color: #999;
    margin-left: 28px;
    margin-top: 40px;
    text-align: left;
  }
  .content .rangeBox{
    width: 702px;
    height: 20px;
    margin-left: 28px;
    margin-top: 27px;
    text-align: center;
    border-radius:20px;
    -webkit-border-radius: 20px;
  }
  .content .rangeBox .weui-progress__bar{
    height: 20px;
    background-color: #FCC7C7;
    border-radius:20px;
    -webkit-border-radius: 20px;
  }
  .content .rangeBox .weui-progress__inner-bar{
    background-color: #F37369;
    border-radius:20px;
    -webkit-border-radius: 20px;
  }
  .content .rangeNum{
    width: 702px;
    height: 20px;
    margin-left: 28px;
    margin-top: 19px;
  }
  .content .rangeNum .startRange{
    display: inline-block;
    float: left;
    color: #333;
    font-size: 28px;
    font-weight: bold;
  }
  .content .rangeNum .endRange{
    display: inline-block;
    float: right;
    color: #333;
    font-size: 28px;
    font-weight: bold;
  }
  .content .lotteryBtn{
    width: 500px;
    height: 80px;
    line-height: 80px;
    margin: 0 auto;
    margin-top: 43px;
    background-color: #ff5548;
    color: #fff;
    font-size: 34px;
    font-weight: bold;
    border-radius: 10px;
    -webkit-border-radius: 10px;
  }
  .content .lotteryText{
    width: 632px;
    height: 28px;
    color: #999;
    font-size: 28px;
    margin-left: 24px;
    margin-top: 50px;
    text-align: left;
  }
  .content .line{
    width: 100%;
    height: 16px;
    background-color: #f2f2f2;
    margin-top: 30px;
    margin-bottom: 30px;
  }
  .content .liucheng{
    width: 702px;
    height: 179px;
    background: url("http://jmyq.wzgeek.com/images/liuCheng.jpg") no-repeat;
    background-size: contain;
    margin: 0 auto;
    margin-top: 30px;
  }
  .content .tabBox{
    width: 600px;
    margin-top: 49px;
    margin-left: 25px;
    text-align: left;
  }
  .content .tabBox .productDetail{
    display: inline-block;
    font-size:34px;
    font-weight:400;
    color:#666;
  }
  .content .tabBox .partRecord{
    display: inline-block;
    font-size:34px;
    font-weight:400;
    color:#666;
    margin-left: 34px;
  }
  .content .tabBox .winRecord{
    display: inline-block;
    font-size:34px;
    font-weight:400;
    color:#666;
    margin-left: 34px;
  }
  .content .tabBox .active{
    color:rgba(251,69,41,1);
  }
  .content .darkLine{
    width:702px;
    height:0.03rem;
    margin: 0 auto;
    margin-top: 34px;
    margin-bottom: 49px;
    background:#DCDCDC;
  }
  .modal {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: hidden;
    outline: 0;
    -webkit-overflow-scrolling: touch;
    background-color: rgb(0, 0, 0);
    filter: alpha(opacity=60);
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 9999;
  }
  .bbbbb{
    position: absolute;
    width: 580px;
    height: 520px;
    left: 50%;
    top:50%;
    margin-left: -290px;
    margin-top: -260px;
  }
  .bbb{
    position: absolute;
    width: 584px;
    height: 554px;
    left: 50%;
    top:50%;
    margin-left: -282px;
    margin-top: -277px;
  }
  .activeName{
    position: absolute;
    width: 580px;
    height: 34px;
    left: 50%;
    top:49%;
    margin-left: -290px;
    margin-top: -17px;
    font-size:36px;
    font-weight:500;
    color:rgba(0,0,0,1);
    letter-spacing: 1px;
  }
  .activeGold{
    position: absolute;
    width: 580px;
    height: 40px;
    left: 50%;
    top:54%;
    margin-left: -290px;
    margin-top: -20px;
    font-size:30px;
    font-weight:500;
    color:rgba(0,0,0,1);
  }
  .activeGold1{
    position: absolute;
    width: 360px;
    height: 40px;
    left: 50%;
    top:54%;
    margin-left: -180px;
    margin-top: -20px;
    font-size: 28px;
    font-weight:500;
    color:#666666;
  }
  .liang{
    color:#FF5500;
    font-size: 46px;
  }
  .activeNo{
    position: absolute;
    left: 58%;
    top: 62%;
    margin-left: -290px;
    margin-top: -20px;
    font-weight:500;
    color:#FB851E;
    width:210px;
    height:86px;
    line-height: 86px;
    border:2px solid rgba(252,138,35,1);
    border-radius:43px;
    font-size:38px;
    background-color: #fff;
  }
  .activeYes{
    position: absolute;
    left: 91%;
    top: 62%;
    margin-left: -290px;
    margin-top: -20px;
    font-size:38px;
    font-weight:500;
    color: rgb(255, 255, 255);
    width:210px;
    height:86px;
    line-height: 86px;
    border:2px solid rgba(252,138,35,1);
    border-radius:43px;
    background-color:#FB851E;
  }
  .zhong1{
    position: absolute;
    left:50%;
    top:49%;
    margin-left: -90px;
    margin-top: -17px;
    width:180px;
    height:33px;
    font-size:34px;
    font-weight:bold;
    letter-spacing: 2px;
    color:rgba(255,255,255,1);
    line-height:36px;
    text-align: right;
  }
  .zhong2{
    position: absolute;
    left:50%;
    top:52%;
    margin-left: -175px;
    margin-top: -10px;
    width:350px;
    height:21px;
    font-size:22px;
    font-weight:300;
    color:rgba(255,237,237,1);
    line-height:36px;
  }
  .zhong3{
    position: absolute;
    left:50%;
    top:59%;
    margin-left: -245px;
    margin-top: -54px;
    width: 509px;
    height: 109px;
    background: url("http://123.56.12.92/images/luckBox.png") no-repeat no-repeat;
    background-size: 509px 122px;
  }
  .zhong4{
    width: 200px;
    height: 24px;
    color: #F24632;
    margin: 0 auto;
    margin-top: 20px;
  }
  .zhong5{
    width: 350px;
    height: 24px;
    color: #666666;
    font-size:32px;
    font-weight:500;
    margin: 0 auto;
    margin-top: 16px;
  }
  .zhong6{
    position: absolute;
    left:50%;
    top:66%;
    margin-left: -150px;
    margin-top: -11px;
    width:300px;
    height:22px;
    font-size:24px;
    font-weight:400;
    color:rgba(255,255,255,1);
    line-height:36px;
  }
  .closeBtn{
    position: absolute;
    left: 50%;
    bottom: 10%;
    margin-left: -90px;
    width:180px;
    height:32px;
    font-size:34px;
    font-weight:bold;
    letter-spacing: 2px;
    color:rgba(255,255,255,1);
    line-height:32px;
  }
</style>
