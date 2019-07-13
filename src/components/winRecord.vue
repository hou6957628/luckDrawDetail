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
    <div v-if="name" class="address" @click="applyButtonAction()">
      <p class="nnd"><span class="nndName">{{name}}</span>&nbsp;&nbsp;&nbsp;<span class="nndPhone">{{phone}}</span></p>
      <p class="nnd"><span class="nndAddress">{{address}}</span></p>
    </div>
    <div v-if="!name" class="address" @click="applyButtonAction()">
      <span class="nndAddress">+ {{address}}</span>
    </div>
    <div @click="lin" class="lingPrize">领取奖品</div>
    <p class="ruleText">中奖展示</p>
    <div class="proImg">
      <span>恭喜您中奖</span>
      <img :src="priImg" class="proImage">
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  function getToken(data) {
    localStorage.token=data;
  }
  // var isMobile = {
  //   Android: function () {
  //     return navigator.userAgent.match(/Android/i) ? true : false;
  //   },
  //   iOS: function () {
  //     return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false;
  //   }
  // };
  // var handler = {
  //   callHander: function (json) {
  //     if (isMobile.iOS()) {
  //       window.webkit.messageHandlers.control.getAddress(JSON.stringify(json))
  //     }
  //     if (isMobile.Android()) {
  //       window.control.getAddress(JSON.stringify(json));
  //     }
  //   },
  // };


  export default {
    data() {
      return {
        name: localStorage.name,
        phone: localStorage.phone,
        address: localStorage.address||"添加收货地址",
        canData:[],
        priImg:'',
      }
    },
    methods: {
      // 收货人 手机号  地址
      getName(name) {
        this.name = name;
        localStorage.name=name;
      },
      getPhone(phone) {
        this.phone = phone;
        localStorage.phone=phone;
      },
      getAddressDetail(address) {
        this.address = address;
        localStorage.address=address;
      },
      index(data) {
        this.activeIndex=data;
      },
      prizeChange() {
      },
      lin(){
        axios({
          method:"POST",
          url:"http://"+this.baseUrl+"/flowPool/api/prizes/getPrzies",
          headers:{
            'Content-Type':'application/x-www-form-urlencoded',
            'token': localStorage.token
          },
          params:{
            prizesId:localStorage.id,
            address:this.address,
          },
        }).then((res)=>{
          if(res.data.msgCd=='ZYCASH-200'){
            this.sendMsg("领取成功!")
            this.getInfo(localStorage.id);
          }else if(res.data.msgCd=='ZYCASH-1009'){
            layer.open({
              content: res.data.msgInfo
              , skin: 'msg'
              , time: 2 //2秒后自动关闭
            });
          }
          else {
            layer.open({
              content: res.data.msgInfo
              , skin: 'msg'
              , time: 2 //2秒后自动关闭
            });
          }
        })
      },
      getInfo(id){
        axios({
          method:"POST",
          url:"http://"+this.baseUrl+"/flowPool/api/prizes/luckDrawRecord",
          headers:{
            'Content-Type':'application/x-www-form-urlencoded',
            'Authorization': localStorage.token
          },
          params:{
            prizesId:id,
            status:2,
          },
        }).then((res)=>{
          if(res.data.msgCd=='ZYCASH-200'){
            this.canData=res.data.body.list;
            this.priImg=localStorage.icon;
          }else if(res.data.msgCd=='ZYCASH-1009'){
          }
          else {
          }
        })
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
      applyButtonAction(){
        let ua = navigator.userAgent.toLowerCase();
        //Android终端
        let isAndroid = ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1;
 　     //Ios终端
        let isiOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
          if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
            alert("address");
            window.webkit.messageHandlers.messsageControl.postMessage("12212");
            //Ios
          } else if (/(Android)/i.test(navigator.userAgent)) {
            //Android终端
            window.control.getAddress("11111");
          }
      },
    },
    mounted() {
      window.getName = this.getName;
      window.getPhone = this.getPhone;
      window.getAddressDetail = this.getAddressDetail;
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
    flex-grow: 0;
  }
  #part .proImg{
    width: 640px;
    height: 380px;
    margin: 0 auto;
    margin-top: 30px;
    margin-bottom: 60px;
    background: url("http://xjl.qxykjz.com/images/jiangBg.png") no-repeat;
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
  #part .address{
    width:702px;
    height:120px;
    line-height: 120px;
    font-size: 32px;
    color: #292621;
    background:rgba(247,245,245,1);
    border-radius:10px;
    margin: 0 auto;
    margin-top: 50px;
    margin-bottom: 40px;
  }
  #part .lingPrize{
    width: 500px;
    height: 80px;
    margin: 0 auto;
    text-align: center;
    font-size:34px;
    font-weight:bold;
    color:rgba(255,255,255,1);
    line-height:80px;
    background-color: #FB4529;
    border-radius: 10px;
    -webkit-border-radius: 10px;
  }
  .nnd{
    text-align: left;
    text-indent: 15px;
    padding: 0;
    margin: 0;
    line-height: 60px;
  }
  .nnd .nndName{
    text-align: left;
    text-indent: 0;
    padding-top: 8px;
    display: inline-block;
  }
  .nnd .nndPhone{

  }
  .nnd .nndAddress{
    display: inline-block;
    width: 95%;
    overflow: hidden;/*内容超出后隐藏*/
    text-overflow: ellipsis;/* 超出内容显示为省略号*/
    white-space: nowrap;/*文本不进行换行*/
  }
</style>
