export interface IProduct {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  price: number;
  rating: {
    rate: number;
    count: number;
  };
}

export interface ILogin {
  username: string;
  password: string;
}

export type AccessToken = {
  sub: number;
  user: string;
  iat: number;
};
