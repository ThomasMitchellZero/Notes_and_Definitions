

///// Using an Instantly Invoked Function Expression  or  IIFE  ////////////

// Because  var x  is wrapped in a function, it can't be changed from outside budgetController.  If I call console.log(x) OUTSIDE of this function, it will just say x is not defined.  And even if I do define a var x in the global context, it won't matter.  As soon as budgetController is invoked, a new execution context is created and if x has a definition inside budgetController, whatever value x had on the outside will just be replaced in the new execution context.  

var budgetController = (function(){
    
    // when budgetController is invoked, a var x is created and set to 23 in the new execution context.  
    var x = 23;
    // same thing here.  A named function to add  x  to parameter(a) is created for this execution context.  If  add  were a property and not a variable, anyone could accidentally re-assign it from the global context by writing budgetController.add = 'someBullshit'  As a variable, it is safely out of global scope. 
    var add = function(a){
        return x + a;
    }
    // the actual return of this function is this object.  It has one property: publicText, and its value is this function.  The result is basically - - - var budgetController = {publicTest: function(b){...} };
    return {
        publicTest: function(b){
            console.log(add(b));
        }
    }
    // Once the function runs,  x  and  add  are generated and stored within the function, but not accessible from anywhere outside.  However, because of lexical scope, inner functions have access to the contents of outer functions, EVEN AFTER the outer function completes.
})();

// budgetController.add(5); will fail because  add  is a variable, not a property.  The error we get is  - TypeError: budgetController is not a function - which is true!  It's kind of trick because you see that anonymous function right by the start, but because parentheses (grouping) happens before assignment, the function is resolved and gone before anything gets assigned to the variable.  Instead, the function produces an object, and that object gets assigned to budgetController.  If we got rid of the first parenthesis in front of  (function(){} this would be a function, but it's not.  

// one other thing to note.  It's still not 100% safe because I CAN overwrite the publicTest object.  If I were to write budgetController.publicTest = 111; publicText would resolve as the object it's supposed to (grouping priority) and then immediately be assigned its new value of 111.

budgetController.publicTest(5);