// Пример 1
function factorial(n) {
    let comp = 1;
    if (n > 0) {
    let next = factorial(n-1);
    comp *= next * n;
    }
    return comp;
}
const P = factorial(5);
console.log(P);


// Пример 2
let compos = 1;
function factorial2(num) {
    if(num > 0) {
        factorial2(num - 1);
        compos *= num;
    }
}
factorial2(5);
console.log(compos);


// Пример 3
function factorial3(numb) {
    return numb > 1 ? factorial(numb - 1) * numb : 1;
}
console.log(factorial3(5));