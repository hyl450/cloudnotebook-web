<template>
  <div class="animated fadeIn">
    <header class="header">
      <div class="header-brand">
        <a data-pjax=".content-body" href="/home">
          <img class="brand-logo" :src="stilearn_logo" alt="Stilearn Admin Sample Logo">
<!--          <img :src="stilearnlogo" class="brand-logo" alt="Stilearn Admin Sample Logo">-->
        </a>
      </div>
<!--      <div class="header-profile">-->
<!--        <div class="profile-nav">-->
<!--          <span class="profile-username"></span>-->
<!--          <a  class="dropdown-toggle" data-toggle="dropdown" @click="dropDownBtn">-->
<!--            <span class="fa fa-angle-down"></span>-->
<!--          </a>-->
<!--          <ul class="dropdown-menu animated flipInX pull-right" role="menu">-->
<!--            <li><a href="Change_password.html"><i class="fa fa-user"></i> 修改密码</a></li>-->
<!--            <li class="divider"></li>-->
<!--            <li><a id="logout" href="log_in.html" ><i class="fa fa-sign-out"></i> 退出登录</a></li>-->
<!--          </ul>-->
<!--        </div>-->
<!--      </div>-->

      <el-menu class="navbar" mode="horizontal">
<!--        <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>-->
        <el-dropdown class="avatar-container" trigger="click">
          <div class="avatar-wrapper">
