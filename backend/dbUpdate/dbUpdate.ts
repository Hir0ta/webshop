import sha256 from 'crypto-js/sha256';

export async function createTable(dbConnection)
{
	let adminTable = await dbConnection.schema.createTableIfNotExists('admin_users', function (table)
	{
		table.increments('adminID');
		table.string('user_name')
		table.string('email');
		table.string('password');
		table.integer('activated');
		table.integer('deleted')
	});

	let deafaultAdmin = await dbConnection('admin_users').insert(
		{
			user_name: 'admin',
			password: sha256('admin'),
			activated: 1,
			deleted: 0
		}
	);

	let tokenTable = await dbConnection.schema.createTableIfNotExists('token_table', function (table)
	{
		table.string('adminID');
		table.string('jtoken');
	})

	return;
}
