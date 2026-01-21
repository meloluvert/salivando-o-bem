import { getPageData } from '@/lib/strapi';
import BlockManager from '@/components/BlockManager';

export default async function CariePage() {
  const data = await getPageData('dica'); 

  if (!data) return <div>Carregando...</div>;

  return (
      <BlockManager blocks={data.blocks} />
  );
}