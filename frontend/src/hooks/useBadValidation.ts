import { useState, useMemo } from 'react';
import { PasswordChecks } from '../types';

const HIEROGLYPHS = ['𓀀', '𓀁', '𓀂', '𓀃', '𓀄', '𓀅', '𓀆', '𓀇', '𓀈', '𓀉'];
const LATIN_WORDS = ['caveat', 'etiam', 'vincit', 'omnia', 'amor', 'fortuna', 'iuva', 'per', 'aspera', 'ad', 'astra'];
const EMOJIS = /[\u{1F300}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}\u{1F1E0}-\u{1F1FF}]/u;

const isPrime = (num: number) => {
  for (let i = 2, s = Math.sqrt(num); i <= s; i++) if (num % i === 0) return false;
  return num > 1;
};

export const useBadValidation = (password: string) => {
  const checks: PasswordChecks = useMemo(() => ({
    threeEmojis: (password.match(EMOJIS) || []).length >= 3,
    oneHieroglyph: HIEROGLYPHS.some(h => password.includes(h)),
    onePrime: Array.from(password.matchAll(/\d+/g)).some(m => isPrime(parseInt(m[0]))),
    oneLatin: LATIN_WORDS.some(w => password.toLowerCase().includes(w)),
    noConsecutive: !/(.)\1/i.test(password.replace(/[^a-zA-Z]/g, '')),
  }), [password]);

  const isValid = Object.values(checks).every(Boolean);

  return { checks, isValid };
};
