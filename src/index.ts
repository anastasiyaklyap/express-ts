import express, { Application, Router, Request, Response } from 'express';
import cors from 'cors';
import { Server } from 'http';
import departmentsRoutes from './routes/departments.routes';
import employeesRoutes from './routes/employees.routes';
import productsRoutes from './routes/products.routes';

interface Routes {
  path: string;
  routes: Router;
}

class App {
  private app: Application;
  routes: Routes[] = [];
  server: Server | null = null;

  constructor() {
    this.app = express();
  }

  addRoutes(path: string, routes: Router) {
    this.routes.push({ path, routes });
  }

  prepareRoutes() {
    for (const group of this.routes) {
      this.app.use(group.path, group.routes);
    }
  }

  run(port: string | number) {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));

    this.prepareRoutes();

    this.server = this.app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  }
}

const app = new App();
app.addRoutes('/api/', departmentsRoutes);
app.addRoutes('/api/', employeesRoutes);
app.addRoutes('/api/', productsRoutes);
app.run('3000');
