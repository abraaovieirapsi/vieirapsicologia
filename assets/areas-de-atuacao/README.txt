LANDINGS DE ÁREAS DE ATUAÇÃO

Estrutura:
- /areas-de-atuacao/landing.css e landing.js: compartilhados por todas as landings. Mudança visual aqui vale para todas.
- /areas-de-atuacao/<slug>/index.html: copy, metadados e hero de cada landing.
- /assets/areas-de-atuacao/: imagens. A hero é própria de cada landing; o retrato (sobre-*) é compartilhado.
- O logo vem de /assets/logo-hero-graphite.svg. As landings não têm menu.

IMAGENS (WebP, sem texto gravado; manter os nomes para substituir)
Hero, uma por landing, nomeada <slug>-hero-<dispositivo>.webp:
- desktop (acima de 1024 px): 1920 × 900 px
- tablet (651 a 1024 px):     1200 × 1000 px
- mobile (até 650 px):        900 × 1200 px
  Deixar à esquerda uma área tranquila e escura, porque o texto da hero é claro.
Retrato compartilhado:
- sobre-desktop.webp: 1000 × 1250 px
- sobre-tablet.webp:   800 × 1200 px
- sobre-mobile.webp:  1200 × 900 px
Metas de peso: hero 100–350 KB; retratos 70–200 KB.
Os arquivos atuais são placeholders sólidos.
O enquadramento (background-position da hero, object-position do retrato) fica no fim de landing.css.
Para ajustar só uma landing, acrescentar a regra no <style> do head da própria página.

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
