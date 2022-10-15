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
          <h5>Add User</h5>
        </div>
        <div class="card-body">
          <ul class="nav nav-tabs tab-coupon" id="top-tab" role="tablist">
            <div class="tab-content" id="top-tabContent">
              <b-tabs content-class="mt-3">
               
                  <b-tab title="Account" data-feather="user" active>
                    <form class="needs-validation user-add" novalidate="">
                      <h4>Account Details</h4>
                      <div class="form-group row">
                        <label for="validationCustom0" class="col-xl-3 col-md-4"
                          ><span>*</span> First Name</label
                        >
                        <input
                          class="form-control col-xl-8 col-md-7"
                          id="validationCustom0"
                          type="text"
                          required=""
                        />
                      </div>
                      <div class="form-group row">
                        <label for="validationCustom1" class="col-xl-3 col-md-4"
                          ><span>*</span> Last Name</label
                        >
                        <input
                          class="form-control col-xl-8 col-md-7"
                          id="validationCustom1"
                          type="text"
                          required=""
                        />
                      </div>
                      <div class="form-group row">
                        <label for="validationCustom2" class="col-xl-3 col-md-4"
                          ><span>*</span> Email</label
                        >
                        <input
                          class="form-control col-xl-8 col-md-7"
                          id="validationCustom2"
                          type="text"
                          required=""
                        />
                      </div>
                      <div class="form-group row">
                        <label for="validationCustom3" class="col-xl-3 col-md-4"
                          ><span>*</span> Password</label
                        >
                        <input
                          class="form-control col-xl-8 col-md-7"
                          id="validationCustom3"
                          type="password"
                          required=""
                        />
                      </div>
                      <div class="form-group row">
                        <label for="validationCustom4" class="col-xl-3 col-md-4"
                          ><span>*</span> Confirm Password</label
                        >
                        <input
                          class="form-control col-xl-8 col-md-7"
                          id="validationCustom4"
                          type="password"
                          required=""
                        />
                      </div>
                    </form>
                  </b-tab>
                  <b-tab title="Permission" data-feather="user" active>
                    <form class="needs-validation user-add" novalidate="">
                      <div class="permission-block">
                        <div class="attribute-blocks">
                          <h5 class="f-w-600 mb-3">
                            Product Related Permission
                          </h5>
                          <div class="row">
                            <div class="col-xl-3 col-sm-4">
                              <label>Add Product</label>
                            </div>
                            <div class="col-xl-9 col-sm-8">
                              <div
                                class="form-group m-checkbox-inline mb-0 custom-radio-ml d-flex radio-animated"
                              >
                                <label class="d-block" for="edo-ani1">
                                  <input
                                    class="radio_animated"
                                    id="edo-ani1"
                                    type="radio"
                                    name="rdo-ani"
                                  />
                                  Allow
                                </label>
                                <label class="d-block" for="edo-ani2">
                                  <input
                                    class="radio_animated"
                                    id="edo-ani2"
                                    type="radio"
                                    name="rdo-ani"
                                    checked=""
                                  />
                                  Deny
                                </label>
                              </div>
                            </div>
                          </div>
                          <div class="row">
                            <div class="col-xl-3 col-sm-4">
                              <label>Update Product</label>
                            </div>
                            <div class="col-xl-9 col-sm-8">
                              <div
                                class="form-group m-checkbox-inline mb-0 custom-radio-ml d-flex radio-animated"
                              >
                                <label class="d-block" for="edo-ani3">
                                  <input
                                    class="radio_animated"
                                    id="edo-ani3"
                                    type="radio"
                                    name="rdo-ani1"
                                  />
                                  Allow
                                </label>
                                <label class="d-block" for="edo-ani4">
                                  <input
                                    class="radio_animated"
                                    id="edo-ani4"
                                    type="radio"
                                    name="rdo-ani1"
                                    checked=""
                                  />
                                  Deny
                                </label>
                              </div>
                            </div>
                          </div>
                          <div class="row">
                            <div class="col-xl-3 col-sm-4">
                              <label>Delete Product</label>
                            </div>
                            <div class="col-xl-9 col-sm-8">
                              <div
                                class="form-group m-checkbox-inline mb-0 custom-radio-ml d-flex radio-animated"
                              >
                                <label class="d-block" for="edo-ani5">
                                  <input
                                    class="radio_animated"
                                    id="edo-ani5"
                                    type="radio"
                                    name="rdo-ani2"
                                  />
                                  Allow
                                </label>
                                <label class="d-block" for="edo-ani6">
                                  <input
                                    class="radio_animated"
                                    id="edo-ani6"
                                    type="radio"
                                    name="rdo-ani2"
                                    checked=""
                                  />
                                  Deny
                                </label>
                              </div>
                            </div>
                          </div>
                          <div class="row">
                            <div class="col-xl-3 col-sm-4">
                              <label class="mb-0 sm-label-radio"
                                >Apply discount</label
                              >
                            </div>
                            <div class="col-xl-9 col-sm-8">
                              <div
                                class="form-group m-checkbox-inline mb-0 custom-radio-ml d-flex radio-animated pb-0"
                              >
                                <label class="d-block mb-0" for="edo-ani7">
                                  <input
                                    class="radio_animated"
                                    id="edo-ani7"
                                    type="radio"
                                    name="rdo-ani3"
                                  />
                                  Allow
                                </label>
                                <label class="d-block mb-0" for="edo-ani8">
                                  <input
                                    class="radio_animated"
                                    id="edo-ani8"
                                    type="radio"
                                    name="rdo-ani3"
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
            <button type="button" class="btn btn-primary">Save</button>
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
export default {
  data() {
    return {
      content: "<h1>Some initial content</h1>"
    };
  },
  methods: {
    onComplete() {}
  }
};
</script>
<style scoped>

</style>