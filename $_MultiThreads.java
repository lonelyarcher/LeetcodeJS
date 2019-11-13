import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.*;
import java.util.*;

//1114. Print in Order
class AtomicInteger123 {
    private AtomicInteger i;
    
    public AtomicInteger123() {
        i = new AtomicInteger(0);
    }

    public void first(Runnable printFirst) throws InterruptedException {
        printFirst.run();
        i.incrementAndGet();
    }

    public void second(Runnable printSecond) throws InterruptedException {
        while(i.get() < 1);
        printSecond.run();
        i.incrementAndGet();
    }

    public void third(Runnable printFirst) throws InterruptedException {
        while(i.get() < 2);
        printFirst.run();
    }
}

class CountDownLatch123 {
    private CountDownLatch c1;
    private CountDownLatch c2;
    
    public CountDownLatch123() {
        c1 = new CountDownLatch(1);
        c2 = new CountDownLatch(1);
    }

    public void first(Runnable printFirst) throws InterruptedException {
        printFirst.run();
        c1.countDown();
    }

    public void second(Runnable printSecond) throws InterruptedException {
        c1.await();
        printSecond.run();
        c2.countDown();
    }

    public void third(Runnable printFirst) throws InterruptedException {
        c2.await();
        printFirst.run();
    }
}
//Design Bounded Blocking Queue
class BoundedBlockingQueue {
    private Semaphore en;
    private Semaphore de;
    private Deque<Integer> deque;
    public BoundedBlockingQueue(int capacity) {
        deque = new LinkedList<>();
        en = new Semaphore(capacity);
        de = new Semaphore(0);
    }
    
    public void enqueue(int element) throws InterruptedException {
        en.acquire();
        deque.addLast(element);
        de.release();
    }
    
    public int dequeue() throws InterruptedException {
        de.acquire();
        int ans = deque.removeFirst();
        en.release();
        return ans;
    }
    
    public int size() {
        return deque.size();
    }
}
//print FooBar alternatively
class FooBar {
    private int n;
    private Semaphore foo;
    private Semaphore bar;

    public FooBar(int n) {
        this.n = n;
        foo = new Semaphore(1);
        bar = new Semaphore(0);
    }

    public void foo(Runnable printFoo) throws InterruptedException {
        
        for (int i = 0; i < n; i++) {
            foo.acquire();
        	// printFoo.run() outputs "foo". Do not change or remove this line.
        	printFoo.run();
            bar.release();
        }
    }

    public void bar(Runnable printBar) throws InterruptedException {
        
        for (int i = 0; i < n; i++) {
            bar.acquire();
            // printBar.run() outputs "bar". Do not change or remove this line.
        	printBar.run();
            foo.release();
        }
    }
}

//to output the series 010203040506... where the length of the series must be 2n.
class ZeroEvenOdd {
    private int n;
    
    private Semaphore zero;
    private Semaphore odd;
    private Semaphore even;
    
    public ZeroEvenOdd(int n) {
        this.n = n;
        zero = new Semaphore(1);
        odd = new Semaphore(0);
        even = new Semaphore(0);
    }

    // printNumber.accept(x) outputs "x", where x is an integer.
    public void zero(IntConsumer printNumber) throws InterruptedException {
        for (int i = 1; i <= n; i++) {
            zero.acquire();
            printNumber.accept(0);
            if ((i & 1) == 1) odd.release();
            else even.release();
        }
        
    }

    public void even(IntConsumer printNumber) throws InterruptedException {
        for (int i = 2; i <= n; i += 2) {
            even.acquire();
            printNumber.accept(i);
            zero.release();
        }
    }

    public void odd(IntConsumer printNumber) throws InterruptedException {
        for (int i = 1; i <= n; i += 2) {
            odd.acquire();
            printNumber.accept(i);
            zero.release();
        }
    }
}

class H2O {
    
    private Semaphore h;
    private Semaphore o;


    public H2O() {
        h = new Semaphore(2, true);
        o = new Semaphore(0, true);

    }

    public void hydrogen(Runnable releaseHydrogen) throws InterruptedException {
        h.acquire();
		
        // releaseHydrogen.run() outputs "H". Do not change or remove this line.
        releaseHydrogen.run();
        o.release();

    }

    public void oxygen(Runnable releaseOxygen) throws InterruptedException {
        o.acquire(2);
        // releaseOxygen.run() outputs "O". Do not change or remove this line.
		releaseOxygen.run();
        h.release();
        h.release();
    }
}

//1195. Fizz Buzz Multithreaded
class FizzBuzz {
    private int n;
    private Semaphore fizz;
    private Semaphore buzz;
    private Semaphore fizzbuzz;
    private Semaphore num;

    public FizzBuzz(int n) {
        this.n = n;
        num = new Semaphore(0);
        fizz = new Semaphore(0);
        buzz = new Semaphore(0);
        fizzbuzz = new Semaphore(0);
    }

    // printFizz.run() outputs "fizz".
    public void fizz(Runnable printFizz) throws InterruptedException {
        for (int i = 3; i <= n; i += 3) {
            if (i % 15 == 0) continue;
            fizz.acquire();
            printFizz.run();
            num.release();
        }
    }

    // printBuzz.run() outputs "buzz".
    public void buzz(Runnable printBuzz) throws InterruptedException {
        for (int i = 5; i <= n; i += 5) {
            if (i % 15 == 0) continue;
            buzz.acquire();
            printBuzz.run();
            num.release();
        }
    }

    // printFizzBuzz.run() outputs "fizzbuzz".
    public void fizzbuzz(Runnable printFizzBuzz) throws InterruptedException {
        for (int i = 15; i <= n; i += 15) {
            fizzbuzz.acquire();
            printFizzBuzz.run();
            num.release();
        }
    }

    // printNumber.accept(x) outputs "x", where x is an integer.
    public void number(IntConsumer printNumber) throws InterruptedException {
        for (int i = 1; i <= n; i++) {
            if (i % 3 > 0 && i % 5 > 0){
                printNumber.accept(i);
                continue;
            } else if (i % 3 == 0 && i % 5 == 0){
                fizzbuzz.release();
            } else if (i % 3 == 0) {
                fizz.release();
            } else {
                buzz.release();
            }
            num.acquire(); 
        }
    }
}