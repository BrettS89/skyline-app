import Resource from '../../database';
// import { Role } from './role';
// import { Account } from './account';

export interface User extends Partial<Resource> {
  account?: any;
  account_id?: string;
  role_id: string;
  email: string;
  role?: any;
  github_username?: string;
  github_orgs: string[];
  github_access_key?: string;
  aws_keys?: {
    access_key_id: string;
    secret_access_key: string;
  }
}
