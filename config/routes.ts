const paths = {
  login: '/login',
  signup: '/signup',
  accountCreated: '/account_created'
};

export function getPath(path: string): string {
  return paths[path];
}
