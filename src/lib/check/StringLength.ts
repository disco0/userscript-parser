export type NonZeroLengthString<T extends string> = T & NonZeroLength;

export interface WithLength
{
    length: number
}

export interface NonZeroLength
{
    length: Exclude<number, 0>;
}

namespace $default
{
    export type NonZeroLengthString<T extends string> = T & NonZeroLength;

    export interface WithLength
    {
        length: number
    }

    export interface NonZeroLength
    {
        length: Exclude<number, 0>;
    }
}

export default $default;