/* We sampled integers between 0 and 255, and stored the results in an array count:  count[k] is the number of integers we sampled equal to k.

Return the minimum, maximum, mean, median, and mode of the sample respectively, as an array of floating point numbers.  The mode is guaranteed to be unique.

(Recall that the median of a sample is:

The middle element, if the elements of the sample were sorted and the number of elements is odd;
The average of the middle two elements, if the elements of the sample were sorted and the number of elements is even.)
 
Constraints:

count.length == 256
1 <= sum(count) <= 10^9
The mode of the sample that count represents is unique.
Answers within 10^-5 of the true value will be accepted as correct.*/

/**
 * @param {number[]} count
 * @return {number[]}
 */
var sampleStats = function(count) {
    let min = -1, max = 0, mean = 0, median = -1, total = 0, sum = 0, idx = -1, mode = 0;
    for (let i = 0; i < count.length; i++) {
        if (count[i] > 0) {
            if (min < 0) min = i;
            max = i;
            total += count[i];
            sum += i * count[i];
            if (count[mode] < count[i]) mode = i;
        } 
    }
    mean = sum / total;
    let median1 = -1, median2 = -1;
    for (let i = 0; i < count.length; i++) {
        if (count[i] > 0) {
            idx += count[i];
            if (total % 2 === 1 && idx >= Math.trunc(total/2) && median < 0) median = i;
            if (total % 2 === 0) {
                if (idx >= Math.trunc(total/2) - 1 && median1 < 0) median1 = i;
                if (idx >= Math.trunc(total/2) && median2 < 0) median2 = i;
            }
        }
    }
    if (total % 2 === 0) median = (median1 + median2) / 2;
    return [min, max, mean, median, mode];

};

console.info("TEST:");
let count = [0,1,3,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
console.info(sampleStats(count));
//Output: [1.00000,3.00000,2.37500,2.50000,3.00000]

count = [0,4,3,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
console.info(sampleStats(count));
//Output: [1.00000,4.00000,2.18182,2.00000,1.00000]

console.info(sampleStats([264,912,1416,1903,2515,3080,3598,4099,4757,5270,5748,6451,7074,7367,7847,8653,9318,9601,10481,10787,11563,11869,12278,12939,13737,13909,14621,15264,15833,16562,17135,17491,17982,18731,19127,19579,20524,20941,21347,21800,22342,21567,21063,20683,20204,19818,19351,18971,18496,17974,17677,17034,16701,16223,15671,15167,14718,14552,14061,13448,13199,12539,12265,11912,10931,10947,10516,10177,9582,9102,8699,8091,7864,7330,6915,6492,6013,5513,5140,4701,4111,3725,3321,2947,2357,1988,1535,1124,664,206,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]));