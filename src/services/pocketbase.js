import PocketBase from "pocketbase";

// Lê o .env ou usa o domínio como fallback
const pbUrl = import.meta.env.VITE_POCKETBASE_URL;
export const pb = new PocketBase(pbUrl);
