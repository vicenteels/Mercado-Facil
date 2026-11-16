export const colors = {
  green: '#177900', darkGreen: '#063b1b', paleGreen: '#eaf4e8',
  text: '#171b18', muted: '#686d69', border: '#d8dedb',
  background: '#ffffff', surface: '#fafbfa', danger: '#b33b35',
};

export const money = (value: number) => `R$ ${value.toFixed(2).replace('.', ',')}`;
