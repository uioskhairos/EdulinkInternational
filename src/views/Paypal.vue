<template v-show="role == 'student'">
  <div>
    <div v-if="!paidFor">
      <h1>Pre Register Now - ${{ product.price }}</h1>

      <p>{{ product.description }}</p>
    </div>

    <div v-if="paidFor">
      <h1>Payment Successful! Please wait for confirmation.</h1>
    </div>

    <div ref="paypal"></div>
  </div>
</template>

<script>
const fb = require("@/firebaseConfig.js");
export default {
  name: "success",

  data: function () {
    return {
      loaded: false,
      paidFor: false,
      product: {
        price: 200,
        description: "Pre-registration",
        img: "https://i0.wp.com/largescalenordics.com/wp-content/uploads/2019/08/pre-register-now.png?fit=300%2C281&ssl=1",
      },
    };
  },
  mounted: function () {
    const script = document.createElement("script");
    script.src = "https://www.paypal.com/sdk/js?client-id=ARyn0XIlFIrGJuCq0fpOX1NoNVzyvYD0XkqIkmFScIgumE48SNbRwq2RfUqUJmROcvw8idv96Ug9BbiO&currency=SGD";
    script.addEventListener("load", this.setLoaded);
    document.body.appendChild(script);
  },
  methods: {
    setLoaded: function () {
      this.loaded = true;
      window.paypal
        .Buttons({
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  description: this.product.description,
                  amount: {
                    currency_code: "SGD",
                    value: this.product.price,
                  },
                },
              ],
            });
          },
          onApprove: async (data, actions) => {
            const order = await actions.order.capture();
            this.paidFor = true;
            console.log(order);
            //record transaction
            fb.tranx
              .add({
                uid: this.$store.state.uid,
                amount: parseInt(order.purchase_units[0].amount.value),
                method: "Paypal",
                account: order.payer.email_address,
                status: "pending",
                type: "cashin",
                paypalStatus: order.status,
                refnum: order.id,
                time: Date.now(),
              })
              .then(function () {
                console.log("Document successfully written!");
              })
              .catch(function (error) {
                console.error("Error writing document: ", error);
              });
          },
          onError: (err) => {
            console.log(err);
          },
        })
        .render(this.$refs.paypal);
    },
  },
};
</script>
