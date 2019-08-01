// dp, upgrade dimension, dp[i][j] from i to j, upgrade to 3 dimension, dp[i][j][k] from i to j, the last one is color x, k is how many same color x box after j. 
// The last one in j is very important, it help to divided to sub question by remove it. so the third dimension most likely is about the last element j
// memorization search vs dp, if key is very sparse, better use memorization search. 
// use compositive key , dp[i][j][k] => key i*10000 + j*100 + k if i,j,k < 100, 3 dimension downgrade to 1 dimension.