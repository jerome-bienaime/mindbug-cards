import { api, HydrateClient } from "~/trpc/server";
import { App } from "./app";

export default async function Home() {
  const cards = await api.card.getAll();

  return (
    <HydrateClient>
     <App cards={cards} />
    </HydrateClient>
  );
}
