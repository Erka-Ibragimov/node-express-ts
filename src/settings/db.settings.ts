import { DataSource } from 'typeorm';
import { UsersData } from '../users/user.table';

export const AppDataSource = new DataSource({
	type: 'postgres',
	host: '127.0.0.1',
	port: 5432,
	username: 'postgres',
	password: 'root123',
	database: 'node-ts-express',
	entities: [UsersData],
	synchronize: true,
});

