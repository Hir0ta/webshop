export function filterRequests(args)
{
	args.app.post('/createFilter', async function (req, res)
	{
		if (!req.body.jtoken) 
		{
			res.send("Haha, it won't work! :P");
			return;
		}

		for (let filter of req.body.filters)
		{
			await args.dbConnection('filters').insert(
				{
					name: filter.name,
					category: filter.category,
					unit: filter.unit
				}
			)
		}

		res.send(true);
	});

	args.app.post('/listFilters', async function (req, res)
	{
		let filters = await args.dbConnection('webshop').select().from('filters').where({ category: req.body.category });
		if (filters.length == 0) 
		{
			res.send(false)
		}
		else
		{
			res.send(filters);
		}

	});

	args.app.post('/filterData', async function(req,res)
	{
		let query = "SELECT * FROM filters " +
		"LEFT JOIN filter_data ON filter_data.filter=filters.id " +
		"WHERE filter_data.product=" + req.body.product;
		let filters = await args.dbConnection.raw(query);
		res.send(query);
	})

	args.app.post('/loadFilters', async function (req, res)
	{
		let query =
			"filters.id, filters.name, filter_data.product, filter_data.data, filters.unit, filters.category " +
			"FROM filters " +
			"LEFT JOIN filter_data ON filters.id = filter_data.filter WHERE 1=1"
			if(req.body.product)
			{
				query += " AND filter_data.product = " + req.body.product;
			}		

		let filters = await args.dbConnection().select(args.dbConnection.raw(query));
		res.send(filters);
	})

	args.app.post('/filterSelects', async function(req,res)
	{
		let query  = 
		"filter_data.data, filter_data.filter FROM filter_data " +
		"LEFT JOIN filters ON filters.id = filter_data.filter " +
		"WHERE filters.name = '" + req.body.filter_name + "' " +
		"GROUP BY data, filter ORDER BY data ASC";
		let filters = await args.dbConnection().select(args.dbConnection.raw(query));
		res.send(filters);
	})

	args.app.post('/modifyFilter', async function (req, res)
	{
		for (let filter of req.body.filters)
		{
			await args.dbConnection().select().from('filters').where(
				{ name: filter.name, unit: filter.unit }).count().then(
					async (result) =>
					{
						let count = result[0]['count'];
						if (count == 0)
						{
							await args.dbConnection('filters').insert(
								{
									name: filter.name,
									category: filter.category,
									unit: filter.unit
								}
							);
						}
						else
						{
							await args.dbConnection('filters').where({ id: filter.id }).update(
								{
									name: filter.name,
									unit: filter.unit
								}
							);
						}
					}
				)
		}
		res.send(true);
	})

}