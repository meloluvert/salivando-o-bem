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
  text: any[];
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

export interface CardItem {
  id: number;
  text: any[];
  yotube_code?: string | null;
  media?: any;
}

export interface CardsProps {
  text: any[];
  slideshow: boolean;
  slideshow_quantity: number;
  card: CardItem[];
  background?: any;
  slug?: string
}

export interface SidebarItem {
  id: number;
  text: string;
  slug_section: string;
}

export interface SideBarProps {
  text?: any[];
  item: SidebarItem[];
}