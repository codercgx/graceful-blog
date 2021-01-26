<template>
 <div class="myInfo">
           PROFILE
          </div>
</template>

<script>
  export default {
    name:'profile',
    props:{},
    data () {
      return {
        username:'',
        MyInfo:{},
        flag:false,
        modal1:false
      };
    },
    mounted() {
        
    },
    methods: {
       getInfo() {
        this.username = localStorage.getItem('username')
        if(this.username) {
           PostMessage('/user/getuserInfo',{token:this.username})
           .then(res => {
             if(res.data.err === 0) {
               this.MyInfo = res.data.Info[0]
             } else if(res.data.err === -999) {
               this.$Message.error('对不起,您的登录信息已过期请重新登陆。')
               localStorage.removeItem('username')
               setTimeout(() => {
                 location.reload()
               }, 1000);
             } else {
               this.$Message.error(res.data.message)
             }
           })
        }
      },
        handleSuccess(response) {
     console.log(response.url);
        this.MyInfo.uploadimg = response.url
      },
      updateInfo() {
        /* 打开我们的编辑框框 */
        this.flag = !this.flag;
      },
      primaryInfo() {
        /* 更换长度不得大于8位数 */
        if(this.MyInfo.name.length > 12) return this.$Message.error('昵称长度不得大于8位');
        PostMessage('/user/primaryInfo',
        {token:this.username,Info:this.MyInfo.info,name:this.MyInfo.name,Imgsrc:this.MyInfo.uploadimg})
        .then(res => {
          if(res.data.err == 0) {
            this.flag=false
            this.$Message.success(res.data.message)
          } else {
            this.$Message.error(res.data.message)
          }
        })
      },
      ok() {
        localStorage.clear()
        this.myInfo = {}
        location.reload()
      },
      cancel() {
          this.$Message.success('不想退出可以多看看噢！(●ˇ∀ˇ●)')
        return
      }
    },
  }

</script>
<style lang="scss" scoped>

</style>