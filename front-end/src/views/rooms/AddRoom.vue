<template>
  <div>
    <div class="container-fluid">
      <div class="page-header">
        <Breadcrumbs main="Room" title="Add Room" />
      </div>
      <div class="row">
        <div class="col-sm-12">
          <div class="card">
            <div class="card-header">
              <h5>Add Room</h5>
            </div>
            <div class="card-body">
              <div class="row product-adding">
                <div class="col-xl-12">
                  <form class="needs-validation add-product-form" novalidate="">
                    <div class="form">
                      <div class="form-group mb-3 row">
                        <label
                          for="validationCustom01"
                          class="col-xl-3 col-sm-4 mb-0"
                          >Type:</label
                        >
                        <input
                          class="form-control col-xl-8 col-sm-7"
                          id="validationCustom01"
                          type="text"
                          required=""
                          v-model="type"
                        />
                        <div class="valid-feedback">Looks good!</div>
                      </div>
                      <div class="form-group mb-3 row">
                        <label
                          for="validationCustom02"
                          class="col-xl-3 col-sm-4 mb-0"
                          >Price:</label
                        >
                        <input
                          class="form-control col-xl-8 col-sm-7"
                          id="validationCustom02"
                          type="number"
                          v-model="price"
                          required=""
                        />
                        <div class="valid-feedback">Looks good!</div>
                      </div>
                      <div class="form-group mb-3 row">
                        <label
                          for="validationCustomUsername"
                          class="col-xl-3 col-sm-4 mb-0"
                          >Quantity:</label
                        >
                        <input
                          class="form-control col-xl-8 col-sm-7"
                          id="validationCustomUsername"
                          type="number"
                          v-model="quantity"
                          required=""
                        />
                        <div class="invalid-feedback offset-sm-4 offset-xl-3">
                          Please choose Valid Code.
                        </div>
                      </div>
                    </div>
                    <div class="form">
                      <div class="form-group row">
                        <label class="col-xl-3 col-sm-4">Description:</label>
                        <div class="col-xl-8 col-sm-7 editor-vue p-0">
                          <vue-editor v-model="description"></vue-editor>
                        </div>
                      </div>
                    </div>
                    <div class="offset-xl-3 offset-sm-4">
                      <button
                        type="button"
                        class="btn btn-primary"
                        @click="submit()"
                      >
                        Add
                      </button>
                    </div>
                  </form>
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
const { BASE_URL } = require("../../config");
export default {
  data() {
    return {
      counter: 0,
      type: "",
      price: 0,
      quantity: 0,
      description: "<h1>Some initial content</h1>",
    };
  },
  methods: {
    decrement() {
      if (this.counter > 1) this.counter--;
    },
    onFileChange(e) {
      var files = e.target.files;
      if (!files.length) return;
      this.createImage(files[0]);
    },
    createImage(file) {
      var reader = new FileReader();
      reader.onload = (e) => {
        this.image.push(e.target.result);
      };
      reader.readAsDataURL(file);
    },
    removeImage: function (index) {
      console.log("index", index);
      this.image.splice(index, 1);
      //  this.image = "";
    },
    submit() {
      if (this.type != "" && this.price != "" && this.quantity != "") {
        this.$http
          .post(
            `${BASE_URL}/room/createroom`,
            {
              type: this.type,
              quantity: this.quantity,
              description: this.description,
              price: this.price,
            },
            {
              headers: {
                Authorization: `Basic ${localStorage.getItem("token")}`,
              },
            }
          )
          .then((response) => {
            this.$toasted.show("Successful", {
              theme: "bubble",
              position: "top-right",
              type: "success",
              duration: 2000,
            });
          })
          .catch(function (error) {
            console.log("error", error);
          });
      }
    },
  },
};
</script>

<style scoped>
.ck-content {
  height: 500px;
}
.icon {
  position: absolute;
  top: 8px;
  right: 16px;
}
</style>