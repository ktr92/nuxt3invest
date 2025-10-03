<template>
  <div class="w-full">
    <TableMain
      :tableheader="appcontent.table.tableHeader"
      :tabledata="positions"
    />
  </div>
</template>

<script setup lang="ts">
import appcontent from "~/services/apidata/mock"
import serviceApiData from "~/services/apidata/serviceApiData"



const positions = ref<IPositionView[]>([])
const route = useRoute()
const portfolio_id = route.params.id as string
const portfolio_list = appcontent.getPortfolio()

if (portfolio_id) {
  positions.value = await serviceApiData.getPositionsWithPrices(portfolio_list, portfolio_id)
}




</script>
