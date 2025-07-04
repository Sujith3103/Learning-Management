import GooglePayButton from '@google-pay/button-react';

<GooglePayButton
  environment="TEST" // change to "PRODUCTION" when you go live
  paymentRequest={{
    apiVersion: 2,
    apiVersionMinor: 0,
    allowedPaymentMethods: [
      {
        type: 'CARD',
        parameters: {
          allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
          allowedCardNetworks: ['VISA', 'MASTERCARD'],
        },
        tokenizationSpecification: {
          type: 'PAYMENT_GATEWAY',
          parameters: {
            gateway: 'stripe',  // for example
            gatewayMerchantId: 'stripe_merchant_id_here', // from your processor
          },
        },
      },
    ],
    merchantInfo: {
      merchantId: 'your_merchant_id_here', // get this from Google Pay Merchant Center
      merchantName: 'Your Business Name',
    },
    transactionInfo: {
      totalPriceStatus: 'FINAL',
      totalPriceLabel: 'Total',
      totalPrice: '100.00',
      currencyCode: 'USD',
      countryCode: 'US',
    },
  }}
  onLoadPaymentData={paymentRequest => {
    console.log('load payment data', paymentRequest);
    // paymentRequest.paymentMethodData.tokenizationData.token
    // send that token to your backend for processing
  }}
/>
