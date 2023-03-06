<template>
  <div tabindex="-1" role="dialog" class="modal fade in">
    <!--      <span class="cloudSpan">云笔记注册</span>-->
    <el-card class="pwdchg-form-layout">
      <button type="button" class="close" data-dismiss="modal" @click="back" aria-hidden="true">×</button>
      <h4 class="modal-title" id="modalBasicLabel_7">密码修改</h4>
      <el-form autoComplete="on"
               :model="chgPwdForm"
               :rules="chgPwdRules"
               ref="registerForm"
               label-position="left">
<!--        <el-form-item prop="cnUserName">-->
<!--          用户名-->
<!--          <el-input name="cnUserName"-->
<!--                    type="text"-->
<!--                    readonly="readonly"-->
<!--                    v-model="chgPwdForm.cnUserName"-->
<!--                    autoComplete="on"-->
<!--                    placeholder="用户名">-->
<!--              <span slot="prefix">-->
<!--                <svg-icon icon-class="user" class="color-main"></svg-icon>-->
<!--              </span>-->
<!--          </el-input>-->
<!--        </el-form-item>-->
        <el-form-item prop="cnUserPassword">
          原密码
          <el-input name="cnUserPassword"
                    :type="pwdType"
                    v-model="chgPwdForm.cnUserPassword"
                    autoComplete="on"
                    placeholder="密码">
              <span slot="prefix">
                <svg-icon icon-class="password" v-show="pwd_svg_icon" class="color-main"></svg-icon>
                <svg-icon icon-class="password-off" v-show="!pwd_svg_icon" class="color-main"></svg-icon>
              </span>
            <span slot="suffix" @click="showPwd">
                <svg-icon icon-class="eye" class="color-main"></svg-icon>
              </span>
          </el-input>
        </el-form-item>
        <el-form-item prop="confirmPassword">
          新密码
          <el-input name="confirmPassword"
                    :type="confirmPwdType"
                    v-model="chgPwdForm.confirmPassword"
                    autoComplete="on"
                    placeholder="新密码">
              <span slot="prefix">
                <svg-icon icon-class="password" v-show="confirm_pwd_svg_icon" class="color-main"></svg-icon>
                <svg-icon icon-class="password-off" v-show="!confirm_pwd_svg_icon" class="color-main"></svg-icon>
              </span>
            <span slot="suffix" @click="showConfirmPwd">
                <svg-icon icon-class="eye" class="color-main"></svg-icon>
              </span>
          </el-input>
        </el-form-item>
        <el-form-item style="margin-bottom: 60px;text-align: center">
          <el-button class="cloudBtn" style="width: 45%" type="primary" :loading="loading" @click.native.prevent="chgPwd">
            确定
          </el-button>
          <el-button class="cloudBtn" style="width: 45%" type="primary" @click.native.prevent="back">
            返回
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  // import "@/views/css/login.css"
  import {getCookie} from '@/utils/support'

  export default {
    name: "changePwdAlert",
    data(){
      const validateConfirmPass = (rule, value, callback) => {
        if (value.length < 6 || value.length > 20) {
          callback(new Error('确认密码位数6-20'))
        } else if (this.chgPwdForm.cnUserPassword == this.chgPwdForm.confirmPassword) {
          callback(new Error('新密码与原密码相同，请重新输入新密码'))
        } else {
          callback()
        }
      };
      return{
        loading:false,
        cnUserName:'',
        pwdType:'password',
        confirmPwdType:'password',
        pwd_svg_icon: true,
        confirm_pwd_svg_icon:true,
        chgPwdForm: {
          cnUserId: '',
          cnUserName: '',
          cnUserPassword: '',
          confirmPassword: ''
        },
        chgPwdRules: {
          confirmPassword: [{required: true, trigger: 'blur', validator: validateConfirmPass}]
        }
      }
    },
    methods:{
      showPwd() {
        if (this.pwdType === 'password') {
          this.pwdType = '';
          this.pwd_svg_icon = false;
        } else {
          this.pwdType = 'password';
          this.pwd_svg_icon = true;
        }
      },
      showConfirmPwd () {
        if (this.confirmPwdType === 'password') {
          this.confirmPwdType = '';
          this.confirm_pwd_svg_icon = false;
        } else {
          this.confirmPwdType = 'password';
          this.confirm_pwd_svg_icon = true;
        }
      },
      chgPwd(){
        this.loading = true;
        this.$store.dispatch('UpdatePassword', this.chgPwdForm).then(response => {
          this.loading = false;
          console.log("response.msg:"+response.msg);
          if(response.status == "0") {
            this.$parent.chgPwdDialog = false;
            this.$parent.alert('提示', '密码修改成功');
          } else {
            // this.$parent.chgPwdDialog = false;
            // alert(response.msg);
            //TODO
            this.$parent.alert('提示', response.msg, true);
          }
        }).catch(() => {
          this.loading = false;
        })
      },
      back(){
        this.$parent.chgPwdDialog=false;
        this.$parent.opacity_bg_show=false;//背景色隐藏
      }
    }
  }
</script>

<style scoped>
  .pwdchg-form-layout {
    position: absolute;
    left: 0;
    right: 0;
    width: 360px;
    height: 320px;
    margin: 140px auto;
  }
</style>