<!--            <img class="user-avatar" :src="avatar">-->
            <i class="el-icon-caret-bottom"></i>
          </div>
          <el-dropdown-menu class="user-dropdown" slot="dropdown">
            <router-link class="inlineBlock" to="/">
              <el-dropdown-item>
                首页
              </el-dropdown-item>
            </router-link>
            <el-dropdown-item divided>
              <span @click="changePwd" style="display:block;">修改密码</span>
            </el-dropdown-item>
            <el-dropdown-item divided>
              <span @click="logout" style="display:block;">退出</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-menu>

      <form class="form-inline" onsubmit="return false;">
        <button type="button" class="btn btn-default btn-expand-search"><i class="fa fa-search"></i></button>
        <div class="toggle-search">
          <input type="text" class="form-control" placeholder="搜索笔记" id='search_note'>
          <button type="button" class="btn btn-default btn-collapse-search"><i class="fa fa-times"></i></button>
        </div>
      </form>
      <ul class="hidden-xs header-menu pull-right">
        <li>
          <a href="activity.html" target='_blank' title="笔记活动">活动</a>
        </li>
      </ul>
    </header>
    <div class="row" style='padding:0;' id='center'>
      <!-- alert_background-->
      <div class="opacity_bg" v-show="opacity_bg_show"></div>
      <!-- alert_notebook -->
      <div id="can"></div>
      <div class="col-xs-2" style='padding:0;' id='pc_part_1'>
        <!-- side-right -->
        <div class="pc_top_first">
          <h3>全部笔记本</h3>
          <button type="button" class="btn btn-default btn-xs btn_plus" id='add_notebook' @click="add_notebook()"><i class="fa fa-plus"></i></button>
        </div>
        <aside class="side-right" id='first_side_right'>
          <div class="module" data-toggle="niceScroll">
            <div class="chat-contact">
              <div class="contact-body">
                <ul id="book_ul" class="contacts-list">
                  <li v-for="(note, index) in cnNotebookList" :key="index" class="online">
                    <a @click="loadBookNotes(index)" v-bind:class="{ checked:index==notecurrent}">
                      <i class="fa fa-book" title="online" rel="tooltip-bottom"></i>
                      {{note.cnNotebookName}}
                      <button type="button" class="btn btn-default btn_position btn-xs btn_delete del_book" title="删除" @click="alertRecycleBook(index)">
                        <i class="fa fa-times"></i>
                      </button>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </aside>
        <div class="row clear_margin">
          <div class="col-xs-4 click" id='rollback_button' title='回收站'><i class='fa fa-trash-o' style='font-size:20px;line-height:31px;'></i></div>
          <div class="col-xs-4 click" id='like_button' title='收藏笔记本'><i class='fa fa-star' style='font-size:20px;line-height:31px;'></i></div>
          <div class="col-xs-4 click" id='action_button' title='参加活动笔记'><i class='fa fa-users' style='font-size:20px;line-height:30px;'></i></div>
        </div>
      </div>
      <!-- 全部笔记本 -->
      <!-- 全部笔记 -->
      <div class="col-xs-3" style='padding:0;' id='pc_part_2'>
        <div class="pc_top_second" id='notebookId'>
          <h3>全部笔记</h3>
          <button type="button" class="btn btn-default btn-xs btn_plus" id='add_note' @click="alertNewNote"><i class="fa fa-plus"></i></button>
        </div>
        <aside class="side-right" id='second_side_right'>
          <div class="module" data-toggle="niceScroll">
            <div class="chat-contact">
              <div class="contact-body">
                <ul id="note_ul" class="contacts-list">
                  <li class="online" v-for="(book,index) in cnBookNotesList" :key="index">
                    <a v-bind:class="{checked:index==bookcurrent}" @click="loadNote(index)" >
                      <i class="fa fa-file-text-o" title="online" rel="tooltip-bottom"></i>
                      {{book.cnNoteTitle}}
                      <i class="fa fa-star" style="font-size:20px;line-height:31px;"></i>
                      <button type="button" class="btn btn-default btn-xs btn_position btn_slide_down"
                              @mouseenter="onMouseOver" @mouseleave="onMouseOut"
                              @click="btnSlideDown">
                        <i class="fa fa-chevron-down"></i>
                      </button>
                    </a>
                    <div class="note_menu" tabindex='-1' v-show="noteMenuShow">
                      <dl>
                        <dt><button type="button" class="btn btn-default btn-xs btn_move" title='移动至...'><i class="fa fa-random"></i></button></dt>
                        <dt><button type="button" class="btn btn-default btn-xs btn_share" title='分享'><i class="fa fa-sitemap"></i></button></dt>
                        <dt><button type="button" class="btn btn-default btn-xs btn_delete" title='删除' @click="delNote"><i class="fa fa-times"></i></button></dt>
                      </dl>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </aside>
      </div>
      <!-- 全部笔记 -->
      <!-- 回收站笔记 -->
      <div class="col-xs-3" style='padding:0;display:none;' id='pc_part_4'>
        <div class="pc_top_second">
          <h3>回收站笔记</h3>
        </div>
        <aside class="side-right" id='four_side_right'>
          <div class="module" data-toggle="niceScroll">
            <div class="chat-contact">
              <div class="contact-body">
                <ul id="back_note_ul" class="contacts-list">
                  <li class="disable"><a ><i class="fa fa-file-text-o" title="online" rel="tooltip-bottom"></i> 虚假回收站笔记<button type="button" class="btn btn-default btn-xs btn_position btn_delete"><i class="fa fa-times"></i></button><button type="button" class="btn btn-default btn-xs btn_position_2 btn_replay"><i class="fa fa-reply"></i></button></a></li>
                </ul>
              </div>
            </div>
          </div>
        </aside>
      </div>
      <!-- 回收站笔记 -->
      <!-- 搜索笔记列表 -->
      <div class="col-xs-3" style='padding:0;display:none;' id='pc_part_6'>
        <div class="pc_top_second">
          <h3>搜索结果</h3>
        </div>
        <aside class="side-right" id='sixth_side_right'>
          <div class="module" data-toggle="niceScroll">
            <div class="chat-contact">
              <div class="contact-body">
                <ul id="share_ul" class="contacts-list">
                </ul>
              </div>
            </div>
            <div id='more_note'>更多...</div>
          </div>
        </aside>
      </div>
      <!-- 搜索笔记列表 -->
      <!-- 收藏笔记列表 -->
      <div class="col-xs-3" style='padding:0;display:none;' id='pc_part_7'>
        <div class="pc_top_second">
          <h3>已收藏笔记</h3>
        </div>
        <aside class="side-right" id='seventh_side_right'>
          <div class="module" data-toggle="niceScroll">
            <div class="chat-contact">
              <div class="contact-body">
                <ul class="contacts-list" id="collect_ul">
                  <li class="idle"><a ><i class="fa fa-file-text-o" title="online" rel="tooltip-bottom"></i> switch多分支结构<button type="button" class="btn btn-default btn-xs btn_position btn_delete"><i class="fa fa-times"></i></button></a></li>
                </ul>
              </div>
            </div>
          </div>
        </aside>
      </div>
      <!-- 收藏笔记列表 -->
      <!-- 参加活动的笔记列表 -->
      <div class="col-xs-3" style='padding:0;display:none;' id='pc_part_8'>
        <div class="pc_top_second">
          <h3>参加活动的笔记</h3>
        </div>
        <aside class="side-right" id='eighth_side_right'>
          <div class="module" data-toggle="niceScroll">
            <div class="chat-contact">
              <div class="contact-body">
                <ul class="contacts-list">
                  <!--li class="offline"><a ><i class="fa fa-file-text-o" title="online" rel="tooltip-bottom"></i> 样式用例（点击无效）</a></li-->
                </ul>
              </div>
            </div>
          </div>
        </aside>
      </div>
      <!-- 参加活动的笔记列表 -->
      <!-- 编辑笔记 -->
      <div class="col-sm-7" id='pc_part_3' style="height:486px;">
        <!-- side-right -->
        <div class="pc_top_third">
          <div class="row">
            <div class="col-xs-9">
              <h3>编辑笔记</h3>
            </div>
            <div id="button_save" class="col-xs-3">
              <button type="button" class="btn btn-block btn-sm btn-primary" @click="saveNote" id='save_note'>保存笔记</button>
            </div>
          </div>
        </div>
        <aside class="side-right" id='third_side_right'>
          <div class="module" data-toggle="niceScroll">
            <div class="chat-contact">
              <div class="contact-body clear_margin">
                <!--- 笔记标题 --->
                <div class="row" >
                  <div class="col-xs-8">
                    <input type="text" class="form-control" id="input_note_title" v-model="inputNoteTitle" placeholder='笔记标题...'>
                  </div>
                </div>
                <!--- 笔记标题 --->
                <div class="row">
                  <div class="col-sm-12">
                    <!--- 输入框 --->
                    <script type="text/plain" id="myEditor" style="width:100%;height:400px;">

                    </script>
                    <!--- 输入框 --->
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
      <!-- 编辑笔记 -->
      <!-- 预览笔记 -->
      <div class="col-sm-7" id='pc_part_5' style='display:none;' >
        <div class="pc_top_third">
          <div class="row">
            <div class="col-xs-9">
              <h3>预览笔记</h3>
            </div>
          </div>
        </div>
        <aside class="side-right" id='fifth_side_right'>
          <div class="module" data-toggle="niceScroll">
            <div class="chat-contact">
              <div class="contact-body clear_margin">
                <h4 id="noput_note_title"></h4>
                <p id="look_note_body">
                </p>
              </div>
            </div>
          </div>
        </aside>
      </div>
      <!-- 预览笔记 -->
    </div>
    <!-- 使用组件-->
