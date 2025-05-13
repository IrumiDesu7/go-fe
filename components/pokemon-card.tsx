"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { motion } from "motion/react";

interface PokemonCardProps {
  name: string;
  url: string;
}

export default function PokemonCard({ name, url }: PokemonCardProps) {
  const pokemonId = url.split("/").filter(Boolean).pop();
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;

  return (
    <motion.div
      whileHover={{
        scale: 1.03,
        transition: {
          duration: 0.3,
        },
      }}
    >
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="capitalize text-lg">{name}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <Image
            src={imageUrl}
            alt={name}
            width={120}
            height={120}
            className="mb-2"
          />
        </CardContent>
      </Card>
    </motion.div>
  );
}
