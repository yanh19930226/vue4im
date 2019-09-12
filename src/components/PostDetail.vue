<template>
  <div class="postdetail">
    <div class="list">
      <div class="list-item">
        <img class="avt" :src="userInfo.avt" />
        <div class="guanzhu">
          <p>
            <span>关注</span>
          </p>
        </div>
        <div class="content">
          <p class="user-name" v-text="userInfo.username"></p>
          <div class="imagecontainer">
            <p v-text="postdetail.title"></p>
            <div class="img-wrap">
              <img
                  v-for="(imageitem,index) in postdetail.imageList"
                  :src="imageitem.imgUrl"
                  :preview="postdetail.detailid"
                  :preview-text="postdetail.title"
                  :key="index"
                   class="list-img"
                />
            </div>
          </div>
          <div class="item-info">
            <div class="flex-item">
              <p class="address" v-text="postdetail.address"></p>
              <p class="time" v-text="postdetail.time"></p>
            </div>
          </div>
          <div class="pinlun">
            <div class="like">
              <img src="/static/images/dz.png" />范冰冰，柳岩
            </div>
            <div class="pinlun-list">
              <p>
                <span>宋承宪：</span>难道你不要我了?
              </p>
              <p>
                <span>刘亦菲</span>回复
                <span>宋承宪：</span>：我对
                <span></span>才是真爱。
              </p>
              <p>
                <span>柳岩：</span>不要脸，
                <span></span>是我的！
              </p>
              <p>
                <span>宋承宪：</span>难道你不要我了?
              </p>
              <p>
                <span>刘亦菲</span>回复
                <span>宋承宪：</span>：我对
                <span></span>才是真爱。
              </p>
              <p>
                <span>柳岩：</span>不要脸，
                <span></span>是我的！
              </p>
              <p>
                <span>宋承宪：</span>难道你不要我了?
              </p>
              <p>
                <span>刘亦菲</span>回复
                <span>宋承宪：</span>：我对
                <span></span>才是真爱。
              </p>
              <p>
                <span>柳岩：</span>不要脸，
                <span></span>是我的！
              </p>
              <p>
                <span>宋承宪：</span>难道你不要我了?
              </p>
              <p>
                <span>刘亦菲</span>回复
                <span>宋承宪：</span>：我对
                <span></span>才是真爱。
              </p>
              <p>
                <span>柳岩：</span>不要脸，
                <span></span>是我的！
              </p>
              <p>
                <span>宋承宪：</span>难道你不要我了?
              </p>
              <p>
                <span>刘亦菲</span>回复
                <span>宋承宪：</span>：我对
                <span></span>才是真爱。
              </p>
              <p>
                <span>柳岩：</span>不要脸，
                <span></span>是我的！
              </p>
              <p>
                <span>宋承宪：</span>难道你不要我了?
              </p>
              <p>
                <span>刘亦菲</span>回复
                <span>宋承宪：</span>：我对
                <span></span>才是真爱。
              </p>
              <p>
                <span>柳岩：</span>不要脸，
                <span></span>是我的！
              </p>
              <p>
                <span>宋承宪：</span>难道你不要我了?
              </p>
              <p>
                <span>刘亦菲</span>回复
                <span>宋承宪：</span>：我对
                <span></span>才是真爱。
              </p>
              <p>
                <span>柳岩：</span>不要脸，
                <span></span>是我的！
              </p>
              <p>
                <span>宋承宪：</span>难道你不要我了?
              </p>
              <p>
                <span>刘亦菲</span>回复
                <span>宋承宪：</span>：我对
                <span></span>才是真爱。
              </p>
              <p>
                <span>柳岩：</span>不要脸，
                <span></span>是我的！
              </p>
              <p>
                <span>宋承宪：</span>难道你不要我了?
              </p>
              <p>
                <span>刘亦菲</span>回复
                <span>宋承宪：</span>：我对
                <span></span>才是真爱。
              </p>
              <p>
                <span>柳岩：</span>不要脸，
                <span></span>是我的！
              </p>
              <p>
                <span>宋承宪：</span>难道你不要我了?
              </p>
              <p>
                <span>刘亦菲</span>回复
                <span>宋承宪：</span>：我对
                <span></span>才是真爱。
              </p>
              <p>
                <span>柳岩：</span>不要脸，
                <span></span>是我的！
              </p>
              <p>
                <span>宋承宪：</span>难道你不要我了?
              </p>
              <p>
                <span>刘亦菲</span>回复
                <span>宋承宪：</span>：我对
                <span></span>才是真爱。
              </p>
              <p>
                <span>柳岩：</span>不要脸，
                <span></span>是我的！
              </p>
              <p>
                <span>宋承宪：</span>难道你不要我了?
              </p>
              <p>
                <span>刘亦菲</span>回复
                <span>宋承宪：</span>：我对
                <span></span>才是真爱。
              </p>
              <p>
                <span>柳岩：</span>不要脸，
                <span></span>是我的！
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userInfo: "",
      postdetail: ""
    };
  },
  mounted() {
    this.fetchUserInfo();
    this.fetchdata(this.$route.params.id);
    this.$previewRefresh()
  },
  methods: {
    fetchUserInfo() {
      var _this = this;
      this.$http
        .get("/static/data/userInfo.json")
        .then(function(res) {
          _this.userInfo = res.data;
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    fetchdata(id) {
      var _this = this;
      this.$http
        .get("/static/data/postdetail.json")
        .then(function(res) {
          let index = parseInt(id) - 1;
          _this.postdetail = res.data[index];
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  },
  watch: {},
  components: {}
};
</script>

<style>
.postdetail .list .list-item .content .imagecontainer .img-wrap {
  justify-content: flex-start;
}
.postdetail .list .list-item .content .imagecontainer p {
  font-size: 0.9rem;
}
</style>
