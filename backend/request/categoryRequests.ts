export function categoryRequests(args)
{
	args.app.post('/addLevel', async function (req, res)
	{
		if (!req.body.jtoken) 
		{
			res.send("Haha, it won't work! :P");
			return;
		}
		else
		{
			if (!req.body.parent)
			{
				await args.dbConnection(req.body.level).insert(
					{
						name: req.body.name,
						deleted: 0
					}
				);
			}
			else
			{
				await args.dbConnection(req.body.level).insert(
					{
						name: req.body.name,
						parent: req.body.parent,
						deleted: 0
					}
				);
			}
		}
	});

	args.app.post('/listLevel', async function (req, res)
	{
		let readAll;

		if (!req.body.jtoken) 
		{
			res.send("Haha, it won't work! :P"); return;
		}
		else
		{

			readAll = await args.dbConnection('webshop').select().from(req.body.level).where({ deleted: '0' });
		}

		res.send(readAll);
	});


	args.app.post('/modifyLevel', async function (req, res)
	{
		let readAll;

		if (!req.body.jtoken) 
		{
			res.send("Haha, it won't work! :P"); return;
		}
		else
		{

			await args.dbConnection(req.body.level).where({ 'ID': req.body.id }).update(
				{
					name: req.body.name,
				}
			);
			res.send(true);
		}

		res.send(readAll);
	});

	args.app.post('/deleteLevel', async function (req, res)
	{
		let readAll;

		if (!req.body.jtoken) 
		{
			res.send("Haha, it won't work! :P"); return;
		}
		else
		{

			await args.dbConnection(req.body.level).where({ 'ID': req.body.id }).update(
				{
					deleted: '1',
				}
			);
			res.send(true);
		}

		res.send(readAll);
	});
}