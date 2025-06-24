console.log(
  "Usage: triangle(val1, type1, val2, type2)\n" +
  "  type ∈ { 'leg', 'hypotenuse', 'adjacent angle', 'opposite angle', 'angle' }\n" +
  "  Приклад: triangle(4, 'leg', 8, 'hypotenuse')"
);

function triangle(v1, t1, v2, t2) {
  t1 = t1.toLowerCase();
  t2 = t2.toLowerCase();
  
  const types = ['leg', 'hypotenuse', 'adjacent angle', 'opposite angle', 'angle'];
  if (!types.includes(t1) || !types.includes(t2) || t1 === t2) {
    console.log("Помилка: невірний або дубльований тип аргументів");
    return "failed";
  }
  
  const toRad = deg => deg * Math.PI / 180;
  const toDeg = rad => rad * 180 / Math.PI;
  
  let a, b, c, alpha, beta;
  
  function assign(val, type) {
    switch(type) {
      case 'leg':         a = a === undefined ? val : a; break;
      case 'hypotenuse':  c = val; break;
      case 'adjacent angle':
      case 'opposite angle':
      case 'angle':
        if (alpha === undefined) alpha = val;
        else beta = val;
        break;
    }
  }
  assign(v1, t1);
  assign(v2, t2);
  
  if ((a !== undefined && a <= 0) ||
      (c !== undefined && c <= 0) ||
      (alpha !== undefined && alpha <= 0) ||
      (beta !== undefined && beta <= 0)) {
    console.log("Некоректні значення (від’ємні або нульові)");
    return "invalid";
  }
  
  try {
    if (a !== undefined && b !== undefined) {
      c = Math.hypot(a, b);
      alpha = toDeg(Math.atan(a / b));
      beta  = 90 - alpha;
    }
    else if (a !== undefined && c !== undefined) {
      if (a >= c) throw "leg >= hypotenuse";
      b = Math.sqrt(c*c - a*a);
      alpha = toDeg(Math.asin(a / c));
      beta  = 90 - alpha;
    }
    else if (b !== undefined && c !== undefined) {
      if (b >= c) throw "leg >= hypotenuse";
      a = Math.sqrt(c*c - b*b);
      beta  = toDeg(Math.asin(b / c));
      alpha = 90 - beta;
    }
    else if (a !== undefined && alpha !== undefined && t1.includes('adjacent')) {
      beta = alpha;
      alpha = 90 - beta;
      c = a / Math.cos(toRad(beta));
      b = Math.tan(toRad(beta)) * a;
    }
    else if (b !== undefined && beta !== undefined && (t1.includes('adjacent') || t2.includes('adjacent'))) {
      alpha = beta;
      beta = 90 - alpha;
      c = b / Math.cos(toRad(alpha));
      a = Math.tan(toRad(alpha)) * b;
    }
    else if (a !== undefined && alpha !== undefined && t1.includes('opposite')) {
      c = a / Math.sin(toRad(alpha));
      b = Math.hypot(c, -a);
      beta = 90 - alpha;
    }
    else if (b !== undefined && beta !== undefined && t1.includes('opposite')) {
      c = b / Math.sin(toRad(beta));
      a = Math.hypot(c, -b);
      alpha = 90 - beta;
    }
    else if (c !== undefined && alpha !== undefined) {
      a = c * Math.sin(toRad(alpha));
      b = c * Math.cos(toRad(alpha));
      beta = 90 - alpha;
    }
    else if (c !== undefined && beta !== undefined) {
      b = c * Math.sin(toRad(beta));
      a = c * Math.cos(toRad(beta));
      alpha = 90 - beta;
    }
    else {
      console.log("Непідтримувана комбінація типів");
      return "failed";
    }
  } catch (e) {
    console.log("Помилка обчислень:", e);
    return "invalid";
  }
  
  console.log(`a (катет)          = ${a.toFixed(4)}`);
  console.log(`b (катет)          = ${b.toFixed(4)}`);
  console.log(`c (гіпотенуза)     = ${c.toFixed(4)}`);
  console.log(`alpha (°)          = ${alpha.toFixed(4)}`);
  console.log(`beta  (°)          = ${beta.toFixed(4)}`);
  
  return "success";
}
