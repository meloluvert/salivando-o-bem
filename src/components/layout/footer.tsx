'use client'
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaYoutube } from "react-icons/fa6";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-black pt-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-8 border-b border-white/10">
          
          {/* Logo e Descrição Curta */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <Link href="/">
              <Image 
                src="/logo-horizontal.png" 
                alt="Salivando o Bem" 
                width={180} 
                height={60} 
                className=" object-contain"
              />
            </Link>
            <p className="text-sm  max-w-xs text-center md:text-left">
            Apesar das informações importantíssimas acima, converse sempre com seu cirurgião-dentista.
            </p>
          </div>

          {/* Links e Social */}
          <div className="flex flex-col items-center gap-4">
            <h3 className="font-bold uppercase tracking-widest text-sm">Se inscreva!</h3>
            <Link 
              href="https://www.youtube.com/@salivandoobem" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-4xl hover:text-red-500 transition-colors duration-300"
              title="Acesse nosso canal no YouTube"
            >
              <FaYoutube />
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
      
      </div>
      <div className="mt-8 flex flex-col items-center gap-2 text-xs bg-black text-white py-4">
          <p>© {currentYear} Salivando o Bem - Todos os direitos reservados.</p>
          <p className="flex items-center gap-1">
            Desenvolvido por 
            <Link 
              href="https://github.com/meloluvert" 
              target="_blank"
              rel="noopener noreferrer"
              className=" font-medium hover:underline decoration-darkBlue underline-offset-4"
            >
              Lucas Melo
            </Link>
          </p>
        </div>
    </footer>
  );
};

export default Footer;