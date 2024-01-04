<template>
    <div>
      <div class="tabs_content">
        <el-tabs
          closable
          v-model="active"
          @contextmenu.prevent.native="openContextMenu($event)"
          type="editable-card"
          @tab-remove="removeTab"
          @tab-click="tabClick"
        >
          <el-tab-pane
            class="isActive"
            v-for="item in tabList"
            :key="item.name"
            :label="item.name"
            :name="item.path"
          >
          </el-tab-pane>
        </el-tabs>
      </div>
      <!-- 右键菜单 -->
      <ul
        v-show="contextMenu.isShow"
        :style="{ left: contextMenu.menuLeft + 'px', top: '100px' }"
        class="el-dropdown-menu el-popper"
        x-placement="bottom-end"
      >
        <li class="el-dropdown-menu__item" @click="closeRightTag">关闭右侧</li>
        <li class="el-dropdown-menu__item" @click="closeLeftTag">关闭左侧</li>
        <li class="el-dropdown-menu__item" @click="closeOtherTag">关闭其它</li>
        <li
          v-if="this.active == this.contextMenu.name"
          class="el-dropdown-menu__item"
          @click="refresh"
        >
          刷新页面
        </li>
        <div x-arrow="" class="popper__arrow" style="left: 44px"></div>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    name:"TabTager",
    data() {
      return {
        active: "/dashboard",
        tabList: [],
        // 右键的元素
        contextMenu: {
          name: "",
          menuLeft: 0,
          isShow: false,
          label: ""
        }
      };
    },
    watch: {
      $route() {
        this.getThisPage();
      }
    },
    created() {
      // 监听页面刷新
      window.addEventListener("beforeunload", e => {
        console.log(1111);
        console.log(this.active, this.tabList);
        localStorage.setItem(
          "tagInfo2",
          JSON.stringify({
            active: this.active,
            tabList: this.tabList
          })
        );
      });
      let tagInfo2 = localStorage.getItem("tagInfo2")
        ? JSON.parse(localStorage.getItem("tagInfo2"))
        : {
            active: "/dashboard",
            tabList: [
              {
                name: "首页",
                path: "/dashboard"
              }
            ]
          };
      console.log(tagInfo2);
      this.active = tagInfo2.active;
      this.tabList = tagInfo2.tabList;
    },
    mounted() {
      var that = this;
      document.addEventListener("click", function(e) {
        that.contextMenu.isShow = false;
      });
    },
    methods: {
      // 判断当前页
      getThisPage() {
        let currentPgae = this.$route,
          index = this.tabList.findIndex(tag => tag.path == currentPgae.path);
        if (index === -1) {
          this.tabList.push({
            name: this.$t("router." + currentPgae.name),
            path: currentPgae.path
          });
        }
        // 当前选择页
        this.active = currentPgae.path;
      },
      // 右键
      openContextMenu(e) {
        if (e.srcElement.id) {
          this.contextMenu.name = e.srcElement.id.substr(4);
          this.contextMenu.menuLeft = e.clientX - 45;
          this.contextMenu.isShow = true;
          this.contextMenu.label = e.srcElement.innerText;
        }
      },
      // 点击
      tabClick(tab) {
        console.log(tab);
        this.$router.push(tab.name);
        this.active = tab.name;
      },
      // 移除
      removeTab(targetPath) {
        let tabs = this.tabList;
        if (tabs.length <= 1) {
          this.$message.warning("这是最后一页, 不能在关闭了");
        } else {
          let activePath = this.active;
          if (activePath === targetPath) {
            tabs.forEach((tab, index) => {
              if (tab.path === targetPath) {
                let nextTab = tabs[index + 1] || tabs[index - 1];
                if (nextTab) {
                  activePath = nextTab.path;
                }
              }
            });
          }
          this.active = activePath;
          this.$router.push(activePath);
          this.tabList = tabs.filter(tab => tab.path !== targetPath);
        }
      },
      // 刷新
      refresh() {
        this.$router.go(0);
      },
      // 关闭右侧
      closeRightTag() {
        let currentPath = this.contextMenu.name,
          index = this.tabList.findIndex(tag => tag.path == currentPath);
        this.tabList.splice(index + 1, this.tabList.length - index);
        this.active = currentPath;
        this.$router.push(currentPath);
      },
      // 关闭左侧
      closeLeftTag() {
        let currentPath = this.contextMenu.name,
          index = this.tabList.findIndex(tag => tag.path == currentPath);
        this.tabList.splice(0, index);
        this.active = currentPath;
        this.$router.push(currentPath);
      },
      // 关闭其它
      closeOtherTag() {
        let currentPath = this.contextMenu.name,
          currentName = this.contextMenu.label;
        this.tabList = [
          {
            name: currentName,
            path: currentPath
          }
        ];
        this.active = currentPath;
        this.$router.push(currentPath);
      }
    }
  };
  </script>
  
  <style lang="less" scoped>
  .tabList-view-container {
    // height: 40px;
    width: 100%;
    background: #f0f2f5;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 8px;
  }
  .tabs_content {
    width: 100%;
    padding: 0 8px;
    box-sizing: border-box;
  }
  /deep/.el-tabs__header {
    margin: 0px;
  }
  /deep/.el-tabs--card > .el-tabs__header {
    border: 0px !important;
  }
  /deep/.el-tabs__nav {
    border: 0px !important;
  }
  /deep/.el-tabs__nav-wrap::after {
    height: 0px;
  }
  /deep/.el-tabs__item {
    margin-right: 4px;
    border-radius: 4px;
    height: 32px;
    line-height: 33px;
    background: #f7f7f8;
    border: 1px solid #e6e6e9;
    padding: 0 20px !important;
  }
  /deep/.el-tabs__item.is-active {
    background: #fff;
    border: 1px solid #fff;
    outline-color: #fff;
  }
  /deep/.el-tabs__item .el-icon-close {
    margin-left: 16px;
  }
  /deep/.el-tabs__nav-next,
  /deep/.el-tabs__nav-prev {
    line-height: 46px;
    width: 30px;
    text-align: center;
  }
  /deep/.el-tabs__nav-wrap.is-scrollable {
    padding: 0 30px;
  }
  </style>
  
  