import { Gender } from '@common/enums/gender.enum';

export const formattedBirthdate = (birthdate: Date): string => {
  const year = birthdate.getFullYear();
  const month = (1 + birthdate.getMonth()).toString().padStart(2, '0');
  const day = birthdate.getDate().toString().padStart(2, '0');

  return day + '.' + month + '.' + year;
};

export const ageFromBirthdate = (birthdate: Date): number => {
  const ageDiff = Date.now() - birthdate.getTime();
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
