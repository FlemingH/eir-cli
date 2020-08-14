<template>
  <div>

    <el-container>
      <el-header></el-header>
      <el-container>
        <el-aside>

          <el-menu>

            <el-menu-item :index="key.toString()" v-for="(page, key) in curActivatedUserPage" v-bind:key="key"
                          @click="sideBarItemOnClick(key)">
              <span slot="title">{{ page.urlName }}</span>
            </el-menu-item>

          </el-menu>

        </el-aside>
        <el-main>Main</el-main>
      </el-container>
    </el-container>

  </div>
</template>
<style scoped>
</style>
<script src="../controller/eir_root.js"></script>