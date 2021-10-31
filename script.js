"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: "Amozhgar Saadi Baper",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: "Ameen Bahroz Musa",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Arkan Akram Ahmad",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Rizgar Hassan",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

const displayMovement = function (movements, sort = false) {
  containerMovements.innerHTML = "";

  const movementsSort = sort
    ? movements.slice().sort((a, b) => a - b)
    : movements;
  movementsSort.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal";
    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
      <div class="movements__value">${mov}€</div>
    </div>`;

    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, cur) => acc + cur, 0);
  labelBalance.textContent = `${acc.balance}€`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const outcomes = acc.movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(outcomes)}€`;

  const interest = acc.movements
    .filter((mov) => mov > 0)
    .map((depo) => (depo * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`;
};
// lo kurtkrdnaway nawa sarakyaka tawakw pey daxil bitn
const createUserName = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map((nm) => nm[0])
      .join("");
  });
};
createUserName(accounts);
// Event Handler
const updateUI = function (acc) {
  displayMovement(acc.movements);
  calcDisplayBalance(currentAccount);
  calcDisplaySummary(currentAccount);
};
let currentAccount;
btnLogin.addEventListener("click", function (e) {
  e.preventDefault();
  currentAccount = accounts.find(
    (acc) => acc.username === inputLoginUsername.value
  );
  // console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // const test = document.getElementById("#test");
    // Dislay ui and welcome meaasge
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(" ")[0]
    }`;
    containerApp.style.opacity = 100;
    // Clear input fields
    inputLoginUsername.value = "";
    inputLoginPin.value = "";
    // test.blur();
    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const recieverAcc = accounts.find(
    (acc) => acc.username === inputTransferTo.value
  );
  // console.log(amount, recieverAcc);
  inputTransferAmount.value = inputTransferTo.value = "";
  if (
    amount > 0 &&
    recieverAcc &&
    currentAccount.balance >= amount &&
    recieverAcc?.username !== currentAccount.username
  ) {
    // console.log("transfer valid");
    // Doing The Transfer
    currentAccount.movements.push(-amount);
    recieverAcc.movements.push(amount);
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);

  if (
    amount > 0 &&
    currentAccount.movements.some((mov) => mov >= amount * 0.1)
  ) {
    // Add a movements
    currentAccount.movements.push(amount);
    // Update UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = "";
});
btnClose.addEventListener("click", function (e) {
  e.preventDefault();
  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      (acc) => acc.username === currentAccount.username
    );
    // console.log(index);
    // Delete account
    accounts.splice(index, 1);
    // Hide UI
    containerApp.style.opacity = 0;
  }
});

let sortedState = false;
btnSort.addEventListener("click", function (e) {
  e.preventDefault();
  displayMovement(currentAccount.movements, !sortedState);
  sortedState = !sortedState;
});
/////////////////////////////////////////////////
/////////////////////////////////////////////////

// LECTURES

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

// let arr = ["amozhgar", "ameen", "arkan", "rizgar", "twana"];

// console.log(arr.slice(3, -1));
// console.log(arr.slice(0, -2));
// console.log([...arr]);
// console.log(arr.splice(0, 1));

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// for (const movement of movements) {
// for (const [i, movement] of movements.entries()) {
//   if (movement > 0) {
//     console.log(`Movement ${i + 1}: You deposited ${movement}`);
//   } else {
//     console.log(`Movement ${i + 1}: You are withdraws ${Math.abs(movement)}`);
//   }
// }

// console.log("-=------- \n");
// movements.forEach(function (movement) {
//   if (movement > 0) {
//     console.log(`You deposited ${movement}`);
//   } else {
//     console.log(`You are withdraws ${Math.abs(movement)}`);
//   }
// });

const currencies = new Map([
  ["USD", "United States dollar"],
  ["EUR", "Euro"],
  ["GBP", "Pound sterling"],
]);

// Coding Challenge 1
// const checkDogs = function (dogsJulia, dogsKate) {
//   const dogsJuliaCorrected = dogsJulia.slice();
//   dogsJuliaCorrected.splice(0, 1);
//   dogsJuliaCorrected.splice(-2);
//   // console.log(dogsJuliaCorrected);
//   const dogs = dogsJuliaCorrected.concat(dogsKate);

//   dogs.forEach((dog, i) => {
//     if (dog >= 3) {
//       console.log(`Dog number ${i + 1} is an adult, and is ${dog} years old`);
//     } else {
//       console.log(`Dog number ${i + 1} is still a puppy`);
//     }
//   });
// };

// checkDogs([3, 5, 2, 12, 6], [4, 5, 2, 3, 4]);

// const eurToUsd = 1.1;
// const movementsUSD = movements.map(function (mov) {
//   return mov * eurToUsd;
// });

// const eurToUsd = 1.1;
// const movementsUSD = movements.map((mov) => mov * eurToUsd);
// console.log(movementsUSD);

