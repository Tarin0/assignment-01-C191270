const addExpenseButton = document.getElementById("add-expense-button");
const deleteButtons = document.querySelectorAll(".delete-button");

const descriptionInput = document.getElementById("description");
const valueInput = document.getElementById("value");
const selectInput = document.getElementById("type");

const incomeList = document.getElementById("income-list");
const expenseList = document.getElementById("expense-list");
const totalIncome = document.getElementById("total-income");
const totalExpenses = document.getElementById("total-expenses");
const availableBudget = document.getElementById("available-budget");
const entryMoney = document.getElementById("entry-money");

function formatMoney(value) {
  return Math.abs(Number(value)).toLocaleString(undefined, {
    minimumFractionDigits: 2,
  });
}

function calculateIncome() {
  let sum = 0;
  for (let item of incomeList.children) {
    const valueString =
      item.children[0].children[1].children[0].innerHTML.replace(/,/g, "");

    console.log(parseFloat(valueString));
    sum += parseFloat(valueString);
  }
  totalIncome.innerHTML = formatMoney(sum);
}
calculateIncome();
calculateExpense();
calculateBudget();
/**
 * Task 1: Calculate total expense
 */
function calculateExpense() {
  let cost = 0;
  for (let item of expenseList.children) {

    const valueString =
      item.children[0].children[1].children[0].innerHTML.replace(/,/g, "");

    console.log(parseFloat(valueString));
    cost += parseFloat(valueString);
  }
  totalExpenses.innerHTML = formatMoney(cost);
}

/**
 * Task 2: Calculate the budget
 */
// const budget =0;
function calculateBudget() {
  console.log(totalIncome.innerHTML.replace(/,/g, ""))
  const totalExpense = totalExpenses.innerHTML.replace(/,/g, "");
  const totalInc = totalIncome.innerHTML.replace(/,/g, "");
  const budget = parseFloat(totalInc) - parseFloat(totalExpense);
  availableBudget.innerHTML = formatMoney(budget);
}

/**
 * Task 3: Delete Entry
 */
function deleteEntry(event) {
  console.log(entryMoney);
  const entryItem = event.target.closest("li");

  if (entryItem) {
    entryItem.parentNode.removeChild(entryItem);
    alert("Deleted Successfully");
    calculateIncome();
    calculateExpense();
    calculateBudget();
  }

}

function addEntry() {
  const type = selectInput.value;
  const description = descriptionInput.value;
  const value = valueInput.value;
  const totalExpense = parseFloat(totalExpenses.innerHTML.replace(/,/g, ""));
  const totalInc = parseFloat(totalIncome.innerHTML.replace(/,/g, ""));
  const remainingBudget = totalInc - totalExpense - parseFloat(value);

  
  const errors = [];
  if (description.length === 0) {
    errors.push("Please enter the description");
  }
  
  if (value.length === 0) {
    errors.push("Please enter the value");
  }
  if (remainingBudget < 0) {
    errors.push("This expense exceeds your available budget");
  }
  
  if (errors.length > 0) {
    alert(errors);
    return;
  }
  

  
  const list = type === "income" ? incomeList : expenseList;
  const sign = type === "income" ? "+" : "-";
  const colorClass = type === "income" ? "text-green-600" : "text-red-600";

  const newEntryHtml = `
    <li class="py-2.5">
      <div class="group flex justify-between gap-2 text-sm">
        <span>${description}</span>
        <div id="entry-money">
          <span class="${colorClass} delete-money">${sign}${formatMoney(value)}</span>
          <button
            type="button"
            class="delete-button ml-2 hidden cursor-pointer font-medium text-red-500 group-hover:inline-block"
          >
            Delete
          </button>
        </div>
      </div>
    </li>
    `;

  list.innerHTML += newEntryHtml;

  
  calculateIncome();
  calculateExpense();
  calculateBudget();
  const deleteButtons = document.querySelectorAll(".delete-button");
  for (let btn of deleteButtons) {
    btn.addEventListener("click", function (event) {
      const moneyValueElement = event.target.parentElement.querySelector('.delete-money');
      if (moneyValueElement) {
        const moneyValueText = moneyValueElement;
        const moneyValue = parseFloat(moneyValueElement.textContent.replace(/[^0-9.-]/g, ''));
        // console.log(moneyValue);
      }
      // event.target.parentElement.parentElement.style.textDecoration ="";
      const entryItem = event.target.closest("li");

      if (entryItem) {
        entryItem.parentNode.removeChild(entryItem);
        calculateIncome();
        calculateExpense();
        calculateBudget();
      }
    });
  }
}

deleteButtons.forEach(function (button) {
  button.addEventListener("click", deleteEntry);
});
addExpenseButton.addEventListener("click", addEntry);
