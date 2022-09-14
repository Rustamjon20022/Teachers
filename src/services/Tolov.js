import { service } from ".";
export default {
	getGroups: () => service.get("/groups"),
};
