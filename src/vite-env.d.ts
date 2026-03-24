/// <reference types="vite/client" />

interface ImportMetaEnv {
	/** Repository URL for the “Fork me on GitHub” ribbon (optional; has a default). */
	readonly VITE_GITHUB_REPO_URL?: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
