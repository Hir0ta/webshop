import { addRequestHandler } from './request/request';
import { createTable } from './dbUpdate/dbUpdate';

let args = {};
let config = {};

function checkArguments()
{
	args = require('yargs')
		.usage('Usage: $0 --config <path> <command>')
		.demandOption('config', 'Config file must be given, use: --config <path>')
		.demandCommand(1, 1, "Missing command verb", "Missing command verb")
		.help(false)
		.version(false)
		.option('config',
			{
				describe: 'config file path',
				type: 'string',
				nargs: 1
			})
		.command('start', 'starts the server')
		.command('stop', 'stops the server')
		.command('db-update', 'updates the databases')
		.argv;
}

checkArguments();

async function loadConfigFile()
{
	let fs = require('fs');

	try
	{
		config = JSON.parse(fs.readFileSync(args['config']));
	} catch (e)
	{
		console.error('Config file cannot be read: ' + args['config']);
		process.exit(-1);
	}
}

loadConfigFile();


async function execCommand()
{
	try
	{
		if (await doExecCommand())
		{
			console.log('finished succesfully')
		}

	}
	catch (e)
	{
		console.log(e);
		console.log('finished unsuccesfully');
	}
}

async function doExecCommand()
{

	let command = args["_"][0];
	//console.log(command);
	if (command == 'start')
	{
		await startServer();
		return false;
	} else
	if (command == 'stop')
	{
		await stopServer();
		return true;
	} else
	if (command == 'db-update')
	{
		await dbUpdate();
		return true;
	} else
	{
		console.error('invalid command verb: ' + command)
		process.exit(-1);
	}
}

execCommand();

async function startServer()
{
	let express = require('express');
	let app = express();

	let bodyParser = require('body-parser');
	let bodyLimit = 50 * 1024;
	let nodemailer = require('nodemailer');
	let transporter = nodemailer.createTransport(
		{
			host: config['smtp']['server']['host'],
			port: config['smtp']['server']['port'],
			secure: config['smtp']['server']['secure'], // upgrade later with STARTTLS
			auth: config['smtp']['server']['auth']
		}
	)


	app.use(bodyParser(
		/*{
			limit: bodyLimit
		}*/
	))
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(bodyParser.json(
		{
			limit: bodyLimit
		}
	));
	
	app.use(bodyParser.urlencoded(
		{
			extended: true,
			limit: bodyLimit,
			parameterLimit: bodyLimit
		}));

	app.use((req: any, res: any, next: any) =>
	{
		//console.log(req)
		res.header("Access-Control-Allow-Origin", 'http://localhost:4400');
		res.header('Access-Control-Allow-Headers', 'Origin, Authorization, X-Requested-With, Content-Type, Accept, Cache-Control, credentials');
		res.header("Access-Control-Allow-Credentials", "true");
		res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, DELETE');

		next();
	});
	app.listen(config['server']['port']);

	let dbConnection = require('knex')(config['centralDB']);
	console.log('server started');

	let args = 
	{
		dbConnection: dbConnection,
		app: app,
		mailer: transporter,
		config: config
	}

	addRequestHandler(args);
}

async function stopServer()
{
	let http = require('http');
	let req = http.request(
		{
			host: config['server']['host'],
			port: config['server']['port'],
			method: 'POST',
			path: '/exit',
			headers:
			{
				'Content-Type': 'application/x-www-form-urlencoded',
			}
		});

	req.write("");
	req.end();
	console.log('server stopped');
}

async function dbUpdate()
{
	let dbConnection = require('knex')(config['centralDB']);
	createTable(dbConnection);
}
