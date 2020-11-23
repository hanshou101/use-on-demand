<template>
  <button @click="fetchResults">{{ value }}</button>
</template>

<script>
import axios from 'axios'


// 模拟的axios
const axios = {
  get: () => Promise.resolve({data: 'value'})
};

export default {
  data() {
    return {
      value: null
    }
  },

  methods: {
    async fetchResults() {
      const response = await axios.get('mock/service')
      this.value = response.data
    }
  }
}
</script>
