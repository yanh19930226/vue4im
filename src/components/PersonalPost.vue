<template>
  <div class="personalpost">
    <div class="list">
      <scroller :on-refresh="refresh" :on-infinite="infinite" ref="myscroller">
        <header>
          <img class="bg" :src="userInfo.bg" />
          <p class="user-name" v-text="userInfo.username"></p>
          <img class="avt" :src="userInfo.avt" />
          <div class="guanzhu">
            <span>关注</span>
          </div>
        </header>
        <div
          :class="index==0?['list-item','first-item']:['list-item']"
          v-for="(item,index) in PostInfo"
          :key="index"
        >
          <div class="content">
            <p class="item-time" v-text="item.time"></p>
            <div class="imagecontainer">
              <p v-text="item.title"></p>
              <div class="img-wrap">
                <img
                  class="list-img"
                  :src="imageitem.imgUrl"
                  v-for="(imageitem,index) in item.imageList"
                  :preview="item.contentId"
                  :preview-text="item.title"
                  :key="index"
                />
              </div>
            </div>
            <div class="item-info">
              <div class="flex-item">
                <p class="address" v-text="item.address"></p>
              </div>
              <div class="flex-item notime">
                <div class="c-iconcontent c-iconcontent-love" @click="handleDZ(item.contentId)">
                  <img class="c-icon" src="/static/images/dz.png" />&nbsp;
                  <span v-text="item.dz"></span>
                </div>
                <router-link
                  :to="{path: '/postdetail/' + item.contentId}"
                  tag="div"
                  class="c-iconcontent"
                >
                  <img class="c-icon" src="/static/images/ly.png" />&nbsp;
                  <span v-text="item.pinlun"></span>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </scroller>
    </div>
  </div>
</template>
<script>
require("../assets/css/personalpost.css");
export default {
  data() {
    return {
      userInfo: "",
      PostInfo: [],
      pageIndex: 1,
      pageSize: 3,
      noData: false
    };
  },
  mounted() {
    this.fetchUserInfo();
    this.fetchdata();
  },
  methods: {
    fetchUserInfo() {
      var _this = this;
      this.$http
        .get("http://wisdom-scenic-api.whlyw.net/api/services/app/BaseUserDate/GetUserInfo?userId=95e32357-d757-473e-8035-4b07869417ae")
        .then(function(res) {
          _this.userInfo = res.result[0];
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    fetchdata() {
      var _this = this;
      this.$http
        .get("http://wisdom-scenic-api.whlyw.net/api/services/app/BaseUserNews/GetPersonalNewsList?userId=95e32357-d757-473e-8035-4b07869417ae&pageIndex="+_this.pageIndex+"&pageSize="+_this.pageSize+"&order=0")
        .then(function(res) {
          if (!res) return;
          if (_this.pageIndex ===1) {
            _this.noData = true;
          }
          if (_this.pageIndex === 1) {
            _this.PostInfo = res.data.result;
          } else {
            _this.PostInfo = _this.PostInfo.concat(res.data.result);
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    //下拉刷新
    refresh() {
      this.pageIndex = 1; //重置页数
      this.noData = false;
      setTimeout(
        function() {
          this.fetchdata();
          this.$refs.myscroller.finishPullToRefresh(); //刷新完毕关闭刷新的转圈圈
        }.bind(this),
        1700
      );
    },
    //上拉加载
    infinite(done) {
      if (this.noData) {
        this.$refs.myscroller.finishInfinite(true); //不让它加载，，显示“没有更多数据”，不然会一直转圈
      } else {
        setTimeout(() => {
          this.pageIndex++; //下拉一次页数+1
          this.fetchdata();
          done(); //进行下一次加载操作
        }, 1500);
      }
    },
    handleDZ(id) {
      alert("点赞" + id);
    }
  },
  watch: {},
  components: {}
};
</script>

<style>
</style>
