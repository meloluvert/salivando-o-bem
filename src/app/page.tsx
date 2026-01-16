// app/page.tsx
import TextImage from '@/components/content/TextImage';
import List from '@/components/content/List';
export default function Home() {
  // Dados mockados simulando Strapi response
  const mockProps = {
    text: [
      {
        "type": "heading",
        "children": [
          {
            "type": "text",
            "text": "Seja Bem vindo!"
          }
        ],
        "level": 1
      },
      {
        "type": "heading",
        "children": [
          {
            "type": "text",
            "text": "Excelentes dicas de Saúde Bucal!"
          }
        ],
        "level": 3
      },
      {
        "type": "paragraph",
        "children": [
          {
            "type": "text",
            "text": "E Deus disse: Eis que lhes tenho dado todas as ervas que dão semente e se acham na superfície de toda terra e todas as árvores em que há fruto que dê semente; isso servirá de alimento para vocês. "
          }
        ]
      },
      {
        "type": "list",
        "format": "unordered",
        "children": [
          {
            "type": "list-item",
            "children": [
              {
                "type": "text",
                "text": "item  1"
              }
            ]
          },
          {
            "type": "list-item",
            "children": [
              {
                "type": "text",
                "text": "item 2"
              }
            ]
          },
          {
            "type": "list-item",
            "children": [
              {
                "type": "text",
                "text": "item 3"
              }
            ]
          }
        ]
      }
    ],
    media: {
      url: 'https://picsum.photos/800/600', // imagem aleatória válida
      mime: 'image/jpeg',
      alt: 'Imagem aleatória de exemplo',
    },
    backgroundImage: {
      url: 'https://picsum.photos/1600/900',
      mime: 'image/jpeg',
    },
    reverse: false,
  };

  const strapiData = {
    "__component": "blocks.list",
    "id": 1,
    "text": [
      {
        "type": "paragraph",
        "children": [
          {
            "type": "text",
            "text": "O "
          },
          {
            "type": "link",
            "url": "https://github.com/meloluvert",
            "children": [
              {
                "type": "text",
                "text": "flúor"
              }
            ],
            "rel": "(é uma substância química, fundamental para saúde dos dentes e ossos. É encontrado em diferentes concentrações na água das nascentes e jazidas naturais. Encontrado, ainda, em alguns alimentos como o chá preto, ossos de peixes, cereais, leite em pó, algumas frutas e vegetais. Nas cidades onde a água é tratada, ela recebe uma dose “correta” de flúor artificial, em forma de sal, adequando sua concentração para ser ingerida pela população. Em altas concentrações nos cremes dentais parece conferir grande efeito protetor contra a cárie dentária, porém com alto risco de fluorose, devendo-se evitar a sua ingestão por crianças, em especial no período de formação dos dentes permanentes.)"
          },
          {
            "type": "text",
            "text": " é um produto adicionado ao creme dental e é utilizado para evitar cáries, segundo dizem os estudiosos, cientistas e dentistas. Mas ficam no ar duas perguntas: a resposta da primeira sabemos. A resposta da segunda gostaria de saber também. Eis abaixo as perguntas."
          }
        ]
      }
    ],
    "Item": [
      {
        "id": 1,
        "text": "1ª -  A maioria das pessoas usam não só creme dental com flúor, mas também enxaguante bucal, certo? Sim."
      },
      {
        "id": 2,
        "text": "2ª – Mas por que várias pessoas que usam esses produtos continuam tendo cáries dentárias e sempre nas mesmas regiões dos dentes?"
      }
    ]
  }

  return (
    <main className="flex flex-col items-center justify-center">
      <TextImage {...mockProps} />
      <List 
        text={strapiData.text} 
        Item={strapiData.Item}
        backgroundImage={{ url: 'https://picsum.photos/2000/600', mime: 'image/jpeg' }}
        />

<List 
        text={strapiData.text} 
        Item={strapiData.Item}
        backgroundImage={{ url: 'https://picsum.photos/800/600', mime: 'image/jpeg' }}
        />
    </main>
  );
}