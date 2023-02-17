<template>
  <div>
    <!-- 登录 -->
    <div v-show="divVisible">
<!--      <span class="cloudSpan">云笔记登录</span>-->
      <el-card class="login-form-layout">
        <el-form autoComplete="on"
                 :model="loginForm"
                 :rules="loginRules"
                 ref="loginForm"
                 label-position="left">
          <el-form-item prop="name">
            用户名
            <el-input name="name"
                      type="text"
                      v-model="loginForm.name"
                      autoComplete="on"
                      placeholder="请输入用户名">
              <span slot="prefix">
                <svg-icon icon-class="user" class="color-main"></svg-icon>
              </span>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            密码
            <el-input name="password"
                      :type="pwdType"
                      @keyup.enter.native="handleLogin"
                      v-model="loginForm.password"
                      autoComplete="on"
                      placeholder="请输入密码">
              <span slot="prefix">
                <svg-icon icon-class="password" class="color-main"></svg-icon>
              </span>
                  <span slot="suffix" @click="showPwd">
                <svg-icon icon-class="eye" class="color-main"></svg-icon>
              </span>
            </el-input>
          </el-form-item>
          <el-form-item style="margin-bottom: 60px;text-align: center">
            <el-button class="cloudBtn" style="width: 45%" type="primary" :loading="loading" @click.native.prevent="handleLogin">
              登录
            </el-button>
            <el-button class="cloudBtn" style="width: 45%" type="primary" @click.native.prevent="handleTry">
              注册
            </el-button>
          </el-form-item>
        </el-form>
      </el-card>
      <commonMsgAlert title="提示" v-if="commonMsgDialog" ref="commonMsgAlert"/>
      <div class="opacity_bg" v-show="opacity_bg_show"></div>
    </div>
    <!-- 注册 -->
    <div v-show="!divVisible">
