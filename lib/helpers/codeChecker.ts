export const codeChecker = (str: string, async: boolean) => {
    let pattern: RegExp;
    if (async) {
        pattern = /^async\s*\(\s*\)\s*=>\s*{[^}]*}$/;
    } else {
         pattern = /^\s*\(\s*\)\s*=>\s*{[^}]*}$/;
    }
    
  
    return pattern.test(str);
  }