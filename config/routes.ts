const paths = {
  accountCreated: '/account_created',
  cart: '/view_cart',
  checkout: '/checkout',
  login: '/login',
  payment: '/payment',
  products: '/products',
  signup: '/signup',
};

export function getPath(path: string): string {
  return paths[path];
}
