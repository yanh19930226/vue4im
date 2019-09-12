<template>
  <div class="publish">
    <div class="publish-button">
      <button @click="publish()">发表</button>
    </div>
    <van-cell-group>
      <van-field v-model="message" type="textarea" placeholder="这一刻的想法......" rows="3" autosize />
    </van-cell-group>
    <van-uploader
      v-model="fileList"
      multiple
      :preview-image="true"
      :preview-full-image="true"
      :after-read="onRead"
      :capture="camera"
    />
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: "",
      message: "",
      fileList: [
        { url: "https://img.yzcdn.cn/vant/cat.jpeg" },
        { url: "https://img.yzcdn.cn/vant/cat.jpeg" },
        { url: "https://img.yzcdn.cn/vant/cat.jpeg" },
        { url: "https://img.yzcdn.cn/vant/cat.jpeg" },
        { url: "https://img.yzcdn.cn/vant/cat.jpeg" },
        { url: "https://img.yzcdn.cn/vant/cat.jpeg" }
      ]
    };
  },
  computed: {},
  mounted(){},
  methods: {
    publish() {
      var user = {};
      var _this = this;
      this.$http
        .post(
          "/publish",
          {
            userid: "95e32357-d757-473e-8035-4b07869417ae",
            message: _this.message,
            fileList: _this.fileList
          },
          {
            headers: {
              "Content-Type": "application/json" //设置请求头请求格式为JSON
            }
          }
        )
        .then(function(res) {
          //成功跳转到朋友圈
          this.$router.push({
            path: `/friendscircle`
          });
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    onRead(e) {
      let fd = new FormData();
      if (e && e.length) {
        e.forEach(item => {
          fd.append("files", item.file);
        });
      } else {
        fd.append("files", e.file);
      }
      var _this = this;
      this.$http
        .post("", fd)
        .then(function(res) {
          _this.fileList = [..._this.fileList, ...res.Result];
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    previewDelete() {
      alert("删除");
    },
    afterRead(file) {
      console.log(file);
    }
  },
  watch: {},
  components: {}
};
</script>
<style scoped>
.publish .publish-button {
  display: flex;
  justify-content: flex-end;
  padding: 0.5rem;
}
.publish .publish-button button {
  width: 61px;
  height: 29px;
  border: none;
  background-color: #1989fa;
  border-radius: 5px;
  color: #ffffff;
}

.con dl {
  margin: 0 0 1rem 0;
}
.con dl dd {
  margin: 0;
  padding: 1rem;
}
.con dl dd::after,
.con dl dd::before {
  clear: both;
  content: "";
  display: table;
}
.imagewrap {
  position: relative;
  display: block;
  float: left;
  background: #fff;
  width: 33.33333333333333333333333333333%;
  border-right: 1px solid #f5f5f5;
  border-bottom: 1px solid #f5f5f5;
  padding: 0.1rem 0.1rem 0.1rem 0.1rem;
  box-sizing: border-box;
  text-align: center;
}
.con dl dd img {
  width: 100%;
  height: 8rem;
  display: block;
  object-fit: cover;
}
img {
  border: 0;
  vertical-align: middle;
}
.con dl dd p {
  text-align: center;
}
.my-uploader__input {
  opacity: 0;
}

.van-uploader {
  position: relative;
  display: inline-block;
  padding-left: 5.4%;
}
</style>