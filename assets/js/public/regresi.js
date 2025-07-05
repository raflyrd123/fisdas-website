function toggleMenu() {
  const menu = document.getElementById("dropdown-menu");
  menu.classList.toggle("hidden");
}

// === AUTO GENERATE SAAT DIBUKA ===
document.addEventListener("DOMContentLoaded", () => {
  generateTable();
});

function formatNumber(value, digits = 4) {
  const rounded = parseFloat(value.toFixed(digits));
  return Number.isInteger(rounded) ? rounded.toString() : rounded.toFixed(digits);
}


// === GENERATE TABEL INPUT ===
function generateTable() {
  const jumlah = parseInt(document.getElementById("jumlahBaris").value);
  const container = document.getElementById("inputTableContainer");
  container.innerHTML = `
    <table>
      <thead>
        <tr><th>No</th><th>X</th><th>Y</th></tr>
      </thead>
      <tbody>
        ${Array.from({ length: jumlah }).map((_, i) => `
          <tr>
            <td>${i + 1}</td>
            <td><input type="number" step="any" id="x${i}" /></td>
            <td><input type="number" step="any" id="y${i}" /></td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `;
  document.getElementById("outputPerhitungan").innerHTML = "";
  document.getElementById("grafik-wrapper").style.display = "none";
  if (window.myChart) window.myChart.destroy();
}

// === HITUNG REGRESI ===
function submitData() {
  const jumlah = parseInt(document.getElementById("jumlahBaris").value);
  let data = [], sumX = 0, sumY = 0, sumX2 = 0, sumY2 = 0, sumXY = 0;

  for (let i = 0; i < jumlah; i++) {
    const x = parseFloat(document.getElementById(`x${i}`).value) || 0;
    const y = parseFloat(document.getElementById(`y${i}`).value) || 0;
    const x2 = x * x;
    const y2 = y * y;
    const xy = x * y;

    data.push({ no: i + 1, x, y, x2, y2, xy });

    sumX += x;
    sumY += y;
    sumX2 += x2;
    sumY2 += y2;
    sumXY += xy;
  }

  const N = jumlah;
  const b_numerator = N * sumXY - sumX * sumY;
  const b_denominator = N * sumX2 - Math.pow(sumX, 2);
  const b = b_numerator / b_denominator;

  const deltaY2_numerator =
    sumY2 -
    ((sumX2 * Math.pow(sumY, 2)) -
      (2 * sumX * sumY * sumXY) +
      (N * Math.pow(sumXY, 2))) /
    (N * sumX2 - Math.pow(sumX, 2));
  const deltaY2 = deltaY2_numerator / (N - 2);

  const deltaY = Math.sqrt(deltaY2);
  const deltaB = deltaY * Math.sqrt(N / (N * sumX2 - Math.pow(sumX, 2)));
  const TK = 1 - (deltaB / Math.abs(b));


  const output = document.getElementById("outputPerhitungan");


  // === TABEL PERHITUNGAN ===
  const tableHTML = `
<h3 class="grafik-title">Tabel Perhitungan</h3>
    <table>
      <thead>
        <tr><th>No</th><th>X</th><th>Y</th><th>X²</th><th>Y²</th><th>XY</th></tr>
      </thead>
      <tbody>
        ${data.map(d => `
          <tr>
            <td>${d.no}</td>
            <td>${d.x}</td>
            <td>${d.y}</td>
<td>${formatNumber(d.x2)}</td>
<td>${formatNumber(d.y2, 6)}</td>
<td>${formatNumber(d.xy)}</td>
          </tr>
        `).join("")}
          <tr>
            <th>Σ</th>
<th>${formatNumber(sumX)}</th>
<th>${formatNumber(sumY, 6)}</th>
<th>${formatNumber(sumX2)}</th>
<th>${formatNumber(sumY2, 6)}</th>
<th>${formatNumber(sumXY)}</th>
          </tr>
      </tbody>
    </table>
  `;

  // === KALKULASI REGRESI ===
  const calcHTML = `
<h3 class="grafik-title">Perhitungan Regresi</h3>

  <p>\\[
    b = \\frac{N \\cdot \\sum XY - \\sum X \\cdot \\sum Y}{N \\cdot \\sum X^2 - (\\sum X)^2}
  \\]</p>

  <p>\\[
    b = \\frac{${N} \\cdot ${sumXY} - ${sumX} \\cdot ${sumY}}
             {${N} \\cdot ${sumX2} - (${sumX})^2}
    = ${b}
  \\]</p>

  <p>\\[
    \\Delta y^2 = \\frac{1}{N - 2} \\left[ \\sum Y^2 - \\frac{ \\sum X^2 (\\sum Y)^2 - 2(\\sum X)(\\sum Y)(\\sum XY) + N (\\sum XY)^2 }{ N \\sum X^2 - (\\sum X)^2 } \\right]
  \\]</p>

  <p>\\[
    \\Delta y^2 = \\frac{1}{${N} - 2} \\left[ ${sumY2} - \\frac{ ${sumX2} \\cdot (${sumY})^2 - 2 \\cdot ${sumX} \\cdot ${sumY} \\cdot ${sumXY} + ${N} \\cdot (${sumXY})^2 }{ ${N} \\cdot ${sumX2} - (${sumX})^2 } \\right]
  \\]</p>

  <p>\\[
    \\Delta y^2 = ${deltaY2}
  \\]</p>

  <p>\\[
    \\Delta y = ${deltaY}
  \\]</p>

  <p>\\[
    \\Delta b = \\Delta y \\cdot \\sqrt{ \\frac{N}{N \\cdot \\sum X^2 - (\\sum X)^2} }
  \\]</p>

  <p>\\[
    \\Delta b = ${deltaY} \\cdot \\sqrt{ \\frac{${N}}{${N} \\cdot ${sumX2} - (${sumX})^2} } = ${deltaB}
  \\]</p>

  <p>\\[
    \\text{Pelaporan } \\{b \\pm \\Delta b\\} = \\{${b} \\pm ${deltaB}\\}
  \\]</p>

  <p>\\[
    TK = \\left(1 - \\frac{\\Delta b}{b}\\right) \\times 100\\%
  \\]</p>

  <p>\\[
    TK = \\left(1 - \\frac{${deltaB}}{${Math.abs(b)}}\\right) \\times 100\\% = ${(TK * 100)}
  \\]</p>
`;




output.innerHTML = `
  <div class="math-center">
    <div class="scroll-table">
      ${tableHTML}
    </div>
    <div class="math-scroll">${calcHTML}</div>
  </div>
`;

  // Tambahkan grafik secara dinamis
  const grafikWrapper = document.getElementById("grafik-wrapper");
  grafikWrapper.innerHTML = `
  <h3 class="grafik-title">Grafik Regresi</h3>
  <canvas id="grafikRegresi"></canvas>
`;
  grafikWrapper.style.display = "block";

  renderChart(data);
  MathJax.typesetPromise();

}

// === RESET ===
function resetAll() {
  document.getElementById("jumlahBaris").value = 3;
  generateTable();
}

// === GRAFIK REGRESI ===
function renderChart(data) {
  const ctx = document.getElementById("grafikRegresi").getContext("2d");
  if (window.myChart) window.myChart.destroy();

  const chartData = data.map(d => ({ x: d.x, y: d.y }));

  window.myChart = new Chart(ctx, {
    type: 'line',
    data: {
      datasets: [
        {
          label: 'Plot Titik (X, Y)',
          data: chartData,
          borderColor: '#163C86',
          backgroundColor: '#163C86',
          fill: false,
          tension: 0,           // garis lurus antar titik
          pointRadius: 4,       // titiknya tetap kelihatan
          pointBackgroundColor: '#163C86'
        }
      ]
    },
    options: {
      scales: {
        x: {
          type: 'linear',
          title: {
            display: true,
            text: 'X'
          }
        },
        y: {
          title: {
            display: true,
            text: 'Y'
          }
        }
      },
      plugins: {
        legend: {
          display: true,
          labels: {
            boxWidth: 12,
            font: {
              family: 'Poppins'
            }
          }
        }
      }
    }
  });
}
