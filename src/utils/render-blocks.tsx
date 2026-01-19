'use client'
import React, { ComponentProps, useState, useEffect } from 'react';
import * as Tooltip from '@radix-ui/react-tooltip';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import Link from 'next/link';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

type BlocksRendererProps = ComponentProps<typeof BlocksRenderer>;
type BlocksConfig = BlocksRendererProps['blocks'];

export const getCustomBlocks = (isDarkBackground?: boolean): BlocksConfig => ({
  link: ({ children, url, rel }) => {
    const [isMobile, setIsMobile] = useState(false);

    // Checa se é mobile para alternar entre Tooltip e Dialog
    useEffect(() => {
      const checkMobile = () => setIsMobile(window.innerWidth < 768);
      checkMobile();
      window.addEventListener('resize', checkMobile);
      return () => window.removeEventListener('resize', checkMobile);
    }, []);

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

    const triggerClasses = `cursor-help ${isDarkBackground ? 'text-secondary': 'text-darkBlue'} border-b-2 border-dotted border-secondary font-semibold text-inherit transition-transform`;

    // VERSÃO MOBILE: Dialog (Modal)
    if (isMobile) {
      return (
        <Dialog>
          <DialogTrigger asChild>
            <span className={triggerClasses}>{children}</span>
          </DialogTrigger>
          <DialogContent className="bg-darkBlue border-white/20 text-white w-[90%] rounded-xl">
            <DialogHeader>
              <DialogTitle className="text-secondary text-lg mb-2">{children}</DialogTitle>
            </DialogHeader>
            <div className="text-sm leading-relaxed">
              {rel}
            </div>
          </DialogContent>
        </Dialog>
      );
    }

    // VERSÃO DESKTOP: Tooltip
    return (
      <Tooltip.Provider delayDuration={200}>
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <span className={triggerClasses}>
              {children}
            </span>
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content
              sideOffset={5}
              className="z-[100] max-w-sm p-4 rounded-xl shadow-2xl 
                         bg-darkBlue backdrop-blur-md border border-white/20
                         animate-in fade-in zoom-in duration-200"
            >
              <div className="text-sm leading-relaxed text-white">
                {rel}
              </div>
              <Tooltip.Arrow className="fill-darkBlue" />
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
      </Tooltip.Provider>
    );
  },
  
  heading: ({ level, children }) => {
    const styles = {
      1: "text-4xl md:text-5xl font-bold mb-4",
      2: "text-2xl md:text-3xl font-semibold mb-3",
      3: "text-xl md:text-2xl font-semibold mb-2",
      4: "text-lg md:text-xl font-semibold mb-2",
      5: "text-md md:text-lg font-bold mb-1",
      6: "text-base font-bold mb-1",
    };

    const Tag = `h${level}` as const;
    return <Tag className={styles[level] || styles[1]}>{children}</Tag>;
  }
});