<!--    <chgpwdDialog title="密码修改" v-if="openDialog" ref="chgpwdDialog"/>-->
    <noteBookAlert title="新建笔记本" v-if="bookOpenDialog" ref="noteBookAlert"/>
    <commonMsgAlert title="提示" v-if="commonMsgDialog" ref="commonMsgAlert"/>
    <deleteNotebookAlert title="删除笔记本" v-if="deleteBookDialog" ref="deleteNotebookAlert"/>
    <newNoteAlert title="新建笔记" v-if="newNoteDialog" ref="newNoteAlert"/>
    <deleteRollbackAlert title="新建笔记" v-if="rollbackDialog" ref="deleteRollbackAlert"/>
    <footer>
      <p>&copy; 2023 vue studying</p>
      <div style='position:absolute;top:5PX;height:30px;right:20px;line-height:26px;border:1px solid #0E7D76;display:none;background:#fff'>
        <strong style='color:#0E7D76;margin:0 10px;'></strong>
      </div>
    </footer>
  </div>
</template>

<script>
  //这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
  //例如：import 《组件名称》 from '《组件路径》';
  import stilearn_logo from '../../../static/images/dummy/8986f28e.stilearn-logo.png'
  import {setCookie,getCookie} from '@/utils/support'
  // 引用组件
  import noteBookAlert from "../alert/alert_notebook"
  import commonMsgAlert from "../alert/common_msg_alert"
  import deleteNotebookAlert from "../alert/alert_delete_notebook"
  import newNoteAlert from "../alert/alert_add_notebook"
  import deleteRollbackAlert from "../alert/alert_delete_rollback"

  import { mapGetters } from 'vuex'

  export default {
    //import引入的组件需要注入到对象中才能使用
    components: {
      noteBookAlert,
      commonMsgAlert,
      deleteNotebookAlert,
      newNoteAlert,
      deleteRollbackAlert
    },
    computed: {
      ...mapGetters([
        'sidebar'
      ])
    },
    data() {
      //这里存放数据
      return {
        stilearn_logo,
        notecurrent:-1,
        bookcurrent:-1,
        cnNotebookList:[],
        cnBookNotesList:[],
        editor: null,
        //笔记标题
        inputNoteTitle:'',
        //当前选中的笔记NoteId
        selectNoteId:'',
        bookOpenDialog:false,
        opacity_bg_show:false,
        commonMsgDialog:false,
        deleteBookDialog:false,
        newNoteDialog:false,
        rollbackDialog:false,
        //笔记菜单
        noteMenuShow:false,
        userBtnShow:false,
        saveNoteFrom:{
          cnNoteId:'',
          cnNoteTitle:'',
          cnNoteBody:''
        },
        loginOutFrom:{
          cnUserId:''
        }
      };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
      init() {
        this.editor=UM.getEditor('myEditor');
        this.set_height();
        var width=$('#third_side_right').width()-35;
        $('.edui-container,.edui-editor-body').width(width);
        $('#myEditor').width(width-20);
      },
      get_dom(e){
        return document.getElementById(e);
      },
      set_height(){
        var pc_height=window.innerHeight;
        pc_height=pc_height-132;
        this.get_dom('first_side_right').style.height=(pc_height-31)+'px';
        this.get_dom('second_side_right').style.height=pc_height+'px';
        this.get_dom('four_side_right').style.height=pc_height+'px';
        this.get_dom('sixth_side_right').style.height=pc_height+'px';
        this.get_dom('seventh_side_right').style.height=pc_height+'px';
        this.get_dom('eighth_side_right').style.height=pc_height+'px';
        this.get_dom('third_side_right').style.height=(pc_height-15)+'px';
        this.get_dom('fifth_side_right').style.height=(pc_height-15)+'px';
      },
      //加载用户笔记本列表
      loadUserBooks() {
        this.$store.dispatch('LoadUserBooks', getCookie("userId")).then(response => {
          this.cnNotebookList = response.data;
        }).catch(() => {
        })
      },
      //点击笔记本显示笔记列表(动态绑定)
      loadBookNotes(index) {
        this.notecurrent = index;
        var noteBookId = this.cnNotebookList[index].cnNotebookId;
        setCookie("cnNotebookId", noteBookId);
        //切换笔记本时，编辑器容易消失
        if(this.editor == null || this.editor == undefined) {
          this.editor=UM.getEditor('myEditor');
        }
        //将当前笔记本li设置为选中状态
        //去除笔记选中样式
        $("#note_ul li a").removeClass("checked");

        // TODO
        // $("#pc_part_3").show();//切换编辑笔记
        // $("#pc_part_5").hide();//隐藏预览笔记

        this.$store.dispatch('LoadBookNotes', noteBookId).then(response => {
          this.cnBookNotesList = response.data;
        }).catch(() => {
        })
        //点击其他笔记本时清空编辑区内容
        this.inputNoteTitle = '';
        this.saveNoteFrom.cnNoteId = '';
        this.editor.setContent("");
        this.selectNoteId = '';
      },
      //加载笔记内容
      loadNote(index){
        if(this.editor == null || this.editor == undefined) {
          this.editor=UM.getEditor('myEditor');
        }
        this.bookcurrent = index;
        var cnNoteId = this.cnBookNotesList[index].cnNoteId;
        setCookie("cnNoteId", cnNoteId);
        //切换笔记时，笔记菜单隐藏
        if(this.selectNoteId != '' && this.selectNoteId != cnNoteId) {
          this.noteMenuShow=false;
        }
        this.selectNoteId = cnNoteId;
        this.$store.dispatch('LoadNote', cnNoteId).then(response => {
          var note = response.data;
          this.inputNoteTitle=note.cnNoteTitle;
          this.saveNoteFrom.cnNoteId=note.cnNoteId;
          this.editor.setContent(note.cnNoteBody);
        }).catch(() => {
        })
      },
      //新建笔记本
      add_notebook(){
        // $(".opacity_bg").show();
        this.opacity_bg_show = true;//背景色div显示
        this.bookOpenDialog = true;
        this.$nextTick(() => {
          this.$refs.noteBookAlert.isShow=true;
        });
      },
      //删除笔记本
      alertRecycleBook(index){
        this.notecurrent = index;
        var noteBookId = this.cnNotebookList[index].cnNotebookId;
        setCookie("cnNotebookId", noteBookId);
        this.deleteBookDialog = true;
        this.opacity_bg_show = true;
        this.$nextTick(() => {
          this.$refs.deleteNotebookAlert.delBookFrom.cnNotebookId=noteBookId;
        })
      },
      //公共提示框
      alert(caption, msg) {
        this.commonMsgDialog = true;
        this.$nextTick(() => {
          this.$refs.commonMsgAlert.caption=caption;
          this.$refs.commonMsgAlert.msg=msg;
        });
      },
      //新建笔记
      alertNewNote(){
        var noteBookId = getCookie("cnNotebookId");
        console.log("alertNewNote_noteBookId:"+noteBookId);
        this.newNoteDialog = true;
        this.opacity_bg_show = true;//背景色div显示
        this.$nextTick(() => {
          this.$refs.newNoteAlert.newNoteFrom.cnNotebookId=noteBookId;
        })
      },
      //保存笔记
      saveNote(){
        //当未选笔记时，提示
        var $a = $("#note_ul li a.checked");//选择带有
        if($a.length == 0) {
          this.alert('警告', '请选择要保存的笔记');
          return;
        }
        var noteBody = this.editor.getContent();
        if(noteBody == ""){
          this.alert('警告', '笔记为空，不能保存');
          return;
        }
        this.saveNoteFrom.cnNoteTitle=this.inputNoteTitle;
        this.saveNoteFrom.cnNoteBody=noteBody;
        this.$store.dispatch('SaveNote',this.saveNoteFrom).then(response =>{
          this.opacity_bg_show = true;//背景色div显示
          this.alert('提示', '保存笔记成功');
        }).catch(() => {
        });
      },
      //删除笔记
      delNote(){
        this.rollbackDialog = true;
        this.opacity_bg_show = true;//背景色div显示
        this.$nextTick(() => {
          this.$refs.deleteRollbackAlert.delBackNoteFrom.cnNoteId=this.selectNoteId;
        })
      },
      showDropDown(){
        if (!this.userBtnShow) this.userBtnShow = true;
      },
      hideDropDown(e) {
        // e.pageY：鼠标指针相对页面的偏移量
        if (this.userBtnShow && e.pageY >= this.navTop) this.userBtnShow = false;
      },
      //笔记菜单鼠标移入
      onMouseOver(){
        // this.noteMenuShow=true;
        // this.slideDown(500);//显示菜单
      },
      //笔记菜单鼠标移出
      onMouseOut(){
        // this.noteMenuShow=false;
      },
      btnSlideDown(){
        // this.noteMenuShow=true;
        $("#note_ul").on("click",".btn_slide_down",function(){//e
          //将所有菜单隐藏
          $("#note_ul .note_menu").hide();
          //显示点击的笔记的菜单div
          var $li = $(this).parents("li");
          var $menu = $li.find(".note_menu");
          $menu.slideDown(500);//显示菜单
          //设置当前li选中模式
          $("#note_ul li a").removeClass("checked");
          $li.find("a").addClass("checked");
          return false;
        });
        //当鼠标在div菜单移动时保存显示状态
        $("#note_ul").on("mouseover",".note_menu",function(){
          $(this).show();
        });
        //当鼠标在div菜单移开时将菜单隐藏
        $("#note_ul").on("mouseout",".note_menu",function(){
          $(this).hide();
        });
        //点击body任意位置，隐藏弹出来的菜单
        $("body").click(function(){
          $("#note_ul .note_menu").hide();
        });
      },
      dropDownBtn(){
        this.userBtnShow = true;
      },
      changePwd(){
        this.opacity_bg_show = true;//背景色div显示
        this.alert('提示', '暂不支持密码修改');
      },
      logout(){
        this.loginOutFrom.cnUserId = getCookie("userId");
        this.$store.dispatch('Logout', this.loginOutFrom).then(response => {
          console.log("logout:"+response);
          if(response.status == "0") {
            this.$router.push({path: '/'});
          }
        }).catch(() => {
        })
        this.$router.push({path: '/'});
      }
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
      //加载用户笔记本列表
      this.loadUserBooks();
    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {
      this.init();
      if(!getCookie("userId") || getCookie("userId") === "") {
        this.$router.push({path: '/'});
        return;
      }
    },
    beforeCreate() {}, //生命周期 - 创建之前
    beforeMount() {}, //生命周期 - 挂载之前
    beforeUpdate() {}, //生命周期 - 更新之前
    updated() {}, //生命周期 - 更新之后
    beforeDestroy() {}, //生命周期 - 销毁之前
    destroyed() {
      // this.editor.destroy();
    }, //生命周期 - 销毁完成
    activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .navbar {
    position: relative;
    /*top:0px;*/
    /*right: 0px;*/
    /*height: 60px;*/
    /*width: 30px;*/
    float: right;
    width: 42px;
    height: 60px;
    line-height: 60px;
    background: #232332;
    border-color:#232332;
    border-radius: 0px !important;
    /*.hamburger-container {*/
    /*  line-height: 58px;*/
    /*  height: 50px;*/
    /*  float: left;*/
    /*  padding: 0 10px;*/
    /*}*/
    .screenfull {
      /*position: absolute;*/
      right: 90px;
      top: 16px;
      float: right;
      color: red;
    }
    .avatar-container {
      height: 50px;
      display: inline-block;
      position: absolute;
      right: 35px;
      .avatar-wrapper {
        cursor: pointer;
        margin-top: 5px;
        position: relative;
        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }
        .el-icon-caret-bottom {
          position: absolute;
          right: -25px;
          top: 18px;
          font-size: 15px;
        }
      }
    }
  }
</style>
