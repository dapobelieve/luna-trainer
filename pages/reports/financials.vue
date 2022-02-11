<template>
  <div class="max-w-xl 2xl:max-w-7xl md:max-w-4xl lg:max-w-full w-full">
    <div class="mb-6 flex items-center justify-between">
      <ClickOutside :do="() => { showStatus = false}">
        <div class="relative">
          <div class="pt-0.5 text-sm px-2 border rounded-md inline-flex cursor-pointer text-primary-color" @click="showStatus = !showStatus">
            {{ statusVal }} <i class="ml-1 mt-1 fi-rr-caret-down"></i>
          </div>
          <div
            v-if="showStatus"
            class="origin-top-right cursor-pointer absolute left-0 mt-2 w-44 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-40"
          >
            <div class="py-1 px-1" role="none">
              <a
                class="text-gray-700 block select-none px-4 py-2 text-sm hover:bg-blue-50 hover:rounded"
                @click="statusVal = 'All'; showStatus = false"
              >All
              </a>
              <a
                class="text-gray-700 block select-none px-4 py-2 text-sm hover:bg-blue-50 hover:rounded"
                @click="statusVal = 'Paid'; showStatus = false"
              >Paid
              </a>
              <a
                class="text-gray-700 block select-none px-4 py-2 text-sm hover:bg-blue-50 hover:rounded"
                @click="statusVal = 'Unpaid'; showStatus = false"
              >Unpaid
              </a>
              <a
                class="text-gray-700 block select-none px-4 py-2 text-sm hover:bg-blue-50 hover:rounded"
                @click="statusVal = 'Pending'; showStatus = false"
              >Pending
              </a>
            </div>
          </div>
        </div>
      </ClickOutside>
      <div class="text-sm">
        <button class="text-primary-color">
          Year
        </button>
        <button class="ml-2">
          Month
        </button>
        <button class="ml-2">
          Week
        </button>
        <ClickOutside :do="() => {showMore = false}">
          <div class="relative inline-block">
            <button class="ml-2" @click="showMore = !showMore">
              {{ moreValue || 'More' }} <i class="fi-rr-caret-down"></i>
            </button>
            <div
              v-if="showMore"
              class="origin-top-right cursor-pointer absolute right-0 mt-2 w-44 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-40"
            >
              <div class="py-1 px-1" role="none">
                <a
                  class="text-gray-700 block select-none px-4 py-2 text-sm hover:bg-blue-50 hover:rounded"
                  @click="moreValue = 'Day'; showMore = false"
                >Day
                </a>
                <a
                  class="text-gray-700 block select-none px-4 py-2 text-sm hover:bg-blue-50 hover:rounded"
                  @click="moreValue = 'All Time'; showMore = false"
                >All Time
                </a>
                <a
                  class="text-gray-700 block select-none px-4 py-2 text-sm hover:bg-blue-50 hover:rounded"
                  @click="moreValue = 'Custom'; showMore = false"
                >Custom
                </a>
              </div>
            </div>
          </div>
        </ClickOutside>
      </div>
    </div>
    <div class="grid gap-4">
      <div class="grid gap-4 lg:grid-cols-2 rounded-md ">
        <ReportCard class="px-5">
          <div class="text-gray-700">
            <div class="mb-16">
              <p class="text-lg font-light leading-7">
                Total Value of Sales
              </p>
              <p class="font-bold text-md">
                £ 245,000.00
              </p>
            </div>
            <div class="flex justify-between lg:px-2 mb-5">
              <template v-for="(mon, monIndex) in months">
                <BarComponent v-if="mon === 'Dec'" :key="monIndex" color="#3B82F6" :label="mon" />
                <BarComponent v-else :key="monIndex" :color="(monIndex+1) % 2 === 0 ? '#3EE145' : '#FFD66B'" :label="mon" />
              </template>
            </div>
            <div class="flex justify-between">
              <CircularKey color="#3EE145">
                <div>
                  <h4 class="text-sm text-gray-500">
                    Overdue
                  </h4>
                  <span class="text-sm font-bold">£1,500</span>
                </div>
              </CircularKey>
              <CircularKey color="#FFD66B">
                <div>
                  <h4 class="text-sm text-gray-500">
                    Unpaid
                  </h4>
                  <span class="text-sm font-bold">£1,500.00</span>
                </div>
              </CircularKey>
              <CircularKey color="#3B82F6">
                <div>
                  <h4 class="text-sm text-gray-500">
                    Paid
                  </h4>
                  <span class="text-sm font-bold">£2,500.00</span>
                </div>
              </CircularKey>
            </div>
          </div>
        </ReportCard>
        <ReportCard class="px-5">
          <div class="text-gray-700">
            <div class="mb-16">
              <p class="text-lg font-light leading-7">
                Number of Sales
              </p>
              <p class="font-bold text-md">
                1200
              </p>
            </div>
            <div class="flex justify-between lg:px-2 mb-5">
              <template v-for="(mon, monIndex) in months">
                <BarComponent v-if="mon === 'Dec'" :key="monIndex" color="#3B82F6" :label="mon" />
                <BarComponent v-else :key="monIndex" :color="(monIndex+1) % 2 === 0 ? '#3EE145' : '#FFD66B'" :label="mon" />
              </template>
            </div>
            <div class="flex justify-between">
              <CircularKey color="#3EE145">
                <div>
                  <h4 class="text-sm text-gray-500">
                    Overdue
                  </h4>
                  <span class="text-sm font-bold">30</span>
                </div>
              </CircularKey>
              <CircularKey color="#FFD66B">
                <div>
                  <h4 class="text-sm text-gray-500">
                    Unpaid
                  </h4>
                  <span class="text-sm font-bold">32</span>
                </div>
              </CircularKey>
              <CircularKey color="#3B82F6">
                <div>
                  <h4 class="text-sm text-gray-500">
                    Paid
                  </h4>
                  <span class="text-sm font-bold">56</span>
                </div>
              </CircularKey>
            </div>
          </div>
        </ReportCard>
      </div>
      <ReportCard class="px-0">
        <div class="px-5">
          <h4 class="font-bold text-xl">
            Performance
          </h4>
        </div>
        <div class="py-12">
          <canvas id="performance-chart"></canvas>
        </div>
        <div class="pl-5 flex">
          <div class="mr-6">
            <h4 class="text-sm text-gray-500">
              Overdue
            </h4>
            <span class="text-2xl font-bold">£30,000</span>
          </div>
          <div>
            <h4 class="text-sm text-gray-500">
              Invoices
            </h4>
            <span class="text-2xl font-bold">+ 20</span>
          </div>
        </div>
      </ReportCard>
    </div>
  </div>
