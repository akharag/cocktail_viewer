import { type NextPage } from "next";
import Link from "next/link";
import Image from "next/image";

import { RouterOutputs, api } from "~/utils/api";

type Drink = RouterOutputs["drinksRouter"]["getAll"][number];

const Home: NextPage = () => {
  const drinks = api.drinksRouter.getAll.useQuery();

  return (
    <div className="flex flex-wrap justify-center gap-3 p-4">
      {drinks.data &&
        drinks.data?.length > 0 &&
        drinks.data.map((drink) => <Card key={drink.name} {...drink} />)}
    </div>
  );
};

const Card = ({
  name,
  img,
  description,
  ingredients: drinkIngredient,
  instructions,
}: Drink) => {
  return (
    <div className="relative w-[20rem] rounded-xl">
      <div className="w-full overflow-clip rounded-xl">
        <Image
          src={img ?? ""}
          alt={`${name} preview`}
          width={500}
          height={500}
        />
      </div>
      <div className="relative z-10 mt-[-2rem] w-full rounded-xl bg-slate-950 p-3  text-slate-200">
        <h2 className="text-xl">{name}</h2>
        <h3 className="text-xs">Ingredients</h3>
        {drinkIngredient !== undefined && drinkIngredient.length > 0 && (
          <ul>
            {drinkIngredient.map((ingredient) => (
              <li key={ingredient.id}>
                {ingredient.ingredient.name}: {ingredient.parts}{" "}
                {ingredient.measure || ingredient.parts > 1 ? "parts" : "part"}
              </li>
            ))}
          </ul>
        )}
        {<p>{instructions}</p>}
        {description !== undefined && <p>{description}</p>}
        {/* {tags !== undefined && tags.length > 0 && (
          <>
            <h3 className="text-xs">Tags</h3>
            <ul className="align-center flex flex-wrap justify-center gap-1">
              {tags!.map((tag) => (
                <li key={tag}>
                  <Link href={`/${tag}`}>{tag}</Link>
                </li>
              ))}
            </ul>
          </>
        )} */}
      </div>
    </div>
  );
};

export default Home;
