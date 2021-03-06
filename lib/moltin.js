import { gateway as MoltinGateway } from "@moltin/sdk";
import fetch from "isomorphic-unfetch";

const Moltin = MoltinGateway({
  client_id:
    process.env.MOLTIN_CLIENT_ID || "EdP3Gi1agyUF3yFS7Ngm8iyodLgbSR3wY4ceoJl0d2"
});

export const getProducts = includes => Moltin.Products.With(includes).All();

export const buyProduct = (product, token, customer, address) =>
  fetch(process.env.MICRO_ENDPOINT_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ product, token, customer, billing_address: address })
  });
