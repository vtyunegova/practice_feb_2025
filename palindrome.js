// пример 1
const a = -121;
function isPalindrome() {
    const arr = ("" + a).split('').reverse().join('');
    return parseInt(arr) === Math.abs(a);
}
console.log(isPalindrome());

// пример 2
function isPalindrome2(num) {
    let numb = Math.abs(num);
    let rev = 0;
    let temp = numb;

    while(temp > 0) {
        const last = temp % 10;
        rev = rev * 10 + last;

        temp = Math.floor(temp/10);
    }

    return numb === rev;
}
console.log(isPalindrome2(-121));

// пример 3
function isPalindrome3(num) {
    const absNum = Math.abs(num);

    function checkPalindrome(n, rev = 0) {
        if (n === 0) {
            return rev;
        }
        const last = n % 10;
        rev = rev * 10 + last;
        return checkPalindrome(Math.floor(n / 10), rev);
    }

    const reverse = checkPalindrome(absNum);
    return absNum === reverse;
}
console.log(isPalindrome3(-121)); 