import { floydWarshall, encontrarImpares, custoOriginal, emparelhamento } from './cpp.js';

const INF = 999999;

// 📍 HOSPITAIS
const hospitais = [
  { nome: "Hospital Unimed Sul", lat: -3.770161367928596, lng: -38.48968247547021, esp: "cardiologia" },
  { nome: "Hospital Unimed Fortaleza", lat: -3.754317484070631, lng: -38.527967951906945, esp: "cirurgia" },
  { nome: "UPA 24H Granja Lisboa", lat: -3.790848110398198, lng: -38.62440533965199, esp: "emergencia" },
  { nome: "Hospital HUC/UECE", lat: -3.797479167876252, lng: -38.55764190947832, esp: "clinica" },
  { nome: "Hospital Albert Sabin Infantil", lat: -3.7623462324121726, lng: -38.52699736787528, esp: "pediatria" }
];

// 🔗 GRAFO
let conexoes = [];
let linhasGrafo = [];

// 🗺️ MAPA
const map = L.map('map').setView([-3.75, -38.55], 13);

const bounds = hospitais.map(h => [h.lat, h.lng]);
map.fitBounds(bounds, { padding: [50, 50] });

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

// 📍 UI
const origemSelect = document.getElementById("origem");
const lista = document.getElementById("listaHospitais");
const resultado = document.getElementById("resultado");

// 🏥 MARCADORES
hospitais.forEach((h, i) => {
  L.marker([h.lat, h.lng])
    .addTo(map)
    .bindTooltip(h.nome, {
      permanent: true,
      direction: "top",
      offset: [0, -10],
      className: "hospital-label"
    });

  let opt = document.createElement("option");
  opt.value = i;
  opt.text = h.nome;
  origemSelect.appendChild(opt);

  lista.innerHTML += `
    <div class="hospital-item">
      <b>${h.nome}</b><br>${h.esp}
    </div>
  `;
});

// 📏 DISTÂNCIA
function calcularDistancia(a, b) {
  const R = 6371;

  const dLat = (b.lat - a.lat) * Math.PI / 180;
  const dLng = (b.lng - a.lng) * Math.PI / 180;

  const lat1 = a.lat * Math.PI / 180;
  const lat2 = b.lat * Math.PI / 180;

  const x = dLng * Math.cos((lat1 + lat2) / 2);
  const y = dLat;

  return Math.sqrt(x * x + y * y) * R;
}

// 🛣️ DESENHAR GRAFO (ROBUSTO)
function desenharGrafo() {
  console.log("desenhando grafo... arestas:", conexoes.length);

  linhasGrafo.forEach(l => map.removeLayer(l));
  linhasGrafo = [];

  for (let i = 0; i < conexoes.length; i++) {
    const [a, b] = conexoes[i];

    const linha = L.polyline([
      [hospitais[a].lat, hospitais[a].lng],
      [hospitais[b].lat, hospitais[b].lng]
    ], {
      dashArray: "5,5",
      weight: 2,
      color: "#0023ad",
      opacity: 0.8
    }).addTo(map);

    linhasGrafo.push(linha);
  }
}

// 🚀 BOTÃO
window.calcular = function () {

  console.log("clicou no calcular");

  resultado.innerHTML = "Calculando... ⏳";

  setTimeout(() => {

    try {
      let n = hospitais.length;

      conexoes = [];

      let grafo = Array.from({ length: n }, () => Array(n).fill(INF));

      // 🔥 GRAFO COMPLETO GARANTIDO
      for (let i = 0; i < n; i++) {
        grafo[i][i] = 0;

        for (let j = i + 1; j < n; j++) {

          const d = calcularDistancia(hospitais[i], hospitais[j]);

          grafo[i][j] = d;
          grafo[j][i] = d;

          conexoes.push([i, j]);
        }
      }

      console.log("conexoes geradas:", conexoes);

      // 🔥 DESENHA ARESTAS
      desenharGrafo();

      // 🧠 CPP
      const dist = floydWarshall(grafo);
      const impares = encontrarImpares(grafo);
      const original = custoOriginal(grafo);
      const extra = emparelhamento(impares, dist);
      const total = original + extra;

      const origemIndex = Number(origemSelect.value);
      const esp = document.getElementById("especialidade").value;
      const destinoIndex = hospitais.findIndex(h => h.esp === esp);

      const custoUsuario = dist[origemIndex][destinoIndex];

      resultado.innerHTML = `
        <b>Origem:</b> ${hospitais[origemIndex].nome}<br>
        <b>Destino:</b> ${hospitais[destinoIndex].nome}<br><br>

        <b>Carteiro Chinês:</b><br>
        Custo original: ${original.toFixed(2)} km<br>
        Custo extra: ${extra.toFixed(2)} km<br>
        Total: ${total.toFixed(2)} km<br><br>

        <b>Rota ambulância:</b> ${custoUsuario.toFixed(2)} km
      `;

      // 🛣️ rota ambulância
      if (window.rota) map.removeLayer(window.rota);

      window.rota = L.polyline([
        [hospitais[origemIndex].lat, hospitais[origemIndex].lng],
        [hospitais[destinoIndex].lat, hospitais[destinoIndex].lng]
      ], {
        color: "red",
        weight: 5
      }).addTo(map);

    } catch (e) {
      console.error(e);
      resultado.innerHTML = "Erro ao calcular ❌";
    }

  }, 100);
};