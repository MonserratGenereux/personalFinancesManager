<template lang="html">
    <div class="all-container">
        <div class="row">
            <div class="col-md-8 all-info">
                <hr/>
                <div class="info">
                    <allPayments/>
                </div>
            </div>
            <div class="col-md-4">
                <hr/>
                <div class="options">
                    <b-nav vertical>
                        <b-nav-item >Resumen</b-nav-item>
                        <b-nav-item v-on:click="addPayment()" >Add Payment</b-nav-item>
                        <b-nav-item v-on:click="addTransaction()">Add Transaction</b-nav-item>
                        <b-nav-item >Export CSV</b-nav-item>
                    </b-nav>
                </div>
                <hr/>
                More info here
            </div>
        </div>
    </div>
</template>

<script>
import allPayments from '~/components/payments/index'
export default {
    components: {
        allPayments,
    },
    methods: {

      addPayment () {
          window.location = '../payments/add';
      },
      addTransaction () {
          window.location = '../transactions/add';
      }
    }
}
</script>

<style lang="css">
.info{
    padding-top: 10px;
    background-color: rgba(215, 225, 234,0.7);
    padding-left: 50px;
    width: 750px;
}
.options{
    padding-top: 10px;
    padding-left: 100px;
    width: 350px;
    background-color: rgba(215, 225, 234, 0.7);
}
.all-info{
    padding-left: 50px;
}
.all-container{
    height: 590px;
}
</style>
