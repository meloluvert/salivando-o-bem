import React from 'react';
import TextImage from '@/components/content/TextImage';
import List from '@/components/content/List';
import { getStrapiMedia } from '@/lib/strapi';
import Cards from "@/components/content/Cards"
import{ SideBar }from "@/components/content/SideBar"

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

    // Verifica se existe uma sidebar nos blocos
    const sidebarBlock = blocks.find(b => b.__component === 'blocks.side-bar');
    const contentBlocks = blocks.filter(b => b.__component !== 'blocks.side-bar');

    return (
        <div className="flex w-full  mx-auto relative items-start">
            {/* 1. Se houver sidebar, renderiza ela na esquerda */}
            {sidebarBlock && (
                <aside className=" hidden lg:block w-64  sticky top-[112px]  left-0 self-start min-h-full">
                    <SideBar text={sidebarBlock.text} item={sidebarBlock.item} />
                </aside>
            )}
            <div className="flex flex-col w-full">
                {blocks.map((block) => {
                    // Mapeamento baseado no __component
                    switch (block.__component) {

                        case 'blocks.text-media': // Nome exato que vem no JSON do Strapi
                            return (
                                <TextImage
                                    key={block.id}
                                    text={block.text} // Passa o array de rich text direto
                                    reverse={block.reversed}
                                    media={getStrapiMedia(block.media)} // Normaliza a URL da mídia
                                    backgroundImage={getStrapiMedia(block.background)} // Normaliza o BG
                                    slug={block.slug}
                                    youtube_code={block.youtube_code}
                                />
                            );

                        case 'blocks.list':
                            return (
                                <List
                                    key={block.id}
                                    text={block.text}
                                    Item={block.item || []} // Garante array vazio se nulo
                                    backgroundImage={getStrapiMedia(block.background)}
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
                        case 'blocks.side-bar':
                            return (<span></span>)

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
        </div>
    );
};

export default BlockManager;