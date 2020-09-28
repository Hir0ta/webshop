import { uuid } from 'uuidv4';

export function addRequestHandler(dbConnection, app, transporter?, urls?)
{

	app.post('/addAdmin', async function (req, res)
	{
		//console.log(req.body);
		if (!req.body.jtoken) 
		{
			res.send("Haha, it won't work! :P"); return;
		}
		else
		{
			let token = await dbConnection('webshop').select().from('token_table').where(
				{
					jtoken: req.body.jtoken
				}
			);
			if (token.length != 1) return;
		}

		let user = await dbConnection('webshop').select().from('admin_users').where(
			{
				user_name: req.body.user_name,
				deleted: 0
			}
		).orWhere(
			{
				email: req.body.email,
				deleted: 0
			}
		);
		//console.log(user);

		if (user.length != 0) 
		{
			res.send(false);
			return;
		};

		await dbConnection('admin_users').insert(
			{
				user_name: req.body.user_name,
				email: req.body.email,
				activated: 0,
				deleted: 0
			}
		);

		let adminID = await dbConnection('webshop').select('adminID').from('admin_users').where(
			{
				user_name: req.body.user_name,
				deleted: 0
			}
		);
		adminID = adminID[0].adminID;

		let jtoken = uuid();
		await dbConnection('token_table').insert(
			{
				adminID: adminID,
				jtoken: jtoken,
			}
		);
		transporter.sendMail(
			{
				from: "noreply@webshop.com",
				to: req.body.email,
				subject: "Admin felhasználó jelszó regisztráció",
				html:
					"<p>Önt felvették a webshop adminjai közé. Az alábbi linken tud jelszót beállítani magának:</p>" +
					"<a>" + urls.adminActivationPrefix + jtoken + "</a>"
			}
		);
		res.send(true);
	});

	app.post('/modifyAdmin', async function (req, res)
	{
		//console.log(req.body);
		if (!req.body.jtoken) 
		{
			res.send("Haha, it won't work! :P"); return;
		}
		else
		{
			let token = await dbConnection('webshop').select().from('token_table').where(
				{
					jtoken: req.body.jtoken
				}
			);
			if (token.length != 1) return;
		}

		let user = await dbConnection('webshop').select().from('admin_users').where(
			{
				user_name: req.body.user_name,
				deleted: 0
			}
		).orWhere(
			{
				email: req.body.email,
				deleted: 0
			}
		);
		//console.log(user.length);

		if (user.length != 0) 
		{
			//console.log('false');
			res.send(false);
			return;
		}
		else
		{
			//console.log('true');
			await dbConnection('admin_users').where({ 'adminID': req.body.id }).update(
				{
					user_name: req.body.user_name,
					email: req.body.email
				}
			);
			res.send(true);
		}


	})

	app.post('/adminNewPassword', async function (req, res)
	{
		if (!req.body.jtoken) 
		{
			res.send("Haha, it won't work! :P"); return;
		}

		let user = await dbConnection('webshop').select().from('token_table').where(
			{
				jtoken: req.body.jtoken
			}
		);
		if (user.length == 1)
		{
			await dbConnection('admin_users').where({ adminID: user[0].adminID }).update(
				{
					password: req.body.password,
					activated: 1
				});
			await dbConnection('webshop').delete().from('token_table').where(
				{
					jtoken: req.body.jtoken
				}
			);
			res.send(true);
		}
		else
		{
			res.send(false);
		}
	});

	app.post('/adminPasswordReq', async function (req, res)
	{
		let user = await dbConnection('webshop').select().from('admin_users').where(
			{
				email: req.body.email,
				deleted: 0
			}
		);
		let jtoken = uuid();
		await dbConnection('token_table').insert(
			{
				adminID: user[0].adminID,
				jtoken: jtoken
			}
		)

		transporter.sendMail(
			{
				from: "noreply@webshop.com",
				to: req.body.email,
				subject: "Admin új jelszó igénylése",
				html:
					"<p>Kérjük adja meg új jelszavát:</p>" +
					"<a>" + urls.adminActivationPrefix + jtoken + "</a>"
			}
		);
		res.send(true);
	})

	app.post('/loginAdmin', async function (req, res)
	{

		let user = await dbConnection('webshop').select().from('admin_users').where(
			{
				user_name: req.body.user_name,
				password: req.body.password,
				activated: 1,
				deleted: 0
			}
		);
		if (user.length == 1)
		{
			user[0].jtoken = uuid();
			let add = await dbConnection('token_table').insert(
				{
					adminID: user[0].adminID,
					jtoken: user[0].jtoken,
				}
			);
			res.send(user);
		}
		else
		{
			res.send(false);
		}
	});

	app.post('/checkAdmin', async function (req, res)
	{
		let user = await dbConnection('webshop').select().from('token_table').where(
			{
				jtoken: req.body.jtoken
			}
		);
		if (user.length == 1)
		{
			res.send(user);
		}
		else
		{
			res.send(false);
		}
	});

	app.post('/destroyJToken', async function (req, res)
	{
		let user = await dbConnection('webshop').delete().from('token_table').where(
			{
				jtoken: req.body.jtoken
			}
		);
		res.send(true);
	});




	app.post('/listAdmins', async function (req, res)
	{

		if (!req.body.jtoken) 
		{
			res.send("Haha, it won't work! :P"); return;
		}
		else
		{
			let token = await dbConnection('webshop').select().from('token_table').where(
				{
					jtoken: req.body.jtoken
				}
			);
			if (token.length != 1) return;
		}

		let readAll;

		if (req.body.deleted === false)
		{
			readAll = await dbConnection('webshop').select('adminID', 'user_name', 'email').from('admin_users').where({ deleted: '0' }).orderBy(req.body.order, req.body.dir);
		}
		else if (req.body.deleted == true)
		{
			readAll = await dbConnection('webshop').select().from('admin_users').orderBy(req.body.order, req.body.dir);
		};

		res.send(readAll);
	});

	app.post('/deleteAdmin', async function (req, res)
	{
		if (!req.body.jtoken) 
		{
			res.send("Haha, it won't work! :P"); return;
		}
		else
		{
			let token = await dbConnection('webshop').select().from('token_table').where(
				{
					jtoken: req.body.jtoken
				}
			);
			if (token.length != 1) return;
		}

		let del = await dbConnection('admin_users').where({ 'adminID': req.body.id }).update({ 'deleted': 1 });
		res.send(true);
	})

}