type ProductTypes = {
  _id: string;
  title: string;
  inStock: boolean;
  price: number;
  category: { name: string; _id: string };
  desc: string;
  img: string;
};

type SaveProductTypes = {
  title: string;
  categoryId: string;
  img: string | File;
  desc: string;
  inStock: boolean | string;
  price: number | string;
};

type ProductCountTypes = {
  count: number;
}

type CategoryTypes = {
  _id: string;
  name: string;
};

type CartTypes = {
  title: string;
  img: string;
  desc: string;
  price: number;
  qty: number;
  productId: string;
};

type SaveCartTypes = {
  productId: string;
  qty: number;
};

type saveToCartTypes = {
  userId: string;
};

type WishlistTypes = {
  title: string;
  img: string;
  desc: string;
  price: number;
  qty?: number;
  productId: string;
};

type SaveWishlistTypes = {
  productId: string;
};

type DeliveryTypes = null | {
  _id: string;
  name: string;
  phone: string;
  address: string;
  state: string;
  lga: string;
  busStop: string;
};

type OrderTypes = {
  _id: string;
  paymentId: string;
  products: {
    title: string;
    desc: string;
    price: number;
    img: string;
    qty: number;
    productId: string;
    _id: string;
  }[];
  status: "pending" | "delivered" | "cancelled";
  subTotal: number;
  deliveryFee: number;
  deliveryAddress: string;
  datePurchased: string;
  total: number;
};

type OrdersCountTypes = {
  count: number;
}

type SalesTypes = {
  sales: number;
}

type SaveOrderTypes = {
  paymentId: string;
  subTotal: number;
  deliveryFee: number;
};

type StatusTypes = {
  status: "" | "pending" | "delivered" | "cancelled";
};

type CancelTypes = {
  status: "cancelled";
};

type SignUpTypes = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

type SignInTypes = {
  email: string;
  password: string;
};

type VerifyEmailTypes = {
  token: string | undefined;
};

type AuthMailTypes = {
  email: string;
};

type PasswordResetTypes = {
  token: string | undefined;
  password: string;
};

type CurrentUserTypes = null | {
  _id: string;
  email: string;
  isAdmin: boolean;
  firstName: string;
  iat: number;
};

type UserTypes = null | {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  isAdmin: boolean;
  img?: string;
  phone?: string;
  dob?: string;
};

type SaveUserTypes = {
  firstName: string;
  lastName: string;
  phone?: string;
  dob?: string;
};

type SaveUserPhotoTypes = {
  img: string;
};

type StatsTypes = {
  sales: number;
  ordersCount: number;
  month: string;
}

type SubscribeTypes = {
  firstName: string;
  email: string;
};
