<template>
  <div class="w-full">
    <div
      class="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8 py-8"
      v-if="portfolio__totallist?.length"
    >
      <div
        v-for="(portfolio, index) in portfolio__totallist"
        :key="portfolio?.id"
      >
        <div v-if="portfolio">
          <div class="bg-white shadow-md p-4 rounded-s-md">
            <NuxtLink :to="`/table/${portfolio.id}`">
              <div
                class="font-semibold mb-4 text-xl text-gray-600 hover:text-blue-600 transition-all"
              >
                {{ portfolio.name }}
              </div>
            </NuxtLink>
            <div class="flex justify-between w-full">
              <div>
                <div class="text-gray-600">Стоимость</div>
                <div class="font-semibold text-gray-600 text-lg">
                  {{ numberFormat(portfolio.total) }} ₽
                </div>
              </div>
              <div class="text-right">
                <TableChange
                  :price="portfolio.change"
                  :change="portfolio.changePercent"
                  date="от суммы пополнений"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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


console.log("portfolio__totallist: ", portfolio__totallist)
</script>
