<template>
  <div>
    <div class="container-fluid">
      <div class="page-header">
        <Breadcrumbs main="Settings" title="Profile" />
      </div>
    </div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-xl-4">
          <div class="card">
            <div class="card-body">
              <div class="profile-details text-center">
                <img
                  src="../assets/images/dashboard/designer.jpg"
                  alt=""
                  class="img-fluid img-90 rounded-circle blur-up lazyloaded"
                />
                <h5 class="f-w-600 mb-0">John deo</h5>
                <span>johndeo@gmail.com</span>
                <div class="social">
                  <div class="form-group btn-showcase">
                    <button class="btn social-btn btn-fb d-inline-block">
                      <i class="fab fa-facebook-f"></i>
                    </button>
                    <button class="btn social-btn btn-twitter d-inline-block">
                      <i class="fab fa-google"></i>
                    </button>
                    <button
                      class="btn social-btn btn-google d-inline-block mr-0"
                    >
                      <i class="fab fa-twitter"></i>
                    </button>
                  </div>
                </div>
              </div>
              <hr />
            </div>
          </div>
        </div>
        <div class="col-xl-8">
          <div class="card tab2-card">
            <div class="card-body">
              <ul
                class="nav nav-tabs tab-coupon mb-0"
                id="top-tab"
                role="tablist"
              >
                <div class="tab-content" id="top-tabContent">
                  <b-tabs content-class="mt-3">
                    <b-tab title="profile" data-feather="user" active>
                      <template slot="title">
                        <feather type="user"></feather>Personal Detail
                      </template>
                      <b-card-text>
                        <div
                          class="tab-pane fade show active"
                          id="top-profile"
                          role="tabpanel"
                          aria-labelledby="top-profile-tab"
                        >
                          <div class="table-responsive profile-table mb-0">
                            <table class="table table-responsive mb-0">
                              <tbody>
                                <tr>
                                  <td>Name:</td>
                                  <td>Johan</td>
                                </tr>
              
                                <tr>
                                  <td>Email:</td>
                                  <td>johndeo@gmail.com</td>
                                </tr>
                                <tr>
                                  <td>Gender:</td>
                                  <td>Male</td>
                                </tr>
                                <tr>
                                  <td>Mobile Number:</td>
                                  <td>2124821463</td>
                                </tr>
                                <tr>
                                  <td>DOB:</td>
                                  <td>Dec, 15 1993</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </b-card-text>
                    </b-tab>
                    <b-tab title="profile" data-feather="user" active>
                      <template slot="title">
                        <feather type="map-pin"></feather>Shipping Address
                      </template>
                      <b-card-text>
                        <div
                          class="tab-pane fade show active"
                          id="top-profile"
                          role="tabpanel"
                          aria-labelledby="top-profile-tab"
                        >
                          
                          <div class="table-responsive profile-table mb-0">
                            <table class="table table-responsive mb-0">
                              <tbody>
                                <tr>
                                  <td>Province:</td>
                                  <td>Ho Chi Minh</td>
                                </tr>
                                <tr>
                                  <td>District:</td>
                                  <td>Quan 9</td>
                                </tr>
                                <tr>
                                  <td>Ward:</td>
                                  <td></td>
                                </tr>
                                <tr>
                                  <td>Address:</td>
                                  <td></td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </b-card-text>
                    </b-tab>
                  </b-tabs>
                </div>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      content: "<h1>Some initial content</h1>",
    };
  },
  methods: {
    onComplete() {},
  },
};
</script>
<style scoped></style>
