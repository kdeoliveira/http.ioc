"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const httpapp_1 = require("@kdeoliveira/httpapp");
const Controller = ({ path }) => {
    if (path.charAt(0) !== '/')
        path = '/'.concat(path);
    //Create decorator that can initialize the baseURI and other secondary parameters for controllers, middlewares and services
    return (target) => {
        //Eventually each shared type/lib should be separated in a unique package
        //Then, BaseController would be equal for any otehr package using this object.prototype
        if (Reflect.getPrototypeOf(target).name !== httpapp_1.BaseController.name)
            throw new Error("This class must extend a Base controller");
        if (Reflect.hasMetadata(target.name, target)) {
            return;
        }
        if (path)
            Reflect.defineMetadata(target.name, {
                type: "Controller",
                name: Object.keys({ path })[0],
                value: path
            }, target);
    };
};
exports.default = Controller;
//# sourceMappingURL=controller.js.map