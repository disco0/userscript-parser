export declare type NonZeroLengthString<T extends string> = T & NonZeroLength;
export interface WithLength {
    length: number;
}
export interface NonZeroLength {
    length: Exclude<number, 0>;
}
declare namespace $default {
    type NonZeroLengthString<T extends string> = T & NonZeroLength;
    interface WithLength {
        length: number;
    }
    interface NonZeroLength {
        length: Exclude<number, 0>;
    }
}
export default $default;
