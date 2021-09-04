"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const httpapp_1 = require("@kdeoliveira/httpapp");
const module_1 = __importDefault(require("../src/module"));
const controller_1 = __importDefault(require("../src/controller"));
const service_1 = __importDefault(require("../src/service"));
let TestService = 
//@ts-ignore
class TestService {
    constructor() { }
    thisClass() {
        return "TestService";
    }
};
TestService = __decorate([
    (0, service_1.default)()
    //@ts-ignore
    ,
    __metadata("design:paramtypes", [])
], TestService);
let TestController = 
//@ts-ignore
class TestController extends httpapp_1.BaseController {
    constructor(service, uri) {
        super({ uri });
        this.service = service;
    }
    routing() {
    }
};
TestController = __decorate([
    (0, controller_1.default)({
        path: "/posts"
    })
    //@ts-ignore
    ,
    __metadata("design:paramtypes", [TestService, String])
], TestController);
describe("The Module Decorator on HttpApp", () => {
    let container;
    // describe("IoC applied on general context", () => {
    //     beforeAll(() => {
    //         container = Module.container()
    //     })
    // })
    describe("IoC applied on the http app context", () => {
        beforeAll(() => {
            container = module_1.default.container(TestController);
        });
        it("should be a new instance of TestController", () => {
            expect(container).toBeInstanceOf(TestController);
        });
        it("should return the path value as defined in decorator", () => {
            expect(container.path).toEqual("/posts");
        });
        it("should create a new instance of decorated service", () => {
            expect(container.service).toBeDefined();
        });
        describe("Storage of container's instances", () => {
            let _injector;
            beforeAll(() => {
                _injector = module_1.default.of(TestController);
            });
            it("should contain the Store inside metadata", () => {
                expect(_injector.get(TestController)).toBeDefined();
            });
            it("should release all its instances", () => {
                const spy = jest.spyOn(container, "release");
                _injector.release();
                expect(spy).toBeCalled();
                spy.mockReset();
                spy.mockRestore();
            });
        });
    });
});
//# sourceMappingURL=httpapp.spec.js.map