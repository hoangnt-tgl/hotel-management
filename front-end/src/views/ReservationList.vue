<template>
  <div>
    <div class="container-fluid">
      <div class="page-header">
        <Breadcrumbs main="Rooms" title="Reservation List" />
      </div>
    </div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-6" v-for="(item, index) in items">
          <div class="card">
            <div class="card-body">
              <div class="row me-0">
                <div class="col-4">
                  <img
                    :src="getImgUrl(item.room_image)"
                    class="lazyloaded blur-up"
                    style="width: 100%; height: auto"
                  />
                </div>
                <div class="col-8">
                  <p class="my-1">Type: {{ item.room_type }}</p>
                  <p class="my-1">Amount: {{ item.amount }}</p>
                  <p class="my-1">
                    Checkin Date:
                    {{
                      item.check_in_date ?new Date(item.check_in_date).toLocaleDateString("en-US"):""
                    }}
                  </p>
                  <p class="my-1">
                    Checkin Date:
                    {{
                      item.check_out_date
                        ? new Date(item.check_out_date).toLocaleDateString("en-US")
                        : ""
                    }}
                  </p>
                  <b-button
                    class="btn btn-sm btn-secondary w-100 mt-2 px-1"
                    v-b-modal="'modal-edit' + index"
                    v-if="new Date(item.check_in_date) - new Date() > 0"
                  >
                    Edit
                  </b-button>
                  <div>
                    <b-modal
                      :id="'modal-edit' + index"
                      title="Edit reservation"
                      @ok="editReservation(item)"
                    >
                      <div>
                        <label for="example-datepicker">Checkin date</label>
                        <b-form-datepicker
                          v-model="item.check_in_date"
                          class="mb-2"
                          :min="new Date().toISOString().slice(0, 10)"
                        ></b-form-datepicker>
                        <label for="example-datepicker">Checkout date</label>
                        <b-form-datepicker
                          v-model="item.check_out_date"
                          class="mb-2"
                          :min="new Date().toISOString().slice(0, 10)"
                        ></b-form-datepicker>
                      </div>
                    </b-modal>
                  </div>
                  <button
                    class="btn btn-sm btn-danger w-100 mt-2 px-1"
                    @click="deleteReservation(index)"
                    v-if="new Date(item.check_in_date) - new Date() > 0"
                  >
                    Cancel
                  </button>
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
          console.log(item);
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
    editReservation(item) {
      if (item.check_in_date == "") {
        this.$toasted.show("Start date is required", {
          theme: "bubble",
          position: "top-right",
          type: "error",
          duration: 2000,
        });
      } else {
        if (item.check_out_date != "") {
          let startdate = new Date(item.check_in_date);
          let enddate = new Date(item.check_out_date);
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
          .post(
            `${BASE_URL}/reservation/update-reservation`,
            {
              reservation_id: item.reservation_id,
              check_in_date: item.check_in_date,
              check_out_date: item.check_out_date,
              amount: item.amount,
            },
            {
              headers: {
                Authorization: `Basic ${localStorage.getItem("token")}`,
              },
            }
          )
          .then((response) => {
            this.$toasted.show("Update successful", {
              theme: "bubble",
              position: "top-right",
              type: "success",
              duration: 2000,
            });
          })
          .catch(function (error) {
            console.error(error);
          });
      }
    },

    deleteReservation(index) {
      this.$http
        .post(
          `${BASE_URL}/reservation/delete-reservation`,
          {
            reservation_id: this.items[index].reservation_id,
          },
          {
            headers: {
              Authorization: `Basic ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((response) => {
          this.items.splice(index, 1);
        })
        .catch(function (error) {
          console.error(error);
        });
    },
  },
  created() {
    this.$http
      .get(`${BASE_URL}/reservation/get-reservation-for-customer`, {
        headers: {
          Authorization: `Basic ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        this.items = response.data;
        console.log(this.items);
      })
      .catch(function (error) {
        console.error(error);
      });
  },
};
</script>
