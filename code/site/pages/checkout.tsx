import { GetServerSideProps, NextPage } from 'next';
import React from 'react';
import Stripe from 'stripe';

import * as Crypto from 'constants/functions/crypto';
import { PaymentHash } from 'constants/types';

const CheckoutPage: NextPage = () => {
  return <div></div>;
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SK!, {
    apiVersion: '2020-08-27',
  });
  const { quantity, format } = Crypto.decryptJSON<PaymentHash>(
    query.q as string,
  );

  const products = {
    pdf: process.env.UNIT_PRICE_ID_PDF!,
    png: process.env.UNIT_PRICE_ID_PNG!,
  };

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: [
      {
        price: products[format],
        quantity,
      },
    ],
    success_url: process.env.DOMAIN!,
    cancel_url: `${process.env.DOMAIN!}/design`,
    // discounts: [
    //   {
    //     promotion_code: 'promo_1KvRydIFI88zNbJfO8CWs5sB',
    //   },
    // ],
    automatic_tax: { enabled: true },
  });

  return {
    redirect: {
      destination: session.url!,
      statusCode: 303,
    },
  };
};

export default CheckoutPage;