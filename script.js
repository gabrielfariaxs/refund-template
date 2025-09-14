//Seleciona os elementos do formulario
const form = document.querySelector("form");
const amount = document.getElementById("amount");
const expense = document.getElementById("expense");
const category = document.getElementById("category");

//Seleciona os elementos da lista de despesas
const expenseList = document.querySelector("ul");
//Adiciona o evento de input ao campo de valor
amount.oninput = () => {
  let value = amount.value.replace(/\D/g, "");

  value = Number(value) / 100;
  amount.value = formatCurrencyBRL(value);
}

function formatCurrencyBRL(value){
value = value.toLocaleString("pt-BR", {style: "currency", currency: "BRL"});
return value
}

//Adiciona o evento de submit ao formulario
form.onsubmit = (event) => {
  event.preventDefault();

  const newExpense = {
    id: new Date().getTime(),
    expense: expense.value, 
    category_id: category.value,
    category_name: category.options[category.selectedIndex].text,
    amount: amount.value,
    created_at: new Date(),
  }
  expenseAdd(newExpense);
}

function expenseAdd(newExpense){
  try {
 // Cria o elemento para adicionar na lista
 const expenseItem = document.createElement("li");
  expenseItem.classList.add("expense-item");

  //Cria o icone da categoria
  const expenseIcon = document.createElement("img");
  expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`);
  expenseIcon.setAttribute("alt", newExpense.category_name);

  const expenseInfo = document.createElement("div");
  expenseInfo.classList.add("expense-info");

  const expenseName = document.createElement("strong");
  expenseName.textContent = newExpense.expense;
  
  const expenseCategory = document.createElement("span");
  expenseCategory.textContent = newExpense.category_name;

  expenseInfo.append(expenseName, expenseCategory);
  expenseItem.append(expenseIcon, expenseInfo);
  expenseList.append(expenseItem);
  
  } catch(error){
    alert("Erro ao adicionar despesa:")
  }
}