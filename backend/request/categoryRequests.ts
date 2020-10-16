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
		let levels;

		let conditions

		if (req.body.parent)
		{
			conditions =
			{
				parent: req.body.parent,
				deleted: 0
			}
		}
		else
		{
			conditions =
			{
				deleted: 0
			}
		}

		if (!req.body.jtoken) 
		{
			res.send("Haha, it won't work! :P"); return;
		}
		else
		{
			levels = await args.dbConnection('webshop').select().from(req.body.level).where(conditions);
		}

		res.send(levels);
	});

	args.app.post('/listLevels', async function (req, res)
	{
		let query = 'top.id AS top, mid.id AS mid ,bottom.id AS bottom ' +
		'FROM top_level top ' +
		'LEFT JOIN mid_level mid ON top.id = mid.parent ' +
		'LEFT JOIN bottom_level bottom ON mid.id = bottom.parent'
		if(req.body.bottom != undefined)
		{
			query += 'WHERE bottom.id = ' + req.body.bottom 
		}
		
		let result = await args.dbConnection('').select(args.dbConnection.raw(query));
		res.send(result[0]);
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

			await args.dbConnection(req.body.level).where({ id: req.body.id }).update(
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

			await args.dbConnection(req.body.level).where({ id: req.body.id }).update(
				{
					deleted: '1',
				}
			);
			res.send(true);
		}

		res.send(readAll);
	});
}