import Image from "next/image";
import type { GetStaticPaths, GetStaticProps } from "next";
import { generateSSGHelper } from "~/server/helpers/ssgHelper";

import React from "react";
import { type RouterOutputs, api } from "~/utils/api";
import Link from "next/link";

type Drink = RouterOutputs["drinksRouter"]["getAll"][number];
export default function Drink(props: { id: string }) {
  const {
    data: drink,
    isError,
    isLoading,
  } = api.drinksRouter.getById.useQuery(props.id);

  if (isLoading) {
    return (
      <div>
        <h2>Loading...</h2>
      </div>
    );
  }

  if (!drink) {
    return (
      <div>
        <h2>Problem Finding Drink :(</h2>
        {isError && <p>Error when getting drink. Refresh page to try again.</p>}
      </div>
    );
  }

  return (
    <div className="relative">
      <Link
        className="absolute left-2 float-left rounded-full bg-slate-600 p-2 text-slate-200"
        href="/"
      >
        Home
      </Link>
      <h2 className="text-3xl">{drink && drink.name}</h2>
      <div className="grid-rows-2 border-2 border-green-600">
        {drink.img && (
          <div className="relative mx-auto aspect-square w-2/3 min-w-[200px] max-w-[600px] overflow-clip rounded">
            <Image src={drink.img} alt="" fill={true} />
          </div>
        )}
        <div>
          {drink.ingredients !== undefined && drink.ingredients.length > 0 && (
            <ul className="flex flex-col gap-2">
              {drink?.ingredients.map((ingredient) => (
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
        </div>
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const ssg = generateSSGHelper();

  const id = context.params?.id as string;

  if (typeof id !== "string") throw new Error("no name");

  await ssg.drinksRouter.getById.prefetch(id);

  return {
    props: {
      trpcState: ssg.dehydrate(),
      id,
    },
  };
};

export const getStaticPaths: GetStaticPaths = () => {
  return { paths: [], fallback: "blocking" };
};
