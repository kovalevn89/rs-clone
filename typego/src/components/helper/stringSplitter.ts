export default function stringSplitter(str: string): string[][] {
  return str.split(' ').map((item) => [...item.split(''), ' ']);
}
