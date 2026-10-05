LANDINGS DE ÁREAS DE ATUAÇÃO

Estrutura:
- /areas-de-atuacao/landing.css e landing.js: compartilhados por todas as landings. Mudança visual aqui vale para todas.
- /areas-de-atuacao/<slug>/index.html: copy, metadados e hero de cada landing.
- /assets/areas-de-atuacao/: imagens. A hero é própria de cada landing; o retrato (sobre-*) é compartilhado.
- O logo vem de /assets/logo-hero-graphite.svg. As landings não têm menu.

IMAGENS (WebP, sem texto gravado; manter os nomes para substituir)
Hero, uma por landing, nomeada <slug>-hero-<dispositivo>.webp:
- desktop (acima de 1024 px): 1920 × 900 px
- tablet (651 a 1024 px):     1600 × 1200 px (em uso)
- mobile (até 650 px):        1080 × 1350 px (em uso)
  Qualquer proporção funciona, pois a imagem cobre a caixa e é recortada. O texto fica à esquerda;
  o assunto da foto deve ficar no terço direito e na faixa central da altura.
Retrato compartilhado (ainda placeholder):
- sobre-desktop.webp: 1000 × 1250 px
- sobre-tablet.webp:   800 × 1200 px
- sobre-mobile.webp:  1200 × 900 px
Metas de peso: hero 100–350 KB; retratos 70–200 KB.
O enquadramento (background-position da hero, object-position do retrato) fica no fim de landing.css.
Para ajustar só uma landing, acrescentar a regra no <style> do head da própria página.

LEGIBILIDADE DA HERO (camada entre a foto e o texto)
Cada hero tem uma camada em degradê, forte do lado do texto e transparente do lado da foto.
Há duas variantes, escolhidas por landing:
- Escura (padrão): degradê #383b3a, letra clara. Intensidade em --shade.
- Clara (classe hero--light no <section class="hero">): véu #f8f8f5, letra e botão escuros. Para fotos claras. Intensidade em --veil.
O valor fica no <style> do head de cada landing, no bloco "Camada de legibilidade". Ajustar só ali.
Valores atuais: individual --veil .66 · depressão --veil .65 · ansiedade --shade .70 · TDAH --shade .40
  (o TDAH tem reforço em 651–739 px e até 339 px, pois a foto tem uma área clara sob a primeira linha).
Ao TROCAR a foto de uma hero, revisar o valor: foto mais clara pede mais intensidade, foto mais escura pede menos.
Meta: contraste mínimo de 4,5:1 no texto pequeno e 3:1 nos títulos (WCAG AA). Testado em larguras de 320 a 1920 px.
Se uma foto for muito clara, usar a variante clara; se for escura, a escura. Para trocar, adicionar/remover
a classe hero--light e trocar --shade por --veil (ou o contrário).

LANDINGS PREVISTAS
- psicoterapia-individual        (pronta)
- psicoterapia-para-depressao    (pronta)
- psicoterapia-para-ansiedade    (pronta)
- psicoterapia-para-tdah-adulto  (pronta)

CRIAR UMA NOVA LANDING
1. Duplicar /areas-de-atuacao/psicoterapia-individual/ com o slug acima.
2. No index.html da cópia, trocar title, meta description, canonical, og:url, og:title e og:description.
3. Trocar as três ocorrências de "psicoterapia-individual-hero" pelo novo slug (bloco <style> do head)
   e criar as três heroes com esses nomes.
4. Reescrever a copy para a intenção específica. Manter iguais apenas Sobre e as informações práticas.
   Mudar o reconhecimento, a abertura (h1, hero-service e complemento), as quatro etapas do processo e parte das perguntas.
   Não duplicar blocos longos entre landings.
5. Manter um único h1 (já existente), CRP correto e links reais.
6. Adicionar a URL ao sitemap.xml. O link no menu já existe.
7. Valores e bairro das landings seguem a home: R$ 100 online, R$ 145 presencial, Aldeota. Se mudarem, atualizar também index.html (raiz).
