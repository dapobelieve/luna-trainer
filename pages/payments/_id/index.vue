<template>
  <div>
    <div
      v-if="loading"
      class="
        fixed
        preloader
        top-0
        h-full
        w-full
        flex
        items-center
        justify-center
      "
    >
      <div class="inline-flex flex-col items-center">
        <img class="h-8 mb-3" src="~/assets/img/logo-v2.svg" />
        <SingleLoader height="20px" width="20px" />
      </div>
    </div>

    <div class="lg:w-[400px] md:w-full m-auto">
      <main else class="place-content-center">
        <div class="mt-10">
          <div class="justify-center">
            <div class="bg-white rounded-lg pb-4">
              <div class="bg-[#3b82f6] rounded-t-lg py-5 pl-4 flex">
                <NuxtLink to="/">
                  <img class="h-8" src="~/assets/img/logo-v2-fff.svg" />
                </NuxtLink>
              </div>
              <div class="px-4 my-2 bg-white">
                <div>
                  <p class="text-1xl font-semibold text-gray-600 flex items-end">
                    <span>Invoice </span>
                    <InvoiceStatusComponent
                      v-if="!isPayable"
                      :status="status"
                    />
                  </p>

                  <div class="flex justify-between space-x-9">
                    <div class="">
                      <p class="text-xs py-4 text-slate-500">From</p>
                      <p class="text-sm font-bold text-gray-900">
                        {{ from }}
                      </p>
                    </div>
                    <div class="">
                      <p class="text-xs py-4 text-slate-500">To</p>
                      <p class="text-sm font-bold font-100 text-gray-900">
                        {{ to }}
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  class="bg-slate-50 py-5 my-4 px-5 shadow-sm rounded-lg"
                  style="background-color: #e2e8f0"
                >
                  <p class="text-slate-500 text-sm">Amount</p>
                  <p class="text-slate-700 text-2xl font-bold">
                    {{ total }}
                  </p>
                  <p class="text-xs text-slate-700">
                    <span class="text-4xl mt-1 text-red-500"> . </span>Due on
                    {{ dueDate }}
                  </p>
                </div>

                <div>
                  <div v-for="item in items" :key="item._id" class="my-5">
                    <p class="text-xs font-medium text-slate-700">
                      {{ item.description }}
                    </p>
                    <div class="flex justify-between">
                      <p class="text-sm text-slate-500">Qty {{ item.qty }}</p>
                      <p class="text-xs text-slate-700">
                        {{ formatNumber(item.price, currency) }}
                      </p>
                    </div>
                  </div>
                  <hr class="bg-lightgray" style="margin-bottom: 20px" />

                  <div class="flex justify-between">
                    <div class="text-sm text-slate-700">Total</div>
                    <div class="text-sm text-slate-700 font-bold">
                      {{ total }}
                    </div>
                  </div>
                </div>

                <div v-if="isPayable">
                  <h4 class="mt-9 text-slate-700 text-xs">Payment Options</h4>
                  <div class="flex flex-col mt-4">
                    <button
                      v-if="supportedPaymentMethods.includes('stripe')"
                      class="button-outline my-2"
                      @click="openModal('stripe')"
                    >
                      <span class="text-xs font-bold"> Pay with </span>
                      <img
                        src="~/assets/img/stripe.png"
                        alt=""
                        class="w-15 h-5"
                      />
                    </button>
                    <button
                      v-if="supportedPaymentMethods.includes('paypal')"
                      class="button-outline my-2"
                      @click="openModal('paypal')"
                    >
                      <span class="text-xs font-bold mr-1"> Pay with </span>
                      <img
                        src="~/assets/img/paypal.png"
                        alt=""
                        class="w-15 h-5"
                      />
                    </button>
                    <button
                      v-if="supportedPaymentMethods.includes('bank')"
                      class="button-outline my-2"
                      @click="openModal('bank')"
                    >
                      <span class="text-xs font-bold mr-1"> Pay with Bank</span>
                      <i
                        data-v-3a2f61b0=""
                        role="button"
                        class="fi-rr-bank mr-2 text-gray-700 h-5 w-5"
                      ></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Modal name="pay-with-bank" height="auto" :adaptive="true" width="500">
        <template v-slot>
          <div class="p-4 py-5">
            <h1 class="text-1xl font-bold pb-6">Pay With Bank</h1>
            <p class="text-sm text-slate-500 font-100 text-slate-700">
              Make your payment directly to the bank account provided below
            </p>
            <div
              class="
                bg-blue-100
                my-4
                py-4
                px-5
                rounded-lg
                border border-grey-100
              "
            >
              <h1 class="font-bold">{{ bankName }}</h1>
              <div
                v-if="bankData"
                class="flex flex-row flex-wrap justify-spacearound"
              >
                <div
                  v-for="v in bankData"
                  :key="v.title"
                  class="flex flex-row my-4"
                >
                  <div style="">
                    <div class="text-xs pb-1">
                      {{ v.title }}
                    </div>
                    <div class="font-bold text-xs">
                      {{ v.value }}
                    </div>
                  </div>
                  <div
                    class="
                      text-primary-500
                      justify-center
                      align-center
                      py-1
                      mx-8
                      flex flex-row
                      cursor-pointer
                    "
                    @click="copyToClipboard(v.value)"
                  >
                    <i class="fi-rr-copy text-primary-1000" />
                  </div>
                </div>
              </div>
              <div class="my-4 text-xs text-green-1000">
                Note - When making your payment, add the reference code along
                with your transfer for easy confirmation
              </div>
            </div>
            <div class="flex justify-end">
              <button class="button-outline mx-2" @click="closeModal">
                Pay Later
              </button>
              <button-spinner class="button-fill" @click="goToNotifyTrainerPage">
                Notify trainer of payment
              </button-spinner>
            </div>
          </div>
        </template>
      </Modal>
    </div>
  </div>
