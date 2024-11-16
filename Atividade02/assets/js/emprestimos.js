document.getElementById('simulate-button').addEventListener('click', function() {
    const loanType = document.getElementById('loan-type').value;
    const loanAmount = parseFloat(document.getElementById('loan-amount').value);
    const months = parseInt(document.getElementById('months').value);

    const interestRate = loanType === 'personal' ? 0.08 : 0.05;
    const totalAmount = loanAmount * (1 + interestRate * months);
    const installment = totalAmount / months;

    document.getElementById('requested-amount').textContent = `R$ ${loanAmount.toFixed(2)}`;
    document.getElementById('installments').textContent = months;
    document.getElementById('installment-value').textContent = `R$ ${installment.toFixed(2)}`;
    document.getElementById('interest-rate').textContent = `${(interestRate * 100).toFixed(2)}% ao mês`;
    document.getElementById('total-value').textContent = `R$ ${totalAmount.toFixed(2)}`;
});


document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', function() {
        const answer = this.nextElementSibling;
        answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
    });
});