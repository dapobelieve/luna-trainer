<template>
  <div class="max-w-xl 2xl:max-w-7xl md:max-w-4xl lg:max-w-full w-full">
    <div class="grid lg:grid-cols-3 gap-4 mb-6 w-full">
      <div class="lg:col-span-2 flex flex-col gap-4">
        <ReportCard class="border py-2 flex items-center px-3">
          <div class="h-12 w-12 inline-flex items-center justify-center rounded-full bg-teal-100">
            <i class="fi-rr-arrow-up text-2xl text-teal-500 font-bold"></i>
          </div>
          <div class="ml-3">
            <p class="text-lg">Total Clients</p>
            <span class="text-2xl font-bold">1200</span>
          </div>
          <div class="ml-auto cursor-pointer">
            <i class="fi-rr-angle-right font-bold text-xs"></i>
          </div>
        </ReportCard>
        <div class="lg:flex gap-4">
          <ReportCard class="border flex items-center py-2 px-3 mb-4 lg:mb-0">
            <div class="h-12 w-12 inline-flex items-center justify-center rounded-full bg-teal-100">
              <i class="fi-rr-arrow-up text-2xl text-teal-500 font-bold"></i>
            </div>
            <div class="ml-3">
              <p class="text-lg">Registered Clients</p>
              <span class="text-2xl font-bold">1189</span>
            </div>
            <div class="ml-auto cursor-pointer">
              <i class="fi-rr-angle-right font-bold text-xs"></i>
            </div>
          </ReportCard>
          <ReportCard class="border flex items-center py-2 px-3">
            <div class="h-12 w-12 inline-flex items-center justify-center rounded-full bg-red-100">
              <i class="fi-rr-arrow-down text-2xl text-red-500 font-bold"></i>
            </div>
            <div class="ml-3">
              <p class="text-lg">Unregistered Clients</p>
              <span class="text-2xl font-bold">12</span>
            </div>
            <div class="ml-auto cursor-pointer">
              <i class="fi-rr-angle-right font-bold text-xs"></i>
            </div>
          </ReportCard>
        </div>
        <ReportCard class="flex-grow px-2">
          <div class="mb-8 flex items-center justify-between">
            <div class="pt-0.5 select-none text-sm font-medium px-2 border rounded-md cursor-pointer text-primary-color">
              Total Clients <i class="ml-1 mt-1 fi-rr-caret-down"></i>
            </div>
            <div class="text-sm">
              <button class="text-primary-color">Year</button>
              <button class="ml-2">Month</button>
              <button class="ml-2">Week</button>
              <button class="ml-2">More <i class="fi-rr-caret-down"></i></button>
            </div>
          </div>
          <div>
            <canvas id="client-chart"></canvas>
          </div>
        </ReportCard>
      </div>
      <div class="flex flex-col gap-4">
        <ReportCard class="py-2">
          <p class="text-lg">Total Dogs</p>
          <span class="text-2xl font-bold">1200</span>
        </ReportCard>
        <ReportCard class="flex-grow">
          <h4 class="font-bold text-lg">Dogs Age Bracket</h4>
          <div class="p-8">
            <canvas id="dog-breeds"></canvas>
          </div>
        </ReportCard>
      </div>
    </div>
    <div class="w-full">
      <h4 class="text-lg text-gray-700 font-bold mb-3">Breeds (24)</h4>
      <div class="lg:flex gap-4 w-full">
        <ReportCard v-for="x in 4" :key="x" class="flex items-center">
          <div class="bg-blue-100 h-14 w-14 rounded-full inline-flex justify-center items-center mr-3">
            <img src="~/assets/img/dog.svg">
          </div>
          <div class="text-gray-700 font-medium">
            <p>Lhasa Apso</p>
            <span>12</span>
          </div>
        </ReportCard>
      </div>
    </div>
  </div>
</template>

<script>
import { Chart, registerables } from "chart.js"
Chart.register(...registerables)
export default {
 mounted() {
   const clientsData = {
     type: "line",
     data: {
       labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
       datasets: [
         {
           data: [ 40, 140, 110, 230, 592, 385,82, 214, 90, 140, 410, 230 ],
           backgroundColor: ["rgba(37, 99, 235, 0.11)", "rgba(255, 255, 255, 0)"],
           borderColor: "#3B82F6",
           borderWidth: 2
         }
       ]
     },
     options: {
       events: ['mousemove', 'mouseout', 'click'],
       hover: {
         
       },
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
           grid: {
             display: false
           },
           ticks: {
             beginAtZero: true,
             padding: 10
           }
         },
         yAxis:{
           tickColor: 'red',
            grid: {
              display: 'false'
            },
            ticks: {
              beginAtZero: true,
                 padding: 10
            }
         }
        }
      }
    }
   const breedsData = {
     type: "doughnut",
     data: {
       labels: ['Rot', 'Wolf', 'Teddy', 'Billy', 'Jane', 'Believe'],
       datasets: [
         {
           fill: {
             target: 'origin',
           },
           data: [ 40, 90, 140, 410, 230, 64 ],
           backgroundColor: ['rgb(255, 99, 132)', 'rgb(255, 159, 64)', 'rgb(255, 205, 86)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)'],
           borderWidth: 2
         }
       ]
     },
     options: {
       plugins: {
         legend: {
           display: false
         }
       },
       responsive: true
     }
   }
    
   const clientsCtx = document.getElementById('client-chart').getContext('2d');
   this.clientChart = new Chart(clientsCtx, clientsData);
   
   const breedCtx = document.getElementById('dog-breeds').getContext('2d');
   new Chart(breedCtx, breedsData);
   
 }
}
</script>

<style scoped>
 /** {*/
 /*  border: 1px solid red;*/
 /*}*/
</style>