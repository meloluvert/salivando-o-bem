import { ReactNode } from 'react'; 

export interface TextImageProps {
  text: any[]; 
  media?: {
    url: string;
    mime: string; 
    alt?: string; 
  };
  backgroundImage?: {
    url: string;
    mime: string;
  };
  reverse: boolean;
}

export interface ListProps {
  text: any[]; // Conteúdo do Rich Text (Strapi Blocks)
  Item: {
    id: number;
    text: string;
  }[];
  backgroundImage?: {
    url: string;
    mime: string;
  };
}