// utils.ts

export const getCurrentYearAndMonth = (): string => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1; // 月份从 0 开始，因此要加 1
  const currentDay = currentDate.getDay();

  const formattedMonth = currentMonth < 10 ? `0${currentMonth}` : `${currentMonth}`;
  const formattedDay = currentDay < 10 ? `0${currentDay}` : `${currentDay}`;


  const resultString = `${currentYear}-${formattedMonth}-${formattedDay}`;
  console.log(resultString);

  return resultString;
};
