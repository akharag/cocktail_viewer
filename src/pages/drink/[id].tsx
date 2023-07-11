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
        className="absolute left-2 top-2 rounded-full bg-slate-600 p-2 text-slate-200 opacity-70"
        href="/"
      >
        Home
      </Link>
      <div className="mx-auto w-fit rounded-md bg-slate-950 py-4 md:px-4">
        <h2 className="mb-4 text-3xl leading-none">{drink && drink.name}</h2>
        <div className="grid justify-center gap-2 md:grid-cols-2">
          {drink.img && (
            <div className="relative ml-auto aspect-square w-full max-w-[600px] overflow-clip rounded pb-2">
              <Image src={drink.img} alt="" fill={true} />
            </div>
          )}
          <div className="grid w-96 gap-2">
            {drink.ingredients !== undefined &&
              drink.ingredients.length > 0 && (
                <div>
                  <h2 className="mb-2 leading-none">Ingredients</h2>
                  <ul className="mx-auto flex w-max flex-col gap-2">
                    {drink?.ingredients.map((ingredient) => (
                      <li
                        key={ingredient.id}
                        className={`
                  text-md
                  flex
                  justify-between 
                  gap-6
                  rounded-full
                  px-4
                  py-1
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
                        <span>{ingredient.ingredient.name}</span>{" "}
                        <span>
                          {ingredient.parts}{" "}
                          {ingredient.measure !== null
                            ? ingredient.measure === '""'
                              ? ""
                              : ingredient.measure
                            : `part${ingredient.parts > 1 ? "s" : ""}`}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            {drink.instructions && (
              <div>
                <h2 className="mb-2">Instructions</h2>
                <p className="max-w-sm px-4 text-justify">
                  {drink.instructions}
                </p>
              </div>
            )}
            {drink.description && (
              <div>
                <h2 className="pb-2 italic opacity-80">Info</h2>
                <p className="max-w-sm px-4 text-justify italic opacity-80">
                  {drink.description}
                </p>
              </div>
            )}
          </div>
          {drink.tags && drink.tags.length > 0 && (
            <div className="col-span-full">
              <h3 className="mb-2">Tags</h3>
              <ul className="flex justify-center gap-2">
                {drink.tags.map((tag) => (
                  <li
                    key={tag.name}
                    className={`bg-${tag.color ? tag.color : "slate-700"} ${
                      tag.color && +tag.color.replace(/\D/g, "") <= 400
                        ? "text-black"
                        : "text-white"
                    }
                    rounded-full
                    px-2
                    py-1
                    `}
                  >
                    {tag.name}
                  </li>
                ))}
              </ul>
            </div>
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
