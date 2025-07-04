export function initGooglePay() {
  if (!window.google) {
    console.error("Google Pay script not loaded");
    return;
  }

  const paymentsClient = new google.payments.api.PaymentsClient({
    environment: 'TEST',
  });

  const paymentRequest = {
    apiVersion: 2,
    apiVersionMinor: 0,
    allowedPaymentMethods: [{
      type: 'CARD',
      parameters: {
        allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
        allowedCardNetworks: ['VISA', 'MASTERCARD'],
      },
      tokenizationSpecification: {
        type: 'PAYMENT_GATEWAY',
        parameters: {
          gateway: 'stripe',
          gatewayMerchantId: 'yourGatewayMerchantId'
        },
      },
    }],
    merchantInfo: {
      merchantId: 'yourMerchantId',
      merchantName: 'Your Business Name',
    },
    transactionInfo: {
      totalPriceStatus: 'FINAL',
      totalPrice: '100.00',
      currencyCode: 'INR',
      countryCode: 'IN',
    },
  };

  paymentsClient.isReadyToPay({
    allowedPaymentMethods: paymentRequest.allowedPaymentMethods
  }).then(function (response) {
    if (response.result) {
      const button = paymentsClient.createButton({
        onClick: () => onGooglePayButtonClicked(paymentsClient, paymentRequest)
      });
      document.getElementById('container').appendChild(button);
    } else {
      console.log('Google Pay not available');
    }
  }).catch(function (err) {
    console.error('isReadyToPay error: ', err);
  });
}

export function onGooglePayButtonClicked() {
  paymentsClient.loadPaymentData(paymentRequest)
    .then(function (paymentData) {
      console.log('PaymentData:', paymentData);
      const token = paymentData.paymentMethodData.tokenizationData.token;
      console.log('Token:', token);
      // send token to your backend
    })
    .catch(function (err) {
      console.error('loadPaymentData error: ', err);
    });
}
