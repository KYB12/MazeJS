  //represents a min heap
  export function heap(compare) {
    this.list = [];
    this.comparator = compare;
  }

  //inserts into the min heap
  export function insert(heap, item) {
    heap.list.push(item);
    upheap(heap, heap.list.length -1);
  }

  //upheaps the element at a given index recursively
  function upheap(heap, index) {
    //Javascript math
    const parentIndex = (index === 0) ? 0 : Math.floor((index-1)/2);
    //if the element is smaller than parent
    if(heap.comparator(heap.list[index], heap.list[parentIndex]) < 0) {
      swap(heap.list, index, parentIndex);
      upheap(heap, parentIndex);
    }
  }

  //Removes the smallest element of the heap
  export function remove(heap) {
    const removed = heap.list.shift();
    downheap(heap, 0);
    return removed;
  }

  function downheap(heap, index) {
    const left = (index * 2) + 1;
    const right = (index * 2) + 2;
    const current = heap.list[index];
    //Check with left
    //It exists and is smaller than the current 
    if(left < heap.list.length && heap.comparator(heap.list[left], current) < 0) {
      swap(heap.list, left, index);
      downheap(heap, left);
    }

    //same thing with right
    else if(right < heap.list.length && heap.comparator(heap.list[right], current) < 0) {
      swap(heap.list, right, index);
      downheap(heap, right);
    }
  }

  //swaps two elements in a list given indices
  function swap(list, first, second) {
    let a = list[first];
    list[first] = list[second];
    list[second] = a;
  }
