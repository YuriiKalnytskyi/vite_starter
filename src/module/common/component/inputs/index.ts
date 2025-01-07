import { Calendar, CheckBox,  MatchedWords, Switch, TextArea, Input } from '@/module/common/component';

export const Inputs = Object.assign(Input, {
  TextArea,
  Calendar,
  MatchedWords,
  CheckBox,
  Switch
});

export * from './input/input';
export * from './text-area/text-area.tsx';
export * from './calendar/calendar.tsx';
export * from './matched-words/matched-words.tsx';
export * from './check-box/check-box.tsx';
export * from './switch/switch.tsx';
