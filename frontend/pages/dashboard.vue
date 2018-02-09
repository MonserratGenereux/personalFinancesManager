<template lang="html">
    <div>
        <div class="row">
            <div class="col-md-8">
                <addPayment/>
                <hr/>
                <allPayments/>
            </div>
            <div class="col-md-4">
                <b-nav vertical class="w-25">
                    <b-nav-item>Resumen</b-nav-item>
                    <b-nav-item active>Add Payment</b-nav-item>
                    <b-nav-item disabled>Add Transaction</b-nav-item>
                </b-nav>
            </div>
        </div>
    </div>
</template>

<script>
import addPayment from '~/components/payments/add'
import allPayments from '~/components/payments/index'
export default {
    components: {
        addPayment,
        allPayments,
    }
}
</script>

<style lang="css">
</style>
