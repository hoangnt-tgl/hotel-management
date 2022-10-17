<template>
  <form
    class="form-horizontal auth-form"
    @submit.prevent="handleSubmit"
    method="post"
  >
    <div class="form-group">
      <input
        v-model="fname"
        type="text"
        class="form-control"
        placeholder="First Name"
        required
      />
    </div>
    <div class="form-group">
      <input
        v-model="lname"
        type="text"
        class="form-control"
        placeholder="Last Name"
        required
      />
    </div>
    <div class="form-group">
      <input
        v-model="username"
        type="email"
        class="form-control"
        placeholder="Email"
        required
      />
      <span class="block text-danger text-xs absolute bottom-0 left-0">{{
        errors.username
      }}</span>
    </div>
    <div class="form-group">
      <!-- regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/ -->
      <input
        v-model="password"
        type="password"
        class="form-control"
        placeholder="Password"
        required
      />
      <span class="block text-danger text-xs absolute bottom-0 left-0">{{
        errors.password
      }}</span>
    </div>
    <div class="form-group">
      <input
        type="password"
        v-model="confirmPassword"
        class="form-control"
        placeholder="Confirm Password"
        required
      />
      <span class="block text-danger text-xs absolute bottom-0 left-0">{{
        errors.confirmPassword
      }}</span>
    </div>
    <div class="form-terms">
      <div class="custom-control custom-checkbox mr-sm-2">
        <input
          type="checkbox"
          class="custom-control-input"
          id="customControlAutosizing1"
          v-model="agree"
        />
        <label class="custom-control-label" for="customControlAutosizing1"
          ><span
            >I agree all statements in
            <a href="">Terms &amp; Conditions</a></span
          ></label
        >
      </div>
    </div>
    <div class="form-button">
      <button
        class="btn btn-primary"
        type="submit"
        @click="register"
        :disabled="!agree"
      >
        Register
      </button>
    </div>
    <div class="form-footer">
      <span>Or Sign up with social platforms</span>
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
import { BASE_URL } from "../../config";
console.log(BASE_URL);
export default {
  data() {
    return {
      fname: "",
      lname: "",
      password: "",
      username: "",
      submitted: false,
      confirmPassword: "",
      agree: false,
      errors: {},
    };
  },
  methods: {
    handleSubmit() {
      this.submitted = true;
    },
    register() {
      // this.submitted = true;
      if (
        !this.errors.username &&
        !this.errors.password &&
        !this.errors.confirmPassword
      ) {
        this.$http
          .post(`${BASE_URL}/user/register`, {
            fname: this.fname,
            lname: this.lname,
            password: this.password,
            username: this.username,
          })
          .then((res) => {
            console.log(res.data)
            if (res.data.success) {
              this.$toasted.show(res.data.msg, {
                theme: "bubble",
                position: "top-right",
                type: "success",
                duration: 2000,
              });
            } else {
              this.$toasted.show(res.data.msg, {
                theme: "bubble",
                position: "top-right",
                type: "error",
                duration: 2000,
              });
            }
          })
          .catch(function (error) {
            console.error(error);
          });
      }
      //  let data = {
      //    username: this.username,
      //    password: this.password
      //  };
    },
  },
  watch: {
    password(newValue) {
      let pattern =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      let isMatch = pattern.test(this.password);
      if (!isMatch) {
        this.errors.password =
          "Password must be at least 8 characters and contain the following characters: uppercase, lowercase, numbers and symbols.";
      } else {
        this.errors.password = undefined;
      }
    },
    confirmPassword(newValue) {
      if (this.password != newValue) {
        this.errors.confirmPassword =
          "The password confirmation does not match.";
      } else {
        this.errors.confirmPassword = undefined;
      }
    },
    username(newValue) {
      let pattern =
        /^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/gm;
      let isMatch = pattern.test(this.username);
      if (!isMatch) {
        this.errors.username = "Email invalidate";
      } else {
        this.errors.username = undefined;
      }
    },
  },
};
</script>