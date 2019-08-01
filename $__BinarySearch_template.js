const arr = [1,2,3,4,5,6], target = 1;
//find the first small or equal to 1
const binarySearch = (arr, target) => {
    let l = 0, r = arr.length - 1;
    while (r - l > 1) { //avoid dead loop, so stop at r = l + 1;
        const mid = parseInt(l + (r - l) / 2);
        if (arr[mid] <= target) { //when satisfy the condition
            l = mid; //include in l
        } else {
            r = mid - 1; //unsatisfied, exclude in r
        }
    }
    return arr[r] <= target ? r : (arr[l] <= target ? l : -1); 
    //because we want to find as larger as possible, so first check r satisfied or not, if yes return r.
    //then checke l, if satisfied return l. if both unsatisfied, return not found -1.
}
console.log(binarySearch(arr, target));