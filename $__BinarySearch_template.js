const arr = [1,2,3,4,5,6], target = 3;
//find left insert pos for target / the first GE to target
const biset_left = (arr, target) => {
    let l = 0, r = arr.length;
    while (l < r) { 
        const mid = ~~((l + r) / 2);
        if (arr[mid] >= target) { 
            r = mid; 
        } else {
            l = mid + 1; 
        }
    }
    return l; 
}
//find right insert pos for target, which means first LT 
const biset_right = (arr, target) => {
    let l = 0, r = arr.length;
    while (l < r) { 
        const mid = ~~((l + r) / 2);
        if (arr[mid] > target) { 
            r = mid; 
        } else {
            l = mid + 1; 
        }
    }
    return l; 
}

console.log(biset_left(arr, target));
console.log(biset_right(arr, target));