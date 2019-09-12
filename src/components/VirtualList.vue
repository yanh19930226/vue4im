<template>
  <div class="virtual">
    <div style="height:40px;background-color: #fff;">
      <van-cell-group>
        <van-field
          v-model="keyword"
          type="keyword"
          label="搜索："
          right-icon="search"
          placeholder="请输入关键字..."
          @click-right-icon="fetchdata()"
        />
      </van-cell-group>
      <van-icon name="search" />
    </div>
    <div class="culture">
      <div
        class="culture-item"
        v-bind:class="{'culture-itemactived': selectedcultual===0}"
        v-on:click="selectType(0)"
      >不限</div>
      <div
        class="culture-item"
        v-bind:class="{'culture-itemactived': selectedcultual===item.id}"
        v-on:click="selectType(item.id)"
        v-for="(item,index) in cultuallist"
        :key="index"
      >{{item.cultualname}}</div>
    </div>
    <scroller :on-refresh="refresh" :on-infinite="infinite" ref="myscroller">
      <div class="list">
        <div
          class="virtual-item"
          v-for="(item,index) in virtuallist"
          :key="index"
          @click="virtualdetailpoup(item)"
        >
          <img :src="item.imgUrl" />
          <p v-text="item.virtualname"></p>
        </div>
      </div>
    </scroller>
    <van-dialog v-model="showDialog" :title="title" :close-on-click-overlay="true">
      <van-button type="info" size="small" round @click="view('720')">720全景</van-button>
      <van-button type="info" size="small" round @click="view('vr')">vr视频</van-button>
    </van-dialog>
  </div>
</template>
<script>
require("../assets/css/virtuallist.css");
export default {
  data() {
    return {
      mediaid: "",
      title: "",
      showDialog: false,
      keyword: "",
      pageIndex: 1,
      pageSize: 8,
      name: "",
      noData: false,
      selectedcultual: 0,
      cultuallist: [],
      virtuallist: []
    };
  },
  mounted() {
    this.fetchCultual();
    this.fetchdata();
  },
  methods: {
    fetchCultual() {
      var _this = this;
      this.$http
        .get("/BaseScenicType/GetScenicTypeList")
        .then(function(res) {
          _this.cultuallist = res.data.result;
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    fetchdata() {
      var _this = this;
      this.$http
        .get("/BaseScenic/GetScenicList", {
          params: {
            name: _this.keyword,
            pageIndex: _this.pageIndex,
            pageSize: _this.pageSize,
            selectedcultual: _this.selectedcultual
          }
        })
        .then(function(res) {
          if (res.data.success) {
            //if (!res) return;
            if (_this.pageIndex === 1) {
              _this.virtuallist = res.data.result;
            } else {
              if (res.data.result.length < _this.pageSize) {
                _this.noData = true;
              }
              _this.virtuallist = _this.virtuallist.concat(res.data.result);
            }
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
    selectType: function(id) {
      this.selectedcultual = id;
      this.pageIndex = 1;
      this.pageSize = 8;
      this.fetchdata();
    },
    //详细
    virtualdetailpoup(item) {
      this.title = item.virtualname;
      this.mediaid = item.id;
      this.showDialog = true;
    },
    view(type) {
      if (type === "vr") {
        this.$router.push({
          path: `/media/${type}/${this.mediaid}`
        });
      } else {
        // let url = "/viewPanorama?id=31515277";
        // window.location.href = url;
        this.$router.push({
          path: `/viewPanorama/${this.mediaid}`
        });
      }
    }
  },

  watch: {},
  components: {}
};
</script>

<style>
.van-dialog {
  width: 60%;
}
.van-dialog__header {
  padding: 1rem 0;
}
.van-radio-group {
  display: flex;
  justify-content: space-around;
}
.van-dialog__content {
  padding-bottom: 1.6rem;
  display: flex;
  justify-content: space-around;
}
.van-dialog__footer {
  display: none;
}
.van-field__label {
  -webkit-box-flex: 0;
  -webkit-flex: none;
  flex: none;
  width: 50px;
  padding-left: 30px;
}
</style>
