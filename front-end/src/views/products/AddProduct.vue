<template>
  <div>
    <div class="container-fluid">
      <div class="page-header">
        <Breadcrumbs main="Physical" title="Add Product" />
      </div>
      <div class="row">
        <div class="col-sm-12">
          <div class="card">
            <div class="card-header">
              <h5>Add Product</h5>
            </div>
            <div class="card-body">
              <div class="row product-adding">
                <div class="col-xl-5">
                  <div class="add-product">
                    <div class="row">
                      <div class="col-xl-9 xl-50 col-sm-6 col-9">
                          <!--src="../../assets/images/pro3/33.jpg"-->
                        <img
                          src="../../assets/images/pro3/33.jpg"
                          class="img-fluid image_zoom_1 blur-up lazyloaded"
                        />
                      </div>
                      <div class="col-xl-3 xl-50 col-sm-6 col-3">
                        <ul class="file-upload-product">
                          <li v-for="(i, index) in image" :key="index">
                            <img :src="i" class="box-input-file" />
                            <feather
                              style="cursor: pointer;"
                              type="x"
                              stroke-width="1"
                              size="20px"
                              class="icon"
                              @click="removeImage(index)"
                            ></feather>
                          </li>
                          <li>
                            <div class="box-input-file">
                              <input
                                class="upload"
                                type="file"
                                @change="onFileChange"
                              />
                              <feather type="plus"></feather>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-xl-7">
                  <form class="needs-validation add-product-form" novalidate="">
                    <div class="form">
                      <div class="form-group mb-3 row">
                        <label
                          for="validationCustom01"
                          class="col-xl-3 col-sm-4 mb-0"
                          >Title :</label
                        >
                        <input
                          class="form-control col-xl-8 col-sm-7"
                          id="validationCustom01"
                          type="text"
                          required=""
                        />
                        <div class="valid-feedback">Looks good!</div>
                      </div>
                      <div class="form-group mb-3 row">
                        <label
                          for="validationCustom02"
                          class="col-xl-3 col-sm-4 mb-0"
                          >Price :</label
                        >
                        <input
                          class="form-control col-xl-8 col-sm-7"
                          id="validationCustom02"
                          type="text"
                          required=""
                        />
                        <div class="valid-feedback">Looks good!</div>
                      </div>
                      <div class="form-group mb-3 row">
                        <label
                          for="validationCustomUsername"
                          class="col-xl-3 col-sm-4 mb-0"
                          >Product Code :</label
                        >
                        <input
                          class="form-control col-xl-8 col-sm-7"
                          id="validationCustomUsername"
                          type="text"
                          required=""
                        />
                        <div class="invalid-feedback offset-sm-4 offset-xl-3">
                          Please choose Valid Code.
                        </div>
                      </div>
                    </div>
                    <div class="form">
                      <div class="form-group row">
                        <label
                          for="exampleFormControlSelect1"
                          class="col-xl-3 col-sm-4 mb-0"
                          >Select Size :</label
                        >
                        <select
                          class="form-control digits col-xl-8 col-sm-7"
                          id="exampleFormControlSelect1"
                        >
                          <option>Small</option>
                          <option>Medium</option>
                          <option>Large</option>
                          <option>Extra Large</option>
                        </select>
                      </div>
                      <div class="form-group row">
                        <label class="col-xl-3 col-sm-4 mb-0"
                          >Total Products :</label
                        >
                        <fieldset
                          class="qty-box col-xl-9 col-xl-8 col-sm-7 pl-0 qty-responsive"
                        >
                          <div class="input-group">
                            <b-input-group-prepend>
                              <b-btn variant="primary" @click="decrement"
                                >-</b-btn
                              >
                            </b-input-group-prepend>
                            <b-input
                              type="text"
                              name="quantity"
                              class="form-control input-number"
                              v-model="counter"
                            />
                            <b-input-group-append>
                              <b-btn variant="primary" @click="counter++"
                                >+</b-btn
                              >
                            </b-input-group-append>
                          </div>
                        </fieldset>
                      </div>
                      <div class="form-group row">
                        <label class="col-xl-3 col-sm-4"
                          >Add Description :</label
                        >
                        <div class=" col-xl-8 col-sm-7 editor-vue">
                          <vue-editor v-model="content"></vue-editor>
                        </div>
                      </div>
                    </div>
                    <div class="offset-xl-3 offset-sm-4">
                      <button type="submit" class="btn btn-primary">Add</button>
                      <button type="button" class="btn btn-light ml-1">
                        Discard
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
export default {
  data() {
    return {
      counter: 0,
      content: "<h1>Some initial content</h1>",
      image: [],
      imageUrl: "../../assets/images/pro3/33.jpg",
      getImgUrl:"@assets/images/"
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
      reader.onload = e => {
        this.image.push(e.target.result);
      };
      reader.readAsDataURL(file);
    },
    removeImage: function(index) {
      console.log("index", index);
      this.image.splice(index, 1);
      //  this.image = "";
    }
  }
};
</script>

<style scoped>
 .ck-content { height:500px; }
 .icon{
position: absolute;
  top: 8px;
  right: 16px;
 }
</style>