export const dateTransform = (
  _time: string | undefined,
  isSingle?: boolean,
  dayWithSuffix?: boolean
): string => {
  const time = new Date(_time as string);

  const year = time.getFullYear();
  const day = time.getDate().toLocaleString().padStart(2, '0');
  const month = (time.getMonth() + 1).toLocaleString().padStart(2, '0');
  const hour = time.getHours();
  const minute = time.getMinutes();

  if (isSingle) {
    const _month = (time.getMonth() + 1).toLocaleString().padStart(2, '0');

    return `${day}.${_month}.${year}`;
  }

  if (dayWithSuffix) {
    const _month = time.toLocaleString('en-US', { month: 'short' });
    const dayWithSuffix = (day: number) => {
      if (day > 3 && day < 21) return day + 'th';
      switch (day % 10) {
        case 1:
          return day + 'st';
        case 2:
          return day + 'nd';
        case 3:
          return day + 'rd';
        default:
          return day + 'th';
      }
    };

    return `${dayWithSuffix(+day)} ${_month} ${year}`;
  }

  return `${day}.${month}.${year} - ${hour}:${minute}`;
};

export const dynamicDateFormat = (format: string) => {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear().toString().slice(-2);

  const dayWithSuffix = (day: number) => {
    if (day > 3 && day < 21) return day + 'th';
    switch (day % 10) {
      case 1:
        return day + 'st';
      case 2:
        return day + 'nd';
      case 3:
        return day + 'rd';
      default:
        return day + 'th';
    }
  };

  const formatTokens: { [key: string]: string } = {
    mm: month.toString().padStart(2, '0'),
    dd: day.toString().padStart(2, '0'),
    do: dayWithSuffix(day),
    yy: year
  };

  const tokenRegex = /MM|DD|Do|YY|mm|dd|do|yy/g;

  return format.replace(tokenRegex, (match) => formatTokens[match.toLowerCase()]);
};

export const extractTimeFromISO = (isoString: string) => {
  const date = new Date(isoString);

  const hours = date.getUTCHours().toString().padStart(2, '0');
  const minutes = date.getUTCMinutes().toString().padStart(2, '0');

  return `${hours}:${minutes}`;
};
