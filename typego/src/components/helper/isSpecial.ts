export const isSpecial = (code: string): boolean => code === 'ShiftRight'
  || code === 'CapsLock'
  || code === 'ShiftLeft'
  || code === 'ControlLeft'
  || code === 'ControlRight'
  || code === 'AltRight'
  || code === 'AltLeft'
  || code === 'Escape'
  || code === 'MetaLeft'
  || code === 'MetaRight';
export default isSpecial;
