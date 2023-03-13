<template>
  <div class="modal fade in" id="modalBasic_4" tabindex="-1" role="dialog" aria-labelledby="modalBasicLabel" aria-hidden="false">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-hidden="true" @click="renameBookClose">×</button>
          <h4 class="modal-title" id="modalBasicLabel_4">重命名笔记本</h4>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label class="col-sm-3 control-label" style='margin-top:5px;'>笔记本名称</label>
            <div class="col-sm-8">
              <input type="text" class="form-control" id="input_notebook_rename" v-model="renameBookForm.cnNotebookName">
            </div>
          </div>
        </div>
        <div class="modal-footer" style='margin-top:20px;'>
          <button type="button" class="btn btn-default cancle" data-dismiss="modal" @click="renameBookClose">取 消</button>
          <button type="button" class="btn btn-primary sure" id="sure_rename" @click="renameBook">确 定</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "bookRenameAlert",
    data() {
      return{
        renameBookForm:{
          cnNotebookId:'',
          cnNotebookName:''
        }
      }
    },
    methods: {
      renameBook(){
        this.$store.dispatch('RenameBook', this.renameBookForm).then(response => {
          //重新加载笔记本
          this.$parent.loadUserBooks();
          this.$parent.bookRenameDialog=false;
          this.$parent.alert('提示', response.msg);
          // this.$parent.opacity_bg_show=false;//背景色隐藏
        }).catch(() => {
        })
      },
      renameBookClose(){
        this.$parent.bookRenameDialog=false;
        this.$parent.opacity_bg_show=false;//背景色隐藏
      }
    }
  }
</script>

<style scoped>

</style>
