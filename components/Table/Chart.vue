<template>
      <div class="legendblock w-full py-14 px-10" ref="legendblock">
        <table class="w-full">
          <tbody>
            <tr 
              v-for="(item, index) in props.data" 
              :key="item.category" 
              :data-category="item.category"
              :ref="item.category"
              @mouseenter="emit('hoverD3', item.category, colorSet[index], item.value)"
              @mouseleave="emit('leaveD3', item.category, colorSet[index])"
              class="py-2 px-2 mb-10  border-b-1 border-gray-100">
                <td class="p-1 rounded-xs w-2" :style="`background-color: ${colorSet[index]}`" data-color>
                  
                </td>
                <td class="p-2" v-if="item.ticker">
                  <TableAsset :name="item.category" :ticker="item.ticker" />
                </td>
                <td class="p-2" v-if="item.startvalue">
                  <TableTextdouble :boldtext="numberFormat(item.value + ' ₽')" :text="numberFormat(item.startvalue + ' ₽')" />
                </td>
               
                 <td class="p-2" v-if="item.pricechange">
                  <TableChange
                    :price="numberFormat(item.pricechange) + ' ₽'"
                    :change="item.change"
                  />
                </td>
                <td class="p-2">
                  <TableText :text="item.share + ' %'" />
                </td>
            </tr>
            <tr>
              <td class="p-1 rounded-xs w-2 bg-gray-200" >
                  
                </td>
              <td class="p-2 bg-gray-50">
                Всего
              </td>
               <td class="p-2 bg-gray-50 ">
                  <TableTextdouble :boldtext="numberFormat(totalSumm + ' ₽')" :text="numberFormat(totalStart + ' ₽')" />
                </td>
            
              <td class="p-2 bg-gray-50">
                <TableChange
                    :price="numberFormat(totalChange) + ' ₽'"
                    :change="totalPercent.toFixed(2) + ' %'"
                  />
              </td>
              <td class="p-2 bg-gray-50"></td>
            </tr>
          </tbody>

        </table>
       
      
      </div>
   
</template>

<script setup lang="ts">
/**
 * Компонент для вывода таблицы-легенды к диаграмме {@see components.Chart.Pie}
 */
const emit = defineEmits<{
  hoverD3: [category: string, prevColor: string, value: number]
  leaveD3: [category: string, prevColor: string]
}>()


/** Интерфейс данных которые будут выводиться в таблице */
interface DataItem  {
  category: string
  value: number
  startvalue?: number
  ticker?: string
  change?: number
  pricechange?: number
  share?: number
}

const props = defineProps<{
  data: DataItem[]
  colorSet: Array<string>
  width?: number
  height?: number
}>()

const totalSumm = computed(() => props.data.reduce((summ, item) => summ + item.value, 0) )
const totalStart = computed(() => props.data.reduce((summ, item) => summ + (item.startvalue || 0), 0) )
const totalChange = computed(() => props.data.reduce((summ, item) => summ + (item.pricechange || 0), 0) )
const totalPercent = computed(() => totalChange.value / totalStart.value * 100)

/** массив цветов для секторов диаграммы */
const legendblock = ref<HTMLDivElement | null>(null)

</script>

<style scoped>


.chart-wrapper {
  user-select: none;
}
</style>
