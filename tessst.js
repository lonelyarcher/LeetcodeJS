function IDsOfPackages(truckSpace, packagesSpace)
{
    // WRITE YOUR CODE HERE
    let ans = null;
    const map = {};
    for (let i = 0; i < packagesSpace.length; i++) {
        if (map[truckSpace - 30 - packagesSpace[i]]) {
            const j = map[truckSpace - 30 - packagesSpace[i]];
            if (!ans || Math.max(packagesSpace[i], packagesSpace[j]) > Math.max(packagesSpace[ans[0]], packagesSpace[ans[1]])) {
                ans = [packagesSpace[i], packagesSpace[j]];
            }
        } else {
            map[packagesSpace[i]] = i;
        }
    }
    return ans;
}

console.log(IDsOfPackages(110, [20,60]));