'use client'
import React from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import { getCustomBlocks } from '@/utils/render-blocks';
import { SidebarProvider } from '@/components/ui/sidebar';
interface SidebarItem {
  id: number;
  text: string;
  slug_section: string;
}

interface SideBarProps {
  text?: any[];
  item: SidebarItem[];
}

export function SideBar({ text, item }: SideBarProps) {
  return (
    <SidebarProvider className="items-start  h-fit min-h-0  ">
      <Sidebar className="hidden min-h-full md:flex bg-primary border-r-0  min-h-[calc(100vh-112px)]" collapsible="none">
        <SidebarContent className="bg-primary text-white">
          <SidebarGroup>
            {text && (
              <SidebarGroupLabel className="text-blue-100 mb-4 h-auto px-2">
                <BlocksRenderer content={text} blocks={getCustomBlocks(true)} />
              </SidebarGroupLabel>
            )}
            <SidebarGroupContent>
              <SidebarMenu>
                {item.map((link) => (
                  <SidebarMenuItem key={link.id}>
                    <SidebarMenuButton asChild>
                      <a
                        href={`#${link.slug_section}`}
                        className="hover:bg-white/10 transition-colors py-6 h-auto whitespace-normal text-sm font-medium"
                      >
                        <span>{link.text}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  )
}