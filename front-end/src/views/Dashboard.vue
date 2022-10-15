<template>
  <div>
    <!-- Container-fluid starts-->
    <div class="container-fluid">
      <div class="page-header">
        <Breadcrumbs main="" title="Dashboard" />
      </div>
      <Widget></Widget>
      <!-- <div class="row">
        <MarketChart></MarketChart>
        <OrderTable :order="orderList"></OrderTable>
      </div>
      <SecondWidget></SecondWidget> -->
      <!-- <div class="row">
        <BuySellChart></BuySellChart>
        <GoodsReturnTable :data="orderList"></GoodsReturnTable>
        <EmployeeStatus :employee="employee"></EmployeeStatus>
        <SalesStatus></SalesStatus>
      </div> -->
    </div>
  </div>
</template>

<script>
import Widget from "../components/dashboard/Widget.vue";
// import MarketChart from "../components/dashboard/market-chart.vue";
// import SecondWidget from "../components/dashboard/secondWidget/secondWidget.vue";
// import OrderTable from "../components/dashboard/order-table.vue";
// import BuySellChart from "../components/dashboard/buy-sell-chart.vue";
// import GoodsReturnTable from "../components/dashboard/goods-returns-table.vue";
// import EmployeeStatus from "../components/dashboard/employee-status-table.vue";
// import SalesStatus from "../components/dashboard/sales-status/sales-status.vue";

export default {
  components: {
    Widget,
    // MarketChart,
    // SecondWidget,
    // OrderTable,
    // BuySellChart,
    // GoodsReturnTable,
    // EmployeeStatus,
    // SalesStatus
  },

  data() {
    return {};
  },
//   created() {
//     this.$store.dispatch("order/getOrderList");
//   },
//   computed: {
//     ...mapGetters({
//       orderList: "order/getOrdersDashboard",
//       employee: "employee/getEmployee"
//     })
//   },
//   mounted() {}
};
</script>
