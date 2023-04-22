import { DataSource } from 'typeorm';
import { connectionDB } from './typeorm.config';

const AppDataSource: DataSource = new DataSource({ ...connectionDB });
export default AppDataSource;
