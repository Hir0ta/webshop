import { uuid } from 'uuidv4';

export function userAuthRequest(args)
{

	args.app.post('/regUser', async function (req, res)
	{
		let user = await args.dbConnection('webshop').select().from('users').where(
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

		await args.dbConnection('users').insert(
			{
				user_name: req.body.user_name,
				email: req.body.email,
				password: req.body.password,
				activated: 0,
				deleted: 0
			}
		);

		let user_id = await args.dbConnection('webshop').select('id').from('users').where(
			{
				user_name: req.body.user_name,
				deleted: 0
			}
		);
		user_id = user_id[0].id;

		let jtoken = uuid();
		await args.dbConnection('token_table').insert(
			{
				user_id: user_id,
				jtoken: jtoken,
			}
		);


		args.mailer.sendMail(
			{
				from: "noreply@webshop.com",
				to: req.body.email,
				subject: "Új felhasználó regisztráció megerősítése",
				html:
					"<p>Köszönjük regisztrációját, az alábbi linkre kattintva erősítheti meg regisztrációját</p>" +
					"<a>" + args.config.urls.accountActivationPrefix + jtoken + "&user=" + user_id + "</a>"
			}
		);
		res.send(true);
	});

	args.app.post('/activate', async function (req, res)
	{
		let token = await args.dbConnection('webshop').select().from('token_table').where({ jtoken: req.body.jtoken });
		if (token.length == 1)
		{
			await args.dbConnection('users').update({ activated: 1 }).where({ id: req.body.id });
			await args.dbConnection('webshop').delete().from('token_table').where({ jtoken: req.body.jtoken });
		}
	});

	args.app.post('/modifyUser', async function (req, res)
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

		let user = await args.dbConnection('webshop').select().from('users').where(
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
			await args.dbConnection('users').where({ id: user[0]['id'] }).update(
				{
					user_name: req.body.user_name,
					email: req.body.email
				}
			);
			res.send(true);
		}


	});

	args.app.post('/passwordReq', async function (req, res)
	{
		let user_id = await args.dbConnection('webshop').select('id').from('users').where({ email: req.body.email });
		user_id = user_id[0]['id'];
		let jtoken = uuid();
		await args.dbConnection('token_table').insert(
			{
				user_id: user_id,
				jtoken: jtoken,
			}
		);

		args.mailer.sendMail(
			{
				from: "noreply@webshop.com",
				to: req.body.email,
				subject: "Új jelszó kérése",
				html:
					"<p>Az alábbi linken új jelszót tud beállítani:</p>" +
					"<a>" + args.config.urls.resetPasswordPrefix + jtoken + "&user=" + user_id + "</a>"
			}
		);
		res.send(true);
	})

	args.app.post('/userNewPassword', async function (req, res)
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
			await args.dbConnection('users').where({ id: user[0]['user_id'] }).update(
				{
					password: req.body.password
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



	args.app.post('/login', async function (req, res)
	{

		let user = await args.dbConnection('webshop').select().from('users').where(
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

	args.app.post('/checkUser', async function (req, res)
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

	args.app.post('/deleteUser', async function (req, res)
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

		await args.dbConnection('users').where({ 'id': req.body.id }).update({ deleted: 1 });
		await args.dbConnection('webshop').delete().from('token_table').where({ user_id: req.body.id });
		res.send(true);
	});

}