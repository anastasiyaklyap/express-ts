import { PrismaClient, Department } from "@prisma/client";
import { Request, Response } from "express";

const db = new PrismaClient();

export const getAllDepartments = async (req: Request, res: Response) => {
  return res.json(await db.department.findMany());
};

export const getDepartmentById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const department = await db.department.findUnique({ where: { id } });
  
  if(!department)
    return res.status(404).json({ message: "Department not found" });

  return res.json(department);
}

export const createDepartment = async (req: Request, res: Response) => {
  const { name, description } = req.body;

  if(!name || !description)
    return res.status(400).json({ message: "Invalid department data" });

  const departmentData = { 
    name,
    description
  };

  return res.json(await db.department.create({ data: departmentData }));
}

export const updateDepartment = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description } = req.body;
  
  if(!name || !description)
    return res.status(400).json({ message: "Invalid department data" });

  const departmentData = { 
    name,
    description
  };

  const department = await db.department.update({
    where: { id },
    data: departmentData,
  });

  if(!department)
    return res.status(404).json({ message: "Department not found" });

  return res.json(department);
}

export const deleteDepartment = async (req: Request, res: Response) => {
  const { id } = req.params;

  const department = await db.department.delete({ where: { id } });

  if(!department)
    return res.status(404).json({ message: "Department not found" });

  return res.json(department);
}

