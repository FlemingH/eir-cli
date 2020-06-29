<template>
  <div>
    <div class="managerPanel">
      <h1>#eir Manager System</h1>

      <el-row class="buttonRow">
        <el-button @click.native="newBindingOnClick()">New My Page Url Binding</el-button>
        <el-button type="primary" @click.native="activateMeOnClick()">Activate My Account</el-button>
        <div class="curAccountBox" 
            v-show="curActivatedUsername != ''">Current Activated Account:
          <font style="color: limegreen" >{{ curActivatedUsername }}</font>
        </div>
        <div class="curAccountBox" 
            v-show="curActivatedUsername == ''">No User Activated
        </div>
      </el-row>

      <el-table
        empty-text="No Url Binding"
        class="urlTable"
        :data="urlData"
        style="width: 100%">
        <el-table-column
          prop="urlName"
          label="Url Name"
          width="300">
        </el-table-column>
        <el-table-column
          prop="url"
          label="Url"
          width="550">
        </el-table-column>
        <el-table-column 
          label="Operation"
          width="150">
          <template slot-scope="scope">
            <i class="el-icon-delete urlOperaIcon" @click="urlDeleteOnClick(scope.row)"></i>
            <i class="el-icon-edit urlOperaIcon" @click="urlUpdateOnClick(scope.row, scope.$index)"></i>
            <i class="el-icon-switch-button urlOperaIcon" v-show="scope.row.enable == true"
              @click="urlDisableOnClick(scope.$index)"></i>
            <i class="el-icon-video-play urlOperaIcon" v-show="scope.row.enable == false"
              @click="urlEnableOnClick(scope.$index)"></i>
          </template>
        </el-table-column>
      </el-table>

    </div>

    <el-dialog :title="createOrUpdate==0? 'Create Url':'Update Url'" :visible.sync="showUrlDialog" width="600px">
      <el-form>

        <div class="inputBox">
          <el-input v-model="urlNameInputValue" placeholder="Url Name"></el-input>
        </div>

        <div class="inputBox">
          <el-input v-model="urlInputValue" placeholder="Url"></el-input>
        </div>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showUrlDialog = false">Cancel</el-button>
        <el-button type="primary" @click="confirmUpdateUrl()">Confirm</el-button>
      </div>
    </el-dialog>

  </div>
</template>
<style scoped>
  .managerPanel {
    width: 1000px;
    margin: 4% auto;
  }
  .buttonRow {
    height: 42px;
    margin-top: 30px;
  }
  .curAccountBox {
    line-height: 42px;
    margin-right: 50px;
    float: right;
  }
  .urlTable {
    margin-top: 40px;
  }
  .inputBox {
    height: 60px;
  }
  .urlOperaIcon {
    margin-right: 18px;
  }
  .urlOperaIcon:hover {
    cursor: pointer;
  }
</style>
<script src="../controller/eir_manager.js"></script>