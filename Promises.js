/*
Gotta get a working understanding of Promises so I can move forward.

-What does a promise look like?  Is it an object?  If so, can I see it?
    Kind of.  I can console.log it, but it just says   Promise {<pending>}  One other interesting thing is that if I inspect it right away, the status is [[pending]] but if I wait for the delay to occur, then status shows as [[resolved]]. 



-Why is a Promise better than a series of callbacks?

    Working definition - 12 FEB 2018:  First, being able to use .then instead of nested callbacks results in neater code.  Second, you almost always have conditionals.  Promises have a built-in way to deal with success or failure.  Again, you COULD do that with if() statements and callbacks, but with promises it's neater and easier to read.

-When should I use a Promise?

- .then() always returns a promise.  What if I don't want a promise?  What's the minimum necessary for something to be a promise?  Do I have to specify resolve and reject conditions?  

-Do promises return promises?  Is that good?


*/

const getIDs = new Promise( (resolve, reject)=> {
    setTimeout(()=>{
        resolve([523, 883, 432, 974]);
        console.log("made it!");
    }, 3500);
});

console.log(getIDs);