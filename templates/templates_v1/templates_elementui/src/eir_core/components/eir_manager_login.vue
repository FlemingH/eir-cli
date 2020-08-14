<template>
  <div>
    <el-card class="loginCard">

      <div class="hBox">
        <h1 class="loginH1">#eir Manager System Login</h1>
        <h3 class="loginH2">Style by Element</h3>
      </div>

      <div class="inputBox">
        <el-input v-model="usernameInputValue" placeholder="username"></el-input>
      </div>
    
      <div class="inputBox">
        <el-input type="password" v-model="passwordInputValue" placeholder="password"></el-input>
      </div>

      <div class="buttonBox">
        <el-button @click="button1OnClick()" type="primary">{{ curPage == 1? 'Create User' : 'Login' }}</el-button>
        <el-button @click="button2OnClick()">{{ curPage == 0? 'Create User' : 'Login' }}  </el-button>
      </div>

    </el-card>
  </div>
</template>
<style scoped>
  .loginCard {
    width: 600px;
    height: 400px;
    margin: 10% auto;
  }
  .hBox {
    height: 85px;
    margin-bottom: 40px;
  }
  .loginH1 {
    margin: 0 auto;
    width: 450px;
  }
  .loginH2 {
    float: right;
    margin-top: 10px;
    margin-right: 75px;
  }
  .inputBox {
    margin: 20px auto;
    width: 400px;
  }
  .buttonBox {
    margin-top: 35px;
    width: 260px;
    float: right;
  }
</style>
<script src="../controller/eir_manager_login.js"></script>