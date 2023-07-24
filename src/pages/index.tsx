import { type NextPage } from "next";
import Spinner from "~/components/Spinner";

import { type RouterOutputs, api } from "~/utils/api";
import useLocalStore from "~/utils/hooks/useLocalStore";
import { Card } from "../components/Card";

export type Drink = RouterOutputs["drinksRouter"]["getAll"][number];

const Home: NextPage = () => {
  const { data: drinks, isLoading } = api.drinksRouter.getAll.useQuery();
  const [cachedDrinks] = useLocalStore<typeof drinks>("drinks", drinks);

  if (isLoading) {
    return (
      <div className="grid place-items-center">
        <Spinner />
      </div>
    );
  }

  if (drinks !== null && drinks !== undefined && drinks.length > 0) {
    return (
      <div className="flex flex-wrap justify-center gap-3">
        {drinks.map((drink: Drink) => (
          <Card key={drink.name} {...drink} />
        ))}
      </div>
    );
  }

  if (
    cachedDrinks !== null &&
    cachedDrinks !== undefined &&
    cachedDrinks.length > 0
  ) {
    return (
      <div className="flex flex-wrap justify-center gap-3 p-4">
        <p>cached</p>
        {(cachedDrinks as Drink[]).map((drink) => (
          <Card key={drink.name} {...drink} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid place-items-center">
      <p>Error loading drinks. Check your internet and try again</p>
    </div>
  );
};

export default Home;
