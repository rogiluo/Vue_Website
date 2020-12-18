<template>
  <div class="app">
    <AppHeader fixed>
      <SidebarToggler class="d-lg-none" display="md" mobile />
      <SidebarToggler class="d-md-down-none" />
      <b-navbar-nav class="ml-auto"></b-navbar-nav>
    </AppHeader>
    <div class="app-body">
      <AppSidebar fixed>
        <SidebarNav :navItems="NavItems"></SidebarNav>
        <SidebarMinimizer />
      </AppSidebar>
      <main class="main">
        <Breadcrumb :list="list" />
        <div class="container-fluid">
          <router-view></router-view>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import {
  Header as AppHeader,
  SidebarToggler,
  Sidebar as AppSidebar,
  SidebarForm,
  SidebarMinimizer,
  SidebarNav,
  Breadcrumb
} from "@coreui/vue";

export default {
  components: {
    AppHeader,
    AppSidebar,
    Breadcrumb,
    SidebarForm,
    SidebarToggler,
    SidebarNav,
    SidebarMinimizer
  },
  data() {
    return {
      NavItems: [
        {
          name: "功能區",
          url: "/Function",
          icon: "icon-people",
          children: [
            {
              name: "範例功能",
              url: "/Function/Sample"
            }
          ]
        }
      ]
    };
  },
  created: function() {},
  computed: {
    list() {
      return this.$route.matched.filter(
        route => route.name || route.meta.label
      );
    }
  }
};
</script>