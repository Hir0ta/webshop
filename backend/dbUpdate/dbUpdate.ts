import sha256 from 'crypto-js/sha256';
import { exit } from 'process';

export async function createTable(dbConnection)
{
	let adminTable = await dbConnection.schema.createTableIfNotExists('admin_users', function (table)
	{
		table.increments('id');
		table.string('user_name')
		table.string('email');
		table.string('password');
		table.integer('activated');
		table.integer('deleted')
	});
	
	let defaultUser = await dbConnection('webshop').select().from('admin_users').where(
		{
			user_name: 'admin',
			deleted: 0
		}
	)

	if(defaultUser.length == 0)
	{
		let deafaultAdmin = await dbConnection('admin_users').insert(
			{
				user_name: 'admin',
				password: sha256('admin'),
				activated: 1,
				deleted: 0
			}
		);
	}

	let tokenTable = await dbConnection.schema.createTableIfNotExists('token_table', function (table)
	{
		table.string('admin_id');
		table.string('jtoken');
	});

	let topLevel = await dbConnection.schema.createTableIfNotExists('top_level', function (table)
	{
		table.increments('id');
		table.string('name');
		table.integer('deleted');
	});

	let midLevel = await dbConnection.schema.createTableIfNotExists('mid_level', function (table)
	{
		table.increments('id');
		table.string('name');
		table.integer('parent');
		table.integer('deleted');
	});

	let bottomLevel = await dbConnection.schema.createTableIfNotExists('bottom_level', function (table)
	{
		table.increments('id');
		table.string('name');
		table.integer('parent');
		table.integer('deleted');
	});

	let productTable = await dbConnection.schema.createTableIfNotExists('product',function (table)
	{
		table.increments('id');
		table.string('name');
		table.integer('price');
		table.integer('category');
		table.integer('deleted');
	});

	process.exit();
}