// For of
// const movementsUSDfor = [];
// for (const mov of movements) {
//   movementsUSDfor.push(mov * eurToUsd);
// }
// const movementDescriptions = movements.map(
//   (mov, i) =>
//     `Movement ${i + 1}: You ${mov > 0 ? "Deposited" : "Withdrew"} ${mov}`
// );
// console.log(movementDescriptions);

// const deposits = movements.filter(function (mov) {
//   return mov > 0;
// });

// console.log(deposits);

// const withdrawals = movements.filter(function (mov) {
//   return mov < 0;
// });
// const withdrawals = movements.filter((mov) => mov < 0);
// console.log(withdrawals);

// const balance = movements.reduce(function (acc, cur, i, arr) {
//   console.log(`Iteration ${i}: ${acc}`);
//   return acc + cur;
// }, 100);
// console.log(balance);

// const max = movements.reduce((acc, mov) => {
//   // First way
//   const maxValue = acc > mov ? acc : mov;
//   return maxValue;
//   // Second Way
//   // if (acc > mov) return acc;
//   // else return mov;
// }, movements[0]);
// console.log(max);

// const calcAvgHumanAge = function (ages) {
//   const humanAge = ages.map((age) => (age <= 2 ? age * 2 : 16 + age * 4));
//   const adults = humanAge.filter((age) => age >= 18);
//   console.log(humanAge);
//   console.log(adults);
//   // const average = adults.reduce((acc, mov) => acc + mov, 0) / adults.length;
//   const average = adults.reduce(
//     (acc, mov, i, arr) => acc + mov / arr.length,
//     0
//   );
//   return average;
// };
// const age1 = calcAvgHumanAge([5, 2, 4, 1, 15, 8, 3]);
// const age2 = calcAvgHumanAge([16, 6, 10, 5, 6, 1, 4]);
// console.log(age1, age2);

const totalDepositUsd = movements
  .filter((mov) => mov > 0)
  .map((mov, i, arr) => {
    // console.log(arr);
    return mov * 1.1;
  })
  .reduce((acc, mov) => acc + mov, 0);
// console.log(totalDepositUsd);

// const calcAvgHumanAge = (ages) =>
//   ages
//     .map((age) => (age <= 2 ? age * 2 : 16 + age * 4))
//     .filter((age) => age >= 18)
//     .reduce((acc, age, i, arr) => acc + age / arr.length, 0);
// // const humanAge = ages.map((age) => (age <= 2 ? age * 2 : 16 + age * 4));
// // const adults = humanAge.filter((age) => age >= 18);
// // console.log(humanAge);
// // console.log(adults);
// // // const average = adults.reduce((acc, mov) => acc + mov, 0) / adults.length;
// // const average = adults.reduce(
// //   (acc, mov, i, arr) => acc + mov / arr.length,
// //   0
// // );ages
// const age = [5, 2, 4, 1, 15, 8, 3];
// // const age1 = calcAvgHumanAge([5, 2, 4, 1, 15, 8, 3]);
// console.log(calcAvgHumanAge(age));
// // const age2 = calcAvgHumanAge([16, 6, 10, 5, 6, 1, 4]);

// const firstWithdawal = movements.find((mov) => mov < 0);
// console.log(movements);
// console.log(firstWithdawal);

// const account = accounts.find((acc) => acc.owner === "Rizgar Hassan");
// console.log(account);

// for (const fid of accounts) {
//   if (fid.find((nm) => nm.owner === "Rizgar Hassan")) {
//     console.log(fid);
//   }
// }
// console.log(movements);
// // Equality
// console.log(movements.includes(-130));
// // Some//Condition
// console.log(movements.some((mov) => mov === -130));
// const anyDeposit = movements.some((mov) => mov > 500);
// console.log(anyDeposit);
// // Every
// console.log(movements.every((mov) => mov > 0));
// // Seperate callback
// const deposit = (mov) => mov > 0;
// console.log(movements.some(deposit));
// console.log(movements.every(deposit));
// console.log(movements.filter(deposit));
// const array = [[1, 2, 3], [4, 5, 6], 7, 8];
// console.log(array.flat());
// const arrayDeep = [[[1, 2], 3], [[4, 5], 6], 7, 8];
// console.log(arrayDeep.flat(2));
// const accountMovement = accounts
//   .map((acc) => acc.movements)
//   .flat()
//   .reduce((acc, mov) => acc + mov, 0);
// console.log(accountMovement);
// String
const owners = ["amozhgar", "saadi", "baper"];
// console.log(owners.sort());
// Numbers
// eturn < 0, A, B (Keep order)
// return < 0, B, A (switch order)
// ascending array la gchka hata gawra
// movements.sort((a, b) => {
//   if (a > b) return 1;
//   if (a > b) return -1;
// });
movements.sort((a, b) => a - b);
// discending la gawra lo gchka
// movements.sort((a, b) => {
//   if (a > b) return -1;
//   if (a > b) return 1;
// });
movements.sort((a, b) => b - a);
// console.log(movements);
