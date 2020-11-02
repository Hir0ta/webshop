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
		table.integer('admin_id');
		table.integer('user_id');
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

	let filters = await dbConnection.schema.createTableIfNotExists('filters',function(table)
	{
		table.increments('id');
		table.string('name');
		table.string('unit');
		table.integer('category');
	});

	let filter_data = await dbConnection.schema.createTableIfNotExists('filter_data', function(table)
	{
		table.integer('filter');
		table.string('data');
		table.integer('product');
	});

	let userTable = await dbConnection.schema.createTableIfNotExists('users', function(table)
	{
		table.increments('id');
		table.string('user_name');
		table.string('email');
		table.string('password');
		table.integer('activated');
		table.integer('deleted');
	});

	let order = await dbConnection.schema.createTableIfNotExists('orders', function(table)
	{
		table.string('order_id');
		table.integer('user');
		table.integer('product');
		table.integer('qty');
		table.integer('status');
	})

	let invoice = await dbConnection.schema.createTableIfNotExists('invoices', function(table)
	{
		table.increments('id');
		table.integer('user');
		table.string('name');
		table.string('inv_postcode');
		table.string('inv_city');
		table.string('inv_street');
		table.string('inv_house_num');
		table.string('ship_postcode');
		table.string('ship_city');
		table.string('ship_street');
		table.string('ship_house_num');
	})

	process.exit();
}
