// import HelloWorld from './components/HelloWorld'
import FriendsCircle from './components/FriendsCircle.vue'
import MySpace from './components/MySpace.vue'
import PersonalInfo from './components/PersonalInfo.vue'
import PersonalInfoEdit from './components/PersonalInfoEdit.vue'
import PersonalPost from './components/PersonalPost.vue'
import PostDetail from './components/PostDetail.vue'
import VirtualList from './components/VirtualList.vue'
import Visited from './components/Visited.vue'
import ViewPanorama from './components/viewPanorama.vue'
import Media from './components/Media.vue'


import Message from './components/Message.vue'
import Guanzhu from './components/Guanzhu.vue'
import Certicate from './components/Certicate.vue'
import Suggest from './components/Suggest.vue'
import Pinlun from './components/Pinlun.vue'
import SysMessage from './components/SysMessage.vue'
import Sort from './components/Sort.vue'



import City from './components/City.vue'
import Test from './components/test.vue'

export default [
  // 到此一游
  {
    path: '/visited',
    component: Visited
  },
  // 朋友圈
  {
    path: '/friendscircle',
    component: FriendsCircle
  },
  // 我的动态
  {
    path: '/myspace',
    component: MySpace
  },
  // 个人信息
  {
    path: '/personaiInfo',
    component: PersonalInfo
  },
  // 个人信息编辑
  {
    path: '/personalinfoedit/:id',
    component: PersonalInfoEdit
  },
  // 虚拟游
  {
    path: '/virtuallist',
    component: VirtualList
  },
  // 动态详细
  {
    path: '/postdetail/:id',
    component: PostDetail,
    meta: { keepAlive: false }
  },
  {
    path: '/city',
    component: City,
    meta: { keepAlive: false }
  },
  // 虚拟游
  {
    path: '/media/:type/:id',
    component: Media,
    meta: { keepAlive: false }
  },
  // 我的动态
  {
    path: '/personalpost/:id',
    component: PersonalPost,
    // meta:{keepAlive: false}
  },
  // 我的证书
  {
    path: '/certicate/:id',
    component: Certicate,
    meta: { keepAlive: false }
  },
  // 我的评论
  {
    path: '/pinlun/:id',
    component: Pinlun,
    meta: { keepAlive: false }
  },
  // 我的关注
  {
    path: '/guanzhu/:id',
    component: Guanzhu,
    meta: { keepAlive: false }
  },
  // 我的消息
  {
    path: '/message/:id',
    component: Message,
    meta: { keepAlive: false }
  },
  // 意见反馈
  {
    path: '/suggest/:id',
    component: Suggest,
    meta: { keepAlive: false }
  },
  // 系统消息
  {
    path: '/sysMessage',
    component: SysMessage,
    meta: { keepAlive: false }
  },
  // 我的排行榜
  {
    path: '/sort',
    component: Sort,
    meta: { keepAlive: false }
  },
  // 全景视频
  {
    path: '/viewPanorama/:id',
    component: ViewPanorama
  },
  // 全景视频ViewPanorama
  {
    path: '/viewPanorama',
    name: '/viewPanorama',
    component: ViewPanorama
  },
  {
    path: '/',
    redirect: '/Visited'
  },
  {
    path: '*',
    redirect: '/Visited'
  }
]
