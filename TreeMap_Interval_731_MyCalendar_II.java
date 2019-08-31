import java.util.TreeMap;

/* Implement a MyCalendarTwo class to store your events. A new event can be added if adding the event will not cause a triple booking.

Your class will have one method, book(int start, int end). Formally, this represents a booking on the half open interval [start, end), the range of real numbers x such that start <= x < end.

A triple booking happens when three events have some non-empty intersection (ie., there is some time that is common to all 3 events.)

For each call to the method MyCalendar.book, return true if the event can be added to the calendar successfully without causing a triple booking. Otherwise, return false and do not add the event to the calendar.

Your class will be called like this: MyCalendar cal = new MyCalendar(); MyCalendar.book(start, end)
Example 1:

MyCalendar();
MyCalendar.book(10, 20); // returns true
MyCalendar.book(50, 60); // returns true
MyCalendar.book(10, 40); // returns true
MyCalendar.book(5, 15); // returns false
MyCalendar.book(5, 10); // returns true
MyCalendar.book(25, 55); // returns true
Explanation: 
The first two events can be booked.  The third event can be double booked.
The fourth event (5, 15) can't be booked, because it would result in a triple booking.
The fifth event (5, 10) can be booked, as it does not use time 10 which is already double booked.
The sixth event (25, 55) can be booked, as the time in [25, 40) will be double booked with the third event;
the time [40, 50) will be single booked, and the time [50, 55) will be double booked with the second event.
 

Note:

The number of calls to MyCalendar.book per test case will be at most 1000.
In calls to MyCalendar.book(start, end), start and end are integers in the range [0, 10^9]. */


class MyCalendarTwo {
    TreeMap<Integer, Integer> bst = new TreeMap<>(); //put all the start and end as key in this Binary Search Tree (TreeMap)
    //value will be the overlap from this key to next key
    public MyCalendarTwo() {

    }
    public boolean book(int start, int end) {
        Integer preStart = bst.floorKey(start); //find the key before or at the same value of the start
        Integer preEnd = bst.floorKey(end); //find the floor key of end
        for (Integer i : bst.subMap(preStart == null ? start : preStart, end).keySet()) { //preflight to check validation, begin with floor key of the start (inclusive)
            //to the end of new interval to be inserted, if one overlap of a segment equals to 2, then you can't add the new interval
            if (bst.get(i) >= 2) {
                return false;
            }
        }
        bst.put(start, preStart == null ? 0 : bst.get(preStart));//insert the start, we will update later, so leave it be zero or the same as floor key
        bst.put(end, preEnd == null ? 0 : bst.get(preEnd));//insert the end
        for (Integer i : bst.subMap(start, end).keySet()) {
            bst.put(i, bst.get(i) + 1); //update the range from [begin to end)
        }
        return true;
    }
    public static void main(String[] args) {
        MyCalendarTwo c = new MyCalendarTwo();
        System.out.println(c.book(26, 35)); //true
        System.out.println(c.book(26, 32)); //true
        System.out.println(c.book(25, 32)); //false
        System.out.println(c.book(18, 26)); //true
        System.out.println(c.book(40, 45)); //true
        System.out.println(c.book(19, 26)); //true
        System.out.println(c.book(48, 50)); //true
        System.out.println(c.book(1, 6)); //true
        System.out.println(c.book(46, 50)); //true
        System.out.println(c.book(11, 18)); //true
    }
}


/** 
 * Your MyCalendarTwo object will be instantiated and called as such:
 = new MyCalendarTwo()
 * var param_1 = obj.book(start,end)
 */