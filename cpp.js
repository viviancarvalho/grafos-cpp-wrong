const INF = 999999;

export function floydWarshall(grafo) {
  const n = grafo.length;
  let dist = grafo.map(row => [...row]);

  for (let k = 0; k < n; k++)
    for (let i = 0; i < n; i++)
      for (let j = 0; j < n; j++)
        if (dist[i][j] > dist[i][k] + dist[k][j])
          dist[i][j] = dist[i][k] + dist[k][j];

  return dist;
}

export function encontrarImpares(grafo) {
  let impares = [];

  for (let i = 0; i < grafo.length; i++) {
    let grau = 0;

    for (let j = 0; j < grafo.length; j++)
      if (grafo[i][j] !== INF && grafo[i][j] !== 0) {
        grau++;
      }

    if (grau % 2 !== 0) {
      impares.push(i);
    }
  }

  return impares;
}

export function custoOriginal(grafo) {
  let soma = 0;

  for (let i = 0; i < grafo.length; i++) {
    for (let j = i + 1; j < grafo.length; j++) {

      if (grafo[i][j] !== INF) {
        soma += grafo[i][j];
      }
      
    }
  }
    
  return soma;
}

export function emparelhamento(impares, dist, custoAtual = 0) {
  if (impares.length === 0) {
    return custoAtual;
  } 

  let primeiro = impares[0];
  let melhor = Infinity;

  for (let i = 1; i < impares.length; i++) {
    let segundo = impares[i];
    let restante = impares.filter(x => x !== primeiro && x !== segundo);

    let custo = emparelhamento(restante, dist, custoAtual + dist[primeiro][segundo]);
    melhor = Math.min(melhor, custo);
  }

  return melhor;
}