<template>
  <div class="w-full">
    <div
      class="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3 lg:gap-4 py-4"
      v-if="portfolio__totallist?.length"
    >
      <div
        v-for="(portfolio, index) in portfolio__totallist"
        :key="portfolio?.id"
      >
        <div v-if="portfolio">
          <Stat :portfolio="portfolio" />
        </div>
      </div>
    </div>

     <StatCharts />
    
  </div>
</template>

<script setup lang="ts">
/**
 * главная страница с выводом резюме по портфелям: общая стоимость, изменение цены от депозита, доходность от депозита
 */

import appcontent from "~/services/apidata/mock"
import serviceApiData from "~/services/apidata/serviceApiData"

// список портфелей
const portfolio_list = appcontent.getPortfolio()

// получаем текущие цены по списку портфелей
const portfolio__totallist = await serviceApiData.getPortfolioLast(
  portfolio_list
)

</script>
