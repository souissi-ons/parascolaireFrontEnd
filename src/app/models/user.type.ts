export type User = {
  _id: string;
  email: string;
  password: string;
  role: string;
  fullName?: string;
  phone?: string;
  imageUrl?: string;
};
