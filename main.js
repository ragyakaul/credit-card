// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8];
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9];
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6];
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5];
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6];

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5];
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3];
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4];
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5];
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4];

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4];
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9];
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3];
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3];
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3];

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5];

// Below is my implementation of the Luhn algorithm
let validateCred = arr => {
  let sum = 0;
  let checkDigit = arr.length - 1;
  for(let backOffset = 0; backOffset < arr.length; backOffset++){
     let index = checkDigit - backOffset;
     // Doing it this way as lengths of credit card array varies
     if (index % 2 === checkDigit % 2){
      sum += arr[index];
     }
     else {
      let times2 = arr[index] * 2;
      if (times2 > 9) {
        times2 -= 9
      }
        sum += times2;
     }
  }
      return sum % 10 === 0 ? 'valid' : 'invalid';
};


let findInvalidCards = nestedArr => {
  let invalidArr = new Array();
  for(let i = 0; i < nestedArr.length; i++){
    if(validateCred(nestedArr[i]) === 'invalid'){
      invalidArr.push(nestedArr[i]);
    }
  }
  return invalidArr;
}

console.log(findInvalidCards(batch));

let invalidCardsArr = findInvalidCards(batch);

let idInvalidCardCompanies = invalidCardsArr => {
  let invalidCardCompanies = new Array();
  for(let i = 0; i < invalidCardsArr.length; i++){
    // Each company only needs to be included in the array once, even if it has duplicates
    let hasVisa, hasMastercard, hasDiscover, hasAmex = false;
    // For Clintu: I'm a bit confused here. I want it to push the relevant card company & avoid duplicates, that's why I'm confirming if hasAmex is false for instance. Despite that, it's not working. I checked with print statements that even after being assigned true, hasAmex is false in the global scope and pushes the same company a second time. I'm wondering why that is, perhaps I lack some knowledge on scope in switch statements? 
    switch(invalidCardsArr[i][0]){
      case 3:
        if(!hasAmex){
          invalidCardCompanies.push('Amex (American Express)');
          hasAmex = true;
        }
        break;
      case 4:
        if(!hasVisa){
          invalidCardCompanies.push('Visa');
          hasVisa = true;
        }
        break;
      case 5:
        if(!hasMastercard){
          invalidCardCompanies.push('Mastercard');
          hasMastercard = true;
        }
        break;
      case 6:
        if(!hasDiscover){
          invalidCardCompanies.push('Discover');
          hasDiscover = true;
        }
        break;
      default:
        console.log('Company Not Found')
        break;
    }
  }
  return invalidCardCompanies;
}

console.log(idInvalidCardCompanies(invalidCardsArr));
