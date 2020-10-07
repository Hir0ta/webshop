import { adminAuthRequest } from './adminAuthRequest';
import { categoryRequests } from './categoryRequests';
import { productRequests } from './productRequest';

export function addRequestHandler(args)
{
	adminAuthRequest(args);
	categoryRequests(args);
	productRequests(args);
}