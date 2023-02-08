export const isSpecial = (code: string): boolean => code === 'ShiftRight'
  || code === 'CapsLock'
  || code === 'ShiftLeft'
  || code === 'ControlLeft'
  || code === 'ControlRight'
  || code === 'AltRight'
  || code === 'AltLeft'
  || code === 'Escape'
  || code === 'Option'
  || code === 'Meta';

export default isSpecial;
