<template>
  <div>
    <div class="container-fluid">
      <div class="page-header">
        <Breadcrumbs main="Home" title="Available rooms" />
      </div>
    </div>
    <div class="container-fluid">
      <div class="card">
        <div class="card-body text-center">
          <div class="profile-details">
            <form class="needs-validation" novalidate="">
              <div class="row">
                <div class="col-lg-12">
                  <div class="form-group row">
                    <label class="col-xl-3 col-md-4">Start Date*</label>
                    <b-form-datepicker
                      class="datepicker-here form-control digits col-md-7"
                      type="date"
                      data-language="en"
                      v-model="startdate"
                      placeholder="dd/mm/yyyy"
                      pattern="^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$"
                      :min="new Date().toISOString().slice(0, 10)"
                    ></b-form-datepicker>
                    <!-- <input
                      class="datepicker-here form-control digits col-md-7"
                      type="date"
                      data-language="en"
                      v-model="startdate"
                      pattern="^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$"
                      placeholder="dd/mm/yyyy"
                      :min="new Date().toISOString().slice(0, 10)"
                      required
                    /> -->
                  </div>
                  <div class="form-group row">
                    <label class="col-xl-3 col-md-4">End Date</label>
                    <b-form-datepicker
                      class="datepicker-here form-control digits col-md-7"
                      type="date"
                      data-language="en"
                      v-model="enddate"
                      placeholder="dd/mm/yyyy"
                      pattern="^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$"
                      :min="new Date().toISOString().slice(0, 10)"
                    ></b-form-datepicker>
                    <!-- <input
                      class="datepicker-here form-control digits col-md-7"
                      type="date"
                      data-language="en"
                      v-model="enddate"
                      placeholder="dd/mm/yyyy"
                      pattern="^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$"
                      :min="new Date().toISOString().slice(0, 10)"
                    /> -->
                  </div>
                </div>
              </div>
            </form>
          </div>
          <hr />
          <button class="btn btn-lg btn-primary" @click="onComplete">
            Find room
          </button>
        </div>
      </div>
    </div>
    <div class="container-fluid">
      <div class="row">
        <div
          class="col-lg-6"
          v-for="(item, index) in items"
          v-if="item.available > 0"
        >
          <div class="card">
            <div class="card-body">
              <div class="row me-0">
                <div class="col-4">
                  <img
                    :src="getImgUrl(item.room_image)"
                    class="lazyloaded blur-up"
                    style="width: 100%; height: auto"
                  />
                  <input
                    type="number"
                    class="form-control digits text-center w-100 mt-2"
                    v-model="item.count"
                    min="0"
                    :max="item.available"
                  />
                  <button
                    class="btn btn-sm btn-secondary w-100 mt-2 px-1"
                    @click="bookRoom(item)"
                  >
                    Book room
                  </button>
                </div>
                <div class="col-8">
                  <p class="my-1">Type: {{ item.room_type }}</p>
                  <p class="my-1">Available rooms: {{ item.available }}</p>
                  <p class="my-1">Price: {{ item.room_price }}</p>
                  <p class="my-1">Description:</p>
                  <p
                    class="overflow-auto"
                    style="max-height: 150px"
                    v-html="item.room_description"
                  ></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const { BASE_URL } = require("../config");
export default {
  data() {
    return {
      startdate: "",
      enddate: "",
      items: [],
      count: new Array(),
    };
  },
  methods: {
    bookRoom(item) {
      let token = localStorage.getItem("token");
      if (token) {
        if (item.count < 1 || item.count > item.available) {
          this.$toasted.show("Invalid quantity", {
            theme: "bubble",
            position: "top-right",
            type: "error",
            duration: 2000,
          });
        } else {
          this.$http
            .post(
              `${BASE_URL}/reservation/create-reservation`,
              {
                room_id: item.room_id,
                check_in_date: this.startdate,
                check_out_date: this.enddate,
                amount: item.count,
              },
              {
                headers: {
                  Authorization: `Basic ${localStorage.getItem("token")}`,
                },
              }
            )
            .then((response) => {
              this.$router.push("/reservation-list");
            })
            .catch(function (error) {
              console.error(error);
            });
        }
      } else {
        this.$bvModal
          .msgBoxConfirm("You need to login to make a reservation!", {
            title: "You want to login?",
            size: "md",
            buttonSize: "sm",
            okVariant: "primary",
            okTitle: "LOGIN",
            cancelTitle: "CANCLE",
            footerClass: "p-2",
            hideHeaderClose: false,
            // centered: true
          })
          .then((value) => {
            if (value) {
              this.$router.push("/login");
            }
          })
          .catch((err) => {
            // An error occurred
          });
      }
    },
    getImgUrl(path) {
      return `${BASE_URL}/images/${path}`;
    },
    onComplete() {
      if (this.startdate == "") {
        this.$toasted.show("Start date is required", {
          theme: "bubble",
          position: "top-right",
          type: "error",
          duration: 2000,
        });
      } else {
        if (this.enddate != "") {
          let startdate = new Date(this.startdate);
          let enddate = new Date(this.enddate);
          if (enddate - startdate < 0) {
            this.$toasted.show("End date must be after the start date", {
              theme: "bubble",
              position: "top-right",
              type: "error",
              duration: 2000,
            });
            return;
          }
        }
        this.$http
          .post(`${BASE_URL}/room/getavailableroom`, {
            startdate: this.startdate,
            enddate: this.enddate,
          })
          .then((response) => {
            this.items = response.data;
            this.items.forEach((element, index) => {
              this.items[index].count = 0;
            });
          })
          .catch(function (error) {
            console.error(error);
          });
      }
    },
  },
};
</script>
