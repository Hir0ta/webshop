import { regex } from "uuidv4";

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
			'FROM product LEFT JOIN bottom_level bottom ' +
			'ON product.category = bottom.id ' +
			'LEFT JOIN mid_level mid ' +
			'ON bottom.parent = mid.id ' +
			'LEFT JOIN top_level top ' +
			'ON mid.parent = top.id ' +
			'WHERE 1 = 1';
			if(req.body.top != 0) query += ' AND top.id = ' + req.body.top;
			if(req.body.mid != 0) query += ' AND mid.id = ' + req.body.mid;
			if(req.body.bottom != 0) query += ' AND bottom.id = ' + req.body.bottom;
			if(!req.body.showdeleted) query += ' AND product.deleted = 0 ';
			query += ' ORDER BY ' + req.body.order + ' ' + req.body.dir;
			
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
		res.send(true);
	});

	args.app.post('/deleteProduct', async function(req,res)
	{
		console.log(req.body.id);
		await args.dbConnection('product').where({ id: req.body.id }).update({deleted: 1});
		res.send(true);
	})
}