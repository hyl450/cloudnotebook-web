<template>
    <div class="sig sig_in" tabindex='-1' id='zc' v-show="isShow">
      <dl>
        <dt>
          <div class='header'>
            <h3>修改密码</h3>
          </div>
        </dt>
        <dt></dt>
        <dt>
          <div class='letter'>
            原密码:&nbsp;<input type="text" name="" id="last_password" tabindex='1'/>
            <div class='warning' id='warning_1'><span>原始密码错误</span></div>
          </div>
        </dt>
        <dt>
          <div class='letter'>
            新密码:&nbsp;<input type="password" name="" id="new_password" tabindex='2'/>
            <div class='warning' id='warning_2'><span>新密码长度过短</span></div>
          </div>
        </dt>
        <dt>
          <div class='password'>
            确认新密码:&nbsp;<input type="password" name="" id="final_password" tabindex='3'/>
            <div class='warning' id='warning_3'><span>密码输入不一致</span></div>
          </div>
        </dt>
        <dt>
          <div>
            <input type="button" name="" id="changePassword" value='&nbsp;确&nbsp;定&nbsp;' tabindex='4'/>
            <input type="button" name="" id="back" value='&nbsp;关&nbsp;闭&nbsp;' tabindex='5' onclick="history.back();"/>
          </div>
        </dt>
      </dl>
    </div>
</template>

<script>
  // import "@/views/css/login.css"
  import {getCookie} from '@/utils/support'

  export default {
    name: "changePwdAlert",
    data(){
      return{
        isShow:false
      }
    }
  }
</script>

<style scoped>

</style>
