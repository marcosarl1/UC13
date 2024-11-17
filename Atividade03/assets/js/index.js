let currentValue = 0;

const elements = {
    valorInput: () => document.getElementById('valor'),
    errorValor: () => document.getElementById('error-valor'),
    pixPanel: () => document.getElementById('pix-panel'),
    creditPanel: () => document.getElementById('credit-panel'),
    pixTotal: () => document.getElementById('pix-total'),
    cardNumber: () => document.getElementById('card-number'),
    cardIcon1: () => document.getElementById('card-icon-1'),
    cardIcon2: () => document.getElementById('card-icon-2'),
    cardError: () => document.getElementById('card-error'),
    installments: () => document.getElementById('installments'),
    creditTotal: () => document.getElementById('credit-total'),
    successMessage: () => document.getElementById('success-message'),
    pixRadio: () => document.getElementById('pix'),
    creditRadio: () => document.getElementById('credit-card'),
    payButton: () => document.getElementById('pay-button')
};

function initializeListeners() {
    elements.pixRadio().addEventListener('change', showPaymentPanel);
    elements.creditRadio().addEventListener('change', showPaymentPanel);
    elements.cardNumber().addEventListener('input', validateCard);
    elements.installments().addEventListener('change', updateTotal);
}

function showPaymentPanel() {
    if (!validateValue()) {
        hidePaymentPanels();
        return;
    }

    const isPix = elements.pixRadio().checked;

    elements.pixPanel().style.display = isPix ? 'block' : 'none';
    elements.creditPanel().style.display = isPix ? 'none' : 'block';

    if (isPix || !isPix) {
        elements.payButton().style.display = 'block';
    }

    if (isPix) {
        updatePixTotal();
    } else {
        updateInstallmentOptions();
        updateTotal();
    }
}

function validateValue() {
    const valorInput = elements.valorInput();
    const errorValor = elements.errorValor();

    if (!valorInput.value) {
        errorValor.style.display = 'block';
        return false;
    }

    errorValor.style.display = 'none';
    currentValue = parseFloat(valorInput.value);
    return true;
}

function hidePaymentPanels() {
    elements.pixPanel().style.display = 'none';
    elements.creditPanel().style.display = 'none';
    elements.payButton().style.display = 'none';
}

function updatePixTotal() {
    const discount = currentValue * 0.1;
    const total = currentValue - discount;
    elements.pixTotal().textContent = total.toFixed(2);
}

function validateCard() {
    const cardNumber = elements.cardNumber().value;
    const cardIcon1 = elements.cardIcon1();
    const cardIcon2 = elements.cardIcon2();
    const cardError = elements.cardError();


    cardIcon1.style.display = 'none';
    cardIcon2.style.display = 'none';
    cardError.style.display = 'none';

    if (cardNumber.startsWith('1234')) {
        cardIcon1.style.display = 'inline';
    } else if (cardNumber.startsWith('4321')) {
        cardIcon2.style.display = 'inline';
    } else if (cardNumber.length > 0) {
        cardError.style.display = 'block';
    }
}

function updateInstallmentOptions() {
    const select = elements.installments();
    select.innerHTML = '';

    for (let i = 1; i <= 5; i++) {
        let installmentValue = calculateInstallmentValue(i);
        const perInstallment = installmentValue / i;

        const option = document.createElement('option');
        option.value = i;
        option.textContent = `${i}x R$ ${perInstallment.toFixed(2)}`;
        select.appendChild(option);
    }
}

function calculateInstallmentValue(installments) {
    let total = currentValue;

    if (installments === 4) {
        total *= 1.05; // 5% de juros
    } else if (installments === 5) {
        total *= 1.10; // 10% de juros
    }

    return total;
}

function updateTotal() {
    const installments = parseInt(elements.installments().value);
    const total = calculateInstallmentValue(installments);
    elements.creditTotal().textContent = total.toFixed(2);
}

function pay() {
    elements.successMessage().style.display = 'block';
    hidePaymentPanels();
}

// Inicializa os listeners quando o documento estiver pronto
document.addEventListener('DOMContentLoaded', initializeListeners);