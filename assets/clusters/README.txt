IMAGENS DE HERO DOS CLUSTERS E DOS ARTIGOS

Cada tema tem uma cor própria de fundo (usada quando o arquivo da foto não existe, e como base quando existe).
O arquivo abaixo é opcional: sem ele, a hero mostra só a cor do tema.

Cores por tema (hero do cluster e de todos os artigos do tema):
- pensamentos-e-emocoes  #665c53 (taupe)
- psicoterapia           #5d5f58 (cinza-pedra)
- tcc-e-cognicao         #4d5551 (verde-grafite)
- tdah-adulto            #6b5849 (argila)
- sentido-e-logoterapia  #5f5748 (oliva-areia)
Para mudar uma cor: trocar --hero-tone no cluster.css do tema e no article.css de cada artigo do tema.

Arquivos esperados em assets/clusters/ (WebP, 15 no total = 5 temas x 3):
- <tema>-hero-mobile.webp   1080 x 1350 px (4:5)   usado abaixo de 700 px (e nos artigos, no celular)
- <tema>-hero-tablet.webp   1600 x 1200 px (4:3)   usado de 700 a 899 px e em telas em pé de 700 a 1199 px (só nos clusters)
- <tema>-hero-desktop.webp  2560 x 1200 px (32:15) usado a partir de 900 px (1920 x 900 também serve)
Nomes exatos, com <tema> = pensamentos-e-emocoes, psicoterapia, tcc-e-cognicao, tdah-adulto, sentido-e-logoterapia.
Peso: 80 a 250 KB cada. Sem texto, logo ou moldura dentro da imagem.

Como a imagem é usada:
- O CSS cobre a hero (cover), com leve ampliação e movimento. O recorte varia conforme a tela.
- Os artigos reutilizam as imagens do tema (só mobile e desktop). Na hero do artigo, bem mais baixa, só a faixa central
  da altura aparece (cerca de 45%): deixe o assunto principal nessa faixa.
- No desktop o título do cluster fica CENTRALIZADO; no celular, à esquerda. Mantenha o centro da imagem calmo,
  com pouco detalhe e sem contraste forte.
- A foto é escurecida pelo CSS (brightness .62) e levemente dessaturada. Prefira fotos de luz média ou escura,
  em tons próximos à cor do tema. Fotos claras tendem a ficar acinzentadas.
- Ao colocar uma foto, refazer a checagem de contraste do título (3:1) e da descrição (4,5:1).
