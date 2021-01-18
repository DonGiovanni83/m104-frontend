export default class Entity extends Map<string, any> {
    public properties: Map<string, any>;

    constructor(...args: [string, any]) {
        super();
        this.properties = new Map<string, any>();
        args.forEach((k: string, v: any) => {
            this.properties.set(k, v)
        });
    }
}