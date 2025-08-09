<template>
  <div class="w-full">
    <div class="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8 py-8">
      <div v-for="portfolio in portfolio_list" :key="portfolio.id">
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
              <div class="text-gray-600">
                Стоимость
              </div>
              <div class="font-semibold text-gray-600 text-lg">
                2 123 123 ₽
              </div>
            </div>
            <div class="text-right">
              <TableChange :price="300" :change="23" date="от суммы пополнений" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { TableChange } from "#components"
import appcontent from "~/services/apidata/mock"

const portfolio_list = appcontent.getPortfolio()
</script>
