import { uuid } from 'uuidv4';

export function adminAuthRequest(args)
{

	args.app.post('/addAdmin', async function (req, res)
	{
		//console.log(req.body);
		if (!req.body.jtoken) 
		{
			res.send("Haha, it won't work! :P"); return;
		}
		else
		{
			let token = await args.dbConnection('webshop').select().from('token_table').where(
				{
					jtoken: req.body.jtoken
				}
			);
			if (token.length != 1) return;
		}

		let user = await args.dbConnection('webshop').select().from('admin_users').where(
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

		await args.dbConnection('admin_users').insert(
			{
				user_name: req.body.user_name,
				email: req.body.email,
				activated: 0,
				deleted: 0
			}
		);

		let admin_id = await args.dbConnection('webshop').select('id').from('admin_users').where(
			{
				user_name: req.body.user_name,
				deleted: 0
			}
		);
		admin_id = admin_id[0].id;

		let jtoken = uuid();
		await args.dbConnection('token_table').insert(
			{
				admin_id: admin_id,
				jtoken: jtoken,
			}
		);
		
		
		args.mailer.sendMail(
			{
				from: "noreply@webshop.com",
				to: req.body.email,
				subject: "Admin felhasználó jelszó regisztráció",
				html:
					"<p>Önt felvették a webshop adminjai közé. Az alábbi linken tud jelszót beállítani magának:</p>" +
					"<a>" + args.config.urls.adminActivationPrefix + jtoken + "</a>"
			}
		);
		res.send(true);
	});

	args.app.post('/modifyAdmin', async function (req, res)
	{
		//console.log(req.body);
		if (!req.body.jtoken) 
		{
			res.send("Haha, it won't work! :P"); return;
		}
		else
		{
			let token = await args.dbConnection('webshop').select().from('token_table').where(
				{
					jtoken: req.body.jtoken
				}
			);
			if (token.length != 1) return;
		}

		let user = await args.dbConnection('webshop').select().from('admin_users').where(
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

		//console.log(user.length);

		if (user.length != 1) 
		{
			//console.log('false');
			res.send(false);
			return;
		}
		else
		{
			//console.log('true');
			await args.dbConnection('admin_users').where({ id: req.body.id }).update(
				{
					user_name: req.body.user_name,
					email: req.body.email
				}
			);
			res.send(true);
		}


	})

	args.app.post('/adminNewPassword', async function (req, res)
	{
		if (!req.body.jtoken) 
		{
			res.send("Haha, it won't work! :P"); return;
		}

		let user = await args.dbConnection('webshop').select().from('token_table').where(
			{
				jtoken: req.body.jtoken
			}
		);
		if (user.length == 1)
		{
			await args.dbConnection('admin_users').where({ id: user[0].admin_id }).update(
				{
					password: req.body.password,
					activated: 1
				});
			await args.dbConnection('webshop').delete().from('token_table').where(
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

	args.app.post('/adminPasswordReq', async function (req, res)
	{
		let user = await args.dbConnection('webshop').select().from('admin_users').where(
			{
				email: req.body.email,
				deleted: 0
			}
		);
		let jtoken = uuid();
		await args.dbConnection('token_table').insert(
			{
				admin_id: user[0].id,
				jtoken: jtoken
			}
		)

		args.mailer.sendMail(
			{
				from: "noreply@webshop.com",
				to: req.body.email,
				subject: "Admin új jelszó igénylése",
				html:
					"<p>Kérjük adja meg új jelszavát:</p>" +
					"<a>" + args.urls.adminActivationPrefix + jtoken + "</a>"
			}
		);
		res.send(true);
	})

	args.app.post('/loginAdmin', async function (req, res)
	{

		let user = await args.dbConnection('webshop').select().from('admin_users').where(
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
			let add = await args.dbConnection('token_table').insert(
				{
					admin_id: user[0].id,
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

	args.app.post('/checkAdmin', async function (req, res)
	{
		let user = await args.dbConnection('webshop').select().from('token_table').where(
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

	args.app.post('/destroyJToken', async function (req, res)
	{
		let user = await args.dbConnection('webshop').delete().from('token_table').where(
			{
				jtoken: req.body.jtoken
			}
		);
		res.send(true);
	});




	args.app.post('/listAdmins', async function (req, res)
	{

		if (!req.body.jtoken) 
		{
			res.send("Haha, it won't work! :P"); return;
		}
		else
		{
			let token = await args.dbConnection('webshop').select().from('token_table').where(
				{
					jtoken: req.body.jtoken
				}
			);
			if (token.length != 1) return;
		}

		let readAll;

		if (req.body.deleted === false)
		{
			readAll = await args.dbConnection('webshop').select('id', 'user_name', 'email').from('admin_users').where({ deleted: '0' }).orderBy(req.body.order, req.body.dir);
		}
		else if (req.body.deleted == true)
		{
			readAll = await args.dbConnection('webshop').select().from('admin_users').orderBy(req.body.order, req.body.dir);
		};

		res.send(readAll);
	});

	args.app.post('/deleteAdmin', async function (req, res)
	{
		if (!req.body.jtoken) 
		{
			res.send("Haha, it won't work! :P"); return;
		}
		else
		{
			let token = await args.dbConnection('webshop').select().from('token_table').where(
				{
					jtoken: req.body.jtoken
				}
			);
			if (token.length != 1) return;
		}

		if(req.body.id == 1) {res.send(false); return};

		await args.dbConnection('admin_users').where({ 'id': req.body.id }).update({ 'deleted': 1 });
		await args.dbConnection('token_table').where({'admin_id': req.body.id}).del();
		res.send(true);
	});

}