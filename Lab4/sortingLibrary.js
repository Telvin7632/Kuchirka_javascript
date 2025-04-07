// sortingLibrary.js

// Головний об'єкт бібліотеки
const SortingLibrary = {
  // Допоміжна функція для перевірки розрідженості масиву
  checkForUndefined: function(arr) {
    let hasUndefined = false;
    for (let i = 0; i < arr.length; i++) {
      if (!(i in arr) || arr[i] === undefined) {
        hasUndefined = true;
        break;
      }
    }
    if (hasUndefined) {
      console.warn("Увага: у масиві виявлено undefined-елементи.");
      if (document && document.body) {
        const msg = document.createElement("div");
        msg.style.color = "red";
        msg.textContent = "Увага: у масиві виявлено undefined-елементи.";
        document.body.appendChild(msg);
      }
    }
  },

  // Загальний компаратор в залежності від порядку
  comparator: function(order) {
    if (order === "desc") {
      return function(a, b) {
        return a < b;
      };
    } else {
      return function(a, b) {
        return a > b;
      };
    }
  },

  // 1. Сортування обміном (бульбашкове сортування)
  bubbleSort: function(arr, order = "asc") {
    this.checkForUndefined(arr);
    const comp = this.comparator(order);
    let comparisons = 0;
    let swaps = 0;
    let a = arr.slice();
    let n = a.length;
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        comparisons++;
        if (comp(a[j], a[j + 1])) {
          [a[j], a[j + 1]] = [a[j + 1], a[j]];
          swaps++;
        }
      }
    }
    console.log(`BubbleSort (${order}): порівнянь = ${comparisons}, обмінів = ${swaps}`);
    return a;
  },

  // 2. Сортування вибором (пошук мінімального елемента)
  selectionSort: function(arr, order = "asc") {
    this.checkForUndefined(arr);
    const comp = this.comparator(order);
    let comparisons = 0;
    let swaps = 0;
    let a = arr.slice();
    let n = a.length;
    for (let i = 0; i < n - 1; i++) {
      let selectedIndex = i;
      for (let j = i + 1; j < n; j++) {
        comparisons++;
        if (comp(a[selectedIndex], a[j])) {
          selectedIndex = j;
        }
      }
      if (selectedIndex !== i) {
        [a[i], a[selectedIndex]] = [a[selectedIndex], a[i]];
        swaps++;
      }
    }
    console.log(`SelectionSort (${order}): порівнянь = ${comparisons}, обмінів = ${swaps}`);
    return a;
  },

  // 3. Сортування вставками
  insertionSort: function(arr, order = "asc") {
    this.checkForUndefined(arr);
    const comp = this.comparator(order);
    let comparisons = 0;
    let moves = 0;
    let a = arr.slice();
    let n = a.length;
    for (let i = 1; i < n; i++) {
      let key = a[i];
      let j = i - 1;
      while (j >= 0) {
        comparisons++;
        if (comp(a[j], key)) {
          a[j + 1] = a[j];
          moves++;
          j--;
        } else {
          break;
        }
      }
      a[j + 1] = key;
      moves++;
    }
    console.log(`InsertionSort (${order}): порівнянь = ${comparisons}, переміщень = ${moves}`);
    return a;
  },

  // 4. Сортування Шелла
  shellSort: function(arr, order = "asc") {
    this.checkForUndefined(arr);
    const comp = this.comparator(order);
    let comparisons = 0;
    let moves = 0;
    let a = arr.slice();
    let n = a.length;
    for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
      for (let i = gap; i < n; i++) {
        let temp = a[i];
        let j = i;
        while (j >= gap) {
          comparisons++;
          if (comp(a[j - gap], temp)) {
            a[j] = a[j - gap];
            moves++;
            j -= gap;
          } else {
            break;
          }
        }
        a[j] = temp;
        moves++;
      }
    }
    console.log(`ShellSort (${order}): порівнянь = ${comparisons}, переміщень = ${moves}`);
    return a;
  },

  // 5. Сортування Хоара (швидке сортування)
  quickSort: function(arr, order = "asc") {
    this.checkForUndefined(arr);
    const comp = this.comparator(order);
    let comparisons = 0;
    let swaps = 0;
    let a = arr.slice();

    function partition(low, high) {
      let pivot = a[high];
      let i = low - 1;
      for (let j = low; j < high; j++) {
        comparisons++;
        if (comp(pivot, a[j])) {
          i++;
          [a[i], a[j]] = [a[j], a[i]];
          swaps++;
        }
      }
      [a[i + 1], a[high]] = [a[high], a[i + 1]];
      swaps++;
      return i + 1;
    }

    function quickSortRecursive(low, high) {
      if (low < high) {
        let pi = partition(low, high);
        quickSortRecursive(low, pi - 1);
        quickSortRecursive(pi + 1, high);
      }
    }

    quickSortRecursive(0, a.length - 1);
    console.log(`QuickSort (${order}): порівнянь = ${comparisons}, обмінів = ${swaps}`);
    return a;
  }
};

// Для доступу глобально, якщо потрібно
if (typeof window !== "undefined") {
  window.SortingLibrary = SortingLibrary;
}
