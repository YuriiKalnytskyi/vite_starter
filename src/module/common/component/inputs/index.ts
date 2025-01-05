import { Calendar, CheckBox, InputComponent, MatchedWords, Phone, TextArea } from '@/module/common/component';
import { Switch } from '@/module/common/component/inputs/switch/switch.tsx';

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
