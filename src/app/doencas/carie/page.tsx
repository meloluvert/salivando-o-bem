// app/doencas/carie/page.tsx
import { getPageData } from '@/lib/strapi';
import BlockManager from '@/components/BlockManager';

export default async function CariePage() {
  const data = await getPageData('carie'); // Certifique-se que o pluralId ou slug seja 'carie' no Strapi

  if (!data) return <div>Carregando...</div>;

  return (
    <main>
      <BlockManager blocks={data.blocks} />
    </main>
  );
}