</template>

<script>
import { Chart, registerables } from 'chart.js'
import ReportCard from '~/components/report/Card'
import BarComponent from '~/components/report/BarComponent'
import CircularKey from '~/components/report/CircularKey'
import ClickOutside from '~/components/util/ClickOutside'
Chart.register(...registerables)
export default {
  components: {
    ClickOutside,
    CircularKey,
    BarComponent,
    ReportCard
  },
  data () {
    return {
      showMore: false,
      showStatus: false,
      moreValue: null,
      statusVal: 'All',
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    }
  },
  mounted () {
    const clientsData = {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            data: [40, 140, 110, 230, 592, 385, 82, 214, 90, 140, 410, 230],
            backgroundColor: ['rgba(37, 99, 235, 0.11)', 'rgba(255, 255, 255, 0)'],
            borderColor: '#3B82F6',
            borderWidth: 4
          }
        ]
      },
      options: {
        aspectRatio: 5,
        events: ['mousemove', 'mouseout', 'click'],
        interaction: {
          intersect: false,
          axis: 'y',
          mode: 'index'
        },
        elements: {
          line: {
            tension: 0.5
          },
          point: {
            radius: 0
          }
        },
        plugins: {
          legend: {
            display: false
          }
        },
        responsive: true,
        scales: {
          xAxis: {
            display: false,
            grid: {
              display: false
            },
            ticks: {
              beginAtZero: true,
              padding: 10
            }
          },
          yAxis: {
            display: false,
            tickColor: 'red',
            grid: {
              display: false
            },
            ticks: {
              beginAtZero: true,
              padding: 10
            }
          }
        }
      }
    }

    const clientsCtx = document.getElementById('performance-chart').getContext('2d')
    this.clientChart = new Chart(clientsCtx, clientsData)
  }
}
</script>

<style scoped>

</style>
