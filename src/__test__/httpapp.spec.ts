import "reflect-metadata";

import { BaseController } from "@kdeoliveira/httpapp";
import Module from "../module";
import Controller from "../controller";
import Service from "../service";
import Store from "../store";


@Service()
class TestService{
    constructor(){}

    thisClass(){
        return "TestService";
    }
}

@Controller({
    path: "/posts"
})
class TestController extends BaseController {
    constructor(public service: TestService, uri : string){
        super({uri});
    }

    protected routing(){
        
    }

}


describe("The Module Decorator on HttpApp", () => {
    let container : any;


    // describe("IoC applied on general context", () => {
    //     beforeAll(() => {
    //         container = Module.container()
    //     })
    // })
    
    describe("IoC applied on the http app context", () => {
        beforeAll(() => {
            container = Module.container(TestController);
        })
        
        it("should be a new instance of TestController", ()=> {
            expect(container).toBeInstanceOf(TestController);
        })
    
        it("should return the path value as defined in decorator", () => {
    
            expect(container.path).toEqual("/posts");
        })
    
        it("should create a new instance of decorated service", () => {
    
            expect(container.service).toBeDefined();
        })

        describe("Storage of container's instances", () => {
            let _injector : Store;

            beforeAll(() => {
                _injector = Module.of(TestController);
            })


            it("should contain the Store inside metadata", () => {
                expect(_injector.get(TestController)).toBeDefined();
            })
    
            it("should release all its instances", () => {


                const spy = jest.spyOn(container, "release");
                
                _injector.release();

                expect(spy).toBeCalled();

                spy.mockReset();
                spy.mockRestore();
                
            })
        })
    });
})