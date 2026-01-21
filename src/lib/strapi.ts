import qs from 'qs';


const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';


export function getStrapiMedia(media: any) {
  if (!media) return null;

  // Suporte a diferentes formatos de resposta do Strapi (
  const url = media.url || media.data?.attributes?.url || media.data?.url;
  const mime = media.mime || media.data?.attributes?.mime || media.data?.mime;
  const alt = media.alternativeText || media.data?.attributes?.alternativeText || "";

  if (!url) return null;

  // Se já for uma URL absoluta (ex: cloudinary), retorna ela mesma
  if (url.startsWith('http') || url.startsWith('//')) {
    return { url, mime, alt };
  }

  // Se for relativa, adiciona o domínio do Strapi
  return {
    url: `${STRAPI_URL}${url}`,
    mime,
    alt
  };
}


export async function getPageData(path: string) {
 

  const query = qs.stringify(
    
    {
      populate: {
        blocks: {
          on: {
            "blocks.text-media": {
              populate: "*"
            },
            "blocks.card": {
              populate: {
                card:{
                  populate:"*"
                }
              }
            },
            "blocks.side-bar":{
              populate:"*"              
            },
            "blocks.list": {
              populate: "*"
            }
          },

        }
      }


    },
    {
      encodeValuesOnly: true,
    }
  );

  const url = `${STRAPI_URL}/api/${path}?${query}`;

  try {
    const res = await fetch(url, {
      next: { revalidate: 60 }, // Revalida a cada 60s (ISR)
      cache: 'no-store' // Para dev, use no-store. Para prod, remova ou ajuste.
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch data from Strapi: ${res.statusText}`);
    }

    const json = await res.json();
    return json.data; // Retorna apenas o objeto de dados
  } catch (error) {
    console.error("Strapi Fetch Error:", error);
    return null;
  }
}