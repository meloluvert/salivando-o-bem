'use client'
import React, {ComponentProps} from 'react';
import * as Tooltip from '@radix-ui/react-tooltip';
// Importamos o tipo das definições de blocos
import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import Link from 'next/link';

type BlocksRendererProps = ComponentProps<typeof BlocksRenderer>;
type BlocksConfig = BlocksRendererProps['blocks'];

export const getCustomBlocks = (isDarkBackground?: boolean): BlocksConfig => ({
  link: ({ children, url, rel }) => {
    if (!rel) {
      return (
        <Link
          href={url} 
          target="_blank" 
          rel="noopener noreferrer"
          className={`underline font-medium ${isDarkBackground ? 'text-blue-300' : 'text-secondary'}`}
        >
          {children}
        </Link>
      );
    }

    return (
      <Tooltip.Provider delayDuration={200}>
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <span className={`cursor-help ${isDarkBackground ? 'text-secondary': 'text-darkBlue'} border-b-2 border-dotted border-secondary font-semibold text-inherit hover:scale-[1.01] transition-transform inline-block`}>
              {children}
            </span>
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content
              sideOffset={5}
              className="z-[100] max-w-sm p-4 rounded-xl shadow-2xl 
                         bg-black/80 backdrop-blur-md border border-white/20
                         animate-in fade-in zoom-in duration-200 bg-darkBlue"
            >
              <div className="text-sm leading-relaxed text-white">
                {rel}
              </div>
              <Tooltip.Arrow className="fill-black/80" />
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
      </Tooltip.Provider>
    );
  },
  
  heading: ({ level, children }) => {
    const styles = {
      1: "text-5xl font-bold mb-4",
      2: "text-3xl font-semibold mb-3",
      3: "text-2xl font-semibold mb-2",
      4: "text-xl font-semibold mb-2",
      5: "text-lg font-bold mb-1",
      6: "text-base font-bold mb-1",
    };

    const Tag = `h${level}` as const;
    return <Tag className={styles[level] || styles[1]}>{children}</Tag>;
  }
});