document.addEventListener('submit', function(e) {
    //Hide Results
    document.getElementById('results').style.display='none';
    //Show loader
    document.getElementById('loading').style.display='block';
    setTimeout(calculateResults, 2000);
    e.preventDefault();
});

function calculateResults() {
    //UI Vars
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayment = parseFloat(years.value) * 12;

    //Compute monthly payments
    const x = Math.pow(1 + calculatedInterest, calculatedPayment);
    const monthly = (principal*x*calculatedInterest)/(x-1);

    if(isFinite(monthly)) {
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayment).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayment) - principal).toFixed(2);

        document.getElementById('results').style.display='block';
        document.getElementById('loading').style.display='none';
    } else {
        showErrors('Please check your numbers');
    }

}

function showErrors(message) {
    document.getElementById('results').style.display='none';
    document.getElementById('loading').style.display='none';

    const card = document.querySelector('.card-body');
    const heading = document.querySelector('.heading');

    const errorDiv = document.createElement('div');
    errorDiv.className = 'alert alert-danger';
    errorDiv.appendChild(document.createTextNode(message));
    console.log(message);
    //Insert Error before the heading
    card.insertBefore(errorDiv, heading);
    setTimeout(clearError, 3000);
}

function clearError() {
    document.querySelector('.alert').remove();
}