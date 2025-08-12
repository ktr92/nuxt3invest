<template>
  <div class="w-full">
    <div class="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8 py-8">
      <div v-for="(portfolio, index) in portfolio_list" :key="portfolio.id">
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
                {{ totalSumm(portfolio__totallist[index]) }} ₽
              </div>
            </div>
            <div class="text-right">
              <TableChange
                :price="300"
                :change="23"
                date="от суммы пополнений"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import appcontent from "~/services/apidata/mock"
import serviceApiData from "~/services/apidata/serviceApiData"

// список портфелей
const portfolio_list = appcontent.getPortfolio()

// получаем текущие цены по списку портфелей
const portfolio__totallist = await serviceApiData.getPortfolioLast(portfolio_list)



// из депо вычесть сумму покупок
const totalSumm = (portfolio: any) => {
  let summ = portfolio.depo
  portfolio.priceslist.map((item: any) => {
    return (summ += item.value)
  })

  return numberFormat(summ)
}

portfolio__totallist.forEach((item) => {
  console.log(item)
})

console.log("portfolio__totallist: ", portfolio__totallist)
</script>
