const { default: expect } = require("expect");

function sum(a,b){
    return a+b;
}

function subs(a,b){
    return a-b;
}

function multi(a,b){
    return a*b;
}

test('Sum of 1 and 2 is 3',()=>{
    let ans = sum(1,2);
    expect(ans).toBe(3);
});

test('Sub of 5 - 3 is 2',()=>{
    let anss = subs(5,2);
    expect(anss).toBe(3);
});

test('addition of 5 and 5 is not 12 NotToBe',()=>{
    let ansi = sum(5,5);
    expect(ansi).not.toBe(12);
});

test('Multiplication of 3 * 5', ()=>{
    let mul = multi(3,5);
    expect(mul).toBe(15);
});