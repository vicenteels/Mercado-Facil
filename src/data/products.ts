import { ImageSourcePropType } from 'react-native';

export type Product = { id: string; name: string; unit: string; price: number; oldPrice?: number; image: ImageSourcePropType; category: string; description: string; origin?: string };
export type Category = { id: string; name: string; image: ImageSourcePropType };

export const categories: Category[] = [
  { id: 'frutas', name: 'Frutas e Verduras', image: require('../../assets/products/produce.png') },
  { id: 'bebidas', name: 'Bebidas', image: require('../../assets/products/drinks.png') },
  { id: 'padaria', name: 'Padaria', image: require('../../assets/products/bakery.png') },
  { id: 'limpeza', name: 'Limpeza', image: require('../../assets/products/cleaning.png') },
  { id: 'higiene', name: 'Higiene', image: require('../../assets/products/hygiene.png') },
  { id: 'congelados', name: 'Congelados', image: require('../../assets/products/frozen.png') },
];

export const products: Product[] = [
  { id: 'banana', name: 'Banana Prata', unit: 'kg', price: 5.99, oldPrice: 6.99, image: require('../../assets/products/banana.png'), category: 'frutas', description: 'Banana prata fresca, de ótima qualidade, ideal para o consumo diário. Rica em potássio e fibras.', origin: 'Nacional' },
  { id: 'tomate', name: 'Tomate Italiano', unit: 'kg', price: 7.49, image: require('../../assets/products/tomato.png'), category: 'frutas', description: 'Tomates italianos frescos, selecionados para suas receitas.', origin: 'Nacional' },
  { id: 'alface', name: 'Alface Crespa', unit: 'unidade', price: 3.49, image: require('../../assets/products/lettuce.png'), category: 'frutas', description: 'Alface crespa fresca e crocante.', origin: 'Nacional' },
  { id: 'maca', name: 'Maçã Gala', unit: 'kg', price: 8.99, oldPrice: 10.49, image: require('../../assets/products/apple.png'), category: 'frutas', description: 'Maçã Gala doce, crocante e selecionada.', origin: 'Nacional' },
  { id: 'batata', name: 'Batata Inglesa', unit: 'kg', price: 4.99, image: require('../../assets/products/potato.png'), category: 'frutas', description: 'Batatas frescas para o preparo das suas receitas.', origin: 'Nacional' },
  { id: 'cebola', name: 'Cebola', unit: '500 g', price: 2.99, oldPrice: 3.49, image: require('../../assets/products/onion.png'), category: 'frutas', description: 'Cebolas selecionadas e frescas.', origin: 'Nacional' },
  { id: 'bebida', name: 'Bebidas variadas', unit: 'unidade', price: 6.99, image: require('../../assets/products/drinks.png'), category: 'bebidas', description: 'Bebidas para acompanhar suas refeições.' },
  { id: 'paes', name: 'Pães variados', unit: 'unidade', price: 9.99, image: require('../../assets/products/bakery.png'), category: 'padaria', description: 'Pães frescos para todos os momentos.' },
  { id: 'limpador', name: 'Produtos de limpeza', unit: 'unidade', price: 12.99, image: require('../../assets/products/cleaning.png'), category: 'limpeza', description: 'Produtos essenciais para a limpeza da casa.' },
  { id: 'cuidados', name: 'Itens de higiene', unit: 'unidade', price: 8.99, image: require('../../assets/products/hygiene.png'), category: 'higiene', description: 'Cuidados para o dia a dia.' },
  { id: 'congelado', name: 'Congelados variados', unit: 'unidade', price: 15.99, image: require('../../assets/products/frozen.png'), category: 'congelados', description: 'Praticidade para suas refeições.' },
];