<!--      <span class="cloudSpan">云笔记注册</span>-->
      <el-card class="register-form-layout">
        <el-form autoComplete="on"
                 :model="registerForm"
                 :rules="registerRules"
                 ref="registerForm"
                 label-position="left">
          <el-form-item prop="cnUserName">
            用户名
            <el-input name="cnUserName"
                      type="text"
                      v-model="registerForm.cnUserName"
                      autoComplete="on"
                      placeholder="用户名">
              <span slot="prefix">
                <svg-icon icon-class="user" class="color-main"></svg-icon>
              </span>
            </el-input>
          </el-form-item>
          <el-form-item prop="cnUserNick">
            昵称
            <el-input name="cnUserNick"
                      type="text"
                      v-model="registerForm.cnUserNick"
                      autoComplete="on"
                      placeholder="昵称">
              <span slot="prefix">
                <svg-icon icon-class="user" class="color-main"></svg-icon>
              </span>
            </el-input>
          </el-form-item>
          <el-form-item prop="cnUserPassword">
            密码
            <el-input name="cnUserPassword"
                      :type="pwdType"
                      v-model="registerForm.cnUserPassword"
                      autoComplete="on"
                      placeholder="密码">
              <span slot="prefix">
                <svg-icon icon-class="password" class="color-main"></svg-icon>
              </span>
              <span slot="suffix" @click="showPwd">
                <svg-icon icon-class="eye" class="color-main"></svg-icon>
              </span>
            </el-input>
          </el-form-item>
          <el-form-item prop="confirmPassword">
            确认密码
            <el-input name="confirmPassword"
                      :type="pwdType"
                      v-model="registerForm.confirmPassword"
                      autoComplete="on"
                      placeholder="确认密码">
              <span slot="prefix">
                <svg-icon icon-class="password" class="color-main"></svg-icon>
              </span>
              <span slot="suffix" @click="showPwd">
                <svg-icon icon-class="eye" class="color-main"></svg-icon>
              </span>
            </el-input>
          </el-form-item>
          <el-form-item style="margin-bottom: 60px;text-align: center">
            <el-button class="cloudBtn" style="width: 45%" type="primary" :loading="loading" @click.native.prevent="register">
              注册
            </el-button>
            <el-button class="cloudBtn" style="width: 45%" type="primary" @click.native.prevent="back">
              返回
            </el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
  import {isvalidUsername} from '@/utils/validate';
  import {setSupport,getSupport,setCookie,getCookie} from '@/utils/support';
  import commonMsgAlert from "../alert/common_msg_alert"

  export default {
    name: "login",
    components:{
      commonMsgAlert
    },
    data() {
      const validateUsername = (rule, value, callback) => {
        if (!isvalidUsername(value)) {
          callback(new Error('请输入正确的用户名'))
        } else {
          callback()
        }
      };
      const validatePass = (rule, value, callback) => {
        if (value.length < 3) {
          callback(new Error('密码不能小于3位'))
        } else {
          callback()
        }
      };
      const validateNickName  = (rule, value, callback) => {
        if (!isvalidUsername(value)) {
          callback(new Error('请输入正确的昵称'))
        }else {
          callback()
        }
      };
      const validateConfirmPass = (rule, value, callback) => {
        if (value.length < 6 || value.length > 20) {
          callback(new Error('确认密码位数6-20'))
        } else if(this.registerForm.cnUserPassword != this.registerForm.confirmPassword) {
          callback(new Error('密码与确认密码不一致'));
        } else {
          callback()
        }
      };
      return {
        pwdType:'password',
        loading:false,
        divVisible:true,
        commonMsgDialog:false,
        opacity_bg_show:false,
        loginForm: {
          name: '',
          password: ''
        },
        registerForm: {
          cnUserName: '',
          cnUserNick: '',
          cnUserPassword: '',
          confirmPassword: ''
        },
        loginRules: {
          name: [{required: true, trigger: 'blur', validator: validateUsername}],
          password: [{required: true, trigger: 'blur', validator: validatePass}]
        },
        registerRules: {
          cnUserName: [{required: true, trigger: 'blur', validator: validateUsername}],
          cnUserNick: [{required: true, trigger: 'blur', validator: validateNickName}],
          cnUserPassword: [{required: true, trigger: 'blur', validator: validatePass}],
          confirmPassword: [{required: true, trigger: 'blur', validator: validateConfirmPass}]
        }
      }
    },
    methods: {
      showPwd() {
        if (this.pwdType === 'password') {
          this.pwdType = ''
        } else {
          this.pwdType = 'password'
        }
      },
      alert(caption, msg) {
        this.commonMsgDialog = true;
        this.opacity_bg_show = true;
        this.$nextTick(() => {
          this.$refs.commonMsgAlert.caption=caption;
          this.$refs.commonMsgAlert.msg=msg;
        });
      },
      handleLogin() {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.loading = true;
            this.$store.dispatch('Login', this.loginForm).then(response => {
              if(response.status == "0") {
                // this.alert('提示', response.msg);
                setCookie("username",this.loginForm.username,15);
                setCookie("password",this.loginForm.password,15);
                this.divVisible=false;
                this.loading = false;
                this.$router.push({path: '/home'});
              } else {
                this.alert('提示', response.msg);
                this.loading = false;
              }
            }).catch(() => {
              this.loading = false;
              alert("登录失败");
            })
          } else {
            console.log('参数验证不合法！');
            return false
          }
        })
      },
      handleTry(){
        this.divVisible=false;
      },
      register(){
        this.$refs.registerForm.validate(valid => {
          if (valid) {
            this.loading = true;
            this.$store.dispatch('Register', this.registerForm).then(response => {
              console.log('register:'+response.msg);
              this.alert('提示', response.msg);
              this.loading = false;
              this.divVisible=true;
            }).catch(() => {
              this.loading = false
            })
          } else {
            console.log('参数验证不合法！');
            return false
          }
        })
      },
      back(){
        this.divVisible=true;
      }
    },
    mounted() {

    }
  }
</script>

<style scoped>
  .login-form-layout {
    position: absolute;
    left: 0;
    right: 0;
    width: 360px;
    height: 330px;
    margin: 140px auto;
    border-top: 55px solid #13A89E;
  }

  .register-form-layout {
    position: absolute;
    left: 0;
    right: 0;
    width: 360px;
    height: 530px;
    margin: 140px auto;
    border-top: 55px solid #13A89E;
  }

  .cloudBtn {
    background-color:#13A89E;
    border-color:#13A89E;
  }

  h3{
    line-height:55px;
    font-family:'宋体';
    font-size:25px;
    font-weight:400;
    text-indent:1.5em;
  }

</style>
