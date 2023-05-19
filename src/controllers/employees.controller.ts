import { PrismaClient, Employee } from "@prisma/client";
import { Request, Response } from "express";
const db = new PrismaClient();

export const getAllEmployees = async (req: Request, res: Response) => {
  return res.json(await db.employee.findMany());
};

export const getEmployeeById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const employee = await db.employee.findUnique({ where: { id } });
  
  if(!employee)
    return res.status(404).json({ message: "Employee not found" });

  return res.json(employee);
}

export const createEmployee = async (req: Request, res: Response) => {
  const { name, email, phone, address, salary } = req.body;

  if(!name || !email || !phone || !address || !salary)
    return res.status(400).json({ message: "Invalid employee data" });

  const employeeData = {
    name,
    email,
    phone,
    address,
    salary,
  };

  return res.json(await db.employee.create({ data: employeeData }));
}

export const updateEmployee = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email, phone, address, salary } = req.body;

  if(!name || !email || !phone || !address || !salary)
    return res.status(400).json({ message: "Invalid employee data" });

  const employeeData = {
    name,
    email,
    phone,
    address,
    salary,
  };

  const employee = await db.employee.update({
    where: { id },
    data: employeeData,
  });

  if(!employee)
    return res.status(404).json({ message: "Employee not found" });

  return res.json(employee);
}

export const deleteEmployee = async (req: Request, res: Response) => {
  const { id } = req.params;

  const employee = await db.employee.delete({ where: { id } });

  if(!employee)
    return res.status(404).json({ message: "Employee not found" });

  return res.json(employee);
}

