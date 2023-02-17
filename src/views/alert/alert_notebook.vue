<template>
  <div class="modal fade in" id="modalBasic" v-show="isShow" tabindex="-1" role="dialog" aria-labelledby="modalBasicLabel" aria-hidden="false" >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
          <h4 class="modal-title" id="modalBasicLabel">新建笔记本</h4>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label class="col-sm-3 control-label" style='margin-top:5px;'>笔记本名称</label>
            <div class="col-sm-8">
              <input type="text" class="form-control" v-model="createNoteBookForm.cnNotebookName" id="input_notebook">
            </div>
          </div>
        </div>
        <div class="modal-footer" style='margin-top:20px;'>
          <button type="button" class="btn btn-default cancle" data-dismiss="modal" @click="closeAlert">取 消</button>
          <button type="button" class="btn btn-primary sure" id="sure_addbook" @click="newbook">创 建</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {getCookie} from '@/utils/support';

  export default {
    name: "noteBookAlert",
    comments:{

    },
    data() {
      return {
        isShow:false,
        createNoteBookForm: {
          cnNotebookName:'',
          cnUserId:getCookie("userId")
        }
      }
    },
    //方法集合
    methods: {
      alert_init(){
        this.isShow=true;
      },
      newbook(){
        this.$store.dispatch('Newbook', this.createNoteBookForm).then(response => {
          console.log("Newbook_response:"+response.data);
          this.$parent.loadUserBooks();
        }).catch(() => {
          this.isShow=false;
          // $(".opacity_bg").hide();//背景色隐藏
          this.$parent.opacity_bg_show=false;//背景色隐藏
          return false
        })
        this.isShow=false;
        // alert('笔记本创建成功');
        this.$parent.alert('提示','笔记本创建成功');
      },
      closeAlert(){
        this.isShow=false;
        // $(".opacity_bg").hide();//背景色隐藏
        this.$parent.opacity_bg_show=false;//背景色隐藏
      }
    }
  }
</script>

<style scoped>

</style>
