// Dynamic value change
function chnageAmt() {
  document.getElementById('loanAmt').value = document.getElementById(
    'loanRng',
  ).value
  calculateEmi()
}
function chnageInt() {
  document.getElementById('rateAmt').value = document.getElementById(
    'rateRng',
  ).value
  calculateEmi()
}
function chnageTnr() {
  document.getElementById('tenureAmt').value = document.getElementById(
    'tnrRng',
  ).value
  calculateEmi()
}

function calculateEmi() {
  // Get values
  var amount = document.getElementById('loanAmt').value
  var rate = document.getElementById('rateAmt').value
  var year = document.getElementById('tenureAmt').value
  var monthly = document.getElementById('monthly')

  // Monthly condition

  if (monthly.checked) {
    var n = parseInt(year)
    document.getElementById('monthId').innerHTML = 'Months'
  } else {
    var n = parseInt(year) * 12
    document.getElementById('monthId').innerHTML = 'Yearls'
  }

  // Emi Calculation

  const p = parseFloat(amount)
  const r = parseFloat(rate) / (12 * 100)
  const x = Math.pow(1 + r, n)
  const y = x - 1
  var emi = Math.round(p * r * (x / y))
  var totalAmount = n * parseFloat(emi)
  var totalIntrest = Math.floor(totalAmount - p)

  //  OutPut Values

  document.getElementById('emiAmt').innerHTML = emi
  document.getElementById('prAmt').innerHTML = amount
  document.getElementById('inAmt').innerHTML = totalIntrest
  document.getElementById('ttAmt').innerHTML = totalAmount

  // for chart
  let pietotal = parseFloat(totalAmount) + parseFloat(totalIntrest)
  let piePayableloan = (parseFloat(totalAmount) / pietotal) * 360
  let piePayableInt = (parseFloat(totalIntrest) / pietotal) * 360

  var chart = new CanvasJS.Chart('chartContainer', {
    animationEnabled: true,
    title: {},
    data: [
      {
        type: 'pie',
        startAngle: 240,
        indexLabel: '{label}',
        dataPoints: [
          { y: piePayableloan, label: 'Total Loan' },
          { y: piePayableInt, label: 'Total Interest' },
        ],
      },
    ],
  })
  chart.render()
}
