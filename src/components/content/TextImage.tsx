'use client'
import React from 'react';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import { TextImageProps } from '@/types/components';
import Image from 'next/image';
import { getCustomBlocks } from '@/utils/render-blocks';
import { Reveal } from '../animation/Reveal';
const TextImage: React.FC<TextImageProps> = ({
    text,
    media,
    backgroundImage,
    reverse,
}) => {
    const isDark = !!backgroundImage;
    
    return (
        <div className={`relative overflow-hidden  w-full py-10`}>

            {/* Background */}
            {backgroundImage && (
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${backgroundImage.url})` }}
                />
            )}

            {/* Overlay escuro + blur */}
            {backgroundImage && (
                <div className="absolute inset-0 bg-black/60 backdrop-blur-xs" />
            )}  

            {/* Conteúdo */}
            <Reveal>
            <div
                className={`relative z-10 flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'
                    } items-center justify-between gap-8  max-w-7xl mx-auto px-4 py-6`}
            >
                <div className={`flex-1 ${backgroundImage ? 'text-white' : 'text-black'} text-justify md:text-left`}>
                    <BlocksRenderer blocks={getCustomBlocks(isDark)} content={text} />
                </div>
                {media &&
                    <div className="flex-1 flex items-center justify-center">
                        {media.mime.startsWith('image/') && (
                            <Image
                                src={media.url}
                                alt={media.alt || 'Media'}
                                className="
                                rounded-sm
                                shadow-blue
                                hover:scale-101
                                transition
                                "
                                width={300}
                                height={400}
                                unoptimized={true}
                            />
                           
                        )}

                        {media.mime.startsWith('video/') && (
                            <video
                                src={media.url}
                                autoPlay
                                muted
                                loop
                                className="w-full h-auto rounded-lg"
                            />
                        )}
                    </div>
                }
            </div>
            </Reveal>
        </div>
    );
};

export default TextImage;