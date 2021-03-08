import { Gender } from '@common/enums/gender.enum';
import { SwimmingStyles } from '@common/enums/swimming-styles.enum';

export const formattedDate = (birthdate: Date): string => {
  const date = new Date(birthdate);
  const year = date.getFullYear();
  const month = (1 + date.getMonth()).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  return day + '.' + month + '.' + year;
};

export const ageFromBirthdate = (birthdate: Date): number => {
  const ageDiff = Date.now() - new Date(birthdate).getTime();
  const ageDate = new Date(ageDiff);

  return Math.abs(ageDate.getUTCFullYear() - 1970);
};

export const genderText = (gender: Gender): string => {
  switch (gender) {
    case Gender.All:
      return 'Любой';
    case Gender.Female:
      return 'Женщина';
    case Gender.Male:
      return 'Мужчина';
  }

  return '';
};

export const swimmingStyleText = (swimmingStyle: SwimmingStyles): string => {
  switch (swimmingStyle) {
    case SwimmingStyles.Breaststroke:
      return 'Брасс';
    case SwimmingStyles.Butterfly:
      return 'Баттерфляй';
    case SwimmingStyles.Crawl:
      return 'Кроль';
    case SwimmingStyles.Freestyle:
      return 'Вольный стиль';
  }

  return '';
};

export const ageGroupText = (
  minAge: number | null,
  maxAge: number | null,
): string => {
  if (minAge !== null && maxAge !== null) {
    return minAge + ' - ' + maxAge;
  } else if (minAge === null && maxAge !== null) {
    return 'до ' + (maxAge + 1);
  } else if (minAge !== null && maxAge === null) {
    return 'от ' + minAge;
  }

  return 'Любой возраст';
};
