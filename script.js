const totalRoomsInput = document.getElementById('totalRooms');
const roomsSoldInput = document.getElementById('roomsSold');
const revenueInput = document.getElementById('revenue');

const occupancyEl = document.getElementById('occupancy');
const adrEl = document.getElementById('adr');
const revparEl = document.getElementById('revpar');
const chartTypeSelect = document.getElementById('chartType');

const ctx = document.getElementById('kpiChart').getContext('2d');
let kpiChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Occupancy %', 'ADR ($)', 'RevPAR ($)'],
    datasets: [{
      label: 'KPI Values',
      data: [0, 0, 0],
      backgroundColor: ['#3b82f6','#10b981','#f59e0b']
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: { y: { beginAtZero: true } }
  }
});

// Function to calculate KPIs
function calculateKPIs() {
  const totalRooms = parseFloat(totalRoomsInput.value);
  const roomsSold = parseFloat(roomsSoldInput.value);
  const revenue = parseFloat(revenueInput.value);

  if (totalRooms > 0 && roomsSold >= 0 && revenue >= 0) {
    const occupancy = ((roomsSold / totalRooms) * 100).toFixed(2);
    const adr = roomsSold > 0 ? (revenue / roomsSold).toFixed(2) : 0;
    const revpar = (revenue / totalRooms).toFixed(2);

    occupancyEl.textContent = occupancy + '%';
    adrEl.textContent = '$' + adr;
    revparEl.textContent = '$' + revpar;

    // Update chart
    kpiChart.data.datasets[0].data = [occupancy, adr, revpar];
    kpiChart.update();
  } else {
    occupancyEl.textContent = 'N/A';
    adrEl.textContent = 'N/A';
    revparEl.textContent = 'N/A';
    kpiChart.data.datasets[0].data = [0, 0, 0];
    kpiChart.update();
  }
}

// Event listeners
document.getElementById('calculateBtn').addEventListener('click', calculateKPIs);

chartTypeSelect.addEventListener('change', () => {
  kpiChart.config.type = chartTypeSelect.value;
  kpiChart.update();
});

