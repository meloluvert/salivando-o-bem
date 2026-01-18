'use client'

import * as React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, ChevronDown, ExternalLink } from 'lucide-react'
import { FaYoutube } from "react-icons/fa6";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"

const diseases = [
  { title: "Cárie", href: "/doencas/carie" },
  { title: "Gengivite", href: "/doencas/gengivite" },
  { title: "Periodontite", href: "/doencas/periodontite" },
  { title: "Câncer de Boca", href: "/doencas/cancer-de-boca" },
]

export default function Header() {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 p-4">
      <div className="container max-w-7xl mx-auto flex h-20 items-center justify-between">
        
        <Link href="/" className="flex items-center gap-2">
          <Image 
            src="/logo-horizontal.png" 
            alt="Salivando o Bem" 
            width={180} 
            height={60} 
            className="object-contain"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <NavigationMenu>
            <NavigationMenuList>
              
              {/* Dropdown: Doenças Bucais */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-darkBlue bg-trasnaparent font-bold uppercase tracking-wider ">
                  Doenças Bucais
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[250px] gap-2 bg-white">
                    {diseases.map((disease) => (
                      <li key={disease.title}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={disease.href}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-darkBlue hover:text-white "
                          >
                            <div className="text-sm font-semibold leading-none">{disease.title}</div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/dicas" legacyBehavior passHref>
                  <NavigationMenuLink className={`${navigationMenuTriggerStyle()} text-darkBlue bg-trasnaparent font-bold uppercase tracking-wider`}>
                    Dicas de Saúde Bucal
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              {/* Link: Youtube */}
              <NavigationMenuItem>
                <Link href="https://www.youtube.com/@salivandoobem" target="_blank" legacyBehavior passHref>
                  <NavigationMenuLink className={`${navigationMenuTriggerStyle()} text-darkBlue bg-trasnaparent font-bold uppercase tracking-wider flex gap-1 items-center`}>
                  <FaYoutube size={40} className='text-darkBlue text-4xl ' />
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        {/* Mobile Navigation (Sheet + Accordion) */}
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
                <Menu className="h-10 w-10 text-primary" size={50} />
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetHeader className=" border-b pb-4 text-left">
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-4 p-4">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="doencas" className="border-none">
                    <AccordionTrigger className="text-primary font-bold uppercase py-2 hover:no-underline">
                      Doenças Bucais
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-col gap-2 pl-4 pt-2">
                        {diseases.map((disease) => (
                          <Link
                            key={disease.title}
                            href={disease.href}
                            onClick={() => setIsOpen(false)}
                            className="py-2 text-sm font-medium text-slate-600 hover:text-secondary"
                          >
                            {disease.title}
                          </Link>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <Link 
                  href="/dicas" 
                  onClick={() => setIsOpen(false)}
                  className="text-primary font-bold uppercase py-2 border-b border-transparent hover:text-secondary"
                >
                  Dicas de Saúde Bucal
                </Link>

                <Link 
                  href="https://www.youtube.com/@salivandoobem" 
                  target="_blank"
                  className="text-primary font-bold uppercase py-2 flex items-center gap-2"
                >
                  Youtube <FaYoutube />
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}