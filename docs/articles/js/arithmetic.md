# 十六、算法

## 常见的排序算法和他们的时间复杂度是多少

| 稳定的排序                   | 时间复杂度                       | 空间复杂度 |
| ---------------------------- | -------------------------------- | ---------- |
| 冒泡排序(bubble sort)        | 最差、平均都是O(n^2)，最好是O(n) | 1          |
| 插入排序(insertion sort)     | 最差、平均都是O(n^2)，最好是O(n) | 1          |
| 归并排序(merge sort)         | 最差、平均、最好都是O(n log n)   | O(n)       |
| 桶排序(bucket sort)          | O(n)                             | O(k)       |
| 基数排序(Radix sort)         | O(nk)（k是常数）                 | O(n)       |
| 二叉树排序(Binary tree sort) | O(n log n)                       | O(n)       |

| 不稳定的排序             | 时间复杂度                     | 空间复杂度 |
| ------------------------ | ------------------------------ | ---------- |
| 选择排序(selection sort) | 最差、平均都是O(n^2)           | 1          |
| 希尔排序(shell sort)     | O(n log n)                     | 1          |
| 堆排序(heapsort)         | 最差、平均、最好都是O(n log n) | 1          |
| 快速排序(quicksort)      | 平均是O(n log n)，最差是O(n^2) | O(log n)   |

## 快速排序

```javascript
var quickSort = function(arr) {

　　if (arr.length <= 1) { return arr; }

　　var pivotIndex = Math.floor(arr.length / 2);

　　var pivot = arr.splice(pivotIndex, 1)[0];

　　var left = [];

　　var right = [];

　　for (var i = 0; i < arr.length; i++){

　　　　if (arr[i] < pivot) {

　　　　　　left.push(arr[i]);

　　　　} else {

　　　　　　right.push(arr[i]);

　　　　}

　　}

　　return quickSort(left).concat([pivot], quickSort(right));

};
```

## 冒泡排序

```javascript
function bblSort(arr) {
  for(var i = 0; i < arr.length; i++) {
    
    for(var j = 0; j < ( arr.length - i -1 ); j++) {
      
      if(arr[j] > arr[j+1]) {          
        var temp = arr[j]
        arr[j] = arr[j + 1]
        arr[j+1] = temp
      }
    }
  }
  console.log(arr);
}
```
