<template>
  <div class="friendscircle">
    <div class="header-tab">
      <div
        class="tab-item"
        v-bind:class="{'tab-itemactived': type==='zx'}"
        v-on:click="selectType('zx')"
      >最新</div>
      <div
        class="tab-item"
        v-bind:class="{'tab-itemactived': type==='zr'}"
        v-on:click="selectType('zr')"
      >最热</div>
      <div
        class="tab-item"
        v-bind:class="{'tab-itemactived': type==='gz'}"
        v-on:click="selectType('gz')"
      >关注</div>
      <div class="tab-item">
        <router-link to="/publish" tag="div" class="tab-spa">
           <div class="tab-txt">发表</div>
        </router-link>
      </div>
    </div>
    <div class="list">
      <scroller :on-refresh="refresh" :on-infinite="infinite" ref="myscroller">
        <div class="list-item" v-for="(item,index) in myPostInfo" :key="index">
          <img class="avt" :src="userInfo.avt" />
          <div class="guanzhu">
            <p>
              <span>关注</span>
            </p>
          </div>
          <div class="content">
            <p class="user-name" v-text="userInfo.username"></p>
            <div class="imagecontainer">
              <p v-text="item.title"></p>
              <div class="img-wrap">
                <img
                  class="list-img"
                  :src="imageitem.imgUrl"
                  :preview="item.contentId"
                  :preview-text="item.title"
                  v-for="(imageitem,index) in item.imageList"
                  :key="index"
                />
              </div>
            </div>
            <div class="item-info">
              <div class="flex-item">
                <p class="address" v-text="item.address"></p>
                <p class="time" v-text="item.time"></p>
              </div>
              <div class="flex-item notime">
                <div class="c-iconcontent c-iconcontent-love" @click="handleDZ(item.contentId)">
                  <img style="height: 12px;" class="c-icon" src="/static/images/dz.png" />&nbsp;
                  <span v-text="item.dz"></span>
                </div>
                <router-link
                  :to="{path: '/postdetail/' + item.contentId}"
                  tag="div"
                  class="c-iconcontent"
                >
                  <img style="height: 12px;" class="c-icon" src="/static/images/ly.png" />&nbsp;
                  <span v-text="item.pinlun"></span>
                </router-link>
              </div>
            </div>
          </div>
        </div>
        <div style="clear:both"></div>
      </scroller>
    </div>
  </div>
</template>
<script>
require("../assets/css/friendscircle.css");
import Vue from "vue";
import VueScroller from "vue-scroller";
Vue.use(VueScroller);
export default {
  data() {
    return {
      userInfo: "",
      myPostInfo: [],
      type: "zx",
      pageIndex: 1,
      pageSize: 10,
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
        .get("/BaseUserDate/GetUserInfo", {
          params: {
            userId: "95e32357-d757-473e-8035-4b07869417ae"
          }
        })
        .then(function(res) {
          _this.userInfo = res.data.result[0];
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    fetchdata() {
      var _this = this;
      this.$http
        .get("/BaseUserNews/GetUserNewsList", {
          params: {
            pageIndex: _this.pageIndex,
            pageSize: _this.pageSize,
            order: 0
          }
        })
        .then(function(res) {
          if (!res) return;
          if ((_this.pageIndex = 1)) {
            _this.noData = true;
          }
          if (_this.pageIndex === 1) {
            _this.myPostInfo = res.data.result;
          } else {
            _this.myPostInfo = _this.myPostInfo.concat(res.data.result);
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
    //筛选
    selectType: function(type) {
      this.type = type;
      this.pageIndex = 1;
      this.pageSize = 3;
      this.fetchdata();
    },
    handleDZ(id) {
      alert("点赞" + id);
    },
    handlePost() {
      alert("发表");
    }
  },
  watch: {
    $route: function(to, from) {
      if (to.name === "FriendsCircle") {
        this.$menuFn.setTitle("动态");
      }
    }
  },
  components: {}
};
</script>
<style>
</style>

