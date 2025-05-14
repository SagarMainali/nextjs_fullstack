// At the top of your file or in a separate .d.ts file (e.g., global.d.ts)
export {};

declare global {
    var mongoose: {
        conn: any;
        promise: Promise<any> | null;
    };
}
