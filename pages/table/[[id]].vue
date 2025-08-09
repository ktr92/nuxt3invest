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

const { positions } = useGetPositions()
</script>
