'use client'
import React from 'react';
import Image from 'next/image';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import { getCustomBlocks } from '@/utils/render-blocks';
import { getStrapiMedia } from '@/lib/strapi';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselApi,
} from "@/components/ui/carousel";

interface CardItem {
    id: number;
    text: any[];
    yotube_code?: string | null;
    media?: any;
}

interface CardsProps {
    text: any[];
    slideshow: boolean;
    slideshow_quantity: number;
    card: CardItem[];
    background?: any;
}

const Cards: React.FC<CardsProps> = ({ text, slideshow, slideshow_quantity, card, background }) => {
    const [api, setApi] = React.useState<CarouselApi>();
    const [current, setCurrent] = React.useState(0);
    const isDark = !!background;

    // Atualiza o dente ativo no slideshow
    React.useEffect(() => {
        if (!api) return;
        api.on("select", () => {
            setCurrent(api.selectedScrollSnap());
        });
    }, [api]);

    const renderMedia = (item: CardItem) => {
        // 1. Prioridade: YouTube
        if (item.yotube_code) {
            return (
                <div className="aspect-video w-full">
                    <iframe
                        className="w-full h-full rounded-t-lg"
                        src={`https://www.youtube.com/embed/${item.yotube_code}`}
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                </div>
            );
        }

        // 2. Imagem do Strapi
        const mediaData = getStrapiMedia(item.media);
        if (mediaData) {
            console.log(mediaData)
            return (
                <div className="relative aspect-video w-full overflow-hidden rounded-t-lg">
                    <Image
                        src={mediaData.url}
                        alt={mediaData.alt || "Card image"}
                        fill
                        className="object-cover transition-transform hover:scale-105 duration-300"
                        unoptimized
                    />
                </div>
            );
        }

        return null;
    };

    const CardContent = ({ item }: { item: CardItem }) => (
        <div className="flex h-full flex-col bg-[#3F547E] rounded-xl shadow-lg border-b-4 border-yellow-400">
            {renderMedia(item)}
            <div className="p-6 text-white flex-grow">
                <BlocksRenderer
                    content={item.text}
                    blocks={getCustomBlocks(true)}
                />
            </div>
        </div>
    );

    return (
        <section className="relative w-full py-16 px-4 overflow-hidden">
            {/* Background Logic */}
            {background && (
                <div
                    className="absolute inset-0 bg-cover bg-center -z-10"
                    style={{ backgroundImage: `url(${getStrapiMedia(background)?.url})` }}
                >
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
                </div>
            )}

            <div className="max-w-7xl mx-auto z-10 relative">
                {/* Intro Text */}
                <div className={`mb-12 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                    <BlocksRenderer content={text} blocks={getCustomBlocks(isDark)} />
                </div>

                {slideshow ? (
                    <div className="w-full">
                        <Carousel
                            setApi={setApi}
                            opts={{
                                align: "start",
                                loop: true,
                            }}
                            className="w-full"
                        >
                            <CarouselContent className="-ml-4">
                                {card.map((item) => (
                                    <CarouselItem
                                        key={item.id}
                                        className="pl-4" // Removidas as classes md:basis-1/...
                                        style={{
                                            flex: `0 0 ${100 / slideshow_quantity}%`
                                        }}
                                    >
                                        <div className="h-full">
                                            <CardContent item={item} />
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                        </Carousel>

                        {/* Tooth Indicators */}
                        <div className="flex justify-center gap-4 mt-8">
                            {card.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => api?.scrollTo(index)}
                                    className="transition-all duration-300"
                                >
                                    <img
                                        src="/tooth.svg"
                                        alt="tooth icon"
                                        className={`w-8 h-8 ${current === index ? "brightness-100 saturate-100" : "opacity-30 grayscale"
                                            }`}
                                    />
                                </button>
                            ))}
                        </div>
                    </div>
                ) : (
                    /* Normal Flex Mode */
                    <div className="flex flex-wrap justify-center gap-6">
                        {card.map((item) => (
                            <div key={item.id} className="w-full md:w-[calc(50%-1.5rem)] lg:w-[calc(33.33%-1.5rem)]">
                                <CardContent item={item} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default Cards;