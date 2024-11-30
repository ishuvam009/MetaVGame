function sum(a,b){
    return a+b;
}

test('test return a + b',()=>{
    let ans = sum(1,2);
    expect(ans).toBe(3);
});