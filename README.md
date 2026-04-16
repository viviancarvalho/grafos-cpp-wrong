# 🚑 Aplicação do Problema do Carteiro Chinês em Rotas de Ambulância (Contexto Não Ideal)

## Sobre o projeto

Este projeto implementa o **Problema do Carteiro Chinês (CPP)** em um cenário fictício utilizando um mapa da cidade de Fortaleza.

A aplicação simula uma situação onde uma ambulância precisa se deslocar entre hospitais com diferentes especialidades médicas.

---

## ⚠️ Importante: Contexto propositalmente inadequado

Este projeto foi desenvolvido com o objetivo acadêmico de **aplicar o algoritmo do Carteiro Chinês em um contexto onde ele NÃO é adequado**, para fins de aprendizado e análise crítica.

---

## O que é o Problema do Carteiro Chinês?

O Problema do Carteiro Chinês busca encontrar o **menor caminho que percorre todas as arestas de um grafo pelo menos uma vez**, retornando ao ponto inicial.

Aplicações reais:

* Coleta de lixo
* Entrega de correspondências
* Varredura de ruas

---

## 🚫 Por que NÃO faz sentido neste projeto?

No contexto deste sistema:

O objetivo da ambulância é ir de um hospital A até um hospital B
NÃO é necessário percorrer todas as rotas do grafo

Ou seja:

* O CPP resolve um problema de **cobertura total do grafo**
* Aqui temos um problema de **caminho mínimo entre dois pontos**

Logo, o algoritmo correto seria:

* **Dijkstra**
* ou outro algoritmo de menor caminho

---

## ⚙️ O que o sistema faz

Mesmo sendo um uso inadequado, o sistema:

✔ Constrói um grafo completo entre hospitais
✔ Calcula:

* custo original das arestas
* vértices de grau ímpar
* custo extra mínimo (emparelhamento)
  ✔ Aplica o algoritmo do Carteiro Chinês
  ✔ Exibe:
* custo total do CPP
* rota da ambulância (baseada em menor caminho)

---

## Interface

* Mapa interativo com hospitais reais de Fortaleza
* Visualização do grafo (arestas tracejadas)
* Seleção de hospital de origem
* Seleção de especialidade médica
* Destaque da rota da ambulância

---

## Objetivo acadêmico

Este projeto tem como finalidade:

✔ Entender profundamente o funcionamento do CPP
✔ Comparar algoritmos de grafos
✔ Identificar quando um algoritmo é adequado ou não
✔ Demonstrar aplicação prática com visualização

---

## Aprendizado principal

> Nem todo algoritmo serve para todo problema.

Saber **quando NÃO usar um algoritmo** é tão importante quanto saber implementá-lo.

---

## Tecnologias utilizadas

* JavaScript
* Leaflet (mapas interativos)
* Algoritmos de grafos (Floyd-Warshall + CPP)

---

## Possíveis melhorias

* Substituir CPP por Dijkstra para rota da ambulância
* Usar API real de rotas (OSRM, Google Maps)
* Melhorar visualização do caminho percorrido

---

## Autor
Vivian Carvalho de Abreu Matos
Projeto desenvolvido para fins acadêmicos.
