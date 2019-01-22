
/*
var module = (function(){


    var b = 'bravo';
    var c = 55

    return {
        prop1:"a",
        prop2: b,
        prop3: function(x){
            return(c + x)
        },
        prop4: {
            subProp1: "you made it!",
            subProp2: "not the string you're looking for",
        },
        prop5: c,
        prop6: function(v){
            c += v;
        },

    };


})()

console.log(module);
console.log(module.prop3(5));
console.log(module.prop4.subProp1);

module.prop6(15);




*/

var module = (function(){

    // These variables cannot be altered by unrelated functions.  However, they CAN be altered by functions within their lexical scope.  What's more, this can happen even after the function has already run.  
    var a = [];
    var b = 'bravo';
    var c = 55;

    return {
        prop2: function(){
            return c;
        },
        prop3: c,
        prop4: function(name){
            a += name;
            console.log(a);
        },
        prop5: function(num){
            c += num;
            console.log(c);
        }
    }


})();

// remember, module is only run once.  It is NOT a function.  It would be if it were not enclosed in parenthesis.  However, it is enclosed in parenthesis, and parenthesis are executed before anything, including assignation.  So module isn't set equal to a function, it's set equal to whatever is returned by CALLING that function.

// prints 55. The function runs, this property is set to the starting value of c, and that property is in the object assigned to   module   variable.
console.log(module.prop3);

// Prints 70.  The argument is added to c (55) and then the value is console.logged

module.prop5(15);

// first, .prop5 is run with the argument of 15 again.  The previous call made c = 70, and this one adds 13 to that, then console.logs the result.  After that, console.log tries to run again, but because prop5 doesn't actually return anything, there's no value for it to print so it just prints   undefined.

console.log(module.prop5(13));

// this isn't actually running the function, although I'm not sure why it doesn't print the contents.

console.log(module.prop5);

// prints 55.  It seems that this does not change even when the value of c changes.  Maybe it's just set to c's value during the initial run?
console.log(module.prop3);


// because this is a function and not a straight-up assignation, it gets the latest value of c whenever it is run and then returns it.  That's how it gets the right result while prop3 gets the wrong one.
console.log(module.prop2());