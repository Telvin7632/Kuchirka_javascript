// sortLib.js
const sortLib = (function() {
  function logSparse(arr) {
    const undefCount = arr.reduce((c, v) => c + (v === undefined ? 1 : 0), 0);
    if (undefCount) {
      console.warn(`⚠ Масив містить ${undefCount} undefined-елементів.`);
    }
  }

  function report(counts, order) {
    console.log(`→ Порівнянь: ${counts.compares}, Переміщень: ${counts.moves}, Порядок: ${order ? 'зростання' : 'спадання'}`);
  }

  function swap(arr, i, j, counts) {
    [arr[i], arr[j]] = [arr[j], arr[i]];
    counts.moves++;
  }

  function compare(a, b, asc, counts) {
    counts.compares++;
    return asc ? a > b : a < b;
  }

  function exchangeSort(input, asc = true) {
    const arr = input.slice();
    const counts = { compares: 0, moves: 0 };
    logSparse(arr);
    for (let i = 0; i < arr.length; i++) {
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[i] === undefined || arr[j] === undefined) continue;
        if (compare(arr[i], arr[j], asc, counts)) swap(arr, i, j, counts);
      }
    }
    console.log('exchangeSort:', arr);
    report(counts, asc);
  }

  function selectionSort(input, asc = true) {
    const arr = input.slice();
    const counts = { compares: 0, moves: 0 };
    logSparse(arr);
    for (let i = 0; i < arr.length - 1; i++) {
      let idx = i;
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[j] === undefined) continue;
        if (compare(arr[idx], arr[j], asc, counts)) idx = j;
      }
      if (idx !== i && arr[i] !== undefined && arr[idx] !== undefined) swap(arr, i, idx, counts);
    }
    console.log('selectionSort:', arr);
    report(counts, asc);
  }

  function insertionSort(input, asc = true) {
    const arr = input.slice();
    const counts = { compares: 0, moves: 0 };
    logSparse(arr);
    for (let i = 1; i < arr.length; i++) {
      let key = arr[i], j = i - 1;
      if (key === undefined) continue;
      while (j >= 0 && arr[j] !== undefined && compare(arr[j], key, asc, counts)) {
        arr[j + 1] = arr[j];
        counts.moves++;
        j--;
      }
      arr[j + 1] = key;
      counts.moves++;
    }
    console.log('insertionSort:', arr);
    report(counts, asc);
  }

  function shellSort(input, asc = true) {
    const arr = input.slice();
    const counts = { compares: 0, moves: 0 };
    logSparse(arr);
    let gap = Math.floor(arr.length / 2);
    while (gap > 0) {
      for (let i = gap; i < arr.length; i++) {
        let temp = arr[i], j = i;
        if (temp === undefined) continue;
        while (j >= gap && arr[j - gap] !== undefined && compare(arr[j - gap], temp, asc, counts)) {
          arr[j] = arr[j - gap];
          counts.moves++;
          j -= gap;
        }
        arr[j] = temp;
        counts.moves++;
      }
      gap = Math.floor(gap / 2);
    }
    console.log('shellSort:', arr);
    report(counts, asc);
  }

  function quickSort(input, asc = true) {
    const arr = input.slice();
    const counts = { compares: 0, moves: 0 };
    logSparse(arr);

    function _quick(lo, hi) {
      if (lo >= hi) return;
      let pivot = arr[Math.floor((lo + hi) / 2)], i = lo, j = hi;
      while (i <= j) {
        while (arr[i] !== undefined && compare(pivot, arr[i], asc, counts)) i++;
        while (arr[j] !== undefined && compare(arr[j], pivot, asc, counts)) j--;
        if (i <= j) {
          swap(arr, i, j, counts);
          i++; j--;
        }
      }
      if (lo < j) _quick(lo, j);
      if (i < hi) _quick(i, hi);
    }

    _quick(0, arr.length - 1);
    console.log('quickSort:', arr);
    report(counts, asc);
  }

  return {
    exchangeSort,
    selectionSort,
    insertionSort,
    shellSort,
    quickSort
  };
})();
