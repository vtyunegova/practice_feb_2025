const arr = [1, 3, 5, 7];
const sum = 6;

// пример 1
function findSum() {
    const arr2 = [];
    for(let i = 0; i < arr.length; i++) {
        const a = sum - arr[i];

        for(let j = i + 1; j < arr.length; j++) {
            if(arr[j] === a && i !== j) {
                arr2.push(i);
                arr2.push(j);
                return arr2;
            }
        }
    }
    return arr2;
}
console.log(findSum());

// пример 2
function findSum2() {
    const obj = {};

    for (let i = 0; i < arr.length; i++) {
        const a = arr[i];
        const b = sum - a;

        if (b in obj) {
            return obj[b] + ", " + i; 
        }
        obj[a] = i; 
    }

    return null;
}

console.log(findSum2());