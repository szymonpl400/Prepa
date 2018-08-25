/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}

declare module "*.json" {
  const value: any;
  export default value;
}

declare type Spied<T> = {  
  [Method in keyof T]: jasmine.Spy;
};