</template>
<style lang="scss" scoped></style>

<script>
import { mapActions } from "vuex";
import { format } from "date-fns";

export default {
  name: "InvoicePayment",
  layout: "empty",
  middleware: ["validToken"],
  auth: false,
  data() {
    return {
      loading: false,
      showCopyButtons: false,
      isOpen: false,
      bankData: [],
      bankName: "",
      items: [],
      amount: 0,
      currency: "",
      from: "",
      to: "",
      dueDate: "",
      supportedPaymentMethods: [],
      total: 0,
      status: "",
      isPayable: false,
      invoiceDetails: {},
    };
  },
  computed: {
    routeName() {
      return this.$route.name;
    },
  },
  mounted() {
    this.getDetailsOfInvoice(this.$route?.params?.id ?? "");
  },
  methods: {
    ...mapActions({
      getPaymentLink: "invoice/getPaymentLink",
      notifyTrainer: "invoice/clientCreatePaymentReceipt",
    }),
    openModal(type) {
      switch (type) {
        case "bank":
          this.$modal.show("pay-with-bank");
          break;
        case "stripe":
          this.handleStripeClick();
          break;
        case "paypal":
          this.handlePaypalClick();
          break;
      }
    },
    copyToClipboard(text) {
      // copy to clipboard, works on chrome, firefox, edge, not on IE and Safari
      const el = document.createElement("textarea");
      el.value = text;
      el.setAttribute("readonly", "");
      el.style.position = "absolute";
      el.style.left = "-9999px";
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      this.$lunaToast.show("copied to clipboard");
    },
    async getDetailsOfInvoice(id) {
      this.loading = true;
      const response = await this.getPaymentLink(id);
      this.loading = false;
      const { data } = response;
      this.from = data?.createdBy?.name;
      this.to = data?.customerId?.name;
      this.currency = data?.currency;
      this.invoiceDetails = data;
      this.total = this.formatNumber(data?.total, data?.currency);
      this.status = data?.status;
      this.dueDate = format(
        new Date(data?.dueDate ?? Date.now()),
        "MMM dd yyyy"
      );
      this.isPayable = data?.status === "pending";
      this.supportedPaymentMethods = data.supportedPaymentMethods?.map(
        (i) => i.type
      );
      this.items = data?.items;
      this.getBankDetails();
    },
    closeModal() {
      this.$modal.hide("pay-with-bank");
    },
    formatNumber(num, currency = "GBP") {
      return new Intl.NumberFormat("en", {
        style: "currency",
        currency,
      }).format(num);
    },
    async goToNotifyTrainerPage() {
      try {
        if (this.$route.params.id) {
          this.loading = true
          await this.notifyTrainer({
            invoiceId: this.$route.params.id,
            paymentDate: new Date(),
            paymentType: "TRANSFER",
          });
          this.loading = false
          this.closeModal();
          this.$router.push({
            name: "payments-id-notify",
            params: { id: this.$route.params.id },
          });
        } else {
          this.$lunaToast.error("Id cannot be found");
        }
      } catch {
        this.$lunaToast.error("an error occured");
      }
    },
    handleStripeClick() {
      window.location = `${process.env.PAYMENT_HOST_URL}/payment/?id=${
        this.$route?.params?.id ?? ""
      }`;
    },
    handlePaypalClick() {
      window.location = `${process.env.PAYMENT_HOST_URL}/payment/?id=${
        this.$route.params.id ?? ""
      }`;
    },
    getBankDetails() {
      const data =
        this.invoiceDetails.supportedPaymentMethods?.find(
          (i) => i.type === "bank"
        )?.bank ?? {};
      this.bankName = data.accountBankName ?? "";
      this.bankData = [
        { title: "Account Number", value: data?.accountNo ?? "" },
        { title: "Sort Code", value: data?.sortCode ?? "" },
        {
          title: "Reference code",
          value: this?.invoiceDetails?.invoiceNo ?? "",
        },
      ];
      return data;
    },
  },
  head() {
    return {
      title: "InvoicePayment",
    };
  },
};
</script>
<style lang="scss" scoped>
.base-button {
  &:hover {
    background: #46a6c8;
  }
  &:focus {
    outline: none;
  }
}
.error {
  @apply border-red-500;
}
</style>
