<template>
  <div>
    <div class="managerPanel">
      <h1>#eir Manager System</h1>

      <el-row class="buttonRow">
        <el-button>New Page Url Binding</el-button>
        <el-button type="primary" @click.native="activateMeOnClick()">Activate My Account</el-button>
        <div class="curAccountBox" 
            v-show="curActivatedUsername != ''">Current Activated Account:
          <font style="color: limegreen" >{{ curActivatedUsername }}</font>
        </div>
        <div class="curAccountBox" 
            v-show="curActivatedUsername == ''">No User Activated
        </div>
      </el-row>

    </div>

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
</style>
<script src="../controller/eir_manager.js"></script>