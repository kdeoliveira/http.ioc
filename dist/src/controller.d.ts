import { ConstructorDecorator, Type } from "./types";
declare const Controller: ({ path }: {
    path: string;
}) => ConstructorDecorator<Type<object>>;
export default Controller;
