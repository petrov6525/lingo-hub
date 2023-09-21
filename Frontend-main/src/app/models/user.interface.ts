export interface User {
  id: number;
  email: string;
  name: string;
  password: string;
  token: string | null;
  logo_id: number | null;
}
