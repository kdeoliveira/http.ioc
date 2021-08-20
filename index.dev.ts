import "reflect-metadata";

import Module from "./src/module";
import { Base } from "./src/types";
import Controller from "./src/controller"

// @Controller({
//     uri: "localhsot"
// })
class A{

    // constructor(uri: string){
    //     super(uri);
    // }

    public print(){
        console.log("From A");
    }
}



// @Controller({
//     uri: "localhsot/posts"
// })
class B {
    constructor(public a : A){}

    print(){
        console.log("From B");
    }
}


@Controller({
    path: "localhsot/categories"
})
class C extends Base{
    constructor(public a : A, public b : B, public uri : string){
            super(uri);
    }

    print(){
        console.log("From C", this.uri);
    }
}



const constructor = Module.container(C);


constructor.print();


constructor.a.print();
constructor.b.print();
