import { ReactNode } from 'react'; 

export interface TextImageProps {
  text: any[]; 
  media?: {
    url: string;
    mime: string; 
    alt?: string; 
  } | null;
  backgroundImage?: {
    url: string;
    mime: string;
  };
  reverse: boolean;
  slug?:string;
  youtube_code?: string
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
  slug?: string;
}