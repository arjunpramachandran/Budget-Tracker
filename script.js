const incomeForm = document.getElementById("incomeForm")
const incomeAmount = document.getElementById("incomeAmount")
const displayIncome = document.getElementById("displayIncome")

const expenseForm = document.getElementById("expenseForm");
const expenseAmount = document.getElementById("expenseAmount");
const expenseDesc = document.getElementById("expenseDesc");
const expenseCategory = document.getElementById("expenseCategory");

const balanceElement = document.getElementById("balance")

let totalIncome = 0;
let food = 0;
let tran = 0;
let enter = 0;
let other = 0;
let expenses = [];

let income = 0;
let expenseChart; // Declare a variable to store the chart instance

incomeForm.addEventListener('submit', (e) => {
    e.preventDefault();
    income = parseFloat(incomeAmount.value);
    incomeAmount.value = '';
    
    updateBalance();
});

expenseForm.addEventListener('submit', (e) => {
    e.preventDefault();
   
    const expense = {
        description: expenseDesc.value,
        amount: parseFloat(expenseAmount.value),
        category: expenseCategory.value
    };
    expenses.push(expense);

    if (expense.category === "Food") {
        food += expense.amount;
    } else if (expense.category === "Transport") {
        tran += expense.amount;
    } else if (expense.category === "Entertainment") {
        enter += expense.amount;
    } else if (expense.category === "Other") {
        other += expense.amount;
    }

    updateChart(); // Call function to update the chart
    updateBalance();

    expenseDesc.value = '';
    expenseAmount.value = '';
    expenseCategory.value = 'Food';
});

const updateBalance = () => {
    totalIncome = totalIncome + income;
    income = 0;
    const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const balance = totalIncome - totalExpenses;

    displayIncome.textContent = ` Income Amount: Rs. ${totalIncome.toFixed(2)}`;
    balanceElement.textContent = `Balance: Rs. ${balance.toFixed(2)}`;
};

const updateChart = () => {
    const ctx = document.getElementById('expenseChart').getContext('2d');

    // Check if the chart instance already exists and destroy it before creating a new one
    if (expenseChart) {
        expenseChart.destroy();
    }

    expenseChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Food', 'Transportation', 'Entertainment', 'Others'],
            datasets: [{
                label: 'Monthly Expenses',
                data: [food, tran, enter, other],
                backgroundColor: [
                    'rgba(236, 44, 86, 0.82)',
                    'rgb(54, 163, 235)',
                    'rgb(255, 207, 86)',
                    'rgb(75, 192, 192)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Monthly Expenses'
                }
            }
        }
    });
};
