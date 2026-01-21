'use client'
import React from 'react';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import { ListProps } from '@/types/components';
import * as Tooltip from '@radix-ui/react-tooltip';
import { getCustomBlocks } from '@/utils/render-blocks';
import { Reveal } from '../animation/Reveal';
const List: React.FC<ListProps> = ({ text, Item, backgroundImage, slug }) => {
    const isDark = !!backgroundImage;
    return (
        <div className="relative  w-full py-6 px-4 scroll-mt-28 " id={slug}>
            {backgroundImage && (
                <>
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${backgroundImage.url})` }}
                    />
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-xs" />
                </>
            )}

            <div className="relative z-10 max-w-7xl mx-auto">

                <Reveal>
                    {text &&
                        <div className={`mb-2 ${backgroundImage ? 'text-white' : 'text-gray-800'}`}>
                            <BlocksRenderer
                                content={text}
                                blocks={getCustomBlocks(isDark)}
                            />
                        </div>
                    }
                    <div className="grid grid-cols-1 gap-4 px-2 ">
                        {Item.map((item) => (
                            <div
                                key={item.id}
                                className={`${isDark ? 'bg-darkBlue ' : 'bg-white border-2 border-secondary'} p-6 rounded-lg shadow-sm hover:shadow-md hover:scale-101 transition`}
                            >
                                <p className={`${isDark ? 'text-white' : 'text-black'} font-medium leading-snug`}>
                                    {item.text}
                                </p>
                            </div>

                        ))}
                    </div>
                </Reveal>
            </div>
        </div>
    );
};

export default List;