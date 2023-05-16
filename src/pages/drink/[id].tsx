import Image from "next/image";
import type { GetStaticPaths, GetStaticProps } from "next";
import { generateSSGHelper } from "~/server/helpers/ssgHelper";

import React from "react";
import { api } from "~/utils/api";

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
    <div>
      <h2 className="text-3 xl">{drink && drink.name}</h2>
      {drink.img && (
        <div className="relative mx-auto aspect-square w-2/3 min-w-[200px] max-w-[600px] overflow-clip rounded">
          <Image src={drink.img} alt="" fill={true} />
        </div>
      )}
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
