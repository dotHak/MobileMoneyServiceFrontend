export const baseUrl: string = " https://momoservice.herokuapp.com/api/v1/";
export interface UserDetail {
  id?: number;
  firstName: string;
  middleName?: string;
  lastName: string;
  houseNumber: string;
  region: string;
  city: string;
  town: string;
}

export interface ErrorResponse {
  errors: string[];
  status: number;
}

export function isErrorResponse(
  res: any | ErrorResponse
): res is ErrorResponse {
  return (res as ErrorResponse).errors !== undefined;
}

export interface NotFoundResponse {
  error: string;
  status: number;
  message: string;
  path: string;
}

export function isNotFoundResponse(
  res: any | NotFoundResponse
): res is NotFoundResponse {
  return (res as NotFoundResponse).error !== undefined;
}

export type NetworkType = "MTN" | "VODAFONE" | "AIRTEL_TIGO";
export type RoleType = "USER" | "MERCHANT";

export interface Network {
  id?: number;
  name: NetworkType;
}

export const networkList: Network[] = [
  { id: 1, name: "MTN" },
  { id: 2, name: "VODAFONE" },
  { id: 3, name: "AIRTEL_TIGO" },
];
export interface PhoneNumber {
  id?: number;
  network: Network;
  number: string;
  isDefault: boolean;
}

export function isPhoneNumber(res: Network | PhoneNumber): res is PhoneNumber {
  return (res as PhoneNumber).number !== undefined;
}

type StatusType = "SUCCESS" | "FAILED" | "CANCELLED" | "PENDING";

export interface Status {
  id?: number;
  name: StatusType;
}

export const statusList: Status[] = [
  { id: 1, name: "SUCCESS" },
  { id: 1, name: "FAILED" },
  { id: 1, name: "CANCELLED" },
  { id: 1, name: "PENDING" },
];

export interface Transaction {
  id?: number;
  sender: PhoneNumber;
  receiver: PhoneNumber;
  status: Status;
  price: number;
  createdDate: Date;
}

export interface NewTransaction {
  sender?: PhoneNumber;
  receiver?: PhoneNumber;
  price: number;
  email?: string;
}

export interface Fingerprint {
  id: number;
}

export interface Role {
  id: number;
  name: RoleType;
}

export interface AppUser {
  id: number;
  enable: boolean;
  phoneNumbers?: PhoneNumber[];
  roles: Role[];
  createdDate: Date;
  defaultPhoneNumber?: PhoneNumber;
  email: string;
}

export function isAppUser(res: AppUser | any): res is AppUser {
  return (res as AppUser).email !== undefined;
}

export interface Merchant {
  id?: number;
  name: string;
  address: string;
  email: string;
  city: string;
  region: string;
  phoneNumbers: PhoneNumber[];
  createdDate?: Date;
}
