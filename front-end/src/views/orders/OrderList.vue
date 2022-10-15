<template>
  <div>
    <div class="container-fluid">
      <div class="page-header">
        <Breadcrumbs main="Users" title="User Lists" />
      </div>
    </div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header">
              <h5>Product List</h5>
            </div>
            <div class="card-body">
              <div class="row justify-content-end">
                <!-- <router-link to="/create-user" class="col">
                  <b-button class="btn-popup pull-right">Create User</b-button >
                </router-link> -->
              </div>
              <b-row>
                <b-col xl="3" lg="4" md="6">
                  <b-form-group label-cols="3" label="show" class="datatable-select">
                    <b-form-select v-model="perPage" :options="pageOptions"></b-form-select>
                  </b-form-group>
                </b-col>
                <b-col class="offset-xl-6 offset-lg-2 search-rs" xl="3" lg="5" md="6">
                  <b-form-group label-cols="3" label="Search" class="datatable-select">
                    <b-form-input type="text" v-model="filter" placeholder="Search"></b-form-input>
                  </b-form-group>
                </b-col>
              </b-row>
              <div class="table-responsive datatable-vue user-list">
                <div>
                  <b-modal id="modal-1" title="Confirmation" @ok="deleteBatchRow">
                    <p class="my-4">Are you sure!</p>
                  </b-modal>
                </div>
                <div></div>
                <!--<commonTable
                  :selectMode="selectMode"
                  :items="items"
                  :fields="tablefields"
                  :filter="filter"
                  :perPage="perPage"
                  :totalRows="totalRows"
                  :currentPage="currentPage"
                  :selectable="false"
                >
                </commonTable>-->
                <b-table class="text-center" :select-mode="selectMode" show-empty striped hover head-variant="light"
                  bordered stacked="md" :items="items" :fields="tablefields" :filter="filter"
                  :current-page="currentPage" :per-page="perPage" @filtered="onFiltered" @row-selected="rowSelected">
                  <template v-slot:head(delete)>
                    <b-button variant="danger" :disabled="selectedRows.length === 0" @click="showMsgBoxTwo">Delete
                    </b-button>
                  </template>
                  <template #cell(image)="field">
                    <img height="50px" :src="getImgUrl(field.item.avatar)" width="50px" />
                  </template>
                  <template v-slot:cell(actions)="{ item }">
                    <router-link style="font-size: 20px; color: blue;" :to="'/edit-user/' + item._id">
                      <feather type="edit-2" stroke="#3758FD" stroke-width="1" size="18px" fill="#3758FD"
                        stroke-linejoin="round"></feather>
                    </router-link>



                  </template>
                  <template #cell(status) v-for="(item, index) in items">
                    <feather v-if="item.status == 'active'" :key="index" type="circle" stroke="#81BA01" stroke-width="1"
                      size="12px" :fill="
                        item.status == 'active'
                          ? '#81BA01'
                          : item.status == 'inactive'
                            ? '#FBBC58'
                            : ''
                      " stroke-linejoin="round"></feather>
                  </template>
                  <b-table-column v-slot:cell(delete)>
                    <a href="#">edit</a>
                    <a href="#">remove</a>
                  </b-table-column>

                  <template v-slot:cell(delete)="{ item, field: { key } }">
                    <b-checkbox v-model="item[key]" @change="deleteSelected(item)"></b-checkbox>
                  </template>
                </b-table>
              </div>
              <b-col md="12" class="my-1 p-0 pagination-justify">
                <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage" aria-controls="my-table"
                  class="mt-4"></b-pagination>
              </b-col>
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
      items: [],
      tablefields: [
        { key: "images", label: "image", sortable: false },
        { key: "title", label: "Name", sortable: false, editable: true },
        { key: "brand", label: "Brand", sortable: false, editable: true },
        { key: "category", label: "Category", sortable: false, editable: true },
        { key: "discount", label: "Discount", sortable: false, editable: true },
        { key: "price", label: "Price", sortable: false, editable: true },
        { key: "stock", label: "Quantity", sortable: false, editable: true },
        { key: "status", label: "Status", sortable: false, editable: true },
        { key: "actions"},
      ],
      filter: null,
      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      pageOptions: [5, 10, 15, 50],
      selectMode: "multi",
      selected: []
    };
  },
  created() {

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
    getImgUrl(path) {
      return require("@/assets/images/users/" + path);
    },
    rowSelected(item) {
      this.selected = item._id;
      if (item[0]) {
        this.edit = this.edit !== item[0]._id ? item[0]._id : null;
      }
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    deleteRow() {
      for (var i = this.items.length - 1; i >= 0; i--) {
        for (var j = 0; j < this.selected.length; j++) {
          if (this.items[i] && (this.items[i]._id === this.selected[j])) {
            this.items.splice(i, 1);
          }
        }
      }
      // this.$http.post(`${BASE_URL}/user/delete`, {
      //     token: "",
      //     selected: selected
      // })
      // .then(response => {
      //     if(response.data.success){

      //     }
      // })
      // .catch(function (error) {
      //     console.log('error', error);
      // });
    },
    deleteBatchRow() {
      for (var i = 0; i < this.selected.length; i++) {
        if (this.items[i]._id == this.selected[i]) {
          this.items.splice(this.items[i], 1);
        }
      }
      console.log(-1)
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
          if (value) {
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