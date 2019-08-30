import java.util.Map;
import java.util.TreeMap;

/* Implement a MyCalendarThree class to store your events. A new event can always be added.

Your class will have one method, book(int start, int end). Formally, 
this represents a booking on the half open interval [start, end), 
    the range of real numbers x such that start <= x < end.

A K-booking happens when K events have some non-empty intersection 
(ie., there is some time that is common to all K events.)

For each call to the method MyCalendar.book, 
return an integer K representing the largest integer 
such that there exists a K-booking in the calendar.

Your class will be called like this: MyCalendarThree cal = new MyCalendarThree(); MyCalendarThree.book(start, end)
Example 1:

MyCalendarThree();
MyCalendarThree.book(10, 20); // returns 1
MyCalendarThree.book(50, 60); // returns 1
MyCalendarThree.book(10, 40); // returns 2
MyCalendarThree.book(5, 15); // returns 3
MyCalendarThree.book(5, 10); // returns 3
MyCalendarThree.book(25, 55); // returns 3
Explanation: 
The first two events can be booked and are disjoint, so the maximum K-booking is a 1-booking.
The third event [10, 40) intersects the first event, and the maximum K-booking is a 2-booking.
The remaining events cause the maximum K-booking to be only a 3-booking.
Note that the last event locally causes a 2-booking, but the answer is still 3 because
eg. [10, 20), [10, 40), and [5, 15) are still triple booked.
 

Note:

The number of calls to MyCalendarThree.book per test case will be at most 400.
In calls to MyCalendarThree.book(start, end), start and end are integers in the range [0, 10^9]. */

class MyCalendarThree {

    TreeMap<Integer, Integer> bst = new TreeMap<>();
    int maxOverlap = 0;

    public MyCalendarThree() {
    }
 
    //sweep line, scan all intervals
    public int book(int start, int end) {
        bst.put(start, bst.getOrDefault(start, 0) + 1);
        bst.put(end, bst.getOrDefault(end, 0) - 1);
        int overlap = 0, k = 0;
        for (Integer key : bst.keySet()) {
            overlap += bst.get(key);
            k = Math.max(k, overlap);
        }
        return k;
    }

    //record the next overlap number in the bst as value, key: start/end, value: the overlap from this key to next key. 
    //insert the {start, end}, the value will be the lower key's value, 
    //and update all the key from the inserted start to the inserted end.
    //maintain the highest overlap value as answer.
    public int book2(int start, int end) {
        
        Integer prevStart = bst.floorKey(start);
        Integer prevEnd = bst.floorKey(end);
        bst.put(start, prevStart == null ? 0 : bst.get(prevStart));
        bst.put(end, prevEnd == null ? 0 : bst.get(prevEnd));
        for (Integer i : bst.subMap(start, end).keySet()) {
            bst.put(i, bst.get(i) + 1);
            maxOverlap = Math.max(maxOverlap, bst.get(i));
        }
        return maxOverlap;
    } 

    public static void main(String[] args) {
        MyCalendarThree c = new MyCalendarThree();
        System.out.println(c.book2(10, 20)); // returns 1
        System.out.println(c.book2(50, 60)); // returns 1
        System.out.println(c.book2(10, 40)); // returns 2
        System.out.println(c.book2(5, 15)); // returns 3
        System.out.println(c.book2(5, 10)); // returns 3
        System.out.println(c.book2(25, 55)); // returns 3
    }
}


