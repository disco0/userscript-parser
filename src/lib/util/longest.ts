export function longestString<A extends string, B extends string>(a: A, b: B)
{
    return b.length - a.length
}

export const longest =
{
    string: longestString
}

export default longest;