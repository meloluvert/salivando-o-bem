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
    youtube_code,
    reverse,
    slug
}) => {
    const isDark = !!backgroundImage;

    const renderMedia = () => {
        if (youtube_code) {
            return (
                <div className="flex-1 w-full max-w-2xl">
                    <div className="aspect-video w-full">
                        <iframe
                            className="w-full h-full rounded-lg shadow-2xl"
                            src={`https://www.youtube.com/embed/${youtube_code}`}
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </div>
                </div>
            );
        }

        if (media) {
            return (
                <div className="flex items-center justify-center">
                    {media.mime?.startsWith('image/') && (
                        <Image
                            src={media.url}
                            alt={media.alt || 'Media'}
                            className="rounded-lg shadow-blue hover:scale-[1.01] transition object-cover"
                            width={300}
                            height={400}
                            unoptimized
                        />
                    )}

                    {media.mime?.startsWith('video/') && (
                        <video
                            src={media.url}
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="max-w-full md:max-w-lg rounded-lg shadow-2xl"
                        />
                    )}
                </div>
            );
        }

        return null;
    };

    return (
        <section 
            className="relative w-full py-12 scroll-mt-28 " 
            id={slug}
        >
            {backgroundImage && (
                <>
                    <div
                        className="absolute inset-0 bg-cover bg-center -z-20"
                        style={{ backgroundImage: `url(${backgroundImage.url})` }}
                    />
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-xs -z-10" />
                </>
            )}

            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <Reveal>
                    <div
                        className={`flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} 
                        items-center justify-between gap-12`}
                    >
                        <div className={`flex-1 ${isDark ? 'text-white' : 'text-black'} text-justify`}>
                            <BlocksRenderer blocks={getCustomBlocks(isDark)} content={text} />
                        </div>
                        
                        {renderMedia()}
                    </div>
                </Reveal>
            </div>
        </section>
    );
};

export default TextImage;