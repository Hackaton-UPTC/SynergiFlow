import React from 'react';

export interface PasswordChecks {
  threeEmojis: boolean;
  oneHieroglyph: boolean;
  onePrime: boolean;
  oneLatin: boolean;
  noConsecutive: boolean;
}

export interface CaptchaEmotion {
  name: string;
  icon: React.ReactNode;
  color: string;
}
