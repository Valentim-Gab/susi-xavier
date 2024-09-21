interface User {
  id: number;
  name: string;
  last_name?: string;
  email: string;
  phone_number?: string;
  date_birth?: Date;
  profile_image?: string;
  role: Array<'admin' | 'user'>;
}
