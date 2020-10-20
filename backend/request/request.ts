import { adminAuthRequest } from './adminAuthRequest';
import { categoryRequests } from './categoryRequests';
import { productRequests } from './productRequest';
import { filterRequests } from './filterRequests';

import { userAuthRequest } from './userAuthRequest';

export function addRequestHandler(args)
{
	/*Admin functions*/
	adminAuthRequest(args);
	categoryRequests(args);
	productRequests(args);
	filterRequests(args);

	/*User functions*/
	userAuthRequest(args);
}