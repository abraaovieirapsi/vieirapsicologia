LANDINGS DE ÁREAS DE ATUAÇÃO

Estrutura:
- /areas-de-atuacao/landing.css e landing.js: compartilhados por todas as landings. Mudança visual aqui vale para todas.
- /areas-de-atuacao/<slug>/index.html: copy, metadados e hero de cada landing.
- /assets/areas-de-atuacao/: imagens. A hero é própria de cada landing; o retrato (sobre-*) é compartilhado.
- O logo vem de /assets/logo-hero-graphite.svg. As landings não têm menu.

IMAGENS (WebP, sem texto gravado; manter os nomes para substituir)
Hero (retrato de Abraão, compartilhado pelas 4 landings):
- hero-retrato-desktop.webp: 1672 × 941 px, horizontal 16:9, em uso a partir de 651 px (desktop e tablet).
  Rosto no terço direito (~71% da largura), metade esquerda calma para o texto.
- hero-retrato-mobile.webp: 1024 × 1536 px, vertical 2:3, em uso até 650 px.
  No celular a foto ocupa a largura toda; o texto começa abaixo do pingente (~73% da altura da foto).
  Se a nova foto vertical tiver o rosto/objetos em outra altura, revisar --sh e --pb no fim de landing.css.
Para usar outra foto só em uma landing, trocar os nomes no <style> do head da própria página.
Sem o arquivo da foto, a hero mostra o fundo taupe liso (#665c53).
Retrato do Sobre (foto real, em uso nas 4 landings):
- sobre-desktop.webp: 1000 × 1250 px (recorte 4:5)
- sobre-tablet.webp:   800 × 1200 px (recorte 2:3, foto inteira)
- sobre-mobile.webp:  1024 × 768 px (recorte 4:3 paisagem, tamanho nativo)
Metas de peso: hero 40–350 KB; retratos 70–200 KB.
O enquadramento (background-position da hero, object-position do retrato) fica no fim de landing.css.

LEGIBILIDADE DA HERO
Desktop e tablet: degradê escuro suave do lado esquerdo (rgba(40,36,32), .55 a 0), em .hero::before.
Celular: o texto fica sobre a camisa escura; a base da foto se funde ao #383b3a (degradê vertical em .hero::before).
Meta: contraste mínimo de 4,5:1 no texto pequeno e 3:1 nos títulos (WCAG AA). Medido de 320 a 1920 px (mínimo
obtido no título: 7,3:1; na linha pequena: 9,2:1). Ao trocar a foto, refazer a medição.
Altura da hero: desktop clamp(570px, 39vw, 860px) para mostrar ~70% da foto em telas largas;
celular: acompanha o conteúdo (a foto ocupa 100% da largura).

BOLINHA DO WHATSAPP (celular)
Elemento <a class="wa-fab"> no fim de cada landing; aparece depois da hero e some perto do fechamento (landing.js).

LANDINGS PREVISTAS
- psicoterapia-individual        (pronta)
- psicoterapia-para-depressao    (pronta)
- psicoterapia-para-ansiedade    (pronta)
- psicoterapia-para-tdah-adulto  (pronta)

CRIAR UMA NOVA LANDING
1. Duplicar /areas-de-atuacao/psicoterapia-individual/ com o slug acima.
2. No index.html da cópia, trocar title, meta description, canonical, og:url, og:title e og:description.
3. O bloco <style> do head já aponta para as fotos compartilhadas hero-retrato-*.webp; trocar só se a landing tiver foto própria.
   Trocar também a mensagem do WhatsApp (4 links, incluindo a bolinha) pelo tema novo.
4. Reescrever a copy para a intenção específica. Manter iguais apenas Sobre e as informações práticas.
   Mudar o reconhecimento, a abertura (h1 com o nome do serviço), as quatro etapas do processo e parte das perguntas.
   Não duplicar blocos longos entre landings.
5. Manter um único h1 (já existente), CRP correto e links reais.
6. Adicionar a URL ao sitemap.xml. O link no menu já existe.
7. Valores e bairro das landings seguem a home: R$ 100 online, R$ 145 presencial, Aldeota. Se mudarem, atualizar também index.html (raiz).


FAQ: faq-fundo.webp = imagem de fundo da seção "Perguntas frequentes" (todas as landings). Sugestão: ~1920x1080, .webp, abaixo de 200 KB, tom suave/claro para manter a leitura.

Psicoterapia online - FAQ: psicoterapia-online-faq-fundo.webp = imagem de fundo ESCURA da seção "Perguntas frequentes" desta landing (título em cor clara). ~1920x1080, .webp, abaixo de 200 KB.
