import datetime
import itertools
x = 3 and 1 # and first judge if the first argument is None, '' or 0, if yes then return it, if not return the second argument
print("{}".format("3.1"))
print("{:s}".format("abc"))
print("{:f}".format(3.14))
print("{}/{}/{} {}:{}".format(2018,4,11,9,53))

a = [[0, 1], [1, 3]]
b = [[2, 4]]
a += b
print(a) # list add list = new combined list


dict = {None: 2}
# print(dict.setdefault(None, None.left)) # fail, because setdefault always execute the default first

def f1(x):
    if x:
        print("f1: " + str(x))
        f2(x+1)

x = 2

def f2(x):
    print("f2: " + str(x))

f1(5) # works because python define functions regardless of the order

for i in range(5):
    xx = i
print(xx) # variable can live outside of loop

print(5/2) # divide / in python3 return float, while // return int

s1 = 'aabccccdeeefg' #itertools.groupby required sorted first
dict1 = { k: len(list(g)) for k, g in itertools.groupby(s1) }
print(dict1)

x = 1
def f(y):
    global x  # global to access outside function, nonlocal in nested functions to access parent function variables
    x += y
    print(x)
f(2)

it = iter([1,2,3])
it2 = iter([4,5,6])


it3 = itertools.chain(it, it2)
for i in it3:
    print(i)

it3 = itertools.chain([1,1,1], [2,3,4])
for i in it3:
    print(i)

print(type(it))
list1 = [1,2,3]
print(type(list1[-1]))

print(1+1j*1 == 1+1j**1)

ll = [1,2,3]
ll.clear()
print(ll)