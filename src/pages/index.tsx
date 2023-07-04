import { type NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import Spinner from "~/components/Spinner";

import { type RouterOutputs, api } from "~/utils/api";

type Drink = RouterOutputs["drinksRouter"]["getAll"][number];

const Card = ({
  name,
  img,
  description,
  ingredients: drinkIngredients,
  tags,
}: Drink) => {
  return (
    <Link href={`/drink/${name}`} className="relative w-[20rem] rounded-xl">
      <div className="w-full overflow-clip rounded-xl">
        <Image
          src={img ?? ""}
          alt={`${name} preview`}
          width={500}
          height={500}
        />
      </div>
      <div className="relative z-10 mt-[-2rem] w-full rounded-xl bg-slate-950 p-3 text-slate-200">
        <div className="m-auto w-11/12">
          <h2 className="text-xl">{name}</h2>
          <h3 className="text-xs">Ingredients</h3>
          {drinkIngredients !== undefined && drinkIngredients.length > 0 && (
            <ul className="flex flex-col gap-2">
              {drinkIngredients.map((ingredient) => (
                <li
                  key={ingredient.id}
                  className={`
                  rounded-full 
                  py-1
                  text-sm
                  bg-${
                    ingredient.ingredient.color
                      ? ingredient.ingredient.color
                      : "slate-700"
                  } ${
                    ingredient.ingredient.color &&
                    +ingredient.ingredient.color.replace(/\D/g, "") <= 400
                      ? "text-black"
                      : "text-white"
                  }`}
                >
                  {ingredient.ingredient.name}: {ingredient.parts}{" "}
                  {ingredient.measure !== null
                    ? ingredient.measure === '""'
                      ? ""
                      : ingredient.measure
                    : `part${ingredient.parts > 1 ? "s" : ""}`}
                </li>
              ))}
            </ul>
          )}
          {description !== undefined && (
            <p className="py-1 text-justify text-xs">{description}</p>
          )}
          {tags.length > 0 && (
            <>
              <h3 className="text-xs">Tags</h3>
              <ul className="align-center flex flex-wrap justify-center gap-1">
                {tags.map((tag) => (
                  <li key={tag.name}>{tag.name}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </Link>
  );
};

const Home: NextPage = () => {
  const {
    data: drinks,
    isLoading,
    isError,
  } = api.drinksRouter.getAll.useQuery();

  if (isLoading) {
    return (
      <div className="grid place-items-center">
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="grid place-items-center">
        <p>Error loading drinks. Check your internet and try again</p>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap justify-center gap-3 p-4">
      {drinks &&
        drinks.length > 0 &&
        drinks.map((drink) => <Card key={drink.name} {...drink} />)}
    </div>
  );
};

export default Home;
