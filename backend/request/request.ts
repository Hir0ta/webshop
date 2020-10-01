import { adminAuthRequest } from './adminAuthRequest';
import { categoryRequests } from './categoryRequests';

export function addRequestHandler(args)
{
	adminAuthRequest(args);
	categoryRequests(args);
}