<template>
  <div>
    <div class="container-fluid">
      <div class="page-header">
        <Breadcrumbs main="Coupons" title="Create Coupon" />
      </div>
    </div>
    <!-- Container-fluid starts-->
    <div class="container-fluid">
      <div class="row">
        <div class="col">
          <div class="card tab2-card">
        <div class="card-header">
          <h5>Discount Coupon Details</h5>
        </div>
        <div class="card-body">
          <b-tabs content-class="mt-3 mb-0 nav nav-tabs tab-coupon">
            <div class="tab-content">
              <b-tab title="General" active>
                <div
                  class="tab-pane fade active show"
                  aria-labelledby="general-tab"
                >
                  <form class="needs-validation" v-on:submit="checkForm" novalidate="">
                    <h4>General</h4>
                    <div class="row">
                      <div class="col-lg-12">
                        <div :class="'form-group row '+ checkForm">
                          <label
                            for="title"
                            class="col-xl-3 col-md-4"
                            ><span>*</span> Coupan Title</label
                          >
                          <input
                            class="form-control col-md-7"
                            id="title"
                            type="text"
                            v-model="title"
                            required=""
                          />
                        </div>
                        <div :class="'form-group row '+ checkForm">
                          <label
                            for="code"
                            class="col-xl-3 col-md-4"
                            ><span>*</span>Coupan Code</label
                          >
                          <input
                            class="form-control col-md-7"
                            id="code"
                            type="text"
                            data-language="en"
                            v-model="code"
                            required=""
                          />
                          <!-- <div class="invalid-feedback">
                            Please Provide a Valid Coupon Code.
                          </div> -->
                        </div>
                        <div :class="'form-group row '+ checkForm">
                          <label
                            for="discount"
                            class="col-xl-3 col-md-4"
                            ><span>*</span>Coupan Discount</label
                          >
                          <input
                            class="form-control col-md-7"
                            id="discount"
                            type="number"
                            step="0.01"
                            v-model="discount"
                            required=""
                          />
                          <!-- <div class="invalid-feedback">
                            Please Provide a Valid Coupon Discount.
                          </div> -->
                        </div>
                        <div class="form-group row">
                          <label class="col-xl-3 col-md-4">Start Date</label>
                          <input
                            class="datepicker-here form-control digits col-md-7"
                            type="text"
                            data-language="en"
                            v-model="startdate"
                            pattern="^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$"
                            placeholder="dd/mm/yyyy"
                          />
                        </div>
                        <div class="form-group row">
                          <label class="col-xl-3 col-md-4">End Date</label>
                          <input
                            class="datepicker-here form-control digits col-md-7"
                            type="text"
                            data-language="en"
                            v-model="enddate"
                            placeholder="dd/mm/yyyy"
                          />
                        </div>
                        <div class="form-group row">
                          <label class="col-xl-3 col-md-4">Free Shipping</label>
                          <label class="d-block" for="checkbox-primary-1">
                                <input
                                  class="checkbox_animated"
                                  id="checkbox-primary-1"
                                  type="checkbox"
                                  v-model="freeshipping"
                                />
                                Allow Free Shipping
                          </label>
                        </div>
                        <div :class="'form-group row '+ checkForm">
                          <label class="col-xl-3 col-md-4">Quantity</label>
                          <input
                            class="form-control col-md-7"
                            type="number"
                            v-model="quantity"
                            required=""
                            min="0"
                          />
                        </div>
                        <div :class="'form-group row '+ checkForm">
                          <label class="col-xl-3 col-md-4">Discount Type</label>
                          <select class="custom-select col-md-7" required="" v-model="type">
                            <option value="" disabled>--Select--</option>
                            <option value="Percent">Percent</option>
                            <option value="Fixed">Fixed</option>
                          </select>
                        </div>
                        <div class="form-group row">
                          <label class="col-xl-3 col-md-4">Status</label>
                          <label class="d-block" for="chk-ani">
                                <input
                                  class="checkbox_animated"
                                  id="chk-ani"
                                  type="checkbox"
                                  v-model="status"
                                />
                                Enable the Coupon
                          </label>
                        </div>
                      </div>
                    </div>
                  </form>
                </div></b-tab
              >
              <b-tab title="Restriction">
                <form class="needs-validation" novalidate="">
                  <h4>Restriction</h4>
                  <div class="form-group row">
                    <label class="col-xl-3 col-md-4">Category</label>
                    <select class="custom-select col-md-7" required="" v-model="category">
                      <option value=null>--Select--</option>
                      <option v-for="category in categories" :value="category.name" :key="category.name">{{category.name}}</option>
                    </select>
                  </div>
                  <div class="form-group row">
                    <label for="validationCustom4" class="col-xl-3 col-md-4"
                      >Minimum Spend</label
                    >
                    <input
                      class="form-control col-md-7"
                      id="validationCustom4"
                      type="number"
                      v-model="minspend"
                    />
                  </div>
                  <div class="form-group row">
                    <label for="validationCustom5" class="col-xl-3 col-md-4"
                      >Maximum Discount</label
                    >
                    <input
                      class="form-control col-md-7"
                      id="validationCustom5"
                      type="number"
                      v-model="maxdiscount"
                    />
                  </div>
                </form>
              </b-tab>
            </div>
          </b-tabs>
          <div class="pull-right">
            <button type="button" class="btn btn-primary" @click="onComplete">Save</button>
          </div>
        </div>
      </div>
        </div>
      </div>
    </div>
    <!-- Container-fluid Ends-->
  </div>
</template>

<script>
const {BASE_URL} =  require('../../config')
export default {
	data() {
		return {
			categories: [],
      checkInput: false,
      title: '',
      code: '',
      discount: '',
      startdate: '',
      enddate: '',
      freeshipping: false,
      quantity: 9999,
      status: false,
      minspend: 0,
      maxdiscount: '',
      category: null,
      type: '',
		};
	},
  computed: {
    checkForm(){
      if (this.checkInput){
        return 'was-validated'
      } else {
        return ''
      }
    }
  },
	methods: {
		onComplete() {
      this.checkInput = true;
      if (isNaN(this.discount) || isNaN(this.quantity) || isNaN(this.discount) || isNaN(this.minspend) || isNaN(this.minspend)){ return}
      if (this.code != '' && this.title != '' && this.discount != '' && this.quantity >= 0 && this.type != ''){
        this.$http.post(`${BASE_URL}/voucher/new`, {
          title: this.title,
          code: this.code,
          discount: this.discount,
          startdate: this.startdate,
          enddate: this.enddate,
          freeshipping: this.freeshipping,
          quantity: this.quantity,
          status: this.status,
          minspend: this.minspend,
          maxdiscount: this.maxdiscount,
          category: this.category,
          type: this.type,
        })
        .then(res=> {
            if (res.data.success){
              this.$toasted.show("Create Coupon success", {
                theme: "bubble",
                position: "top-right",
                type: "success",
                duration: 2000
              });
            } else {
              this.$toasted.show(res.data.message, {
                theme: "bubble",
                position: "top-right",
                type: "error",
                duration: 2000
              });
            }
        })
        .catch(function (error) {
            console.log('error', error);
        });
      }
      // var forms = document.querySelectorAll('.needs-validation')
      // Array.prototype.slice.call(forms)
      // .forEach(function (form) {
      //   form.classList.add('was-validated')
      // }, false)
    }
	},
	created(){
		this.$http.get(`${BASE_URL}/category/getall`, {
		})
		.then(response => {
			this.categories = response.data           
		})
		.catch(function (error) {
			console.log('error', error);
		});
	}
};
</script>

<style>

</style>