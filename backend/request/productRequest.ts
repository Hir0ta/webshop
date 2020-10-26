export function productRequests(args)
{
	args.app.post('/addProduct', async function (req, res)
	{
		if (!req.body.jtoken) 
		{
			res.send("Haha, it won't work! :P");
			return;
		}
		else
		{
			await args.dbConnection('product').insert(
				{
					name: req.body.name,
					price: req.body.price,
					category: req.body.category,
					deleted: 0
				}
			);

			let product = await args.dbConnection('webshop').select('id').from('product').where(
				{
					name: req.body.name,
					deleted: 0
				}
			)

			//console.log(product);

			product = product[0]['id']

			for (let filter of req.body.filters)
			{
				await args.dbConnection('filter_data').insert(
					{
						filter: filter.id,
						data: filter.data,
						product: product
					}
				)
			}

			res.send(true);
		}
	});

	args.app.post('/listProduct', async function (req, res)
	{
		if (!req.body.jtoken) 
		{
			res.send("Haha, it won't work! :P");
			return;
		}
		else
		{
			let query =
				'product.deleted AS deleted, ' +
				'product.id AS id, ' +
				'product.name AS name, ' +
				'product.price AS price, ' +
				'product.category AS bottom_id, ' +
				'bottom.name as bottom,' +
				'mid.id AS mid_id, ' +
				'mid.name AS mid, ' +
				'top.id AS top_id, ' +
				'top.name AS top ' +
				'FROM product ' +
				'LEFT JOIN bottom_level bottom ' +
				'ON product.category = bottom.id ' +
				'LEFT JOIN mid_level mid ' +
				'ON bottom.parent = mid.id ' +
				'LEFT JOIN top_level top ' +
				'ON mid.parent = top.id ' +
				'WHERE 1 = 1';
			if (req.body.id > 0) query += 'AND product.id = ' + req.body.id;
			if (req.body.top > 0) query += ' AND top.id = ' + req.body.top;
			if (req.body.mid > 0) query += ' AND mid.id = ' + req.body.mid;
			if (req.body.bottom > 0) query += ' AND bottom.id = ' + req.body.bottom;
			if (!req.body.showdeleted) query += ' AND product.deleted = 0 ';
			if (req.body.order != undefined && req.body.dir != undefined)
			{
				query += ' ORDER BY ' + req.body.order + ' ' + req.body.dir;
			}

			let results = await args.dbConnection().select(args.dbConnection.raw(query));

			res.send(results);
		}
	});

	args.app.post('/modifyProduct', async function (req, res)
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

			if (token.length != 1) 
			{
				res.send(false);
				return;
			}
		}

		await args.dbConnection('product').where({ id: req.body.id }).update(
			{
				name: req.body.name,
				price: req.body.price,
				category: req.body.category
			}
		);


		for (let filter of req.body.filters)
		{
			await args.dbConnection('filter_data').where({ product: req.body.id, filter: filter.id }).update(
				{
					data: filter.data
				}
			)
		}
		res.send(true);
	});

	args.app.post('/deleteProduct', async function (req, res)
	{
		await args.dbConnection('product').where({ id: req.body.id }).update({ deleted: 1 });
		res.send(true);
	});

	args.app.post('/listFilteredProducts', async function (req, res)
	{
		let filters;
		if (req.body.mid > 0)
		{
			filters = await args.dbConnection().select().from('filters').where({ category: req.body.mid });
		}

		let query =
			"product.id as product_id, product.name as name, product.price as price, " +
			"product.category as category, product.deleted as deleted, mid_level.id as mid, bottom_level.name as category";

		for (let filter of filters)
		{
			query += ",filter_data.filter_data" + filter.id
		}

		query += " FROM product LEFT JOIN (select product";

		for (let filter of filters)
		{
			query += ",max(case when filter_data.filter=" + filter.id + " then filter_data.data else '' end) as filter_data" + filter.id
		}

		query += " from filter_data group by product) filter_data ON product.id = filter_data.product " +
			"LEFT JOIN bottom_level ON bottom_level.id = category " +
			"LEFT JOIN mid_level ON mid_level.id = bottom_level.parent " +
			"WHERE mid_level.id=" + req.body.mid;

		if (req.body.category > 0)
		{
			query += " AND category=" + req.body.category
		}

		if(req.body.filterDatas != undefined)
		{
			for (let filterData of req.body.filterDatas)
			{
				if (filterData.data !== undefined && filterData.data !== '' && filterData.data != 0)
				{
					query += " AND filter_data" + filterData.id + "='" + filterData.data + "'";
				}
			}
		}

		if (req.body.id > 0)
		{
			query += " AND product.id=" + req.body.id;
		}

		if (req.body.order != undefined && req.body.dir != undefined)
		{
			query += " ORDER BY " + req.body.order + ' ' + req.body.dir;
		}

		let products = await args.dbConnection().select(args.dbConnection.raw(query));

		res.send(products);
	})
}