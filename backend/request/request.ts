import { adminAuthRequest } from './adminAuthRequest';
import { categoryRequests } from './categoryRequests';
import { productRequests } from './productRequest';
import { filterRequests } from './filterRequests';

export function addRequestHandler(args)
{
	adminAuthRequest(args);
	categoryRequests(args);
	productRequests(args);
	filterRequests(args);
}