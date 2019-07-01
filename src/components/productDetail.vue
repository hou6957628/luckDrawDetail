<template>
    <div id="detail">
      <p class="ruleText">抽中规则及玩法</p>
      <ul class="ruleDetail">
        <li v-for="item in arr">{{item}}</li>
      </ul>
      <p class="ruleText">产品图片说明</p>
      <div class="proImg">
        <ul>
          <li v-for="item in newArr1"><img class="imageSize" :src="item.imageUrl"/></li>
        </ul>
      </div>
    </div>
</template>

<script>
  import axios from 'axios'
    export default {
      data() {
        return {
          arr:[],
          newArr1:[],
          list:"1、每次参与每个用户都会获得1个十位数字的号码,2、系统会根据参与者生成的随机数的即为中奖者,3、凡是中奖用户我们都会在活动"
        }
      },
      methods: {
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
              // this.arr=res.data.body.description.split('，');
              this.arr=res.data.body.files[0].description.split('，');
              this.newArr1 = listImg.filter(item => item.type==1)
              // this.$message({
              //   message: '添加成功',
              //   type: 'success'
              // });
            }else if(res.data.msgCd=='ZYCASH-1009'){
              // this.$message.error(res.data.msgInfo);
            }
            else {
              // this.$message.error(res)
            }
          })
        },
      },
      mounted() {
        this.getInfo(localStorage.id);
      }
    }
</script>

<style scoped>
  #detail .ruleText{
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
  #detail .ruleDetail{
    text-align: left;
    margin-left: 25px;
    line-height: 60px;
    font-size:30px;
    font-weight:400;
    color:rgba(51,51,51,1);
  }
  #detail .proImg{

  }
  #detail .proImg .imageSize{
    width: 100%;
    height: auto;
  }

</style>
