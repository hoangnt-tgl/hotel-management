<template>
  <div>
    <div class="container-fluid">
      <div class="page-header">
        <Breadcrumbs main="Coupons" title="Coupon List" />
      </div>
    </div>
    <!-- Container-fluid starts-->
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header">
              <h5>Discount coupon detail</h5>
            </div>
            <div class="card-body">
							
              <b-row>
                <b-col xl="3" lg="4" md="6">
                  <b-form-group
                    label-cols="3"
                    label="show"
                    class="datatable-select"
                  >
                    <b-form-select
                      v-model="perPage"
                      :options="pageOptions"
                    ></b-form-select>
                  </b-form-group>
                </b-col>
                <b-col class="offset-xl-6 offset-lg-2 search-rs" xl="3" lg="5" md="6">
                  <b-form-group
                    label-cols="3"
                    label="Search"
                    class="datatable-select"
                  >
                    <b-form-input
                      type="text"
                      v-model="filter"
                      placeholder="Search"
                    ></b-form-input>
                  </b-form-group>
                </b-col>
              </b-row>
              <div class="table-responsive datatable-vue">
                <div>
                  <b-modal
                    id="modal-1"
                    title="Confirmation"
                  >
                    <p class="my-4">Are you sure!</p>
                  </b-modal>
                </div>
                <b-table
                  class="text-center"
                  show-empty
                  striped
                  hover
                  head-variant="light"
                  bordered
                  stacked="md"
                  :items="items"
                  :fields="tablefields"
                  :filter="filter"
                  :current-page="currentPage"
                  :per-page="perPage"
                  @filtered="onFiltered"
                  @row-selected="rowSelected"
                >
                  <template v-slot:head(delete)>
                    <b-button
                      variant="danger"
                      :disabled="selectedRows.length === 0"
                      @click="showMsgBoxTwo"
                      >Delete</b-button
                    >
                  </template>
                  <template #cell(status)="field">
                    <statusIcon :field="field"></statusIcon>
                  </template>
                  <b-table-column v-slot:cell(delete)>
                    <a href="#">edit</a>
                    <a href="#"> remove</a>
                  </b-table-column>

                  <template v-slot:cell(delete)="{ item, field: { key } }">
                    <b-checkbox
                      v-model="item[key]"
                      @change="deleteSelected(item)"
                    ></b-checkbox>
                  </template>
                </b-table>
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
import statusIcon from "../../components/featherIcons/status-icon.vue";
const {BASE_URL} =  require('../../config')
export default {
  components: { statusIcon },
  data() {
    return {
      items: [],
      tablefields: [
        { key: "delete" },
        { key: "title", label: "Title", sortable: true },
        { key: "code", label: "Code", sortable: true },
        { key: "discount", label: "Discount", sortable: true },
        { key: "type", label: "Type", sorttable: true },
        { key: "status", label: "Status", sortable: true }
      ],
      filter: null,
      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      pageOptions: [5, 10, 15],
      selectMode: "multi",
      selected: []
    };
  },
  created() {
    this.$http.post(`${BASE_URL}/voucher/getall`, {
      token: ""
    })
    .then(response => {
			this.items = response.data   
			console.log(this.items)        
    })
    .catch(function (error) {
			console.log('error', error);
    });
  },

  mounted() {
    // Set the initial number of items
    this.totalRows = this.items.length;
  },
  computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.tablefields
        .filter(f => f.sortable)
        .map(f => {
          return { text: f.label, value: f.key };
        });
    },
    selectedRows() {
      return this.items.filter(item => item.delete);
    }
  },
  methods: {
    deleteSelected(item) {
      let objIndex = this.selected.findIndex((obj => obj == item._id));
      if (objIndex > -1) {
        this.selected.splice(objIndex, 1);
      } else {
        this.selected.push(item._id)
      }
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    rowSelected(item) {
      this.selected = item._id;
    },
    deleteRow() {
      for( var i=this.items.length - 1; i>=0; i--){
        for( var j=0; j<this.selected.length; j++){
          if(this.items[i] && (this.items[i]._id === this.selected[j])){
            this.items.splice(i, 1);
          }
        }
      }
			this.$http.post(`${BASE_URL}/voucher/delete`, {
				token: "",
				selected: this.selected
			})
			.then(response => {
				if(response.data.success){
					this.$toasted.show(response.data.message, {
						theme: "bubble",
						position: "top-right",
						type: "success",
						duration: 2000
					});             
				} else {
					this.$toasted.show(response.data.message, {
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
    },
    deleteBatchRow() {
      for (var i = 0; i < this.selected.length; i++) {
        if (this.items[i]._id == this.selected[i]) {
          this.items.splice(this.items[i], 1);
        }
      }
    },
    showMsgBoxTwo() {
        this.$bvModal.msgBoxConfirm('Are you sure!', {
          title: 'Confirmation',
          size: 'md',
          buttonSize: 'sm',
          okVariant: 'primary',
          okTitle: 'YES',
          cancelTitle: 'CANCLE',
          footerClass: 'p-2',
          hideHeaderClose: false,
          // centered: true
        })
          .then(value => {
						if (value){
							this.deleteRow();
							this.selected = [];
						}
          })
          .catch(err => {
            // An error occurred
          })
      }
  }
};
</script>

<style lang="scss" scoped>
table.text-center * {
  text-align: center;
}
</style>