<template>
  <div>
    <!-- Container-fluid starts-->
    <div class="container-fluid">
      <div class="page-header">
        <Breadcrumbs main="Users" title="Create User" />
      </div>
      <div class="row">
        <div class="col">
          <div class="card tab2-card">
            <div class="card-header">
              <h5>Add administrator</h5>
            </div>
            <div class="card-body">
              <ul class="nav nav-tabs tab-coupon" id="top-tab" role="tablist">
                <div class="tab-content" id="top-tabContent">
                  <b-tabs content-class="mt-3">
                    <b-tab title="Account" data-feather="user" active>
                      <form class="needs-validation user-add" novalidate="">
                        <h4>Account Details</h4>
                        <div class="form-group row">
                          <label
                            for="validationCustom0"
                            class="col-xl-3 col-md-4"
                            ><span>*</span> First Name</label
                          >
                          <input
                            class="form-control col-xl-8 col-md-7"
                            id="validationCustom0"
                            type="text"
                            v-model="fname"
                            required=""
                          />
                        </div>
                        <div class="form-group row">
                          <label
                            for="validationCustom1"
                            class="col-xl-3 col-md-4"
                            ><span>*</span> Last Name</label
                          >
                          <input
                            class="form-control col-xl-8 col-md-7"
                            id="validationCustom1"
                            type="text"
                            v-model="lname"
                            required=""
                          />
                        </div>
                        <div class="form-group row">
                          <label
                            for="validationCustom2"
                            class="col-xl-3 col-md-4"
                            ><span>*</span> Email</label
                          >
                          <input
                            class="form-control col-xl-8 col-md-7"
                            id="validationCustom2"
                            type="email"
                            v-model="username"
                            required=""
                          />
                        </div>
                        <div class="form-group row">
                          <label
                            for="validationCustom3"
                            class="col-xl-3 col-md-4"
                            ><span>*</span> Password</label
                          >
                          <input
                            class="form-control col-xl-8 col-md-7"
                            id="validationCustom3"
                            type="password"
                            v-model="password"
                            required=""
                          />
                        </div>
                        <div class="form-group row">
                          <label
                            for="validationCustom4"
                            class="col-xl-3 col-md-4"
                            ><span>*</span> Confirm Password</label
                          >
                          <input
                            class="form-control col-xl-8 col-md-7"
                            id="validationCustom4"
                            type="password"
                            v-model="confirmPassword"
                            required=""
                          />
                        </div>
                      </form>
                    </b-tab>
                    <b-tab title="Permission" data-feather="user">
                      <form class="needs-validation user-add" novalidate="">
                        <div class="permission-block">
                          <div class="attribute-blocks">
                            <div class="row">
                              <div class="col-xl-3 col-sm-4">
                                <label>Create/delete other administrator</label>
                              </div>
                              <div class="col-xl-9 col-sm-8">
                                <div
                                  class="
                                    form-group
                                    m-checkbox-inline
                                    mb-0
                                    custom-radio-ml
                                    d-flex
                                    radio-animated
                                  "
                                >
                                  <label class="d-block" for="edo-ani1">
                                    <input
                                      class="radio_animated"
                                      v-model="role"
                                      type="radio"
                                      value="2"
                                    />
                                    Allow
                                  </label>
                                  <label class="d-block" for="edo-ani2">
                                    <input
                                      class="radio_animated"
                                      v-model="role"
                                      type="radio"
                                      value="1"
                                      checked=""
                                    />
                                    Deny
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </form>
                    </b-tab>
                  </b-tabs>
                </div>
              </ul>
              <div class="pull-right">
                <button
                  type="button"
                  class="btn btn-primary"
                  @click="onComplete"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Container-fluid Ends-->
</template>

<script>
const { BASE_URL } = require("../../config");
export default {
  data() {
    return {
      role: 1,
      password: "",
      confirmPassword: "",
      username: "",
      fname: "",
      lname: "",
      errors: "",
    };
  },
  methods: {
    onComplete() {
      if (
        this.errors === undefined &&
        this.username != "" &&
        this.fname != "" &&
        this.lname != "" &&
        this.confirmPassword != ""
      ) {
        this.$http
          .post(
            `${BASE_URL}/user/create-administrator`,
            {
              fname: this.fname,
              lname: this.lname,
              password: this.password,
              username: this.username,
              role: this.role,
            },
            {
              headers: {
                Authorization: `Basic ${localStorage.getItem("token")}`,
              },
            }
          )
          .then((res) => {
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
      } else {
        this.$toasted.show(this.errors, {
          theme: "bubble",
          position: "top-right",
          type: "error",
          duration: 2000,
        });
      }
    },
  },
  watch: {
    fname(newValue) {
      if (newValue == "") {
        this.errors = "First Name is required";
      } else {
        this.errors = undefined;
      }
    },
    lname(newValue) {
      if (newValue == "") {
        this.errors = "Last Name is required";
      } else {
        this.errors = undefined;
      }
    },
    password(newValue) {
      let pattern =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      let isMatch = pattern.test(this.password);
      if (!isMatch) {
        this.errors =
          "Password must be at least 8 characters and contain the following characters: uppercase, lowercase, numbers and symbols.";
      } else {
        this.errors = undefined;
      }
    },
    confirmPassword(newValue) {
      if (this.password != newValue) {
        this.errors = "The password confirmation does not match.";
      } else {
        this.errors = undefined;
      }
    },
    username(newValue) {
      let pattern =
        /^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/gm;
      let isMatch = pattern.test(this.username);
      if (!isMatch) {
        this.errors = "Email invalidate";
      } else {
        this.errors = undefined;
      }
    },
  },
};
</script>
<style scoped>
</style>