import React from 'react';
import TextImage from '@/components/content/TextImage';
import List from '@/components/content/List';
import { getStrapiMedia } from '@/lib/strapi';
import Cards from "@/components/content/Cards"

// Definição dos tipos básicos para ajudar o TS
interface Block {
  id: number;
  __component: string;
  [key: string]: any;
}

interface BlockManagerProps {
  blocks: Block[];
}

const BlockManager: React.FC<BlockManagerProps> = ({ blocks }) => {
  if (!blocks) return null;

  return (
    <div className="flex flex-col gap-10 w-full">
      {blocks.map((block) => {
        // Mapeamento baseado no __component
        switch (block.__component) {

          case 'blocks.text-media': // Nome exato que vem no JSON do Strapi
            return (
              <TextImage
                key={block.id}
                text={block.text} // Passa o array de rich text direto
                reverse={block.reverse}
                media={getStrapiMedia(block.media)} // Normaliza a URL da mídia
                backgroundImage={getStrapiMedia(block.background)} // Normaliza o BG
              />
            );

          case 'blocks.list':
            return (
              <List
                key={block.id}
                text={block.text}
                Item={block.Item || []} // Garante array vazio se nulo
                backgroundImage={getStrapiMedia(block.backgroundImage)}
              />
            );
          case 'blocks.card':
            return (
              <Cards
                key={block.id}
                text={block.text}
                slideshow={block.slideshow}
                slideshow_quantity={block.slideshow_quantity}
                card={block.card} // Passa o array de cards
                background={block.background}
              />
            );

          default:
            // Útil para debug: mostra quando criamos um bloco no Strapi mas esquecemos de mapear aqui
            if (process.env.NODE_ENV === 'development') {
              return (
                <div key={block.id} className="p-4 border border-red-500 bg-red-50 text-red-700">
                  Componente desconhecido: <strong>{block.__component}</strong>
                </div>
              )
            }
            return null;
        }
      })}
    </div>
  );
};

export default BlockManager;