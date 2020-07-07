import { getCurrentUser } from "./auth";

const apiUrl = process.env.GATSBY_API_URL;

export class ApiClient {
	private abortController;

	public init() {
		this.abortController = new AbortController();
	}

	public async fetch(path: string): Promise<any> {
		const user = getCurrentUser();
		const requestInit = { headers: {} as any, signal: this.abortController.signal };
		if (user) {
			requestInit.headers["X-Authorization"] = `Bearer ${user.id_token}`;
		}
		const resp = await fetch(`${apiUrl}${path}`, requestInit);
		if (resp.status === 401) {
			throw Error("Authentication failed");
		}
		return resp.json();
	}

	public teardown() {
		this.abortController.abort();
	}
}
