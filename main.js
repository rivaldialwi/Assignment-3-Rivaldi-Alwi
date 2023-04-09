const selectNegara = document.getElementById("pilih-negara");

const config = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': 'c13c3e0515msh7d8abb9c53458f1p1af760jsn101d6975d427',
    'X-RapidAPI-Host': 'covid-193.p.rapidapi.com'
  }
};

const loadNegara = async () => {
  try {
    const response = await fetch('https://covid-193.p.rapidapi.com/countries', config);
    const data = await response.json();
    data.response.forEach(negara => {
      const option = document.createElement("option");
      option.text = negara;
      selectNegara.add(option);
    });
  } catch (error) {
    console.error(error);
  }
};

const btnCekCovid = document.querySelector(".button");
const activeCases = document.getElementById("active-cases");
const newCases = document.getElementById("new-cases");
const recoveredCases = document.getElementById("recovered-cases");
const totalCases = document.getElementById("total-cases");
const deathCases = document.getElementById("death-cases");
const testCases = document.getElementById("test-cases");

btnCekCovid.addEventListener("click", async () => {
  const negara = selectNegara.value;

  if (!negara) {
    alert("Silahkan pilih negara terlebih dahulu.");
    return;
  }

  try {
    const response = await fetch(`https://covid-193.p.rapidapi.com/statistics?country=${negara}`, config);
    const data = await response.json();

    const result = data.response[0];
    const active = result.cases.active || 0;
    const newCase = result.cases.new || 0;
    const recovered = result.cases.recovered || 0;
    const total = result.cases.total || 0;
    const deaths = result.deaths.total || 0;
    const tests = result.tests.total || 0;

    activeCases.textContent = active;
    newCases.textContent = newCase;
    recoveredCases.textContent = recovered;
    totalCases.textContent = total;
    deathCases.textContent = deaths;
    testCases.textContent = tests;
  } catch (error) {
    console.error(error);
  }
});

loadNegara();