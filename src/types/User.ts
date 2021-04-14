import { Request, Response } from "express";
export interface User {
  fname: string;
  lname: string;
  email: string;
  password: string;
  nicename: string;
}

export interface Product {
  product: string;
  productDesc: string;
  productPrice: number;
  isActive: boolean;
  supplierId: number;
  userId: number;
}

export interface ResUser extends Request {
  userId: number;
}
