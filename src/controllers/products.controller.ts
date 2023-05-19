import { PrismaClient, Product } from '@prisma/client';
import { Request, Response } from 'express';
const db = new PrismaClient();

export const getAllProducts = async (req: Request, res: Response) => {
  return res.json(await db.product.findMany());
};

export const getProductById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await db.product.findUnique({ where: { id } });

  if (!product) return res.status(404).json({ message: 'Product not found' });

  return res.json(product);
};

export const createProduct = async (req: Request, res: Response) => {
  const { name, description, price } = req.body;

  if (!name || !description || !price)
    return res.status(400).json({ message: 'Invalid product data' });

  const productData = {
    name,
    description,
    price,
  };

  return res.json(await db.product.create({ data: productData }));
};

export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description, price } = req.body;

  if (!name || !description || !price)
    return res.status(400).json({ message: 'Invalid product data' });

  const productData = {
    name,
    description,
    price,
  };

  const product = await db.product.update({
    where: { id },
    data: productData,
  });

  if (!product) return res.status(404).json({ message: 'Product not found' });

  return res.json(product);
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  const product = await db.product.delete({ where: { id } });

  if (!product) return res.status(404).json({ message: 'Product not found' });

  return res.json(product);
};
