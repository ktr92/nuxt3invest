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
              <div class="font-semibold text-gray-600 text-lg">{{ totalSumm(portfolio__totallist[index]) }} ₽</div>
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

const portfolio_list = appcontent.getPortfolio()
// список данных по инструментам портфеля
const portfolio_apilist = await Promise.all(
  portfolio_list.map(async (item) => {
    const figilist = await appcontent.getFigilist(item)

    const priceslist: any = await $fetch("/api/t_prices", {
      body: {
        "instrumentId": figilist.map((figi: any) => figi[0].figi )
      },
      method: "POST",
    })


    return {
      priceslist,
      id: item.id,
    }
  })
)

const portfolio__totallist = portfolio_apilist.map((item, index) => {
  return {
    id: item.id,
    depo: portfolio_list.filter(portfolio => portfolio.id === item.id)[0].depo,
    priceslist: item.priceslist.map((price: any, subindex: number) => {
      return {
        count: portfolio_list[index].positions[subindex].count,
        price: serviceApiData.formatPrice(price.price),
        value: portfolio_list[index].positions[subindex].count * serviceApiData.formatPrice(price.price),
       
      }
    })
    }

})

// из депо вычесть сумму покупок
const totalSumm = (portfolio: any) => {
  let summ = portfolio.depo
  portfolio.priceslist.map((item: any) => { 
    return summ += item.value }
  )

  return summ
}

portfolio__totallist.forEach(item => {
  console.log(item)
})

console.log("portfolio__totallist: ", portfolio__totallist)
</script>
