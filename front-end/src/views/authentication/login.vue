<template>
  <form
    class="form-horizontal auth-form"
    @submit.prevent="handleSubmit"
    method="post"
  >
    <div class="form-group">
      <input
        v-model="username"
        name="login[username]"
        type="text"
        class="form-control"
        placeholder="Username"
      />
    </div>
    <div class="form-group">
      <input
        :type="typePasswd"
        v-model="password"
        name="login[password]"
        class="form-control"
        placeholder="Password"
      />
    </div>
    <div class="form-terms">
      <div class="custom-control custom-checkbox mr-sm-2">
        <input
          type="checkbox"
          class="custom-control-input"
          id="showPasswd"
          v-model="showPassword"
        />
        <label class="custom-control-label" for="showPasswd"
          >Show password</label
        >
        <!-- <a href="#" class="btn btn-default forgot-pass">lost your password</a> -->
      </div>
    </div>
    <div class="form-button">
      <button class="btn btn-primary" type="submit" @click="login">
        Login
      </button>
    </div>
    <div class="form-footer">
      <span>Or Login up with social platforms</span>
      <ul class="social">
        <li>
          <feather
            type="facebook"
            class="icon-facebook"
            fill="#F98085"
            stroke="#F98085"
            size="16px"
          ></feather>
        </li>
        <li>
          <feather
            type="twitter"
            stroke="#F98085"
            size="16px"
            class="icon-twitter"
          ></feather>
        </li>
        <li>
          <feather
            type="instagram"
            stroke="#F98085"
            size="16px"
            class="icon-instagram"
          ></feather>
        </li>
        <li>
          <feather
            type="github"
            stroke="#F98085"
            size="16px"
            class="icon-instagram"
          ></feather>
        </li>
      </ul>
    </div>
  </form>
</template>

<script>
const {BASE_URL} =  require('../../config')
export default {
  components: {},
  data() {
    return {
      // type: "password",
      showPassword: false,
      username: "admin",
      password: "19072000",
      submitted: false,
    };
  },
  created() {
    // reset login status for JWT
  },
  computed: {
    typePasswd(){
      if (this.showPassword){
        return 'text'
      } else {
        return 'password'
      }
      // return 
    }
  },
  methods: {
    handleSubmit() {
      this.submitted = true;
    },
    login() {
      this.submitted = true;
      if (this.email != "" && this.password != "") {
        this.$http.post(`${BASE_URL}/user/login`, {
            username: this.username,
            password: this.password
        })
        .then(res=> {
            if(res.data.success && (res.data.role == 'admin' || res.data.role == 'staff')){
              localStorage.setItem('token', res.data.access_token)
              localStorage.setItem('userinfo', res.data.userinfo) 
              this.$toasted.show("succesfully loged in", {
                theme: "bubble",
                position: "top-right",
                type: "success",
                duration: 2000
              });    
              this.$router.push("/");  
            } else {
              if (res.data.success) {res.data.message = 'You are not admin'}
              this.$toasted.show("Oops..." + res.data.message, {
                theme: "bubble",
                position: "bottom-right",
                type: "error",
                duration: 2000
              });
            }
        })
        .catch(function (error) {
            console.log('error', error);
        });
      }
    }
  }
};
</script>