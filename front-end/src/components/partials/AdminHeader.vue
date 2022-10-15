<template>
  <!-- Page Header Start-->
  <div :class="!sidebar ? 'page-main-header open' : 'page-main-header '">
    <div class="main-header-right row">
      <div class="main-header-left d-lg-none">
        <div class="logo-wrapper">
          <router-link to="/dashboard">
            <h4 class="my-2 mx-5" style='fontSize: 1.6rem;'>EVALLEY</h4>
          </router-link>
        </div>
      </div>
      <div class="mobile-sidebar">
        <div class="media-body text-right switch-sm">
          <label class="switch"
            ><a @click="toggle_sidebar"
              ><i id="sidebar-toggle"
                ><feather type="align-left"></feather></i></a
          ></label>
        </div>
      </div>
      <div class="nav-right col">
        <ul class="nav-menus" :class="headerMenu?'open':''">
          <li>
            <form class="form-inline search-form">
              <div class="form-group">
                 <!-- <i data-feather="search"> </i> -->
                 <i class="search-icon" data-feather="search" @click="toggle_search()" 
                ><feather type="search"></feather></i
            >
                <input
                  class="form-control-plaintext" :class="opensearch?'open':''"
                  type="search"
                  placeholder="Search.."
                /><span class="d-sm-none mobile-search" @click="toggle_search()">
                 
                </span>
              </div>
            </form>
          </li>
          <li>
            <a class="text-dark" href="#!" @click="toggle_fullscreen()"
              ><i data-feather="maximize-2"
                ><feather :type="screen"></feather></i
            ></a>
          </li>
          <li class="onhover-dropdown">
            <div class="media align-items-center">
              <img
                class="align-self-center pull-right img-50 rounded-circle blur-up lazyloaded"
                src="../../assets/images/dashboard/man.png"
                alt="header-user"
              />
              <div class="dotted-animation">
                <span class="animate-circle"></span
                ><span class="main-circle"></span>
              </div>
            </div>
            <ul class="profile-dropdown onhover-show-div p-20 profile-dropdown-hover">
              <li>
                <router-link to="/edit-profile">
                <a><feather type="user"></feather>Edit Profile</a>
                </router-link> 
              </li>
              <li>
                <a><feather type="settings"></feather>Settings</a>
              </li>
              <li>
                <a @click="logout"><feather type="log-out"></feather><span>Log out</span></a>
              </li>
            </ul>
          </li>
        </ul>
        <div class="d-lg-none mobile-toggle pull-right" @click="openHeader()">
          <feather type="more-horizontal"></feather>
        </div>
      </div>
    </div>
  </div>
  <!-- Page Header Ends -->
</template>

<script>

export default {
  name: "AdminHeader",
  created() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
    this.resized = this.sidebar_toggle_var;
  },
  data() {
    return {
      chatSidebar: false,
      headerMenu:false,
      opensearch: false,
      typeScreen: 'maximize-2',
    };
  },
  computed: {
    sidebar() {
      return this.$store.state.menu.togglesidebar;
    },
    screen() {
      return this.typeScreen
    }
  },
  methods: {
    toggle_sidebar() {
      this.$store.dispatch("menu/opensidebar");
    },
    openHeader() {
        this.headerMenu = !this.headerMenu
    },
    toggle_search(){
      this.opensearch = !this.opensearch
    },
    toggle_fullscreen() {
      if (
        (document.fullScreenElement && document.fullScreenElement !== null) ||
        (!document.mozFullScreen && !document.webkitIsFullScreen)
      ) {
        if (document.documentElement.requestFullScreen) {
          document.documentElement.requestFullScreen();
        } else if (document.documentElement.mozRequestFullScreen) {
          document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullScreen) {
          document.documentElement.webkitRequestFullScreen(
            Element.ALLOW_KEYBOARD_INPUT
          );
        }
        this.typeScreen = 'minimize-2'
      } else {
        if (document.cancelFullScreen) {
          document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        }
        this.typeScreen = 'maximize-2'
      }
    },
    logout: function() {
      localStorage.removeItem('token')
      window.location.reload()
    },
    handleResize() {
    this.width = window.innerWidth;
    }
  }
};
</script>
