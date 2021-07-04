import Resource from '../../database';

export interface Account extends Partial<Resource> {
  name: string;
}
