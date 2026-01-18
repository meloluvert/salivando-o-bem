import { getPageData } from '@/lib/strapi';
import BlockManager from '@/components/BlockManager';

export default async function Home() {
  // 1. Busca os dados da Single Type "home"
  const strapiData = await getPageData('home');

  // Tratamento de erro básico se o Strapi estiver fora do ar
  if (!strapiData) {
    return <div className="p-10 text-center">Erro ao carregar conteúdo. Verifique o Strapi.</div>;
  }

  // O array de blocos (Dynamic Zone)
  const blocks = strapiData.blocks;

  return (
      <BlockManager blocks={blocks} />

  );
}