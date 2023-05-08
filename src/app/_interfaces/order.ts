export interface Order {
  id: string,
  customer_email: string,
  store_email: string,
  sub_total: string,
  payment_type: string,
  discount: string,
  total: string,
  date: string | undefined,
  time: string | undefined,
  status: string,
  rejected_reasons: string,
  products: [{
    id: string,
    item_name: string,
    price: string,
    quantity: string,
    url: string,
    product_total: string
  }]
}
