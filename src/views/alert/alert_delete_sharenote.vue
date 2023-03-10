<template>
  <div class="modal fade in" id="modalBasic_7" tabindex="-1" role="dialog" aria-labelledby="modalBasicLabel" aria-hidden="false">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" @click="noShareNoteClose" aria-hidden="true">×</button>
          <h4 class="modal-title" id="modalBasicLabel_7">取消分享笔记</h4>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <p> 该笔记将<strong>取消分享</strong>，是否确认取消？</p>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default cancle" @click="noShareNoteClose" data-dismiss="modal">取 消</button>
          <button type="button" class="btn btn-primary sure" @click="noShareNote" id="sure_recyclenote">确 定</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  // import '../../../static/css/icon.css'
  import {getCookie} from '@/utils/support'
  export default {
    name: "noShareNoteAlert",
    data(){
      return {
        delShareNoteFrom:{
          cnShareId:''
        }
      }
    },
    methods:{
      noShareNote() {
        this.$store.dispatch('NoShareNote', this.delShareNoteFrom).then(response =>{
          //清空编辑器
          this.$parent.clearUeditor();
          //重新加载分享笔记列表
          this.$parent.shareNotes();
          this.$parent.alert('提示', response.msg);
          this.$parent.noShareNoteDialog=false;
        }).catch(() => {
          this.$parent.noShareNoteDialog=false;
          this.$parent.opacity_bg_show=false;//背景色隐藏
          this.$parent.alert('提示', '取消分享笔记失败');
        });
      },
      noShareNoteClose(){
        this.$parent.noShareNoteDialog=false;
        this.$parent.opacity_bg_show=false;//背景色隐藏
      }
    }
  }
</script>

<style scoped>

</style>
