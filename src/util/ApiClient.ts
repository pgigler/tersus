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
		if (resp.status < 300 && resp.status >= 200) {
			if (resp.status === 200) {
				return resp.json();
			}
		} else if (resp.status === 401) {
			throw Error("401 - Authentication failed");
		} else if (resp.status === 404) {
			throw Error("404 - Not Found");
		} else if (resp.status === 409) {
			throw Error("409 - Conflict");
		} else if (resp.status === 500) {
			throw Error("500 - Server error");
		} else {
			throw Error(`${resp.status} - Unexpected error`);
		}
	}

	public teardown() {
		this.abortController.abort();
	}
}
