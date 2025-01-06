import { Calendar, CheckBox, InputComponent, MatchedWords, Phone, Switch, TextArea } from '@/module/common/component';

export const Input = Object.assign(InputComponent, {
  TextArea,
  Phone,
  Calendar,
  MatchedWords,
  CheckBox,
  Switch
});

export * from './input/input';
export * from './text-area/text-area.tsx';
export * from './phone/phone.tsx';
export * from './calendar/calendar.tsx';
export * from './matched-words/matched-words.tsx';
export * from './check-box/check-box.tsx';
export * from './switch/switch.tsx';
