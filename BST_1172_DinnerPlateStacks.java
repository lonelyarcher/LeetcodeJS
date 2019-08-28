import java.util.ArrayList;
import java.util.List;
import java.util.Stack;
import java.util.TreeSet;

class DinnerPlates {

    private TreeSet<Integer> bst; 
    //TreeSet: first, last, pollFirst, pollLast, 
    //ceiling,  first GE element of target
    //higher. first GT
    //floor, last LE element of target
    //lower, last LT
    //descendingSet (reverse)
    //tailSet, headSet, subSet could have boolean true for inclusive

    //TreeMap: firstKey(Entry), lastKey(Entry), pollFirstEntry, pollLastEntry, 
    //ceilingKey(Entry),  first GE key of target
    //higherKey(Entry). first GT
    //floorKey(Entry), last LE key of target
    //lowerKey(Entry), last LT
    //descendingKeySet (reverse)
    //tailMap, headMap, subMap could have boolean true for inclusive

    private List<Stack<Integer>> stacks;
    private int capacity;

    public DinnerPlates(int capacity) {
        this.bst = new TreeSet<>();
        this.stacks = new ArrayList<>();
        this.capacity = capacity;
    }
    
    public void push(int val) {
        int index = -1;
        if (bst.isEmpty()) {
            stacks.add(new Stack<Integer>());
            index = stacks.size() - 1;
            bst.add(index);
        } else {
            index = bst.first();
        }
        stacks.get(index).push(val);
        if (stacks.get(index).size() == capacity) {
            bst.remove(index);
        }
    }
    
    public int pop() {
        return popAtStack(stacks.size() - 1);
    }
    
    public int popAtStack(int index) {
        if (index < 0 || index >= stacks.size()) return -1;
        Stack<Integer> st = stacks.get(index);
        if (st.isEmpty()) return -1;
        int ret = st.pop();
        if (st.size() == capacity - 1) {
            bst.add(index);
        }
        while (!stacks.isEmpty() && stacks.get(index).isEmpty() && index == stacks.size() - 1) {
            bst.pollLast(); //when remove last empty stacks, also remove it from bst 
            stacks.remove(index--);
        }
        return ret;
    }

    public static void main(String[] args) {
        DinnerPlates D = new DinnerPlates(2);  // Initialize with capacity = 2
        D.push(1);
        D.push(2);
        D.push(3);
        D.push(4);
        D.push(5);         // The stacks are now:  2  4
        //                                         1  3  5
        //                                         ﹈ ﹈ ﹈
        System.out.println(D.popAtStack(0));   // Returns 2.  The stacks are now:     4
        //                                                     1  3  5
        //                                                     ﹈ ﹈ ﹈
        D.push(20);        // The stacks are now: 20  4
        //                                        1  3  5
        //                                        ﹈ ﹈ ﹈
        D.push(21);        // The stacks are now: 20  4 21
        //                                        1  3  5
        //                                        ﹈ ﹈ ﹈
        System.out.println(D.popAtStack(0));   // Returns 20.  The stacks are now:     4 21
        //                                                        1  3  5
        //                                                        ﹈ ﹈ ﹈
        System.out.println(D.popAtStack(2));     // Returns 21.  The stacks are now:     4
        //                                                        1  3  5
        //                                                        ﹈ ﹈ ﹈ 
        System.out.println(D.pop());              // Returns 5.  The stacks are now:      4
        //                                                        1  3 
        //                                                        ﹈ ﹈  
        System.out.println(D.pop());               // Returns 4.  The stacks are now:   1  3 
        //                                                        ﹈ ﹈   
        System.out.println(D.pop());                // Returns 3.  The stacks are now:   1 
        //                                                        ﹈   
        System.out.println(D.pop());             // Returns 1.  There are no stacks.
        System.out.println(D.pop());             // Returns -1.  There are still no stacks.
    }
}

