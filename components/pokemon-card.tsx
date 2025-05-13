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
          duration: 0.2,
        },
      }}
    >
      <Card className="overflow-hidden h-[180px] bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 shadow-sm hover:shadow-md transition-all duration-300 border-slate-200 dark:border-slate-700">
        <CardHeader className="pb-0 pt-3 px-4">
          <CardTitle className="capitalize text-sm font-medium text-slate-700 dark:text-slate-200">
            {name}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center items-center p-2">
          <div className="relative w-16 h-16 sm:w-20 sm:h-20">
            <Image
              src={imageUrl}
              alt={name}
              fill
              sizes="(max-width: 640px) 64px, 80px"
              className="object-contain drop-shadow-sm dark:brightness-110 dark:drop-shadow-[0_0_2px_rgba(255,255,255,0.3)]"
            />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
