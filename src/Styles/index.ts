export enum Colors {
  Main = '#ff7f00',
  MainDarker1 = '#E26B00',
  MainLighter1 = '#FFF2E5',
  Blue = '#3D435D',
  LightBlueMenus = '#49516F',
  Yellow = '#FBCF3E',
  Green = '#5DD39E',
  Red = '#FF004F',
  Error = '#e0b4b4',
  Grey5 = 'rgba(0, 0, 0, 0.05)',
  Grey90 = 'rgba(0, 0, 0, 0.90)',
  LightGray = '#e9e9e9',
  MediumGray = '#b9b9b9',
  DarkGray = '#7b7b7b',
  Black = '#282828',
  White = '#FFFFFF',
}

export const theme: TTheme = {
  padding: '8px 12px',
  borderRadius: '8px',
  boxShadow: '0 0 10px #CCC',
  colors: Colors,
  color: {
    ...Colors,
  }
}